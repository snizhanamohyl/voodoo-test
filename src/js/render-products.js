import { getAllProducts } from "./api";
import { createProductListMarkup } from "./markup-function";

const paginationEl = document.getElementById("pagination");
const cardListEl = document.getElementById("card-list");
const errorMsgEl = document.getElementById("error-msg");

export const renderList = async (page) => {
  paginationEl.classList.add("pointer-events-none");

  const products = await getAllProducts(page);

  if (!products) {
    cardListEl.classList.add("hidden");
    paginationEl.classList.add("hidden");
    errorMsgEl.classList.remove("hidden");
  } else {
    cardListEl.classList.remove("hidden");
    paginationEl.classList.remove("hidden");
    errorMsgEl.classList.add("hidden");
  }

  const markup = createProductListMarkup(products);
  cardListEl.innerHTML = markup;

  paginationEl.classList.remove("pointer-events-none");
};
