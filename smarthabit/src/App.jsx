import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);

        fetch("http://localhost:3001/api/save-date", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: 1, // przykładowy user
                date: newDate.toISOString().slice(0, 10),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) console.log("Data zapisana!");
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Wybierz datę</h1>
            <Calendar onChange={handleDateChange} value={date} />
            </div>
    );
}

export default App;
