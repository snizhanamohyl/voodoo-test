const template = document.createElement("template");

template.innerHTML = `
    <style>
        @import url(/style.css);
    </style>
    <div data-disclosure class="rounded overflow-hidden">
        <div class="flex items-center justify-between p-6 gap-6 bg-primary text-secondary">
            <div class="flex gap-1.5 items-center">
                <svg width="24" height="24" stroke="currentColor">
                    <use href="./images/sprite.svg#icon-alert-circle"></use>
                </svg>
                <p class="uppercase text-base font-bold mr-6 2xl:mr-12">Alpha</p>
                <slot name="msg" class="font-medium">Important info</slot>
            </div>
            <button data-toggle class="transition-colors hover:text-modalHover focus-visible:text-modalHover" >
                <svg class="transition-transform duration-300" width="24" height="24" stroke="currentColor">
                    <use href="./images/sprite.svg#icon-chevron-down"></use>
                </svg>
            </button>
        </div>
        <div data-info class="hidden bg-bgModal text-secondary px-6 py-12">
            <slot name="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi at voluptates quam veniam fugiat iusto quaerat, ad harum nam reprehenderit quis amet est ipsum nemo exercitationem porro dolorum doloribus, voluptatum fuga impedit. Natus officia odit, nobis unde, est totam necessitatibus voluptates alias iste hic nesciunt magni assumenda. Voluptatibus, nobis? Voluptas.</slot>
        </div>
    </div>
`;

class Disclosure extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });

    let clone = template.content.cloneNode(true);
    this.root.append(clone);

    const btnSlot = this.root.querySelector("[data-toggle]");

    const toggleDisclosure = (e) => {
      const disclosureInfoEl = e.target
        .closest("[data-disclosure]")
        .querySelector("[data-info]");

      const chevronSvgEl = e.currentTarget.querySelector("svg");

      if (disclosureInfoEl.classList.contains("hidden")) {
        disclosureInfoEl.classList.remove("hidden");
        chevronSvgEl.classList.add("rotate-180");
      } else {
        disclosureInfoEl.classList.add("hidden");
        chevronSvgEl.classList.remove("rotate-180");
      }
    };

    btnSlot.addEventListener("click", toggleDisclosure);
  }
}

customElements.define("info-disclosure", Disclosure);
