import axios from "axios";

axios.defaults.baseURL = "https://voodoo-sandbox.myshopify.com/products.json";

export const limit = 24;

export const getAllProducts = async (page = 1) => {
  try {
    const response = await axios.get(`?limit=${limit}&page=${page}`);

    return response.data.products;
  } catch (error) {
    console.error("Error occured on fetching products:", error);
    return null;
  }
};

getAllProducts();
