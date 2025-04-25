import React, { useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  getDaysInMonth,
  getDay,
} from "date-fns";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import EventForm from "../components/calendar/EventForm";
import EventList from "../components/calendar/EventList";
import useEvents from "../hooks/useEvents";
import useAuth from "../hooks/useAuth";

const CalendarPage = () => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const today = new Date();
  const { events, loading, error, addEvent, updateEvent, deleteEvent } = useEvents(
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthDays = getDaysInMonth(currentDate);
  const firstDay = getDay(monthStart);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setSelectedDay(null);
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDay(selectedDate);
    setEditingEvent(null);
  };

  const handleAddEvent = async () => {
    if (!selectedDay || !newEventTitle) return;
    const newEvent = {
      date: selectedDay,
      time: newEventTime,
      title: newEventTitle,
      description: newEventDescription,
    };
    try {
      await addEvent(newEvent);
      setNewEventTitle("");
      setNewEventTime("");
      setNewEventDescription("");
      setSelectedDay(null);
    } catch (err) {
      alert("Błąd dodawania wydarzenia: " + err.message);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEventTitle(event.title);
    setNewEventTime(event.time || "");
    setNewEventDescription(event.description || "");
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent || !newEventTitle) return;
    const updatedEvent = {
      date: selectedDay,
      time: newEventTime,
      title: newEventTitle,
      description: newEventDescription,
    };
    try {
      await updateEvent(editingEvent.id, updatedEvent);
      setEditingEvent(null);
      setNewEventTitle("");
      setNewEventTime("");
      setNewEventDescription("");
      setSelectedDay(null);
    } catch (err) {
      alert("Błąd aktualizacji wydarzenia: " + err.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) {
      try {
        await deleteEvent(eventId);
      } catch (err) {
        alert("Błąd usuwania wydarzenia: " + err.message);
      }
    }
  };

  const handleCloseForm = () => {
    setSelectedDay(null);
    setEditingEvent(null);
    setNewEventTitle("");
    setNewEventTime("");
    setNewEventDescription("");
  };

  if (authLoading) {
    return <p className="text-white text-center text-lg">Ładowanie autoryzacji...</p>;
  }

  if (!isLoggedIn) {
    return <p className="text-white text-center text-lg">Proszę się zalogować, aby zobaczyć kalendarz.</p>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-4xl font-bold mb-6 text-center tracking-tight">KALENDARZ</h1>
      {loading && <p className="text-center text-gray-300">Ładowanie wydarzeń...</p>}
      {error && <p className="text-red-400 text-center">Błąd: {error}</p>}
      <div className="flex gap-8">
        <div className="w-1/2 bg-gray-800 rounded-xl p-6 shadow-inner">
          <CalendarHeader
            currentDate={currentDate}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
          />
          {selectedDay ? (
            <EventForm
              selectedDay={selectedDay}
              editingEvent={editingEvent}
              newEventTitle={newEventTitle}
              newEventTime={newEventTime}
              newEventDescription={newEventDescription}
              setNewEventTitle={setNewEventTitle}
              setNewEventTime={setNewEventTime}
              setNewEventDescription={setNewEventDescription}
              onSave={editingEvent ? handleUpdateEvent : handleAddEvent}
              onCancel={handleCloseForm}
              onClose={handleCloseForm}
            />
          ) : (
            <CalendarGrid
              currentDate={currentDate}
              today={today}
              events={events}
              selectedDay={selectedDay}
              firstDay={firstDay}
              monthDays={monthDays}
              onDayClick={handleDayClick}
            />
          )}
        </div>
        <div className="w-1/2 pl-6 flex flex-col gap-6">
          <EventList
            events={events}
            selectedDay={selectedDay}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;