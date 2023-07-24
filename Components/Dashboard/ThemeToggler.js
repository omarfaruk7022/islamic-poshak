import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <span
        className=" text-[20px] cursor-pointer  flex items-center justify-center  duration-300 focus:outline-none  m-auto  transition-all p-2 rounded-md shadow-md"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle Dark Mode"
      >
        {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
      </span>
    </>
  );
};

export default ThemeToggler;
