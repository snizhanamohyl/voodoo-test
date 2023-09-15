import axios from "axios";

axios.defaults.baseURL = "https://voodoo-sandbox.myshopify.com/products.json";

export const getAllProducts = async () => {
  const response = await axios.get("?limit=12");

  return response.data.products;
};

getAllProducts();
