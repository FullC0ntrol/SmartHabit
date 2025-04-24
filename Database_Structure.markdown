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