import React from "react";
import { load } from '@2gis/mapgl';

export default function MapPage() {

//   load().then((mapglAPI) => {
//     const map = new mapglAPI.Map('foo', {
//         center: [55.31878, 25.23584],
//         zoom: 13,
//         key: '9f817a89-0b26-4d25-8b60-49bee22dee98',
//     });
// });

// const marker = new mapgl.Marker(map, {
//   coordinates: [55.31878, 25.23584],
// });


  return (
    <div>
      <h1>Маршрут с 2ГИС API</h1>
      <div className="foo w-[500px] h-[300px]"></div>
    </div>
  );
}
