'use client';

import { useRouter } from 'next/navigation';

import Kbd from '@/components/cmdk/Kbd';

import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-stone-950 h-screen w-full p-8">
      {/* layout div */}

      <div className="flex gap-4">
        <motion.div
          whileHover={{
            boxShadow: 'inset #8c8c8c 0px 0px 60px -40px',
          }}
          onClick={() => router.push('/cmdk')}
          style={{
            boxShadow: 'inset #7b7b7b 0px 0px 60px -44px',
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
            boxShadow: 'inset #8c8c8c 0px 0px 60px -40px',
          }}
          onClick={() => router.push('/animated-tabs')}
          style={{
            boxShadow: 'inset #7b7b7b 0px 0px 60px -44px',
          }}
          className="border-2 gap-2 flex-col cursor-pointer inline-flex shadow-lg text-md  items-center justify-center bg-zinc-900 text-zinc-500 border-zinc-800 rounded-xl h-44 w-44"
        >
          <p className="text-sm">Animated tabs</p>
          <p className="text-sm">flashlight effect</p>
        </motion.div>
      </div>
    </main>
  );
}
