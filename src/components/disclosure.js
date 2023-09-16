const template = document.createElement("template");

template.innerHTML = `
    <style>
      // @import url('./style.css');

      .wrap {
        border-radius: 4px;
        overflow: hidden;
      }

      .head {
        display: flex;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        align-items: center;
        justify-content: space-between;
        padding: 24px;
        gap: 24px;
        background-color: #000000;
        color: #FCF7E6;
      }

      .head__text-wrap {
         display: flex;
         gap: 6px;
         align-items: center;
      }

      .alert__text {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 700;
        margin-right: 24px;

        @media screen and (min-width: 900px) {
          margin-right: 48px;
        }
      }

      .head__msg {
        font-weight: 500;
      }

      .btn {
        color: inherit;
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .btn:hover, .btn:focus-visible {
        color: #bfb9a3;
      }

      .hidden {
        display: none;
      }

      .info-wrap {
        background-color: #1E1E1E;
        color: #FCF7E6;
        padding: 48px 24px 48px 24px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      
      .svg {
        transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        transform: rotate(0deg);
      }

      .rotate-180 {
        transform: rotate(180deg);
      }
  
    </style>
    <div data-disclosure class="wrap">
        <div class="head">
            <div class="head__text-wrap">
                <svg width="24" height="24" stroke="currentColor" viewBox="0 0 32 32">
                  <path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M16 29.333c7.364 0 13.333-5.97 13.333-13.333s-5.97-13.333-13.333-13.333c-7.364 0-13.333 5.97-13.333 13.333s5.97 13.333 13.333 13.333z"></path>
                  <path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M16 10.667v5.333"></path>
                  <path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M16 21.333h0.013"></path>
                </svg>
                <p class="alert__text">Alpha</p>
                <slot name="msg" class="head__msg">Important info</slot>
            </div>
            <button data-toggle class="btn" >
                <svg class="svg" width="24" height="24" stroke="currentColor" viewBox="0 0 32 32">
                  <path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M8 12l8 8 8-8"></path>
                </svg>
            </button>
        </div>
        <div data-info class="hidden info-wrap">
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

// styled with Tailwind css

//  <div data-disclosure class="rounded overflow-hidden">
//    <div class="flex items-center justify-between p-6 gap-6 bg-primary text-secondary">
//      <div class="flex gap-1.5 items-center">
//        <svg width="24" height="24" stroke="currentColor">
//          <use href="./images/sprite.svg#icon-alert-circle"></use>
//        </svg>
//        <p class="uppercase text-base font-bold mr-6 2xl:mr-12">Alpha</p>
//        <slot name="msg" class="font-medium">
//          Important info
//        </slot>
//      </div>
//      <button
//        data-toggle
//        class="transition-colors hover:text-modalHover focus-visible:text-modalHover"
//      >
//        <svg
//          class="transition-transform duration-300"
//          width="24"
//          height="24"
//          stroke="currentColor"
//        >
//          <use href="./images/sprite.svg#icon-chevron-down"></use>
//        </svg>
//      </button>
//    </div>
//    <div data-info class="hidden bg-bgModal text-secondary px-6 py-12">
//      <slot name="text">
//        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi at
//        voluptates quam veniam fugiat iusto quaerat, ad harum nam reprehenderit
//        quis amet est ipsum nemo exercitationem porro dolorum doloribus,
//        voluptatum fuga impedit. Natus officia odit, nobis unde, est totam
//        necessitatibus voluptates alias iste hic nesciunt magni assumenda.
//        Voluptatibus, nobis? Voluptas.
//      </slot>
//    </div>
//  </div>;
