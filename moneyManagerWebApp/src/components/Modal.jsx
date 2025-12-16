import { X } from "lucide-react";
import React from "react";

const Modal = ({ isopen, onClose, children, title }) => {
  if (!isopen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full 
    overflow-hidden bg-black/40 backdrop-blur-none "
    >
      <div className="relative p-4 w-full max-w-2xl max-h-[90vh] ">
        {/* Modal header */}
        <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 ">
          {/* Modal content */}

          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 rounded-t-xl ">
            <div className="flex justify-end w-[60%]">
              <h3
                className={`text-xl sm:text-2xl font-semibold ${
                  title === "Delete Income" || title === "Add Expense"
                    ? "text-red-600"
                    : "text-green-600"
                }
 `}
              >
                {title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-lg text-sm w-9 h-9 flex justify-center items-center transition-colors duration-200 cursor-pointer focus:outline-none  focus:ring-2  focus:ring-blue-500 focus:ring-offset-2  "
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal body */}

          <div className="p-5 md:p-6 text-gray-700 ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
