import { Layers2, Pencil } from "lucide-react";
import React from "react";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    // card
    <div className=" m-3 bg-gray-200 rounded-xl  p-4">
      <div className="flex items-center justify-between mb-4 ">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>

      {/* category list */}
      {categories.length === 0 ? (
        <p>No Categories added yet . Add some to get started!</p>
      ) : (
        <div className="p-5 bg-white rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {categories.map((category) => (
            <div
              key={category.id}
              className=" cursor-pointer bg-gray-200  group relative items-center gap-4 p-3 rounded-lg hover:bg-gray-300 "
            >
              {/* Icon/Emoji display */}
              <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full ">
                {category.icon ? (
                  <span className="text-2xl  ">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-5 w-5"
                    />
                  </span>
                ) : (
                  //text-primary
                  <Layers2 className="text-purple-800" size={24} />
                )}
              </div>

              {/* Category Details */}

              <div className="flex-1 flex items-center justify-between ">
                {/* Category name and type */}
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {category.name}
                  </p>

                  <p className="text-sm text-gray-400 mt-1 capitalize ">
                    {category.type}
                  </p>
                </div>
                {/* Actions buttons */}
                <div className="flex items-center gap-2 ">
                  <button
                    onClick={() => onEditCategory(category)}
                    className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer "
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
