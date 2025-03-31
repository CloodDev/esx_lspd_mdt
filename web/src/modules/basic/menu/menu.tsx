import "./menu.css";
import { useEffect,useState } from "react";
import NavData from "../../../data/navItems.json";
import { Link } from "react-router-dom";
// import { fetchNui } from "../../tools/fetchNui";

interface NaavData {
  [key: string]: {
    name: string;
    icon: string;
  };
}

// Cast NavData to the correct type for TypeScript
const typedNavData = NavData as NaavData;

export default function Menubar() {
  const [selectedNavItem, setSelectedNavItem] = useState("Start");
  const [perms, setPerms] = useState(false);

  useEffect(() => {
    window.addEventListener("message", handleNuiMessage);
    return () => {
      window.removeEventListener("message", handleNuiMessage);
    };
  }, []);

  const handleNuiMessage = (event: MessageEvent) => {
    const data = event.data;
    if (data.type === "setPerms") {
      setPerms(data.perms);
    }
  };
    
  const handleSelect = (name: string) => {
    setSelectedNavItem(name);
  // Create a mutable copy of NavData
  const navDataCopy = { ...typedNavData };
  
  if (perms) {
    navDataCopy["bossmenu"] = {
      name: "Bossmenu",
      icon: "bossmenu.svg",
    };
  }

  return (
    <nav className="enclosure">
      {Object.keys(navDataCopy).map((key, index) => (
        <Link
          to={
            navDataCopy[key].name.toLowerCase() === "start"
              ? "/"
              : `/${navDataCopy[key].name.toLowerCase()}`
          }
          className={
            selectedNavItem === navDataCopy[key].name
              ? "menu-item selected"
              : "menu-item"
          }
          key={index}
          onClick={() => handleSelect(navDataCopy[key].name)}
        >
          <img
            src={`icons_svg/navbar/${navDataCopy[key].icon}`}
            alt=""
          />
          <span className="text">{navDataCopy[key].name}</span>
        </Link>
      ))}
    </nav>
  );
}};
