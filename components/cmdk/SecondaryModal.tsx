import { motion } from "framer-motion";

const SecondaryModal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
      className="bg-white rounded-xl z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-96 h-[300px]"
    >
      SecondaryModal
    </motion.div>
  );
};

export default SecondaryModal;
