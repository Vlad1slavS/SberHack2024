import React, { useEffect } from "react";
import { load } from '@2gis/mapgl';

export default function MapPage() {
  useEffect(() => {
    let map;

    load().then((mapglAPI) => {
      map = new mapglAPI.Map('foo', {
        center: [55.31878, 25.23584],
        zoom: 13,
        key: '9f817a89-0b26-4d25-8b60-49bee22dee98',
      });

      // Создаем маркер после инициализации карты
      const marker = new mapglAPI.Marker(map, {
        coordinates: [55.31878, 25.23584],
      });

      // Добавляем маркер на карту
      marker.setMap(map);
    });

    // Очистка (если это будет необходимо в будущем)
    return () => {
      if (map) {
        map.destroy(); // Уничтожаем карту при размонтировании компонента
      }
    };
  }, []); // Пустой массив зависимостей означает, что useEffect сработает только при первом монтировании компонента

  return (
    <div>
      <h1>Маршрут с 2ГИС API</h1>
      <div id="foo" className="foo w-[500px] h-[300px]"></div>
    </div>
  );
}
