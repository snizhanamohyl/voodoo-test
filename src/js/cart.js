const productListEl = document.getElementById("card-list");
const cartListEl = document.getElementById("cart-list");

const getProductFromLS = () => {
  const products = localStorage.getItem("productsInCart")
    ? JSON.parse(localStorage.getItem("productsInCart"))
    : [];

  return products;
};

const addProductToLS = (product) => {
  const productsInCart = getProductFromLS();

  if (productsInCart.find((cartProduct) => cartProduct.id === product.id))
    return;

  localStorage.setItem(
    "productsInCart",
    JSON.stringify([...productsInCart, product])
  );
};

const removeProductFromLS = (productId) => {
  const productsInCart = getProductFromLS();

  const productIndex = productsInCart.findIndex(
    (product) => product.id === productId
  );

  productsInCart.splice(productIndex, 1);

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
};

const createCartItemMarkup = ({ id, title, img, price }) => {
  return `<li data-id="${id}" class="flex gap-[18px]">
          <img class="w-[74px] h-[74px] border border-secondary bg-secondary object-cover rounded-sm" width="74" height="74" src="${img}" alt="${title}">
          <div class="flex flex-col self-stretch justify-between grow">
            <p>${title}</p>
            <p>${price} KR.</p>
            <div class="flex items-center">
              <button class="w-5 h-5 flex items-center justify-center transition-colors rounded-full p-3 hover:text-modalHover focus:text-modalHover">
                -
              </button>
              <p class="w-5 h-5 flex items-center justify-center">1</p>
              <button class="w-5 h-5 flex items-center justify-center transition-colors rounded-full p-3 text-secondary hover:text-modalHover focus:text-modalHover">
                +
              </button>
            </div>
          </div>
          <button class="delete-product transition-colors flex items-start hover:text-modalHover focus:text-modalHover">
            <svg width="24" height="24" fill="currentColor">
              <use href="../images/sprite.svg#icon-trash-bin"></use>
            </svg>
          </button>
        </li>
    `;
};

const addListenerToDeleteBtns = () => {
  const deleteBtnsElems = document.querySelectorAll(".delete-product");

  deleteBtnsElems.forEach((btn) => btn.addEventListener("click", onDelete));
};

const renderCartItems = () => {
  const productsInCart = getProductFromLS();

  const markup = productsInCart.reduce((acc, product) => {
    return (acc += createCartItemMarkup(product));
  }, "");

  cartListEl.innerHTML = markup;
  addListenerToDeleteBtns();
};

const onProductListClick = (e) => {
  e.preventDefault();

  if (e.target.nodeName !== "BUTTON") return;

  const cardEl = e.target.closest("li");

  const productData = {
    id: cardEl.getAttribute("id"),
    title: cardEl.querySelector("[data-title]").dataset.title,
    price: cardEl.querySelector("[data-price]").dataset.price,
    condition: cardEl.querySelector("[data-condition]").dataset.condition,
    img: cardEl.querySelector("img").getAttribute("src"),
  };

  addProductToLS(productData);
  renderCartItems();
};

const onDelete = (e) => {
  const productId = e.target.closest("[data-id]").dataset.id;

  removeProductFromLS(productId);
  renderCartItems();
};

productListEl.addEventListener("click", onProductListClick);

renderCartItems();
