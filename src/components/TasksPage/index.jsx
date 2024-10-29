import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

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
  const [showInput, setShowInput] = useState({}); // состояние для видимости поля ввода

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
    setShowInput((prev) => ({ ...prev, [day]: false })); // скрываем поле ввода
  };

  const handleDeleteTask = (day, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [day]: prev[day].filter((task) => task.id !== taskId),
    }));
  };

  const toggleInputVisibility = (day) => {
    setShowInput((prev) => ({ ...prev, [day]: !prev[day] })); // переключаем видимость поля
    setNewTask(""); // очищаем текст задачи при открытии
    setCurrentDay(day); // устанавливаем текущий день
  };

  const clearAllFields = () => {
    setColumns(initialColumns);
  };

  return (
    <>
      <div className="flex justify-end  mt-8">
        <button
          onClick={clearAllFields}
          className="bg-red-500 text-white rounded px-4 py-2"
        >
          Очистить все поля
        </button>
      </div>
      <div className="flex p-4 h-full w-full overflow-x-auto">
        {" "}
        {/* Обеспечиваем использование всей ширины и добавляем прокрутку */}
        {Object.entries(columns).map(([day, tasks]) => (
          <div
            key={day}
            className="bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col flex-grow" // используем flex-grow для равного распределения
            style={{ flexBasis: "0" }} // Убираем ограничение по ширине на колонке
          >
            <h2 className="text-lg font-semibold mb-2">{day}</h2>

            <button
              onClick={() => toggleInputVisibility(day)} // открываем/закрываем поле ввода
              className="bg-blue-500 text-white rounded p-2 mb-2"
            >
              +
            </button>

            {showInput[day] && ( // условно отображаем поле ввода
              <div className="mt-2">
                <input
                  type="text"
                  value={currentDay === day ? newTask : ""}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Введите задание..."
                  className="border border-gray-300 rounded p-2 w-full"
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
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskBoard;
