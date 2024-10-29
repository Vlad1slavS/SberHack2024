import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarCard from "../sidebar_func_card";
import { Calendar } from "primereact/calendar";


export default function Home() {
  const [date, setDate] = useState(null);

  const arr = [1];

  return (
    <div className="container mx-auto">
      <div className="header flex justify-between items-center">
        <div className="bg-gray-200 p-4 rounded-xl shadow-lg">
          <Calendar
            className=""
            value={date}
            onChange={(e) => setDate(e.value)}
            inline
            showWeek
          />
        </div>

        <div className="flex"></div>
      </div>
    </div>
  );
}
