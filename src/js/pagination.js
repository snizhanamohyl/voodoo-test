import { renderList } from "./render-products";
import { limit } from "./api";

const paginationEl = document.getElementById("pagination");

const totalProductCount = 461;
const maxPaginationBtnNumber = 7;

const numberOfBtns = Math.ceil(totalProductCount / limit);

let currentPage = 1;

const gapPaginationBtnMarkup = `<li class="w-10 font-inter h-10 rounded-full border border-primary flex items-center justify-center">...</li>`;

const createBtnMarkup = (pageNamber) => {
  return `<li>
        <button data-page="${pageNamber}" class="${
    pageNamber === currentPage ? "bg-primary text-tertiary" : ""
  } w-10 font-inter h-10 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-secondary">
            ${pageNamber}
        </button>
    </li>`;
};

const createPaginationMarkup = () => {
  let markup = "";

  if (numberOfBtns <= maxPaginationBtnNumber) {
    for (let i = 1; i <= numberOfBtns; i += 1) {
      markup += createBtnMarkup(i);
    }
  } else if (currentPage < maxPaginationBtnNumber - 2) {
    for (let i = 1; i <= maxPaginationBtnNumber - 2; i += 1) {
      markup += createBtnMarkup(i);
    }

    markup += gapPaginationBtnMarkup;

    markup += createBtnMarkup(numberOfBtns);
  } else if (currentPage > numberOfBtns - maxPaginationBtnNumber + 3) {
    markup += createBtnMarkup(1);

    markup += gapPaginationBtnMarkup;

    for (
      let i = numberOfBtns - maxPaginationBtnNumber + 3;
      i <= numberOfBtns;
      i += 1
    ) {
      markup += createBtnMarkup(i);
    }
  } else {
    markup += createBtnMarkup(1);

    markup += gapPaginationBtnMarkup;

    for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
      markup += createBtnMarkup(i);
    }

    markup += gapPaginationBtnMarkup;

    markup += createBtnMarkup(numberOfBtns);
  }

  paginationEl.innerHTML = markup;
};

const onClick = async (e) => {
  if (e.target.nodeName !== "BUTTON") return;

  const page = Number(e.target.dataset.page);
  if (page === currentPage) return;

  currentPage = page;

  renderList(currentPage);
  createPaginationMarkup();
};

paginationEl.addEventListener("click", onClick);

createPaginationMarkup();
