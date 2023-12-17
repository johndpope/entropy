"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const styles = [
  { _id: 1, style: "anime" },
  { _id: 2, style: "realism" },
  { _id: 3, style: "3d" },
  { _id: 4, style: "digital" },
];

export default function Filter({
  search,
  style,
}: {
  search?: string;
  style?: string;
}) {
  const router = useRouter();

  const [text, setText] = useState(search || "");
  const [selectedStyle, setSelectedStyle] = useState(style || "");

  const handleSearch = (event) => {
    event.preventDefault();
    if (!text) {
      router.push(`/`);
    } else {
      router.push(`/images?search=${text}&style=${selectedStyle}`);
    }
  };

  useEffect(() => {
    if (selectedStyle) {
      router.push(`/images?search=${text}&style=${selectedStyle}`);
    }
  }, [selectedStyle]);

  return (
    <nav className="text-sm flex flex-col md:flex-row justify-between w-full items-center">
      <form onSubmit={handleSearch} className="relative w-[300px]">
        <input
          name="search"
          type="text"
          value={text}
          className="pl-9 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search..."
          onChange={(e) => setText(e.target.value)}
        />
        <div
          className="absolute inset-y-0 left-0 pl-2  
              flex items-center  
              pointer-events-none"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </div>
      </form>
      <ToggleGroup type="single" className="flex gap-3">
        <ToggleGroupItem
          value=""
          aria-label="Toggle all"
          className={clsx(
            "opacity-60",
            "bg-transparent hover:bg-transparent hover:opacity-80 data-[state=on]:bg-transparent",
            !selectedStyle && "outline opacity-100"
          )}
          onClick={() => {
            setSelectedStyle("");
            router.push(`/images?search=${text}&style=`);
          }}
        >
          All
        </ToggleGroupItem>
        {styles.map(({ _id, style }) => (
          <ToggleGroupItem
            key={_id}
            value={style}
            aria-label={`Toggle ${style}`}
            className={clsx(
              "capitalize  opacity-60",
              "bg-transparent hover:bg-transparent dark:hover:text-rose-five data-[state=on]:bg-transparent",
              selectedStyle === `${style}` && "outline opacity-100"
            )}
            onClick={() => setSelectedStyle(style)}
          >
            {style}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </nav>
  );
}