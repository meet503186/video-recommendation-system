import React from "react";

interface IProps {
  categories: string[];
  selectedCategory: string;
  onChangeSelectedCategory: (category: string) => void;
}

const VideoCategories = ({
  categories,
  selectedCategory,
  onChangeSelectedCategory,
}: IProps) => {
  return (
    <div className="flex gap-2 overflow-auto mb-2">
      {categories.map((category) => {
        return (
          <span
            key={category}
            onClick={() => onChangeSelectedCategory(category)}
            className={`cursor-pointer py-1 px-2 rounded-lg border text-base font-medium ${selectedCategory === category ? "bg-black border-black text-white" : "bg-transparent text-black"}`}
          >
            {category}
          </span>
        );
      })}
    </div>
  );
};

export default VideoCategories;
