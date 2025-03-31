import { useEffect, useState } from "react";

interface OfficerData {
  officer: {
    name: string;
    badgeNumber: string;
    dutyTime?: string;
    rank?: string;
    dutyStatus?: string;
  }
}

function Bossmenu() {
  const [allData, setAllData] = useState<OfficerData>({
    officer: {
      name: "Loading...",
      badgeNumber: "Loading..."
    }
  });
  const [perms,setPerms] = useState(false)

  useEffect(() => {
    // Register NUI callback
    window.addEventListener("message", handleNuiMessage);
    return () => {
      window.removeEventListener("message", handleNuiMessage);
    };
  }, []);

  const handleNuiMessage = (event: MessageEvent) => {
    const data = event.data;
    if (data.type === "setPerms") {
      setPerms(data.perms)
    }
    if (data.type === "allOfficerData") {
      setAllData({
        officer: {
          name: data.name || "Loading...",
          badgeNumber: data.badgeNumber || "Loading...",
          dutyTime: data.dutyTime || "Loading...",
          rank: data.rank || "Loading...",
          dutyStatus: data.dutyStatus || "Loading..."
        }
      });
      for(const officer of data.officerData) {
        setAllData((prevState) => ({
          ...prevState,
          [officer.name]: {
            name: officer.name || "Unknown",
            badgeNumber: officer.badgeNumber || "Unknown",
            dutyTime: officer.dutyTime || "Unknown",
            rank: officer.rank || "Unknown",
            dutyStatus: officer.dutyStatus || "Unknown"
          }
        }));
      }
    }
  };

  return (
    <>
      {perms && Object.entries(allData).map(([key, value]) => (
      <div className="tablet-start" key={key}>
        <div className="officer-header">
        {value.name && (
          <p>Officer: <span className="placeholder">{value.name}</span></p>
        )}
        {value.badgeNumber && (
          <p>Badge #: <span className="placeholder">{value.badgeNumber}</span></p>
        )}
        {value.dutyTime && (
          <p>Duty Time: <span className="placeholder">{value.dutyTime}</span></p>
        )}
        {value.rank && (  
          <p>Rank: <span className="placeholder">{value.rank}</span></p>
        )} 
        {value.dutyStatus && (
          <p>Duty Status: <span className="placeholder">{value.dutyStatus}</span></p>
        )}
        </div>
      </div>
      ))}
    </>
  );
}

export default Bossmenu;
