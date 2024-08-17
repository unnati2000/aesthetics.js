"use client";

import { useState, useEffect } from "react";

import { TbDeviceTabletSearch } from "react-icons/tb";
import { CiLight } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { MdOutlineDrafts } from "react-icons/md";

import { useTheme } from "next-themes";

import { useHotkeys } from "@mantine/hooks";

import { motion, AnimatePresence } from "framer-motion";

import FirstModal from "@/components/cmdk/FirstModal";
import SecondaryModal from "@/components/cmdk/SecondaryModal";
import Kbd from "@/components/cmdk/Kbd";

export const items = [
  {
    id: 1,
    name: "Search blogs",
    description: "Search for your favorite blogs",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <TbDeviceTabletSearch size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>S</Kbd>,
  },
  {
    id: 2,
    name: "Toggle theme",
    description: "Toggle between light and dark mode",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <CiLight size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>ctrl I</Kbd>,
  },
  {
    id: 3,
    name: "Open settings",
    description: "Open settings to change your preferences",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <IoSettingsOutline size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: (
      <div className="flex items-center gap-1">
        <Kbd>O</Kbd>
        <Kbd>S</Kbd>
      </div>
    ),
  },
  {
    id: 4,
    name: "Invite friends",
    description: "Invite your friends to join you",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <GoPersonAdd size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>U</Kbd>,
  },
  {
    id: 5,
    name: "Write a blog",
    description: "Write a blog post",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <GoPencil size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>B</Kbd>,
  },
  {
    id: 6,
    name: "Make a draft",
    description: "Make a draft of your blog post",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <MdOutlineDrafts size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>D</Kbd>,
  },
];

const CmdK = () => {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [focusIndex, setFocusIndex] = useState(0);

  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "k" && e.metaKey) {
  //     setIsOpen(true);
  //   }

  //   if (e.key === "Escape") {
  //     setIsOpen(false);
  //     setIsSecondModalOpen(false);
  //   }

  //   if (e.key === "ArrowUp") {
  //     if (focusIndex > 0) {
  //       setFocusIndex(focusIndex - 1);
  //     } else {
  //       setFocusIndex(items.length);
  //     }
  //   }

  //   if (e.key === "ArrowDown") {
  //     if (focusIndex < items.length) {
  //       setFocusIndex(focusIndex + 1);
  //     } else {
  //       setFocusIndex(0);
  //     }
  //   }
  // });

  useHotkeys(
    [
      ["mod+k", () => setIsOpen(true)],
      ["esc", () => setIsOpen(false)],
      [
        "ArrowUp",
        () => {
          if (focusIndex > 0) {
            setFocusIndex(focusIndex - 1);
          } else {
            setFocusIndex(items.length);
          }
        },
      ],
      [
        "ArrowDown",
        () => {
          if (focusIndex < items.length) {
            setFocusIndex(focusIndex + 1);
          } else {
            setFocusIndex(0);
          }
        },
      ],
    ],
    [],
    false
  );

  return (
    <div className="h-screen flex flex-col bg-zinc-800 justify-center items-center">
      <div className="flex flex-col">
        {/* for cmd k text */}
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold text-zinc-400">Cmd + K</p>
          <p className="text-sm text-zinc-400">With stacked modals for</p>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
          >
            <FirstModal
              focusIndex={focusIndex}
              isSecondModalOpen={isSecondModalOpen}
              setIsOpen={setIsOpen}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setIsSecondModalOpen={setIsSecondModalOpen}
            />
            {isSecondModalOpen && (
              <SecondaryModal setIsOpen={setIsSecondModalOpen} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CmdK;
