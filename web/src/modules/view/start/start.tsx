import { useEffect, useState } from "react";
import "./start.css";

interface OfficerData {
  name: string;
  badgeNumber: string;
}

function Start() {
  const [officerData, setOfficerData] = useState<OfficerData>({
    name: "Loading...",
    badgeNumber: "Loading..."
  });

  useEffect(() => {
    // Register NUI callback
    window.addEventListener("message", handleNuiMessage);

    // Send ready event to FiveM
    fetch("https://lspd_mdt/ready", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    });

    return () => {
      window.removeEventListener("message", handleNuiMessage);
    };
  }, []);

  const handleNuiMessage = (event: MessageEvent) => {
    const data = event.data;
    
    if (data.type === "officerData") {
      setOfficerData({
        name: data.name || "Unknown",
        badgeNumber: data.badgeNumber || "Unknown"
      });
    }
  };

  return (
    <>
      <div className="tablet-start">
        <div className="tablet-header">
          <h1>Los Santos Police Department</h1>
          <p className="subtitle">Mobile Data Terminal</p>
        </div>
        <div className="officer-info">
          <p>Officer: <span className="placeholder">{officerData.name}</span></p>
          <p>Badge #: <span className="placeholder">{officerData.badgeNumber}</span></p>
        </div>
        <div className="system-info">
          <p>MDT System v1.0</p>
          <p>Authorized Personnel Only</p>
        </div>
        <div className="footer">
          <p>© 2025 Los Santos Police Department</p>
        </div>
      </div>
    </>
  );
}

export default Start;
