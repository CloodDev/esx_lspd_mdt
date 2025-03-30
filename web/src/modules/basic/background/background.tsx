import { useState } from "react";
import Menubar from "../menu/menu";
import "./background.css";
import "./layout.css";

function Background() {
  return (
    <div className="background"/>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [hasPermission] = useState(true);
  return (
    <>
      {hasPermission && (
        <div className="background_layout">
          <Menubar />
          <section className="section_layout">{children}</section>
          <Background />
        </div>
      )}
    </>
  );
}
