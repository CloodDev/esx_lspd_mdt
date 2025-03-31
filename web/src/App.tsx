import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./modules/basic/background/background";
import { fetchNui } from "./modules/tools/fetchNui";
import Start from "./modules/view/start/start";
import Bossmenu from "./modules/view/bossmenu/bossmenu";

export default function App() {
  const [toggleViewOpacity, setToggleViewOpacity] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.altKey) {
        setToggleViewOpacity(false);
      }
    });
    document.addEventListener("keyup", (e) => {
      if (!e.altKey) {
        setToggleViewOpacity(false);
      }
    });
    return () => {
      document.removeEventListener("keydown", () => { });
      document.removeEventListener("keyup", () => { });
    };
  }, [toggleViewOpacity]);

  const handleShow = () => {
    setVisible(true);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        exitView();
      } else if (e.key === "]") {
        exitView();
      }
    });
    return () => {
      document.removeEventListener("keydown", () => { });
    };
  }, [visible]);

  function exitView() {
    fetchNui("closeUI", {});
    setVisible(false);
  }

  useEffect(() => {
    window.addEventListener("message", handleNuiMessage);
    return () => {
      window.removeEventListener("message", handleNuiMessage);
    };
  }, []);

  const handleNuiMessage = (event: MessageEvent) => {
    const data = event.data;
    if (data.type === "open") {
      handleShow();
    };
  };

  return (
    <main
      style={{
        display: visible ? "block" : "none",
        opacity: toggleViewOpacity ? 0.25 : 1,
        transition: "opacity 0.1s ease-in-out",
        pointerEvents: toggleViewOpacity ? "none" : "auto",
      }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />

          <Route path="/boss" element={<Bossmenu />} />

          <Route
            path="*"
            element={<div>Nie masz wystarczających permisji</div>}
          />
        </Routes>
      </Layout>
    </main>
  );
}
