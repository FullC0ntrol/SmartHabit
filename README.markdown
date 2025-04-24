# HabitTracker - Inteligentny Śledzik Nawyków

## Struktura bazy danych

Baza danych projektu **HabitTracker** używa MySQL i obecnie przechowuje dane użytkowników. W przyszłości zostanie rozszerzona o tabele dla nawyków i ćwiczeń, aby wspierać funkcjonalności kalendarza i planów treningowych. Poniżej opisano obecne i planowane tabele.

### Tabele

1. **users**
   - **Rola**: Przechowuje dane użytkowników do logowania i rejestracji.
   - **Kolumny**:
     - `id`: `INT`, auto-increment, primary key
     - `username`: `VARCHAR(255)`, unikalny, nazwa użytkownika
     - `password`: `VARCHAR(255)`, hashowane hasło (bcryptjs)
     - `created_at`: `DATETIME`, data utworzenia konta
   - **Uwagi**: Używana przez endpointy `/login`, `/register`, `/verify-token`.

2. **habits** (planowana)
   - **Rola**: Przechowuje nawyki użytkownika przypisane do dni w kalendarzu.
   - **Kolumny**:
     - `id`: `INT`, auto-increment, primary key
     - `user_id`: `INT`, foreign key (relacja z `users.id`)
     - `name`: `VARCHAR(255)`, nazwa nawyku (np. "Bieganie")
     - `date`: `DATE`, dzień przypisania nawyku
     - `completed`: `BOOLEAN`, status wykonania (domyślnie `false`)
     - `created_at`: `DATETIME`, data utworzenia
   - **Uwagi**: Do integracji z endpointem `/habits`.

3. **exercises** (planowana)
   - **Rola**: Przechowuje ćwiczenia w planach treningowych użytkownika.
   - **Kolumny**:
     - `id`: `INT`, auto-increment, primary key
     - `user_id`: `INT`, foreign key (relacja z `users.id`)
     - `name`: `VARCHAR(255)`, nazwa ćwiczenia (np. "Przysiady")
     - `description`: `TEXT`, opcjonalny opis
     - `created_at`: `DATETIME`, data utworzenia
   - **Uwagi**: Do integracji z planami treningowymi.

### Relacje
- `habits.user_id` → `users.id` (jeden użytkownik ma wiele nawyków).
- `exercises.user_id` → `users.id` (jeden użytkownik ma wiele ćwiczeń).

### Diagram ERD (Mermaid)
Poniższy diagram w formacie Mermaid pokazuje obecne i planowane tabele oraz ich relacje:

```mermaid
erDiagram
    users ||--o{ habits : "ma"
    users ||--o{ exercises : "ma"
    
    users {
        INT id PK
        VARCHAR username UK
        VARCHAR password
        DATETIME created_at
    }
    
    habits {
        INT id PK
        INT user_id FK
        VARCHAR name
        DATE date
        BOOLEAN completed
        DATETIME created_at
    }
    
    exercises {
        INT id PK
        INT user_id FK
        VARCHAR name
        TEXT description
        DATETIME created_at
    }
```

### Wytyczne dla nowych tabel
- **Definicja schematu**: Twórz schematy w backendzie w folderze `server/models/` (np. `User.js`, `Habit.js`) lub w pliku SQL (np. `schema.sql`) w folderze `server/db/`.
- **Migracje**: Użyj narzędzia jak `Knex.js` lub ręcznych skryptów SQL do zarządzania zmianami w bazie.
- **Nowe tabele**: Dodawaj tabele w MySQL dla nowych funkcjonalności (np. `plans` dla planów treningowych) i aktualizuj endpointy w `server/routes/`.
- **Relacje**: Używaj kluczy obcych (`FOREIGN KEY`) do powiązań między tabelami, np. `user_id` w `habits`.


