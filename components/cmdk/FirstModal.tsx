import SearchInput from "./SearchInput.component";
import ListItem from "./ListItem.component";

import { items } from "@/app/cmdk/page";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FirstModalProps {
  focusIndex: number;
  isSecondModalOpen: boolean;
  setIsSecondModalOpen: (isOpen: boolean) => void;
}

const FirstModal = ({
  focusIndex,
  setIsSecondModalOpen,
  isSecondModalOpen,
}: FirstModalProps) => {
  const [animateDiv, setAnimateDiv] = useState(false);

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
      className="flex flex-col  min-w-96 h-[300px] rounded-xl bg-white"
    >
      <div className="flex flex-col gap-1">
        <SearchInput />
      </div>

      <div className="flex flex-col gap-1 p-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-1"
            onClick={() => setIsSecondModalOpen(true)}
          >
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

      <footer className="flex flex-col px-3 py-2 gap-1 border rounded-bl-xl rounded-br-xl">
        <p className="text-sm text-stone-500">esc</p>
      </footer>
    </motion.div>
  );
};

export default FirstModal;

