import React from "react";

export default function SidebarCard() {
  return (
    <div>
      <a className="hover-effect" href="#">
        <div className="border-2 border-black w-40 bg-lime-100 rounded-lg p-4">
          <p className="font-semibold">Карты</p>
          <img className="" src="public/way2.png" alt="map" />
        </div>
      </a>
    </div>
  );
}
