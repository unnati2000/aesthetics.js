import { motion } from "framer-motion";

import { useClickOutside } from "@mantine/hooks";

const SecondaryModal = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
      className="bg-white/20 backdrop-blur-md rounded-xl z-20 absolute min-w-[452px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-96 h-[300px]"
    >
      SecondaryModal
    </motion.div>
  );
};

export default SecondaryModal;
