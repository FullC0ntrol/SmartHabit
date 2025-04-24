// src/components/MyCalendar.jsx
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useState } from 'react';

const locales = {
  'pl': pl,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Zadanie testowe',
      start: new Date(),
      end: new Date(),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Tytuł zadania:');
    if (title)
      setEvents([...events, { start, end, title }]);
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
        messages={{
          next: 'Następny',
          previous: 'Poprzedni',
          today: 'Dziś',
          month: 'Miesiąc',
          week: 'Tydzień',
          day: 'Dzień',
        }}
      />
    </div>
  );
};

export default MyCalendar;
