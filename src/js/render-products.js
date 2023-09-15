import { getAllProducts } from "./api";
import { createProductListMarkup } from "./markup-function";

const paginationEl = document.getElementById("pagination");
const cardListEl = document.getElementById("card-list");

export const renderList = async (page) => {
  paginationEl.classList.add("pointer-events-none");

  const products = await getAllProducts(page);

  const markup = createProductListMarkup(products);
  cardListEl.innerHTML = markup;

  paginationEl.classList.remove("pointer-events-none");
};

renderList();
