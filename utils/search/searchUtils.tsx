import { Item } from "@/types/search";

import { TbDeviceTabletSearch } from "react-icons/tb";
import { CiLight } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { MdOutlineDrafts } from "react-icons/md";

import Kbd from "@/components/cmdk/Kbd";

export const items: Item[] = [
  {
    id: 1,
    name: "Search blogs",
    description: "Search for your favorite blogs",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <TbDeviceTabletSearch size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>S</Kbd>,
  },
  {
    id: 2,
    name: "Toggle theme",
    description: "Toggle between light and dark mode",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <CiLight size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>ctrl I</Kbd>,
  },
  {
    id: 3,
    name: "Open settings",
    description: "Open settings to change your preferences",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <IoSettingsOutline size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: (
      <div className="flex items-center gap-1">
        <Kbd>O</Kbd>
        <Kbd>S</Kbd>
      </div>
    ),
  },
  {
    id: 4,
    name: "Invite friends",
    description: "Invite your friends to join you",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <GoPersonAdd size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>U</Kbd>,
  },
  {
    id: 5,
    name: "Write a blog",
    description: "Write a blog post",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <GoPencil size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>B</Kbd>,
  },
  {
    id: 6,
    name: "Make a draft",
    description: "Make a draft of your blog post",
    startContent: (
      <div className="flex border-zinc-700 bg-gradient-to-tr  from-zinc-800 to-zinc-950  items-center aspect-square p-2 justify-center border rounded-lg">
        <MdOutlineDrafts size={20} className="text-zinc-300" />
      </div>
    ),
    endContent: <Kbd>D</Kbd>,
  },
];

