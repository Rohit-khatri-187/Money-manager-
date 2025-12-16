import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-sm text-red-600 ">{content} </p>
      <div className="flex justify-end mt-6">
        <button
          className="bg-red-600 hover:bg-red-800 rounded-2xl text-white font-bold py-3 px-4 text-center
  cursor-pointer hover:scale-103 transition ease-in-out duration-400"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />{" "}
              <span>Deleting ...</span>
            </>
          ) : (
            <>Delete</>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
