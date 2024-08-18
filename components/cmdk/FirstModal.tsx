"use client";

import SearchInput from "./SearchInput.component";
import ListItem from "./ListItem.component";

import { items } from "@/app/cmdk/page";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

import {
  useClickOutside,
  useScrollIntoView,
  useIntersection,
} from "@mantine/hooks";

import Kbd from "./Kbd";

interface FirstModalProps {
  focusIndex: number;
  isSecondModalOpen: boolean;
  setIsSecondModalOpen: (isOpen: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setSearchInput: (searchInput: string) => void;
  searchInput: string;
}

const FirstModal = ({
  focusIndex,
  setIsSecondModalOpen,
  isSecondModalOpen,
  setIsOpen,
  setSearchInput,
  searchInput,
}: FirstModalProps) => {
  const { ref: viewPortRef, entry } = useIntersection();

  const { scrollIntoView, scrollableRef, targetRef } = useScrollIntoView();

  const [animateDiv, setAnimateDiv] = useState(false);
  const ref = useClickOutside(() => {
    if (!isSecondModalOpen) {
      setSearchInput("");
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isSecondModalOpen) {
      setAnimateDiv(true);

      setTimeout(() => {
        setAnimateDiv(false);
      }, 100);
    }
  }, [isSecondModalOpen]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      scrollIntoView({
        alignment: "center",
      });
    }
  }, [entry?.isIntersecting]);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [searchInput]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: animateDiv ? 0 : 1,
        scale: isSecondModalOpen ? 0.9 : 1,
        translateY: isSecondModalOpen ? "-30px" : "0",
        top: isSecondModalOpen ? "30px" : "0",
      }}
      whileHover={{
        scale: isSecondModalOpen ? 0.95 : 1,
        cursor: "pointer",
      }}
      exit={{ opacity: 0 }}
      ref={ref}
      className="flex border border-zinc-800 flex-col backdrop-blur-md justify-between min-w-[452px] rounded-xl"
    >
      <div>
        <div className="flex flex-col gap-1">
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>

        <div
          ref={scrollableRef}
          className="flex bg-gradient-to-b from-zinc-950/50 to-zinc-900 flex-col gap-1 p-1 min-h-60 max-h-60 overflow-y-auto"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1"
                onClick={() => setIsSecondModalOpen(true)}
              >
                <ListItem
                  startContent={item.startContent}
                  endContent={item.endContent}
                  targetRef={targetRef}
                  viewPortRef={
                    viewPortRef as React.RefObject<HTMLDivElement> as unknown
                  }
                  title={item.name}
                  description={item.name}
                  onClick={() => {}}
                  isFocused={focusIndex === item.id}
                />
              </div>
            ))
          ) : (
            <div className="text-sm text-center text-zinc-500">
              No results found
            </div>
          )}
        </div>
      </div>

      <footer className="flex items-center justify-between px-3 py-2 gap-1 border-t border-zinc-800 rounded-bl-xl rounded-br-xl">
        <Kbd>esc</Kbd>
        <div className="flex items-center gap-2 rounded-md text-zinc-300 bg-zinc-800 p-1 text-xs">
          <p>Actions</p>
          <Kbd>⌘ K</Kbd>
        </div>
      </footer>
    </motion.div>
  );
};

export default FirstModal;
