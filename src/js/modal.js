const modalEl = document.getElementById("modal");
const closeBtnEl = document.getElementById("close-modal");
const openCartBtnEl = document.getElementById("open-modal");

const openModal = () => {
  document.body.style.overflow = "hidden";
  modalEl.classList.remove("hidden");
};

const closeModal = () => {
  document.body.style.overflow = "";
  modalEl.classList.add("hidden");
};

openCartBtnEl.addEventListener("click", openModal);
closeBtnEl.addEventListener("click", closeModal);
