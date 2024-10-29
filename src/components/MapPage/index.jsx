import React, { useEffect, useState } from "react";
import { load } from "@2gis/mapgl";
import { InputText } from "primereact/inputtext";

const faculties = [
  { id: 1, name: "Энергетический (ЭФ)", coord: [113.52811, 52.03531] },
  { id: 2, name: "Строительный", coord: [113.52963, 52.0321] },
  { id: 3, name: "Юридический", coord: [113.52963, 52.0321] },
  { id: 4, name: "Экономический", coord: [113.52963, 52.0321] },
  { id: 5, name: "Горный", coord: [113.52963, 52.0321] },
  { id: 6, name: "Социологический", coord: [113.52963, 52.0321] },
  { id: 7, name: "Историко-Филологический", coord: [113.52963, 52.0321] },
];

export default function MapPage() {
  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputValue, setToInputValue] = useState("");
  const [fromFilteredFaculties, setFromFilteredFaculties] = useState([]);
  const [toFilteredFaculties, setToFilteredFaculties] = useState([]);

  useEffect(() => {
    let map;

    load().then((mapglAPI) => {
      map = new mapglAPI.Map("foo", {
        center: [113.5, 52],
        zoom: 13,
        key: "9f817a89-0b26-4d25-8b60-49bee22dee98",
      });

      const marker = new mapglAPI.Marker(map, {
        coordinates: [113.5, 52],
      });
    });

    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, []);

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
          <div className="flex flex-col">
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
              <ul className="absolute top-64 bg-white border border-gray-300 z-10 mt-1 max-h-60 overflow-auto rounded-lg">
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

          <div className="flex flex-col">
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
              <ul className="absolute top-64 bg-white border border-gray-300 z-10 mt-1 max-h-60 overflow-auto rounded-lg">
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
          className="foo w-[1000px] h-[600px] border-2 p-2 rounded-lg bg-white"
        ></div>
      </div>
    </div>
  );
}
