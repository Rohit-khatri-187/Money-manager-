import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Emoji } from "emoji-picker-react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "income", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="e.g., Freelance , Salary, Groceries"
        type="text"
      />

      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6 ">
        <button
          disabled={loading}
          className={`bg-purple-500 hover:bg-purple-800 rounded-2xl text-white font-bold py-3 px-4 text-center
  cursor-pointer hover:scale-103 transition ease-in-out duration-400 ${
    loading ? "opacity-50 cursor-not-allowed" : ""
  }`}
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? <span>Updating.... </span> : <span> Adding....</span> }
            </div>
          ) : (
            <>{isEditing ? <span>Update Category</span> : <span>Adding Category</span> }</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
