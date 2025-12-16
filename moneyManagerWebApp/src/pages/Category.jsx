import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/UseUser";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosUtil";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log(response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong . please try again.", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });

      if (response.status === 201) {
        toast.success("category added successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.log("Error while adding category", error);
      toast.error(error.response?.data || "Failed to add Category");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const {id,name,type,icon} = updatedCategory;

    if(!name.trim()){
      toast.error("Category Name is required.");
      return;
    }

    if(!id){
      toast.error("Category Id is required for update");
      return;
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name,type,icon} );
      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully");
      fetchCategoryDetails();
    } catch (error) {
      console.log(error);
      toast.error("Failed to updating category",error?.response?.data || error.message);
    }

  };

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* Add button to add category */}

        <div className="flex justify-between items-center mb-5 ">
          <h2 className="text-2xl font-semibold text-green-600"> All Categories </h2>

          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="bg-green-100 p-3  rounded-xl md:rounded-2xl  flex justify-center items-center gap-1 hover:bg-green-300"
          >
            <Plus className="font-semibold text-green-700 " size={20} />
            <span className="font-semibold text-green-700" >Add Category</span>
          </button>
        </div>

        {/* Category list */}

        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />

        {/* Adding category modal */}
        <Modal
          isopen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add Category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/* updating category modal */}

        <Modal
          isopen={openEditCategoryModal}
          onClose={() => {
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          title="Update Category"
        >
          <AddCategoryForm
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
