import { useState, useEffect } from "react";
import Switch from "react-switch";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { useTagContext } from "../context/tagContext";
import { MdMenu } from "react-icons/md";
import { useSidebarMenuContext } from "../context/sidebarMenuContext";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { selectedTag } = useTagContext();
  const { toggleSidebar } = useSidebarMenuContext();

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);

    // Apply "dark" class to the <html> tag
    document.documentElement.classList.toggle("dark", newIsDarkMode);
  };

  useEffect(() => {
    // Check media preference and set dark mode accordingly
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsDarkMode(prefersDarkMode);

    // Apply "dark" class to the <html> tag
    document.documentElement.classList.toggle("dark", prefersDarkMode);
  }, []);

  return (
    <div className="flex justify-between items-center md:grid grid-cols-1 md:grid-cols-12 py-6 sm:py-3 border-b border-gray-300 dark:border-gray-700 max-w-[1400px] mx-auto px-5">
      <div className="md:col-span-3 flex gap-3 items-center">
        <button className="md:hidden text-3xl" onClick={toggleSidebar}>
          <MdMenu />
        </button>
        <div className="hidden sm:block">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-yellow-500 hidden sm:block">
            Welcome Amigos
          </h1>
          <p className="text-xl sm:text-base">Manage your to-do tasks</p>
        </div>
      </div>
      <div className="md:col-span-5 items-end px-5 ">
        <h1 className="text-lg font-bold text-gray-600 dark:text-gray-500">
          {selectedTag
            ? ` Tasks tagged "${selectedTag.name}"`
            : "Showing All Tasks"}
        </h1>
      </div>
      <div className="md:col-span-4 flex justify-end items-center">
        <Switch
          onChange={toggleDarkMode}
          checked={isDarkMode}
          className="react-switch"
          height={20}
          width={48}
          checkedIcon={
            <div className="h-full flex items-center pl-[10px] text-white text-[10px]">
              <BsFillMoonStarsFill />
            </div>
          }
          uncheckedIcon={
            <div className="h-full flex items-center justify-end w-full pr-[10px] text-white text-[10px]">
              <BsSun />
            </div>
          }
          onColor="#181818"
          offColor="#eab308"
        />
      </div>
    </div>
  );
};

export default Header;
