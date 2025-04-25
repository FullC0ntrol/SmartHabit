import React, { useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    getDaysInMonth,
    getDay,
} from "date-fns";
import { pl } from "date-fns/locale";

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date(2024, 4, 15); // Fixed to May 15, 2024, to match the screenshot

    const days = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];

    const monthStart = startOfMonth(currentDate);
    const monthDays = getDaysInMonth(currentDate);
    const firstDay = getDay(monthStart); // 0 (Nd) - 6 (Sb)

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    // Sample events data to match the screenshot
    const events = [
        {
            date: new Date(2024, 4, 17),
            time: "10:00",
            title: "Create React App",
        },
        {
            date: new Date(2024, 4, 20),
            time: "07:00",
            title: "Listen to Music",
        },
        { date: new Date(2024, 4, 24), time: "00:00", title: "Sleep" },
        { date: new Date(2024, 4, 29), time: "11:00", title: "Work Out" },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg p-6">
            {/* Nagłówek */}
            <h1 className="text-3xl font-bold mb-4">KALENDARZ</h1>
            <div className="flex">
                {/* Kalendarz */}
                <div className="w-1/2">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handlePrevMonth}
                            className="text-gray-400 hover:text-white px-2 py-1"
                        >
                            &lt;
                        </button>
                        <h2 className="text-xl font-semibold">
                            {format(currentDate, "LLLL yyyy", {
                                locale: pl,
                            }).toUpperCase()}
                        </h2>
                        <button
                            onClick={handleNextMonth}
                            className="text-gray-400 hover:text-white px-2 py-1"
                        >
                            &gt;
                        </button>
                    </div>

                    {/* Nazwy dni tygodnia */}
                    <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-400 mb-2">
                        {days.map((day, idx) => (
                            <div key={idx}>{day}</div>
                        ))}
                    </div>

                    {/* Dni miesiąca */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {[...Array(firstDay).fill(null)].map((_, i) => (
                            <div key={`empty-${i}`} className="h-10" />
                        ))}

                        {[...Array(monthDays)].map((_, i) => {
                            const day = i + 1;
                            const isToday =
                                day === today.getDate() &&
                                currentDate.getMonth() === today.getMonth() &&
                                currentDate.getFullYear() ===
                                    today.getFullYear();
                            const hasEvent = events.some(
                                (event) =>
                                    event.date.getDate() === day &&
                                    event.date.getMonth() ===
                                        currentDate.getMonth() &&
                                    event.date.getFullYear() ===
                                        currentDate.getFullYear()
                            );

                            return (
                                <div
                                    key={`day-${i}`}
                                    className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer ${
                                        isToday
                                            ? "bg-orange-500 text-white"
                                            : hasEvent
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-blue-700"
                                    }`}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Wydarzenia */}
                <div className="w-1/2 pl-6">
                    {events.map((event, idx) => (
                        <div
                            key={idx}
                            className="bg-blue-600 rounded-lg p-3 mb-3 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm">
                                    {format(event.date, "d LLLL yyyy", {
                                        locale: pl,
                                    })}
                                </p>
                                <p className="text-lg font-semibold">
                                    {event.time}
                                </p>
                                <p>{event.title}</p>
                            </div>
                            <button className="text-gray-300 hover:text-white">
                                ✎
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
