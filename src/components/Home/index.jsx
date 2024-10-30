import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

export default function Home() {
  const [date, setDate] = useState(null);
  const Home_cards = [
    "Выбор студенческого актива",
    "Интересные места",
    "Подпишись на чат бота в Telegram",
  ];

  return (
    <div className="container mx-auto mt-10">
      <div className="header flex justify-between mt-20">
        <div>
          <div className="flex flex-wrap w-[800px] mr-10">
            <a
              className="home_card hover-effect bg-gradient-to-r w-[250px] from-[#d999eb] to-[#66d9b3] text-black font-bold pt-2 px-4 rounded-xl"
              href="#"
            >
              <p className="text-md">Выбор студенческого объединения</p>
              <img
                className="h-32 float-right inline-block"
                src="public/studentactive.png"
                alt=""
              />
            </a>
            <a
              className="home_card hover-effect bg-gradient-to-r mr-4 w-[250px] from-[#fb86cb] to-[#ff8573] text-black font-bold pt-2 px-4 rounded-xl"
              href="#"
            >
              <p className="mb-4">Интересные места</p>
              <img
                className="h-36 float-right"
                src="public/interestingPlaces.png"
                alt=""
              />
            </a>
            <a
              className="home_card hover-effect bg-gradient-to-r w-[250px] mr-4 from-[#60efff] to-[#0061ff] text-black font-bold pt-2 px-4 rounded-xl"
              href="#"
            >
              <p>Подпишись на чат бота в Telegram</p>
              <img
                className="h-[136px] float-right"
                src="public/tghand.png"
                alt=""
              />
            </a>
            <a
              className="home_card hover-effect bg-gradient-to-r w-[250px] from-[#b6fbff] to-[#83a4d4] text-black font-bold  rounded-xl"
              href="#"
            >
              <p className="p-4 text-black">Заказать справку в пару кликов</p>
            </a>
            <a
              className="home_card hover-effect bg-gradient-to-r w-[250px] from-[#aaffa9] to-[#11ffbd] text-black font-bold  rounded-xl"
              href="#"
            >
              <p className="pt-6 text-center text-black text-md">
                Помощь с жильем
              </p>
            </a>
          </div>
          <div className="mt-16 w-[800px]">
            <p className="font-bold text-xl">Новости</p>
            <div className="border-2 rounded-lg p-4">-</div>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 p-4 rounded-xl shadow-lg">
            <Calendar
              className=""
              value={date}
              onChange={(e) => setDate(e.value)}
              inline
              showWeek
            />
          </div>
        </div>
      </div>
    </div>
  );
}
