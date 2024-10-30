import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

// Функция для вычисления дат текущей недели
const getWeekDates = () => {
  const currentDate = new Date();
  // Найдите понедельник этой недели
  const firstDayOfTheWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
  );
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfTheWeek);
    date.setDate(firstDayOfTheWeek.getDate() + i);
    weekDates.push(
      date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit"})
    );
  }

  return weekDates;
};

const initialColumns = {
  ПН: [],
  ВТ: [],
  СР: [],
  ЧТ: [],
  ПТ: [],
  СБ: [],
  ВС: [],
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [showInput, setShowInput] = useState({});

  const weekDates = getWeekDates();

  useEffect(() => {
    const savedTasks = localStorage.getItem("taskBoard");
    if (savedTasks) {
      setColumns(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskBoard", JSON.stringify(columns));
  }, [columns]);

  const handleAddTask = (day) => {
    if (!newTask.trim()) return;

    const newTaskObject = {
      id: `task-${Date.now()}`, // уникальный ID
      content: newTask,
    };

    setColumns((prev) => ({
      ...prev,
      [day]: [...prev[day], newTaskObject],
    }));

    setNewTask("");
    setShowInput((prev) => ({ ...prev, [day]: false }));
  };

  const handleDeleteTask = (day, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [day]: prev[day].filter((task) => task.id !== taskId),
    }));
  };

  const toggleInputVisibility = (day) => {
    setShowInput((prev) => ({ ...prev, [day]: !prev[day] }));
    setNewTask("");
    setCurrentDay(day);
  };

  const clearAllFields = () => {
    setColumns(initialColumns);
  };

  return (
    <div className="">
      <div className="flex justify-center mt-8">
        <button
          onClick={clearAllFields}
          className="bg-red-500 text-white rounded px-4 py-2 mb-3"
        >
          Очистить все поля
        </button>
      </div>
      <div className="flex justify-between h-full w-full overflow-x-auto text-center">
        {Object.entries(columns).map(([day, tasks], index) => (
          <div
            key={day}
            className="bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col flex-grow"
            style={{ flexBasis: "0" }}
          >
            <h2 className="text-lg font-semibold mb-2">
              {day} - {weekDates[index]}
            </h2>

            <button
              onClick={() => toggleInputVisibility(day)}
              className="bg-blue-500 text-white rounded p-2 mb-2"
            >
              +
            </button>

            {showInput[day] && (
              <div className="mt-2">
                <input
                  type="text"
                  value={currentDay === day ? newTask : ""}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Введите задание..."
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none"
                />
                <button
                  onClick={() => handleAddTask(day)}
                  className="bg-green-500 text-white rounded p-2 mt-2 w-full"
                >
                  Добавить
                </button>
              </div>
            )}

            <div className="flex-grow mt-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-100 p-2 mb-2 rounded cursor-pointer flex text-center justify-center items-center"
                >
                  {task.content}
                  <button
                    onClick={() => handleDeleteTask(day, task.id)}
                    className="ml-2"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
