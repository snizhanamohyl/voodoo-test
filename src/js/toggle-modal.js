const modalEl = document.getElementById("modal");
const closeBtnEl = document.getElementById("close-modal");
const openCartBtnEl = document.getElementById("open-modal");

const openModal = () => {
  modalEl.classList.remove("hidden");
};

const closeModal = () => {
  modalEl.classList.add("hidden");
};

openCartBtnEl.addEventListener("click", openModal);
closeBtnEl.addEventListener("click", closeModal);
