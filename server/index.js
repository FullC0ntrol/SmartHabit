const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 🔗 Połączenie z MySQL
const db = mysql.createConnection({
  host: '57.128.194.135',        // jeśli backend działa na tym samym VPS co MySQL
  user: 'habituser',
  password: '1234!@QWERty',
  database: 'habit_tracker'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Błąd połączenia z MySQL:', err);
    return;
  }
  console.log('✅ Połączono z bazą MySQL!');
});





// 📥 Endpoint do zapisu daty
app.post('/api/save-date', (req, res) => {
  const { user_id, date } = req.body;
    console.log(user_id);
    console.log(date);

  if (!user_id || !date) {
    return res.status(400).json({ error: 'Brakuje user_id lub date' });
  }

  const query = 'INSERT INTO dates (user_id, selected_date) VALUES (?, ?)';

  db.query(query, [user_id, date], (err, result) => {
    if (err) {
      console.error('❌ Błąd zapisu do bazy:', err);
      return res.status(500).json({ error: 'Błąd zapisu' });
    }
    res.json({ success: true });
  });
});

// 🚀 Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`✅ Backend działa na http://localhost:${PORT}`);
});
