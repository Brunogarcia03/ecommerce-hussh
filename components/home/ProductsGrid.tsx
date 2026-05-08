import Product from "../ui/Product";
import Sizes from "../home/Sizes";

import img1 from "@/assets/images/img_1.jpg";
import img2 from "@/assets/images/img_2.jpg";
import img3 from "@/assets/images/img_3.jpg";
import img4 from "@/assets/images/img_4.jpg";

const products = [
  {
    number: "001",
    title: "HSH",
    category: "T-shirt",
    price: "$89",
    tag: "SS 26",
    img: img1.src,
  },
  {
    number: "002",
    title: "HSH",
    category: "Pants",
    price: "$149",
    img: img2.src,
  },
  {
    number: "003",
    title: "HSH",
    category: "Jacket",
    price: "$229",
    tag: "New",
    img: img3.src,
  },
  {
    number: "004",
    title: "HSH",
    category: "Dress",
    price: "$179",
    img: img4.src,
  },
];

const ProductsGrid = () => {
  return (
    <section className="product-grid hidden w-full bg-black text-white sm:px-6 pt-24 pb-16">
      {/* Section header */}
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-b border-white/20 pb-6">
        <h2 className="font-barlow text-3xl font-extrabold uppercase text-white">
          Collection
        </h2>
        <div className="flex items-center gap-x-4">
          <Sizes />
          <p className="font-spline text-[0.65rem] text-gray uppercase">
            {products.length} items — SS 26
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-[1.6rem] gap-y-12">
        {products.map((p) => (
          <Product key={p.number} {...p} />
        ))}
      </div>
    </section>
  );
};

export default ProductsGrid;