**HabitTracker** to aplikacja webowa do śledzenia nawyków i ćwiczeń, z planem rozwoju w estetyczne urządzenie ścienne oparte na Raspberry Pi z ekranem dotykowym. Umożliwia użytkownikom rejestrację, logowanie i przeglądanie spersonalizowanego ekranu głównego z placeholderem dla kalendarza. Aplikacja jest hostowana na VPS z bazą danych MySQL, z frontendem w React i backendem w Node.js/Express.

## Spis Treści

1. [Opis](#opis)
2. [Funkcjonalności](#funkcjonalności)
3. [Technologie](#technologie)
4. [Struktura projektu](#struktura-projektu)
5. [Czym są hooki?](#czym-są-hooki)
6. [Jak działa backend?](#jak-działa-backend)
7. [Instalacja](#instalacja)
8. [Wdrożenie](#wdrożenie)
9. [Roadmap](#roadmap)
10. [Inspiracje](#inspiracje)
11. [Licencja](#licencja)

## Opis

HabitTracker to aplikacja wspierająca zarządzanie nawykami i planami ćwiczeń, z docelowym wdrożeniem na Raspberry Pi z 7-calowym ekranem dotykowym. Obecnie oferuje logowanie, rejestrację i podstawowy ekran główny, z planem dodania kalendarza, interakcji z czujnikiem ruchu i synchronizacji danych z VPS. Projekt łączy minimalistyczny design inspirowany Google Nest Hub i Apple Watch z funkcjonalnością śledzenia nawyków.

## Funkcjonalności

- **Logowanie i rejestracja**: Użytkownicy mogą tworzyć konta i logować się, z uwierzytelnianiem opartym na tokenach JWT.
- **Ekran główny**: Spersonalizowany widok dla zalogowanego użytkownika z placeholderem dla kalendarza i opcją wylogowania.
- **Wylogowanie z odświeżeniem**: Resetuje aplikację po wylogowaniu.
- **Placeholder dla kalendarza**: Przygotowany komponent `Home` z opcją warunkowego renderowania dodatkowego widoku (`Aaa`).

## Technologie

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Baza danych**: MySQL
- **Autentykacja**: JWT (JSON Web Tokens) w `localStorage`
- **Sprzęt (planowany)**: Raspberry Pi 4, 7" ekran dotykowy, czujnik ruchu PIR, głośnik, LED
- **Narzędzia**: ESLint, Vite

## Struktura projektu

Poniżej znajduje się drzewko katalogów projektu, pokazujące obecne pliki i sugerujące, gdzie umieszczać nowe komponenty w przyszłości. Drzewko jest zoptymalizowane dla czytelności, z wytycznymi dla nowych plików.

```
smarthabit/
├── src/
│   ├── components/              # Komponenty UI (formularze, widżety)
│   │   ├── LoginForm.jsx       # Formularz logowania
│   │   └── RegisterForm.jsx    # Formularz rejestracji
│   │   # Nowe: np. Calendar.jsx, HabitCard.jsx
│   ├── hooks/                  # Niestandardowe hooki React
│   │   ├── useAuth.jsx         # Logika uwierzytelniania
│   │   ├── useLogin.jsx        # Logika logowania
│   │   └── useRegister.jsx     # Logika rejestracji
│   │   # Nowe: np. useHabits.jsx, useCalendar.jsx
│   ├── pages/                  # Główne widoki aplikacji
│   │   ├── Aaa.jsx             # Placeholder (do zdefiniowania/usunięcia)
│   │   └── Home.jsx            # Ekran główny
│   │   # Nowe: np. Dashboard.jsx, Settings.jsx
│   ├── assets/                 # Statyczne zasoby (obrazy, ikony)
│   │   # Nowe: np. habit-icons/, backgrounds/
│   └── App.jsx                 # Główny komponent aplikacji
└── server/                     # Backend (Node.js/Express)
    # Nowe: np. routes/habits.js, models/Habit.js
```

**Wytyczne dla nowych plików**:
- **Komponenty UI**: Dodawaj do `components/` (np. `Calendar.jsx` dla kalendarza, `HabitCard.jsx` dla wyświetlania nawyków).
- **Hooki**: Umieszczaj w `hooks/` (np. `useHabits.jsx` do pobierania danych nawyków, `useCalendar.jsx` do zarządzania kalendarzem).
- **Strony**: Twórz w `pages/` (np. `Dashboard.jsx` dla statystyk, `Settings.jsx` dla ustawień użytkownika).
- **Zasoby**: Przechowuj w `assets/` (np. ikony w `assets/habit-icons/`, tła w `assets/backgrounds/`).
- **Backend**: Dodawaj trasy w `server/routes/` (np. `habits.js` dla nawyków) i modele w `server/models/` (np. `Habit.js`).

### Diagram struktury (Mermaid)
Poniższy diagram w formacie Mermaid (obsługiwanym przez GitHub) wizualizuje strukturę projektu, grupując pliki według ich roli i pokazując wszystkie istniejące pliki `.jsx`. Jest czytelniejszy dzięki podziałowi na kategorie i strzałkom wskazującym zależności.

```mermaid
graph TD
    A[smarthabit/] --> B[src/]
    A --> H[server/]
    B --> C[components/]
    B --> D[hooks/]
    B --> E[pages/]
    B --> F[assets/]
    B --> G[App.jsx]
    
    subgraph Komponenty UI
        C --> C1[LoginForm.jsx]
        C --> C2[RegisterForm.jsx]
        C --> C3[...np. Calendar.jsx]
    end
    
    subgraph Hooki
        D --> D1[useAuth.jsx]
        D --> D2[useLogin.jsx]
        D --> D3[useRegister.jsx]
        D --> D4[...np. useHabits.jsx]
    end
    
    subgraph Strony
        E --> E1[Home.jsx]
        E --> E2[Aaa.jsx]
        E --> E3[...np. Dashboard.jsx]
    end
    
    subgraph Zasoby
        F --> F1[...np. habit-icons/]
    end
    
    subgraph Backend
        H --> H1[...np. routes/habits.js]
        H --> H2[...np. models/Habit.js]
    end
    
    G -->|Używa| C
    G -->|Używa| D
    G -->|Używa| E
    C1 -->|Używa| D2
    C2 -->|Używa| D3
    E1 -->|Używa| D1
```

## Czym są hooki?

Hooki w React to specjalne funkcje, które pozwalają zarządzać stanem i logiką w komponentach funkcyjnych, bez potrzeby używania klas. W projekcie HabitTracker hooki separują logikę od interfejsu, czyniąc kod bardziej czytelnym i reusable. Przykłady:
- **`useAuth.jsx`**: Zarządza stanem uwierzytelniania (logowanie, wylogowanie, weryfikacja tokenu).
- **`useLogin.jsx`**: Obsługuje proces logowania, wysyłając dane do backendu i zapisując token.
- **`useRegister.jsx`**: Odpowiada za rejestrację nowego użytkownika.

**Jak używać?** Twórz nowe hooki w `hooks/` dla specyficznych zadań, np. `useHabits.jsx` do pobierania listy nawyków z backendu.

## Jak działa backend?

Backend HabitTracker działa na Node.js z frameworkiem Express i komunikuje się z bazą danych MySQL. Obsługuje trzy główne endpointy:
- **`/login`**: Przyjmuje nazwę użytkownika i hasło (POST), weryfikuje je w MySQL (hasło hashowane z `bcryptjs`), generuje token JWT i zwraca go z nazwą użytkownika.
- **`/register`**: Tworzy nowego użytkownika w MySQL (POST), haszując hasło i zapisując dane.
- **`/verify-token`**: Sprawdza ważność tokenu JWT z nagłówka `Authorization`, zwracając dane użytkownika, jeśli token jest poprawny.

**Przepływ**:
1. Frontend wysyła żądanie (np. `fetch` do `/login`).
2. Express przetwarza żądanie, komunikuje się z MySQL (np. sprawdza użytkownika).
3. Backend zwraca odpowiedź (np. token lub błąd).
4. Token jest zapisywany w `localStorage` i używany w kolejnych żądaniach.

**Rozwój**: Dodaj nowe endpointy w `server/routes/` (np. `/habits` dla nawyków) i modele w `server/models/` (np. `Habit.js` dla struktury danych nawyków).

## Instalacja

### Lokalnie
1. **Backend**:
   - Przejdź do `server/`.
   - Zainstaluj: `npm install`.
   - Skonfiguruj `.env` z danymi MySQL.
   - Uruchom: `npm start`.
2. **Frontend**:
   - Przejdź do `smarthabit/`.
   - Zainstaluj: `npm install`.
   - Uruchom: `npm run dev`.
3. Upewnij się, że MySQL działa i zawiera tabelę użytkowników.

### Wymagania
- Node.js (v16+)
- MySQL
- VPS z Nginx (dla produkcji)

## Wdrożenie

- **VPS**: Aplikacja działa na serwerze VPS.
- **Frontend**: Zbudowany (`npm run build`), serwowany przez Nginx.
- **Backend**: Uruchomiony w `server/` (np. z `pm2`).
- **MySQL**: Baza skonfigurowana na VPS z bezpiecznym dostępem.
- **Uwagi**: Zaktualizuj adres API w frontendzie (`http://localhost:3001` → adres VPS). Otwórz odpowiednie porty (np. 3001).

## Roadmap

### Etap 1: Kalendarz + Konto (częściowo zrealizowane)
- [x] Logowanie i rejestracja z JWT.
- [x] Ekran główny (`Home`) z placeholderem.
- [ ] Kalendarz miesięczny (np. z `react-calendar`) z opcją przypisywania nawyków/ćwiczeń.
- [ ] Backend do zarządzania nawykami (endpoint `/habits`).
- [ ] Synchronizacja danych z MySQL.

### Etap 2: Interakcja + Ćwiczenia
- [ ] Czujnik ruchu PIR: Wybudzanie ekranu na Raspberry Pi.
- [ ] Komponent `Aaa`: Zdefiniuj rolę (np. lista ćwiczeń) lub usuń.
- [ ] Plany ćwiczeń: Tworzenie i przypisywanie do dni.
- [ ] Notatki: Dodawanie notatek do dni/ćwiczeń.
- [ ] Zdalny dostęp: Web panel na telefon/przeglądarkę.

### Etap 3: UI/UX + Rozszerzenia
- [ ] Responsywność: Pełna adaptacja do ekranów dotykowych i urządzeń mobilnych.
- [ ] Design: Minimalistyczny styl (Google Nest/Apple Watch), tryb ciemny, animacje.
- [ ] Głos: Przypomnienia TTS, sterowanie głosowe (mikrofon).
- [ ] LED: Sygnalizacja nawyków (np. WS2812B).
- [ ] Statystyki: Wskaźniki motywacyjne (streaks, postępy).
- [ ] Muzyka: Integracja z odtwarzaczem i synchronizacja LED.

### Poprawki
- [ ] Popraw przycisk "LOGNIJ" na "Wyloguj" w `Home`.
- [ ] Zabezpiecz tokeny (np. `HttpOnly` ciasteczka zamiast `localStorage`).
- [ ] Dodaj spinner dla stanu `loading` w `useAuth`.
- [ ] Testy jednostkowe dla hooków i API.

## Inspiracje

- **UI/UX**: Google Nest Hub, Apple Watch, Google Fit, Notion.
- **Styl**: Minimalistyczny, czysty, z dużymi przyciskami dotykowymi i animacjami.
- **Funkcjonalność**: Zen UI, personalizacja tła, powiadomienia głosowe, tryb galerii.

## Licencja

MIT License (szczegóły w pliku `LICENSE`).