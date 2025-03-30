import "./menu.css";
import { useState } from "react";
import NavData from "../../../data/navItems.json";
import { Link } from "react-router-dom";
// import { fetchNui } from "../../tools/fetchNui";

interface NaavData {
  [key: string]: {
    name: string;
    icon: string;
  };
}

export default function Menubar() {
  const [selectedNavItem, setSelectedNavItem] = useState("Start");

  const handleSelect = (name: string) => {
    setSelectedNavItem(name);
    console.log(`[DEBUG] Selected nav item: ${name}`);
  };

  return (
    <nav className="enclosure">
      {Object.keys(NavData).map((key, index) => (
        <Link
          to={
            (NavData as NaavData)[key].name.toLowerCase() === "start"
              ? "/"
              : `/${(NavData as NaavData)[key].name.toLowerCase()}`
          }
          className={
            selectedNavItem === (NavData as NaavData)[key].name
              ? "menu-item selected"
              : "menu-item"
          }
          key={index}
          onClick={() => handleSelect((NavData as NaavData)[key].name)}
        >
          <img
            src={`icons_svg/navbar/${(NavData as NaavData)[key].icon}`}
            alt=""
          />
          <span className="text">{(NavData as NaavData)[key].name}</span>
        </Link>
      ))}
    </nav>
  );
}
