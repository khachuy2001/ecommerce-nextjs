"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  SanityImageHotspot,
  SanityImageCrop,
  internalGroqTypeReferenceTo,
} from "@/sanity.types";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
    isInStock?: boolean;
  }>;
  isInStock?: boolean;
}

const ImageView = ({ images = [], isInStock }: Props) => {
  const [active, setActive] = useState<typeof images[number] | undefined>(images?.[0]);
  const activeRef = useRef<typeof images[number] | undefined>(images?.[0]);

  const setActiveSafe = (img: typeof images[number] | undefined) => {
    activeRef.current = img;
    setActive(img);
  };

  useEffect(() => {
    // When images change, if there's no current selection or the current
    // selection doesn't exist in the new list, set the active image to the first one.
    const first = images && images.length > 0 ? images[0] : undefined;
    const activeExists = !!activeRef.current && images.some((img) => img._key === activeRef.current!._key);

    if (!activeRef.current || !activeExists) {
      let cancelled = false;
      Promise.resolve().then(() => {
        if (!cancelled) setActiveSafe(first);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [images]);

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
        >
          {active && active?.asset ? (
            <Image
              src={urlFor(active).url()}
              alt="productImage"
              width={700}
              height={700}
              priority
              className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md ${isInStock === false ? "opacity-50" : ""}`}
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-md">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-24">
        {images?.map((image) => (
          <button
            key={image?._key}
            type="button"
            onClick={() => image && setActiveSafe(image)}
            className={`border rounded-md overflow-hidden ${
              active?._key === image?._key
                ? "  border-darkColor opacity-100"
                : "opacity-80"
            }`}
          >
            {image?.asset ? (
              <Image
                src={urlFor(image).width(150).url()}
                alt={`Thumbnail ${image?._key}`}
                width={100}
                height={100}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-full h-24 flex items-center justify-center bg-gray-100 text-xs text-muted-foreground">
                No thumbnail
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
