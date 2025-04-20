# HabitTracker - Aplikacja do Śledzenia Nawyków i Ćwiczeń

**HabitTracker** to aplikacja internetowa umożliwiająca zarządzanie nawykami i planami ćwiczeń. Dzięki kalendarzowi, użytkownicy mogą śledzić swoje postępy, dodawać ćwiczenia do planów, oraz przypisywać je do określonych dni. Aplikacja jest stworzona w technologii React, z backendem opartym na Node.js i z użyciem Tailwind CSS dla responsywnego designu.

---

## Spis Treści

1. [Opis](#opis)
2. [Funkcjonalności](#funkcjonalności)
3. [Technologie](#technologie)
4. [Instalacja](#instalacja)
5. [Użycie](#użycie)
6. [Roadmap](#roadmap)
7. [Licencja](#licencja)

---

## Opis

HabitTracker to aplikacja stworzona w celu pomagania użytkownikom w tworzeniu i śledzeniu nawyków oraz planów ćwiczeń. Dzięki integracji z prostym kalendarzem i możliwości przypisywania ćwiczeń do dni, użytkownicy mogą łatwo monitorować swoje postępy.

---

## TO-DO 

### Etap 1: Kalendarz + Konto
- **Kalendarz**: Przeglądanie miesięcznego kalendarza, z możliwością kliknięcia na dzień i przypisania ćwiczenia/nawyku.
- **Logowanie**: Możliwość tworzenia konta i logowania się do aplikacji.
- **Zarządzanie datami**: Przypisywanie nawyków i ćwiczeń do konkretnych dni w kalendarzu.
- **Synchronizacja**: Przechowywanie danych na serwerze.

### Etap 2: Ćwiczenia + Plany Ćwiczeń
- **Spis ćwiczeń**: Możliwość przeglądania i dodawania ćwiczeń.
- **Plany ćwiczeń**: Tworzenie planów ćwiczeń i przypisywanie ich do dni w kalendarzu.
- **Notatki**: Możliwość dodawania notatek do ćwiczeń i dni w kalendarzu.

### Etap 3: UI/UX
- **Responsywność**: Aplikacja w pełni responsywna, dostosowana do różnych rozdzielczości ekranów.
- **Tailwind CSS**: Użycie Tailwind do stylizacji aplikacji, zapewniające szybkie i elastyczne projektowanie.
- **Minimalistyczny design**: Prosty i przejrzysty interfejs inspirowany nowoczesnymi aplikacjami.

---

## Technologie

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Baza Danych**: MongoDB (lub inna baza danych, np. PostgreSQL)
- **Autentykacja**: JWT (JSON Web Tokens) do logowania i zarządzania sesjami
- **API**: RESTful API do komunikacji między frontendem a backendem

---

## Instalacja

### 1. **Klonowanie repozytorium**

Klonuj repozytorium do swojego lokalnego środowiska:

```bash
git clone https://github.com/yourusername/HabitTracker.git
cd HabitTracker
