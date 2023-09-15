import { getAllProducts } from "./api";
import { createProductListMarkup } from "./markup-function";

const cardListEl = document.getElementById("card-list");

const renderList = async () => {
  const products = await getAllProducts();

  const markup = createProductListMarkup(products);

  cardListEl.innerHTML = markup;
};

renderList();
