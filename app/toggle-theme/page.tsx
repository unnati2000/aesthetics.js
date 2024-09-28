"use client";

import { LuSun, LuMoon } from "react-icons/lu";
import { useState } from "react";
// import { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
// import { Moon, Sun } from "lucide-react";

const AnimatedText = ({
  children,
  animationProgress,
}: {
  children: React.ReactNode;
  animationProgress: number;
}) => {
  return (
    <span
      style={{
        color: `rgb(
          ${Math.round(255 * animationProgress)},
          ${Math.round(255 * animationProgress)},
          ${Math.round(255 * animationProgress)}
        )`,
      }}
    >
      {children}
    </span>
  );
};

export default function Component() {
  const { theme, setTheme } = useTheme();

  const controls = useAnimationControls();
  const [animationProgress, setAnimationProgress] = useState(0);

  const toggleTheme = async () => {
    if (theme === "light") {
      await controls.start({
        scale: [0, 1, 10],
        x: ["50vw", "0vw", "0vw"],
        y: ["-50vh", "0vh", "0vh"],
        transition: {
          duration: 2,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        },
      });
      setTheme("dark");
    } else {
      await controls.start({
        scale: [10, 1, 0],
        x: ["0vw", "0vw", "50vw"],
        y: ["0vh", "0vh", "-50vh"],
        transition: {
          duration: 2,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        },
      });
      setTheme("light");
    }
  };

  return (
    <div className="min-h-screen relative z-50  bg-zinc-400">
      <div className=" mx-auto p-4">
        <button
          className="fixed dark:text-white text-zinc-900 top-4 right-4 z-50"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <LuMoon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <LuSun className="h-[1.2rem] w-[1.2rem]" />
          )}
        </button>

        <AnimatePresence>
          <motion.div
            key="darkModeBubble"
            initial={{ scale: 0, x: "50vw", y: "-50vh" }}
            animate={controls}
            exit={{ scale: 0, x: "50vw", y: "-50vh" }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              backgroundColor: "black",
              zIndex: -1,
            }}
            onUpdate={(latest) => {
              // @ts-ignore
              setAnimationProgress((latest.scale - 1) / 3);
            }}
          />
        </AnimatePresence>

        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">
            <AnimatedText animationProgress={animationProgress}>
              Theme Toggle Example
            </AnimatedText>
          </h1>
          <p>
            <AnimatedText animationProgress={animationProgress}>
              Toggle the theme using the button in the top right corner. Watch
              the animation when switching to dark mode!
            </AnimatedText>
          </p>
        </div>
      </div>
    </div>
  );
}

