interface ListItemProps {
  startContent: React.ReactNode;
  endContent: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isFocused: boolean;
}

import { motion } from "framer-motion";

const ListItem = ({
  startContent,
  endContent,
  title,
  description,
  onClick,
  isFocused,
}: ListItemProps) => {
  return (
    <div
      className={`p-2 relative z-10 hover:bg-stone-200 rounded-md transition-all duration-200 ease-in-out cursor-pointer`}
      onClick={onClick}
    >
      {isFocused && (
        <motion.div
          className="absolute rounded-md -z-[1] left-0 top-0 bg-stone-300 w-full h-full"
          layoutId="focused"
        />
      )}
      <p className="text-sm text-stone-500">{title}</p>
    </div>
  );
};

export default ListItem;

