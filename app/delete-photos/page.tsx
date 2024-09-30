"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1726250644724-bc10c87c2181?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1727089787039-4bcec5544ee2?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    url: "https://plus.unsplash.com/premium_photo-1727456749715-e9f1400d895b?q=80&w=3725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1646037497365-8d307463194d?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const DeletePhotos = () => {
  const parentDustbinRef = useRef(null);
  const dustbinRef = useRef(null);
  const [imageList, setImageList] = useState(images);
  const [deletedImages, setDeletedImages] = useState<
    {
      id: number;
      url: string;
      angle: number;
    }[]
  >([]);

  const [y, setY] = useState(0);
  const [draggedImage, setDraggedImage] = useState<{
    id: number;
    url: string;
  } | null>(null);

  // @ts-expect-error: need to check this
  const parentDustbinRefTop = dustbinRef.current?.getBoundingClientRect().top;

  // @ts-expect-error: need to check this
  const dustbinRefTop = dustbinRef.current?.getBoundingClientRect().top;

  function getRandomValue(min: number = -20, max: number = 20): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="bg-zinc-900 h-screen w-screen flex items-center justify-center">
      <div className="min-h-[500px] max-h-[500px] min-w-80 max-w-80 relative flex flex-col justify-between items-center">
        <div className="">
          {imageList.map((image) => (
            <motion.div
              whileDrag={{
                scale:
                  parentDustbinRefTop && parentDustbinRefTop < y ? 0.5 : 1.5,
              }}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 200 }}
              onDragStart={() => {
                setDraggedImage(image);
              }}
              onDrag={(e, info) => {
                // console.log(info.offset.y);
                setY(info.point.y);
              }}
              onDragEnd={() => {
                if (dustbinRefTop && dustbinRefTop < y) {
                  setImageList(
                    imageList.filter((image) => image.id !== draggedImage?.id)
                  );
                  setDeletedImages([
                    ...deletedImages,
                    { ...draggedImage, angle: getRandomValue() } as {
                      id: number;
                      url: string;
                      angle: number;
                    },
                  ]);
                }
              }}
              drag={true}
              key={image.id}
              style={{
                left: `${35 + image.id * 2}%`,
                rotate: `${image.id * 2}deg`,
                transform: "translateX(-50%)",
              }}
              className="bg-white p-1 left-1/2 -translate-x-1/2 cursor-pointer absolute rounded-lg"
            >
              <Image
                height={50}
                width={50}
                src={image.url}
                alt={image.id.toString()}
                className="object-cover aspect-square h-full w-full rounded-lg pointer-events-none"
              />
            </motion.div>
          ))}
        </div>

        <div
          className="min-h-52 aspect-square flex flex-col justify-end items-center"
          ref={parentDustbinRef}
        >
          <div className="relative" ref={dustbinRef}>
            {deletedImages.map((image) => (
              <div
                key={image.id}
                style={{
                  left: `${30 + image.id * 10}%`,
                  transform: "translateX(-50%)",
                  top: "-20px",
                  rotate: `${image.angle}deg`,
                }}
                className="absolute top-0 aspect-square bg-white p-1 rounded-lg"
              >
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.id.toString()}
                  width={35}
                  height={35}
                  className="object-cover aspect-square rounded-lg pointer-events-none"
                />
              </div>
            ))}

            <div className="dustbin rotate-180"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePhotos;

