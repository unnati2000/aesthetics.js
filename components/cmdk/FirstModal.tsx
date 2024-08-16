import SearchInput from "./SearchInput.component";
import ListItem from "./ListItem.component";

import { items } from "@/app/cmdk/page";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useClickOutside } from "@mantine/hooks";

import Kbd from "./Kbd";

interface FirstModalProps {
  focusIndex: number;
  isSecondModalOpen: boolean;
  setIsSecondModalOpen: (isOpen: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const FirstModal = ({
  focusIndex,
  setIsSecondModalOpen,
  isSecondModalOpen,
  setIsOpen,
}: FirstModalProps) => {
  const [animateDiv, setAnimateDiv] = useState(false);
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (isSecondModalOpen) {
      setAnimateDiv(true);

      setTimeout(() => {
        setAnimateDiv(false);
      }, 100);
    }
  }, [isSecondModalOpen]);

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
      className="flex flex-col justify-between min-w-[452px]  rounded-xl bg-white"
    >
      <div>
        <div className="flex flex-col gap-1">
          <SearchInput />
        </div>

        <div className="flex flex-col gap-1 p-1 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1"
              onClick={() => setIsSecondModalOpen(true)}
            >
              <ListItem
                startContent={item.startContent}
                endContent={item.endContent}
                title={item.name}
                description={item.name}
                onClick={() => {}}
                isFocused={focusIndex === item.id}
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="flex justify-between px-3 py-2 gap-1 border rounded-bl-xl rounded-br-xl">
        <Kbd>esc</Kbd>
        <div>
          <Kbd>⌘ K</Kbd>
        </div>
      </footer>
    </motion.div>
  );
};

export default FirstModal;

