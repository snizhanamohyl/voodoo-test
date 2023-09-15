export const createProductListMarkup = (products) => {
  const listMarkup = products.reduce((acc, product) => {
    const { title, condition = "Slightly used", variants, images } = product;

    const { price } = variants[0];

    const image = images[0]?.src
      ? images[0]?.src
      : "https://cdn-icons-png.flaticon.com/512/8676/8676496.png";

    const cardMarkup = `<li class="relative transition-transform hover:scale-[102%] w-[342px] 2xl:w-[300px]">
                <a href="#">
                <img class="mb-3 w-[342px] h-[300px] object-cover rounded border 2xl:w-[300px]"
                    src="${image}" alt="image">
                <div class="flex justify-between mb-3">
                    <div class="font-bold flex flex-col justify-between">
                        <p class="first-letter:capitalize ">${title}</p>
                        <p>${price} KR.</p>
                    </div>
                    <div class="text-right flex flex-col justify-between">
                        <p class="font-medium">Condition</p>
                        <p class="min-w-[90px]">${condition}</p>
                    </div>
                </div>
                <button
                    class="w-full font-bold uppercase py-4 bg-primary text-tertiary rounded transition-opacity hover:opacity-80 focus:opacity-80">Add to
                    cart</button>
                <p class="absolute top-3 left-3 p-2 font-xs uppercase bg-primary text-tertiary rounded">Used</p>
                </a>
                </li>`;

    return (acc += cardMarkup);
  }, "");

  return listMarkup;
};
