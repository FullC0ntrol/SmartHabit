import React from "react";
import { format, isSameDay } from "date-fns";
import { pl } from "date-fns/locale";

const EventList = ({ events, selectedDay, onEdit, onDelete }) => {
  const filteredEvents = events.filter((event) =>
    selectedDay
      ? isSameDay(new Date(event.date), selectedDay)
      : true
  );

  return (
    <div className="max-h-[500px] overflow-y-auto pr-2">
      <h3 className="text-xl font-bold text-blue-300 mb-4">
        {selectedDay
          ? `Wydarzenia dnia ${format(selectedDay, "d LLLL yyyy", { locale: pl })}`
          : "Wszystkie wydarzenia"}
      </h3>

      {filteredEvents.length === 0 ? (
        <p className="text-gray-400 italic">Brak wydarzeń</p>
      ) : (
        filteredEvents.map((event) => (
          <div
            key={event.id}
            className="group bg-gray-800 hover:bg-gray-700 rounded-xl p-4 mb-4 transition-all duration-300 border-l-4 border-blue-500 shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  {event.time && (
                    <span className="text-lg font-bold text-blue-300">
                      {event.time}
                    </span>
                  )}
                  <h4 className="text-lg font-semibold">{event.title}</h4>
                </div>
                {event.description && (
                  <p className="mt-2 text-sm text-gray-300">
                    {event.description}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-400">
                  {format(new Date(event.date), "d LLLL yyyy", { locale: pl })}
                </p>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(event)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all"
                  title="Edytuj"
                >
                  ✎
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all"
                  title="Usuń"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;