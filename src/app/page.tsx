"use client";
import Navbar from "@/components/navbar";
import Image, { StaticImageData } from "next/image";
import girl1 from "../../public/girl.jpg";
import girl2 from "../../public/girl 2.jpg";
import boy1 from "../../public/boy1.jpg";
import girl3 from "../../public/girl3.jpg";
import stairway2 from "../../public/stairway.jpg";
import personSillo from "../../public/person-silhouette.jpg";
import { Suspense, useState } from "react";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { useUser } from "@clerk/nextjs";
import { useMediaQuery } from "react-responsive";
import Loading from "./loading";

interface ImageObject {
  id: number;
  imageSrc: StaticImageData;
  tag?: string;
}

export default function Home() {
  const initialImages: ImageObject[] = [
    {
      id: 1,
      imageSrc: girl1,
      tag: "girl with blonde hair",
    },
    {
      id: 2,
      imageSrc: boy1,
      tag: "boy with black hair",
    },
    {
      id: 3,
      imageSrc: stairway2,
      tag: "stairway",
    },
    {
      id: 4,
      imageSrc: girl2,
      tag: "girl with nice hair",
    },
    {
      id: 5,
      imageSrc: girl3,
      tag: "girl with traditional attire",
    },
    {
      id: 6,
      imageSrc: personSillo,
      tag: "Person's Silhouette",
    },
  ];

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    let searchValue = search;
    if (searchValue) {
      const newImages = images.filter((image) =>
        image.tag?.includes(searchValue)
      );

      setImages(newImages);
      setSearch("");
    } else {
      setImages(initialImages);
    }
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const { isLoaded, isSignedIn } = useUser();

  const [images, setImages] = useState<ImageObject[]>(initialImages);

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number
  ) {
    const result = swap(images, sourceIndex, targetIndex);
    return setImages(result);
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <main>
        <Navbar />
        <h4 className="text-center text-2xl mt-[90px] mb-10">
          This is the home. Your place for Gallery
        </h4>
      </main>
    );
  }

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Navbar />

        <div className="flex flex-col mb-10 gap-10">
          <h4 className="text-center text-2xl mt-[90px]">
            This is the home. Your place for Drag and Drop Gallery
          </h4>
          <div className="flex flex-col lg:flex-row justify-around px-10 gap-4">
            <input
              value={search}
              onChange={(event) => setSearch(event?.target.value)}
              type="text"
              placeholder="Search using tags present underneath the images"
              className="grow-[2] h-10 p-6 border border-black rounded-md"
            />

            <button
              onClick={handleSearch}
              className="grow bg-black text-white rounded-md"
            >
              {search ? "Search" : "Restore all pictures"}
            </button>
          </div>
        </div>

        {images.length === 0 && (
          <p className="text-xl text-center font-extrabold">
            {" "}
            There are no images with that kind of tag. Click Restore all
            pictures to see all images
          </p>
        )}

        <GridContextProvider onChange={onChange}>
          {isDesktopOrLaptop && (
            <GridDropZone
              id="items"
              boxesPerRow={3}
              rowHeight={400}
              style={{ height: 400 * Math.ceil(images.length / 4) }}
            >
              {images.map((item) => (
                <GridItem key={item.id} className="cursor-move px-2 py-2">
                  <div className="h-full w-full flex flex-col items-center">
                    <Image
                      loading="lazy"
                      placeholder="blur"
                      src={item.imageSrc}
                      className="pointer-events-none h-[300px]"
                      alt="draggable images"
                    />
                    <p className="text-center text-lg font-bold">{item.tag}</p>
                  </div>
                </GridItem>
              ))}
            </GridDropZone>
          )}

          {isTabletOrMobile && (
            <GridDropZone
              id="items"
              boxesPerRow={2}
              rowHeight={200}
              style={{
                height: 200 * Math.ceil(images.length / 2),
                overflow: "auto",
              }}
            >
              {images.map((item) => (
                <GridItem key={item.id} className="cursor-move px-2">
                  <div className="h-full w-full flex flex-col items-center">
                    <Image
                      loading="lazy"
                      placeholder="blur"
                      src={item.imageSrc}
                      className="pointer-events-none touch-none h-[150px]"
                      alt="draggable images"
                    />
                    <p className="text-center text-lg font-bold">{item.tag}</p>
                  </div>
                </GridItem>
              ))}
            </GridDropZone>
          )}
        </GridContextProvider>
      </Suspense>
    </main>
  );
}
