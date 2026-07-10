import { ItemCard } from "./ItemCard";

export const ItemList = ({
  products,
  columns = "col-12 col-md-6 col-lg-4"
}) => {

  return (
    <div className="products-container row g-4">

      {products.map((product) => (

        <div
          key={product.id}
          className={columns}
        >
          <ItemCard product={product} />
        </div>

      ))}

    </div>
  );
};