"use client";

import { useState } from "react";

import { useTheme } from "next-themes";

import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "@/components/cmdk/SearchInput.component";
import ListItem from "@/components/cmdk/ListItem.component";

const items = [
  {
    id: 1,
    name: "Item 1",
  },
  {
    id: 2,
    name: "Item 2",
  },
  {
    id: 3,
    name: "Item 3",
  },
];

const CmdK = () => {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(true);

  const [focusIndex, setFocusIndex] = useState(0);

  document.addEventListener("keydown", (e) => {
    if (e.key === "k" && e.metaKey) {
      setIsOpen(true);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    }

    if (e.key === "ArrowUp") {
      if (focusIndex > 0) {
        setFocusIndex(focusIndex - 1);
      } else {
        setFocusIndex(items.length);
      }
    }

    if (e.key === "ArrowDown") {
      if (focusIndex < items.length) {
        setFocusIndex(focusIndex + 1);
      } else {
        setFocusIndex(0);
      }
    }
  });

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col">
        {/* for cmd k text */}
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">Cmd + K</p>
          <p className="text-sm text-gray-500">With stacked modals for</p>
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
            <div className="flex flex-col min-w-96 rounded-xl bg-white">
              <div className="flex flex-col gap-1">
                <SearchInput />
              </div>

              <div className="flex flex-col gap-1 p-1">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1">
                    <ListItem
                      startContent={<div>start</div>}
                      endContent={<div>end</div>}
                      title={item.name}
                      description={item.name}
                      onClick={() => {}}
                      isFocused={focusIndex === item.id}
                    />
                  </div>
                ))}
              </div>

              <footer className="flex flex-col gap-1">
                <p className="text-sm text-stone-500">
                  With stacked modals for
                </p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CmdK;
