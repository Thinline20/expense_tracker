import { createEffect } from "solid-js";
import { TbDeviceLaptop, TbMoon, TbSun } from "solid-icons/tb";
import { useStore } from "@nanostores/solid";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { theme } from "~/atoms/theme";

export function ThemeToggle() {
  // const [theme, setTheme] = createSignal<"light" | "dark" | "system">("light");
  const $theme = useStore(theme);

  const isDarkMode = document.documentElement.classList.contains("dark");
  theme.set(isDarkMode ? "dark" : "light");

  createEffect(() => {
    const isDark =
      $theme() === "dark" ||
      ($theme() === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as="button">
        <Button variant="ghost" size="sm" class="relative w-9 px-0">
          <TbSun class="size-6 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <TbMoon class="absolute size-6 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => theme.set("light")}>
          <TbSun class="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => theme.set("dark")}>
          <TbMoon class="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => theme.set("system")}>
          <TbDeviceLaptop class="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
