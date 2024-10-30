import React, { useEffect, useState } from "react";
import { load } from "@2gis/mapgl";
import { InputText } from "primereact/inputtext";

const faculties = [
  { id: 1, name: "Энергетический (ЭФ)", coord: [113.53189, 52.03427] },
  { id: 2, name: "Строительный", coord: [113.52945, 52.03221] },
  { id: 3, name: "Права и бизнеса", coord: [113.52501, 52.0319] },
  { id: 4, name: "Экономический", coord: [113.52811, 52.03531] },
  { id: 5, name: "Горный", coord: [113.49012, 52.03305] },
  { id: 6, name: "Социологический", coord: [113.49967, 52.03925] },
  { id: 7, name: "Историко-Филологический", coord: [113.5018, 52.03761] },
  { id: 8, name: "Лицей ЗабГУ", coord: [113.49117, 52.03344] },
  { id: 9, name: "Культуры и искусств", coord: [113.50207, 52.03836] },
  { id: 10, name: "ФОК", coord: [113.52835, 52.03426] },
];

export default function MapPage() {
  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputValue, setToInputValue] = useState("");
  const [fromFilteredFaculties, setFromFilteredFaculties] = useState([]);
  const [toFilteredFaculties, setToFilteredFaculties] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([113.5, 52]); // default coordinates

  useEffect(() => {
    // Получаем текущее местоположение пользователя
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([longitude, latitude]);
        },
        (error) => {
          console.error("Ошибка при получении местоположения:", error);
        }
      );
    } else {
      console.warn("Геолокация не поддерживается вашим браузером");
    }
  }, []);

  useEffect(() => {
    let map;
    let markers = [];

    load().then((mapglAPI) => {
      map = new mapglAPI.Map("foo", {
        center: currentLocation,
        zoom: 15,
        key: "9f817a89-0b26-4d25-8b60-49bee22dee98",
      });

      markers = faculties.map((faculty) => 
        new mapglAPI.Marker(map, {
          coordinates: faculty.coord,
        })
      );
    });

    return () => {
      if (map) {
        map.destroy();
      }
      markers.forEach((marker) => marker.destroy());
    };
  }, [currentLocation]);  // добавлена зависимость от currentLocation

  const handleFromInputChange = (e) => {
    const value = e.target.value;
    setFromInputValue(value);

    if (value) {
      const filtered = faculties.filter(
        (faculty) =>
          faculty.name.toLowerCase().includes(value.toLowerCase()) &&
          faculty.name !== toInputValue // Исключаем выбранные факультеты из второго поля
      );
      setFromFilteredFaculties(filtered);
    } else {
      setFromFilteredFaculties([]);
    }
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToInputValue(value);

    if (value) {
      const filtered = faculties.filter(
        (faculty) =>
          faculty.name.toLowerCase().includes(value.toLowerCase()) &&
          faculty.name !== fromInputValue // Исключаем выбранные факультеты из первого поля
      );
      setToFilteredFaculties(filtered);
    } else {
      setToFilteredFaculties([]);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mt-10">
        <h1 className="text-center mb-6 text-xl font-bold">
          Построй маршрут с 2GIS
        </h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col relative">
            <label htmlFor="facultyFromInput">Откуда</label>
            <InputText
              className="max-w-[200px] p-2"
              id="facultyFromInput"
              value={fromInputValue}
              onChange={handleFromInputChange}
              aria-describedby="from-help"
            />
            <small className="mt-1" id="from-help">
              * Поле не должно быть пустым
            </small>
            {fromFilteredFaculties.length > 0 && (
              <ul className="absolute top-16 bg-white border border-gray-300 z-10 mt-1 max-h-60 overflow-auto rounded-lg">
                {fromFilteredFaculties.map((faculty) => (
                  <li
                    key={faculty.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setFromInputValue(faculty.name);
                      setFromFilteredFaculties([]); // Очищаем подсказки
                      setToFilteredFaculties([]); // Очищаем подсказки во втором поле
                    }}
                  >
                    {faculty.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="facultyToInput">Куда</label>
            <InputText
              className="max-w-[200px] p-2"
              id="facultyToInput"
              value={toInputValue}
              onChange={handleToInputChange}
              aria-describedby="to-help"
            />
            <small className="mt-1" id="to-help">
              * Поле не должно быть пустым
            </small>
            {toFilteredFaculties.length > 0 && (
              <ul className="absolute top-16 bg-white border border-gray-300 z-10 mt-1 max-h-60 overflow-auto rounded-lg">
                {toFilteredFaculties.map((faculty) => (
                  <li
                    key={faculty.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setToInputValue(faculty.name);
                      setToFilteredFaculties([]); // Очищаем подсказки
                      setFromFilteredFaculties([]); // Очищаем подсказки в первом поле
                    }}
                  >
                    {faculty.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 transition-all 0.4s p-2 text-white font-bold rounded">
              Построить маршрут
            </button>
          </div>
        </div>
        <div
          id="foo"
          className="w-[1000px] h-[600px] border-2 p-2 rounded-lg bg-white"
        ></div>
      </div>
    </div>
  );
}
