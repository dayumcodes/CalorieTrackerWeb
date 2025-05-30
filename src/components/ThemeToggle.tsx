
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-slate-700 data-[state=unchecked]:bg-gray-200"
      />
      <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    </div>
  );
};
