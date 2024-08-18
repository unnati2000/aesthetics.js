interface ListItemProps {
  startContent: React.ReactNode;
  endContent: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isFocused: boolean;
  targetRef: React.RefObject<HTMLDivElement>;
  viewPortRef: React.RefObject<HTMLDivElement>;
}

import { motion } from "framer-motion";

const ListItem = ({
  startContent,
  endContent,
  title,
  description,
  onClick,
  isFocused,
  targetRef,
  viewPortRef,
}: ListItemProps) => {
  return (
    <div
      className={`p-2 relative z-10 border hover:border-zinc-800 border-transparent hover:bg-gradient-to-b from-zinc-800 to-zinc-800/50 rounded-md transition-all duration-200 ease-in-out cursor-pointer`}
      onClick={onClick}
      ref={isFocused ? targetRef : null}
    >
      {isFocused && (
        <motion.div
          className="absolute rounded-md -z-[1] left-0 top-0 border border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-800/50 w-full h-full"
          layoutId="focused"
        />
      )}
      <div
        ref={isFocused ? viewPortRef : null}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          {startContent}
          <div className="flex flex-col">
            <p className="text-sm text-zinc-200">{title}</p>
            <p className="text-xs text-zinc-700">{description}</p>
          </div>
        </div>

        {endContent}
      </div>
    </div>
  );
};

export default ListItem;

