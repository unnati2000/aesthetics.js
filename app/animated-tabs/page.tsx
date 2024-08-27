'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const tabs = ['Home', 'About', 'Blog', 'Contact'];

const AnimatedTabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [hoveredTab, setHoveredTab] = useState<string>(tabs[0]);
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <section className="h-80 flex max-w-xl justify-center w-full items-center border border-zinc-300 rounded-xl relative">
        <ul
          className="flex"
          style={{
            flexDirection: flexDirection,
          }}
        >
          {tabs.map((tab) => (
            <motion.li
              layout="position"
              tabIndex={0}
              onFocus={() => setHoveredTab(tab)}
              onMouseOver={() => setHoveredTab(tab)}
              onMouseLeave={() => setHoveredTab(selectedTab)}
              onClick={() => setSelectedTab(tab)}
              key={tab}
              className="relative px-4 py-2 text-sm font-medium cursor-pointer transition-colors"
              transition={{ duration: 0.2 }}
            >
              <span className="relative text-inherit">{tab}</span>
              {tab === hoveredTab && (
                <motion.div
                  layoutId="highlight"
                  className="absolute inset-0 rounded-lg bg-zinc-300/30"
                />
              )}
            </motion.li>
          ))}
        </ul>
        <button
          className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-md"
          onClick={() =>
            setFlexDirection(flexDirection === 'row' ? 'column' : 'row')
          }
        >
          <ArrowRight
            size={16}
            className="transition-transform"
            style={{
              transform:
                flexDirection === 'row' ? 'rotate(0deg)' : 'rotate(90deg)',
            }}
          />
        </button>
      </section>
    </div>
  );
};

export default AnimatedTabs;
