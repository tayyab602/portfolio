import { Gamepad2, X } from "lucide-react";
import { useRobot } from "./RobotContext";

export function RobotToggleButton() {
  const { mode, toggle } = useRobot();
  const playing = mode === "playing";
  const Icon = playing ? X : Gamepad2;

  return (
    <button
      onClick={toggle}
      aria-pressed={playing}
      title={playing ? "Exit the 602 game" : "Play as 602"}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors text-sm ${
        playing
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline font-mono text-xs">
        {playing ? "Exit" : "Play 602"}
      </span>
    </button>
  );
}
