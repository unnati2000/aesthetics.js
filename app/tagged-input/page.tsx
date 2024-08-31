"use client";

import { useState, useRef } from "react";

import Kbd from "@/components/cmdk/Kbd";

interface Tag {
  label: string;
  id: number;
}

const TaggedInput = () => {
  const [tags, setTags] = useState<Tag[] | []>([]);

  const tagsRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTags([
        ...tags,
        {
          label: input,
          id: tags.length + 1,
        },
      ]);
      setInput("");
    }

    if (e.key === "Backspace" && input === "") {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  return (
    <div className="bg-zinc-900 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-3">
        <p className="text-zinc-400">
          Add <Kbd>ctrl</Kbd> + <Kbd>Enter</Kbd> to add a tag
        </p>
        <div className="relative">
          <textarea
            rows={8}
            placeholder={tags.length > 0 ? "" : "Add a tag"}
            style={{
              paddingLeft: `${tagsRef.current?.clientWidth ?? 0 + 3}px`,
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-xl placeholder:text-zinc-600 min-w-96 max-w-96 p-4 text-zinc-300 border bg-zinc-800 border-zinc-500 focus:outline-none text-md focus:border-zinc-500"
          />

          <div
            ref={tagsRef}
            className="flex left-2 top-2 flex-wrap gap-2 absolute"
          >
            {tags?.map((tag) => (
              <Tag key={tag.id}>{tag.label}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-zinc-800 rounded-xl p-2 text-zinc-300">{children}</div>
  );
};

export default TaggedInput;

