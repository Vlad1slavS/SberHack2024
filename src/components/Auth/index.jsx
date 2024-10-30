import React, { useState } from "react";
import { useAuth } from "../../components/hooks/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate(); // Импортируем useNavigate

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику авторизации, например, отправку данных на сервер
    console.log("Авторизация", { login, password });
    setIsAuthenticated(true);
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="text-center bg-white shadow-lg rounded-lg p-6"
      >
        <h1 className="text-xl font-bold mb-4">Авторизация</h1>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={handleLoginChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        ></input>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-md p-2 w-full"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
