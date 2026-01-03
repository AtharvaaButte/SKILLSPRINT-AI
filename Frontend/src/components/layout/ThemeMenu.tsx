import { useState } from 'react';
import { Palette, Monitor, Sun, Moon, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Theme = 'system' | 'light' | 'dark';

export function ThemeMenu() {
  const [theme, setTheme] = useState<Theme>('system');

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    // Visual placeholder - actual theme switching would require next-themes setup
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground">
          <Palette className="h-4 w-4" />
          <span>Theme / System</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuItem onClick={() => handleThemeChange('system')} className="gap-2">
          <Monitor className="h-4 w-4" />
          <span className="flex-1">System</span>
          {theme === 'system' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('light')} className="gap-2">
          <Sun className="h-4 w-4" />
          <span className="flex-1">Light</span>
          {theme === 'light' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="gap-2">
          <Moon className="h-4 w-4" />
          <span className="flex-1">Dark</span>
          {theme === 'dark' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
