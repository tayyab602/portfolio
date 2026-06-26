import { createRoot } from "react-dom/client";
import App from "./App";
import { RobotProvider } from "./robot/RobotContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RobotProvider>
    <App />
  </RobotProvider>
);
