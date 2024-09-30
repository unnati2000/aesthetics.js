"use client";

import { useRouter } from "next/navigation";

import Kbd from "@/components/cmdk/Kbd";
import { BsTrashFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";

import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-stone-950 h-screen w-full p-8">
      {/* layout div */}

      <div className="flex gap-4">
        <motion.div
          whileHover={{
            boxShadow: "inset #8c8c8c 0px 0px 60px -40px",
          }}
          onClick={() => router.push("/cmdk")}
          style={{
            boxShadow: "inset #7b7b7b 0px 0px 60px -44px",
          }}
          className="border-2 gap-2 flex-col cursor-pointer inline-flex shadow-lg text-md  items-center justify-center bg-zinc-900 text-zinc-500 border-zinc-800 rounded-xl h-44 w-44"
        >
          <p className="text-sm">Stacking modals</p>
          <p className="text-sm">
            <Kbd>cmd</Kbd> <Kbd>k</Kbd>
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            boxShadow: "inset #8c8c8c 0px 0px 60px -40px",
          }}
          onClick={() => router.push("/delete-photos")}
          style={{
            boxShadow: "inset #7b7b7b 0px 0px 60px -44px",
          }}
          className="border-2 gap-4 flex-col cursor-pointer inline-flex shadow-lg text-md  items-center justify-center bg-zinc-900 text-zinc-500 border-zinc-800 rounded-xl h-44 w-44"
        >
          <p className="text-sm">Delete photos</p>
          <div className="flex items-center relative justify-center">
            <BsTrashFill size={32} />
            <CiImageOn
              className="absolute -rotate-[30deg] -left-3 -top-3"
              size={32}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}

