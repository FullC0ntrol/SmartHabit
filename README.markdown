# HabitTracker - Inteligentny Śledzik Nawyków

**HabitTracker** to aplikacja webowa do śledzenia nawyków i ćwiczeń, z planem rozwoju w estetyczne urządzenie ścienne oparte na Raspberry Pi z ekranem dotykowym. Umożliwia użytkownikom rejestrację, logowanie i przeglądanie spersonalizowanego ekranu głównego z placeholderem dla kalendarza. Aplikacja jest hostowana na VPS z bazą danych MySQL, z frontendem w React i backendem w Node.js/Express.

## Spis Treści

1. [Opis](#opis)
2. [Funkcjonalności](#funkcjonalności)
3. [Technologie](#technologie)
4. [Struktura projektu](#struktura-projektu)
5. [Instalacja](#instalacja)
6. [Wdrożenie](#wdrożenie)
7. [Roadmap](#roadmap)
8. [Inspiracje](#inspiracje)
9. [Licencja](#licencja)

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

Poniżej znajduje się drzewko katalogów projektu, pokazujące, gdzie umieszczać nowe pliki i tworzyć komponenty. Kluczowe foldery i pliki są oznaczone, z wytycznymi dla przyszłych dodatków.

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
│   │   ├── Home.jsx            # Ekran główny
│   │   └── Aaa.jsx             # Placeholder (do zdefiniowania/usunięcia)
│   │   # Nowe: np. Dashboard.jsx, Settings.jsx
│   ├── assets/                 # Statyczne zasoby (obrazy, ikony)
│   │   # Nowe: np. habit-icons/, backgrounds/
│   └── App.jsx                 # Główny komponent aplikacji
└── server/                     # Backend (Node.js/Express)
    # Nowe: np. routes/habits.js, models/Habit.js
```

**Wytyczne dla nowych plików**:
- **Komponenty UI**: Dodawaj do `components/` (np. `Calendar.jsx` dla kalendarza, `HabitCard.jsx` dla nawyków).
- **Hooki**: Umieszczaj w `hooks/` (np. `useHabits.jsx` do pobierania nawyków, `useCalendar.jsx` do zarządzania kalendarzem).
- **Strony**: Twórz w `pages/` (np. `Dashboard.jsx` dla widoku statystyk, `Settings.jsx` dla ustawień).
- **Zasoby**: Przechowuj w `assets/` (np. ikony nawyków w `assets/habit-icons/`).
- **Backend**: Dodawaj nowe trasy w `server/routes/` (np. `habits.js`) i modele w `server/models/` (np. `Habit.js`).

### Diagram struktury (Mermaid)
Jeśli używasz GitHub, możesz wkleić poniższy kod Mermaid, aby wygenerować diagram flowchart:

```mermaid
graph TD
    A[smarthabit/] --> B[src/]
    B --> C[components/]
    B --> D[hooks/]
    B --> E[pages/]
    B --> F[assets/]
    B --> G[App.jsx]
    A --> H[server/]
    C --> C1[LoginForm.jsx]
    C --> C2[RegisterForm.jsx]
    C --> C3[...nowe, np. Calendar.jsx]
    D --> D1[useAuth.jsx]
    D --> D2[useLogin.jsx]
    D --> D3[useRegister.jsx]
    D --> D4[...nowe, np. useHabits.jsx]
    E --> E1[Home.jsx]
    E --> E2[Aaa.jsx]
    E --> E3[...nowe, np. Dashboard.jsx]
    F --> F1[...nowe, np. habit-icons/]
    H --> H1[...nowe, np. routes/habits.js]
```

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