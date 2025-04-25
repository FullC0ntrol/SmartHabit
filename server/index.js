const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Dodajemy obsługę zmiennych środowiskowych

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "tajny_klucz"; // Przenieś do .env

app.use(cors());
app.use(express.json());

// Połączenie z MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || "57.128.194.135",
    user: process.env.DB_USER || "habituser",
    password: process.env.DB_PASSWORD || "1234!@QWERty",
    database: process.env.DB_NAME || "habit_tracker",
});

db.connect((err) => {
    if (err) {
        console.error("❌ Błąd połączenia z MySQL:", err);
        process.exit(1);
    }
    console.log("✅ Połączono z bazą MySQL!");
});

// Middleware do weryfikacji tokenu
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) return res.status(401).json({ error: "Brak tokenu" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Nieprawidłowy token" });
        req.user = user;
        next();
    });
};

// Rejestracja
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Nieprawidłowy login lub hasło" });
    }

    try {
        // Sprawdzenie, czy użytkownik już istnieje
        const [existingUser] = await db
            .promise()
            .query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Użytkownik już istnieje" });
        }

        const hashed = await bcrypt.hash(password, 10);
        await db
            .promise()
            .query("INSERT INTO users (username, password) VALUES (?, ?)", [
                username,
                hashed,
            ]);
        res.status(201).json({ message: "Użytkownik zarejestrowany!" });
    } catch (err) {
        console.error("❌ Błąd rejestracji:", err);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// Logowanie
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Brak loginu lub hasła" });
    }

    try {
        const [results] = await db
            .promise()
            .query("SELECT * FROM users WHERE username = ?", [username]);
        if (results.length === 0) {
            return res
                .status(401)
                .json({ error: "Nieprawidłowy login lub hasło" });
        }

        const user = results[0];
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res
                .status(401)
                .json({ error: "Nieprawidłowy login lub hasło" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ message: "Zalogowano!", token, username: user.username });
    } catch (err) {
        console.error("❌ Błąd logowania:", err);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// Weryfikacja tokenu
app.get("/verify-token", authenticateToken, (req, res) => {
    res.json({ valid: true, username: req.user.username });
});

// KALENDARZ - KALENDARZ - KALENDARZ - KALENDARZ
// KALENDARZ - KALENDARZ - KALENDARZ - KALENDARZ
// KALENDARZ - KALENDARZ - KALENDARZ - KALENDARZ

// Dodawanie nowego wydarzenia
app.post("/events", authenticateToken, async (req, res) => {
    const { title, description, event_date, event_time } = req.body;
    const userId = req.user.id;

    if (!title || !event_date) {
        return res.status(400).json({ error: "Tytuł i data są wymagane" });
    }

    try {
        const [result] = await db
            .promise()
            .query(
                "INSERT INTO events (user_id, title, description, event_date, event_time) VALUES (?, ?, ?, ?, ?)",
                [
                    userId,
                    title,
                    description || null,
                    event_date,
                    event_time || null,
                ]
            );

        const [newEvent] = await db
            .promise()
            .query("SELECT * FROM events WHERE id = ?", [result.insertId]);

        res.status(201).json(newEvent[0]);
    } catch (err) {
        console.error("❌ Błąd dodawania wydarzenia:", err);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// Pobieranie wydarzeń użytkownika
app.get("/events", authenticateToken, async (req, res) => {
    const { month, year } = req.query;
    const userId = req.user.id;

    try {
        let query = "SELECT * FROM events WHERE user_id = ?";
        const params = [userId];

        if (month && year) {
            query += " AND MONTH(event_date) = ? AND YEAR(event_date) = ?";
            params.push(month, year);
        }

        query += " ORDER BY event_date, event_time";

        const [events] = await db.promise().query(query, params);
        res.json(events);
    } catch (err) {
        console.error("❌ Błąd pobierania wydarzeń:", err);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// Aktualizacja wydarzenia
app.put("/events/:id", authenticateToken, async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;
    const { title, description, event_date, event_time } = req.body;

    try {
        // Sprawdź czy wydarzenie należy do użytkownika
        const [existingEvent] = await db
            .promise()
            .query("SELECT * FROM events WHERE id = ? AND user_id = ?", [
                eventId,
                userId,
            ]);

        if (existingEvent.length === 0) {
            return res.status(404).json({ error: "Wydarzenie nie znalezione" });
        }

        await db
            .promise()
            .query(
                "UPDATE events SET title = ?, description = ?, event_date = ?, event_time = ? WHERE id = ?",
                [title, description, event_date, event_time, eventId]
            );

        res.json({ message: "Wydarzenie zaktualizowane" });
    } catch (err) {
        console.error("❌ Błąd aktualizacji wydarzenia:", err);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// Usuwanie wydarzenia
app.delete("/events/:id", authenticateToken, async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    try {
        // Sprawdź czy wydarzenie należy do użytkownika
        const [existingEvent] = await db
            .promise()
            .query("SELECT * FROM events WHERE id = ? AND user_id = ?", [
                eventId,
                userId,
            ]);

        if (existingEvent.length === 0) {
            return res.status(404).json({ error: "Wydarzenie nie znalezione" });
        }

        await db.promise().query("DELETE FROM events WHERE id = ?", [eventId]);

        res.json({ message: "Wydarzenie usunięte" });
    } catch (err) {
        console.error("❌ Błąd usuwania wydarzenia:", err);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`✅ Backend działa na http://localhost:${PORT}`);
});
