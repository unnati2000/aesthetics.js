"use client";

import { motion } from "framer-motion";

const Orbits = () => {
  return (
    <div className="h-screen w-screen bg-zinc-900 flex items-center justify-center">
      <div className="border border-zinc-600 rounded-full h-40 w-40 relative">
        <motion.div
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
          animate={{
            rotate: [0, 360],
          }}
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transformOrigin: "80px 0", // Set the transform origin for the orbit
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Orbits;

