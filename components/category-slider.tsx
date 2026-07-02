import { useEffect, useState } from "react";
import { getCategories, type Category } from "../lib/data";

interface CategorySliderProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const CategorySlider = ({ selectedCategory, onCategorySelect }: CategorySliderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="w-full overflow-x-auto scrollbar-hide px-4">
      <div className="flex space-x-2">
        <button
          onClick={() => onCategorySelect("popular")}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
            selectedCategory === "popular"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Popular
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.slug)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              selectedCategory === cat.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};