import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {MdOutlineDarkMode} from "react-icons/md";
import {MdOutlineLightMode} from "react-icons/md";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <span
        className=" text-lg cursor-pointer text-black dark:text-white  rounded-md  flex items-center justify-center   transition-all duration-300 focus:outline-none"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle Dark Mode"
      >
        {theme === "light" ? <MdOutlineDarkMode/> : <MdOutlineLightMode/>}
      </span>
      
    </>
  );
};

export default ThemeToggler;
