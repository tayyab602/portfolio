import { createContext, useContext, useState, type ReactNode } from "react";

type RobotMode = "companion" | "playing";

type RobotContextValue = {
  mode: RobotMode;
  setMode: (mode: RobotMode) => void;
  toggle: () => void;
};

const RobotContext = createContext<RobotContextValue | null>(null);

export function RobotProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<RobotMode>("companion");

  const toggle = () =>
    setMode((m) => (m === "companion" ? "playing" : "companion"));

  return (
    <RobotContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </RobotContext.Provider>
  );
}

export function useRobot() {
  const ctx = useContext(RobotContext);
  if (!ctx) {
    throw new Error("useRobot() must be used inside <RobotProvider>");
  }
  return ctx;
}
