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
      className={`p-2 relative z-10 hover:bg-zinc-800 rounded-md transition-all duration-200 ease-in-out cursor-pointer`}
      onClick={onClick}
    >
      {isFocused && (
        <motion.div
          className="absolute rounded-md -z-[1] left-0 top-0 bg-zinc-800 w-full h-full"
          layoutId="focused"
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {startContent}
          <div className="flex flex-col">
            <p className="text-sm text-zinc-500">{title}</p>
            <p className="text-xs text-zinc-700">{description}</p>
          </div>
        </div>

        {endContent}
      </div>
    </div>
  );
};

export default ListItem;

