const productListEl = document.getElementById("card-list");
const cartListEl = document.getElementById("cart-list");
const emptyCartMsgEl = document.getElementById("empty-cart-msg");
const cartNumberEl = document.getElementById("cart-number");

const changeQuatityTypes = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
};

const getProductsFromLS = () => {
  const products = localStorage.getItem("productsInCart")
    ? JSON.parse(localStorage.getItem("productsInCart"))
    : [];

  return products;
};

const normalizeCost = (cost) => {
  return Number.isInteger(cost)
    ? `${cost}.00`
    : (Math.ceil(cost * 100) / 100).toFixed(2);
};

const countTotalCost = () => {
  const productsInCart = getProductsFromLS();

  const totalCost = productsInCart.reduce(
    (acc, product) => (acc += Number(product.price) * Number(product.quantity)),
    0
  );

  document.querySelector("[data-cost]").innerText = `${normalizeCost(
    totalCost
  )} KR.`;
};

const addProductToLS = (product) => {
  const productsInCart = getProductsFromLS();

  if (productsInCart.find((cartProduct) => cartProduct.id === product.id))
    return;

  localStorage.setItem(
    "productsInCart",
    JSON.stringify([...productsInCart, { ...product, quantity: 1 }])
  );
};

const removeProductFromLS = (productId) => {
  const productsInCart = getProductsFromLS();

  const productIndex = productsInCart.findIndex(
    (product) => product.id === productId
  );

  productsInCart.splice(productIndex, 1);

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
};

const changeProductInLS = (productId, dataToUpdate) => {
  const productsInCart = getProductsFromLS();

  const updatedProducts = productsInCart.map((product) =>
    product.id === productId ? { ...product, ...dataToUpdate } : product
  );

  localStorage.setItem("productsInCart", JSON.stringify(updatedProducts));
};

const changeQuatity = (e, type) => {
  const card = e.target.closest("[data-id]");
  const productId = card.dataset.id;
  const currentQuantity = Number(
    card.querySelector("[data-quantity]").innerText
  );

  const newQuantity =
    type === changeQuatityTypes.INCREASE
      ? currentQuantity + 1
      : currentQuantity - 1;

  if (newQuantity < 1) return;

  if (newQuantity === 1) {
    card.querySelector("[data-minus").classList.add("text-modalHover");
  } else {
    card.querySelector("[data-minus").classList.remove("text-modalHover");
  }

  changeProductInLS(productId, { quantity: newQuantity });

  card.querySelector("[data-quantity]").innerText = newQuantity;
  countTotalCost();
};

const createCartItemMarkup = ({ id, title, img, price, quantity }) => {
  return `<li data-id="${id}" class="flex gap-[18px]">
          <img class="shrink-0 w-[74px] h-[74px] border border-secondary bg-secondary object-cover rounded-sm" width="74" height="74" src="${img}" alt="${title}">
          <div class="flex flex-col self-stretch justify-between grow">
            <p>${title}</p>
            <p>${price} KR.</p>
            <div class="flex items-center">
              <button data-minus class="${
                quantity === 1 ? "text-modalHover" : ""
              } w-5 h-5 flex items-center justify-center transition-colors rounded-full p-3 hover:text-modalHover focus-visible:text-modalHover">
                -
              </button>
              <p data-quantity class="w-5 h-5 flex items-center justify-center">${quantity}</p>
              <button data-plus class="w-5 h-5 flex items-center justify-center transition-colors rounded-full p-3 text-secondary hover:text-modalHover focus-visible:text-modalHover">
                +
              </button>
            </div>
          </div>
          <button class="delete-product transition-colors flex items-start hover:text-modalHover focus:text-modalHover">
            <svg width="24" height="24" fill="currentColor">
              <use href="./images/sprite.svg#icon-trash-bin"></use>
            </svg>
          </button>
        </li>
    `;
};

const addListenerToDeleteBtns = () => {
  const deleteBtnsElems = document.querySelectorAll(".delete-product");

  deleteBtnsElems.forEach((btn) => btn.addEventListener("click", onDelete));
};

const addListenersToChangeQuantityBtns = () => {
  const plusBtnsElems = document.querySelectorAll("[data-plus]");
  const minusBtnsElems = document.querySelectorAll("[data-minus]");

  plusBtnsElems.forEach((btn) =>
    btn.addEventListener("click", (e) =>
      changeQuatity(e, changeQuatityTypes.INCREASE)
    )
  );
  minusBtnsElems.forEach((btn) =>
    btn.addEventListener("click", (e) =>
      changeQuatity(e, changeQuatityTypes.DECREASE)
    )
  );
};

const renderCartItems = () => {
  const productsInCart = getProductsFromLS();

  if (productsInCart.length === 0) {
    emptyCartMsgEl.classList.remove("hidden");
  } else {
    emptyCartMsgEl.classList.add("hidden");
  }

  const markup = productsInCart.reduce((acc, product) => {
    return (acc += createCartItemMarkup(product));
  }, "");

  cartListEl.innerHTML = markup;

  if (productsInCart.length) {
    cartNumberEl.classList.remove("hidden");
    cartNumberEl.innerText = productsInCart.length;
  } else {
    cartNumberEl.classList.add("hidden");
  }
  addListenerToDeleteBtns();
  addListenersToChangeQuantityBtns();
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
  countTotalCost();
};

const onDelete = (e) => {
  const productId = e.target.closest("[data-id]").dataset.id;

  removeProductFromLS(productId);
  renderCartItems();
  countTotalCost();
};

productListEl.addEventListener("click", onProductListClick);

renderCartItems();
countTotalCost();
