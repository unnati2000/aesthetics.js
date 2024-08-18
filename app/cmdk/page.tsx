"use client";

import { useState, useEffect, useMemo } from "react";

import { TbDeviceTabletSearch } from "react-icons/tb";
import { CiLight } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { MdOutlineDrafts } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { BsArrowReturnLeft } from "react-icons/bs";

import { Item } from "@/types/search";

import { useTheme } from "next-themes";

import { useHotkeys } from "@mantine/hooks";

import { motion, AnimatePresence } from "framer-motion";

import FirstModal from "@/components/cmdk/FirstModal";
import SecondaryModal from "@/components/cmdk/SecondaryModal";
import Kbd from "@/components/cmdk/Kbd";

import { items } from "@/utils/search/searchUtils";

const CmdK = () => {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
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
      [
        "escape",
        () => {
          if (isSecondModalOpen) {
            setIsSecondModalOpen(false);
          } else {
            setIsOpen(false);
          }
        },
      ],
      [
        "ArrowUp",
        () => {
          if (focusIndex > 0) {
            setFocusIndex(focusIndex - 1);
          } else {
            setFocusIndex(filteredItems.length);
          }
        },
      ],
      [
        "ArrowDown",
        () => {
          if (focusIndex < filteredItems.length - 1) {
            setFocusIndex(focusIndex + 1);
          } else {
            setFocusIndex(0);
          }
        },
      ],
      [
        "Enter",
        () => {
          setIsSecondModalOpen(true);
        },
      ],
    ],
    [],
    false
  );

  useEffect(() => {
    setFocusIndex(0);
  }, [searchInput]);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [searchInput]
  );

  return (
    <div className="h-screen flex flex-col bg-zinc-900 justify-center items-center">
      <div className="flex flex-col gap-3">
        {/* for cmd k text */}
        <div className="flex flex-col gap-1">
          <p className="text-4xl font-bold text-zinc-400">cmd k</p>
          <p className="text-sm text-zinc-600">
            With stacked modals and keyboard navigation
          </p>
        </div>

        <div className="text-sm block text-zinc-200 tex">
          Press{" "}
          {
            <Kbd>
              <FaArrowUp />
            </Kbd>
          }{" "}
          {
            <Kbd>
              <FaArrowDown />
            </Kbd>
          }{" "}
          to navigation and{" "}
          {
            <Kbd>
              <BsArrowReturnLeft />
            </Kbd>
          }{" "}
          to open stacked modal
        </div>

        <div className="gap-x-4"></div>
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
              filteredItems={filteredItems}
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
