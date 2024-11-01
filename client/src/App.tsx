import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Logo from "./components/logo";
import axios from "axios";

function App() {
  const [backendTables, setBackendTables] = useState<string[]>([]);
  const [menuItem, setMenuItem] = useState("");
  const handleMenuItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuItem(event.target.value)
  }
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    axios.post("/api/menu-items/create", { menuItem }).then((response) => {
      console.log(response.data);
    })
    
  }
  useEffect(() => {
    axios.get("/api/tables").then((response) => {
      setBackendTables(response.data);
    });
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center align-middle">
      <div className="flex flex-row">
        <Logo alt="Vite Logo" image={viteLogo} link="https://vite.dev" />
        <Logo image={reactLogo} alt={"React Logo"} link="https://react.dev" />
      </div>
      <h1>Vite + React</h1>
      <span>
        Data from backend:{" "}
        {backendTables.map((table) => {
          // if not final element, add a comma
          if (table !== backendTables[backendTables.length - 1]) {
            return `${table}, `;
          }
          return table;
        })}
      </span>
      <form action=""><input type="text" className="border" onChange={handleMenuItemChange} /><button onClick={handleSubmit} type="submit">submit</button></form>
    </div>
  );
}

export default App;
