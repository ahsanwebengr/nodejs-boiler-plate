import { FaPlus } from "react-icons/fa";
type ProductsProps = {
    productId: string,
    photoUrl: string,
    name: string,
    price: number,
    stock: number,
    handler: () => void;
}

// const server = '34ff3dgf';

const ProductCard = ({ productId, photoUrl, name, price, stock, handler }: ProductsProps) => {
    return (
        <div className="product-card">
            <img src={`${photoUrl}`} alt={name} />
            <p>{name}</p>
            <span>$ {price}</span>
            <div><button onClick={() => handler()}> <FaPlus /> </button></div>
        </div>
    );
};

export default ProductCard;
