const BASE_URL = "http://localhost:9090/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dq0lbjuag";

const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY:"/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  GET_ALL_INCOMES:"/incomes",
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  ADD_INCOME: "/incomes",
  DELETE_INCOME: (id) => `/incomes/${id}`,
  ADD_EXPENSE:"/expenses",
  GET_ALL_EXPENSES:"/expenses",
  DELETE_EXPENSE: (id) => `/expenses/${id}`,
  INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
  EMAIL_INCOME:"/email/income-excel",
  APPLY_FILTERS:"/filter",
  DASHBOARD_DATA:"/dashboard",
  EXPENSE_EXCEL_DOWNLOAD:"/excel/download/expense",
  EMIAL_EXPENSE:"/email/expense-excel",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};

export { BASE_URL, API_ENDPOINTS };
