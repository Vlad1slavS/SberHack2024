import React from "react";
import { CiMap } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { LiaTasksSolid } from "react-icons/lia";
import { AiOutlineQuestion } from "react-icons/ai";
import { BsCalendar4Event } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../hooks/AuthContext";
import { CgProfile } from "react-icons/cg";

export default function Sidebar() {
  const navigate = useNavigate(); // Импортируем useNavigate

  const { isAuthenticated } = useAuth(); // Получаем статус аутентификации

  const handleLogin = () => {
    // Перенаправляем на /auth при нажатии кнопки
    navigate("/auth");
  };

  const handleMap = () => {
    navigate("/map");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleTasks = () => {
    navigate("/tasks");
  };

  const handlefaq = () => {
    navigate("/faq");
  };

  return (
    <div className="">
      <div className="sidebar bg-white shadow-lg p-2 rounded-b-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-xl mr-2"
              src="public/unnamed.jpg"
              alt="ЗабГу"
            />
            <p className="text-black font-bold">ЗабГУ</p>
            <span className="text-black mx-2">x</span>
            <p className="text-black font-bold">СБЕР</p>
            <img
              className="h-12 w-12 rounded-xl ml-2 shadow-xl"
              src="public/SBERlogo.png"
              alt="Сбер"
            />
          </div>
          <div className="flex p-1 items-center bg-gray-700 backdrop-blur-10 shadow-lg rounded-xl">
            <a
              onClick={handleHome}
              className="flex items-center hover-effect mr-4"
              href=""
              title="Карта"
            >
              <IoHome className="text-white shadow-lg h-12 w-12 mr-3 p-2 rounded-xl" />
            </a>
            <a
              onClick={handleMap}
              className="flex items-center hover-effect mr-4"
              href=""
              title="Карта"
            >
              <CiMap className="text-white shadow-lg h-12 w-12 mr-3 p-2 rounded-xl" />
            </a>
            <a
              onClick={handleTasks}
              className="flex items-center hover-effect mr-4"
              href=""
              title="Календарь"
            >
              <LiaTasksSolid className="text-white shadow-lg h-12 w-12 mr-3 p-2 rounded-xl" />
            </a>
            <a
              className="flex items-center hover-effect mr-4"
              href=""
              title="GigaChat"
            >
              <img
                className="h-12 w-12 shadow-lg mr-3 p-1 rounded-xl"
                src="public/GigaChatLogo.png"
                alt="GigaChat"
              />
            </a>
            <a
              onClick={handlefaq}
              className="flex items-center hover-effect mr-4"
              href=""
              title="Вопросы"
            >
              <AiOutlineQuestion className="text-white shadow-lg h-12 w-12 p-2 rounded-xl" />
            </a>
            <a
              className="flex items-center hover-effect ml-4"
              href=""
              title="Мероприятия"
            >
              <BsCalendar4Event className="text-white shadow-lg h-11 w-11 p-2 rounded-xl" />
            </a>
          </div>
          <div className="flex items-center">
            <a href="">
              <IoMdNotificationsOutline className="text-white shadow-lg h-12 w-12 p-2 rounded-full bg-gray-700 mr-6 " />
            </a>
            {!isAuthenticated ? (
              <button
                className="bg-lime-400 px-4 py-2 rounded-2xl mr-4 font-bold hover:bg-lime-300 transition-all 0.4s"
                onClick={handleLogin} // Вызываем handleLogin при нажатии
              >
                Войти
              </button>
            ) : (
              <a>
                <CgProfile size={50}/>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
