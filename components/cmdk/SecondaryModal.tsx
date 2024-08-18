"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import { useClickOutside } from "@mantine/hooks";

import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { TbDeviceDesktopCode } from "react-icons/tb";

import Kbd from "./Kbd";

const themes = [
  {
    id: "light",
    name: "Light",
    icon: MdOutlineWbSunny,
    subTitle: "Light theme",
    description: "This theme will activate the light theme of the application",
  },
  {
    id: "dark",
    name: "Dark",
    icon: IoMoonOutline,
    subTitle: "Dark theme",
    description: "This theme will activate the dark theme of the application",
  },
  {
    id: "system",
    name: "System",
    icon: TbDeviceDesktopCode,
    subTitle: "System theme",
    description: "This theme will activate the system theme of the application",
  },
];

const SecondaryModal = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <motion.div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
      className="bg-stone-900/20 border border-zinc-800 backdrop-blur-md rounded-xl z-20 absolute max-w-[452px] min-w-[452px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px]"
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-1 p-4">
            <h1 className="text-zinc-200 text-md font-semibold">
              Application Settings
            </h1>
            <p className="text-zinc-600 text-xs">
              Change the settings of the application
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 p-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTheme(theme);
                }}
                // style={{
                //   boxShadow:
                //     selectedTheme.id === theme.id
                //       ? "inset -7px 7px 14px #0c0c0c, inset 7px -7px 14px #1c1c1c"
                //       : "",
                // }}
                className="flex relative cursor-pointer items-center p-4 rounded-lg flex-col gap-4"
              >
                {selectedTheme.id === theme.id ? (
                  <motion.div
                    style={{
                      boxShadow:
                        "inset -7px 7px 14px #0c0c0c, inset 7px -7px 14px #1c1c1c",
                    }}
                    layoutId="selected"
                    className="absolute h-full p-4 rounded-lg top-0 left-0 w-full"
                  />
                ) : null}{" "}
                {/* <div className="flex justify-center items-center gap-2"> */}
                <p className="text-zinc-200 text-sm font-semibold">
                  {theme.name} theme
                </p>
                {/* </div> */}
                <theme.icon className="text-zinc-200 text-4xl" />
                <p className="text-zinc-600 text-center w-full text-xs">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="flex bg-zinc-900 border-t border-zinc-800 rounded-b-xl p-2 items-center justify-between">
          <Kbd>Esc</Kbd>
        </footer>
      </div>
    </motion.div>
  );
};

export default SecondaryModal;
