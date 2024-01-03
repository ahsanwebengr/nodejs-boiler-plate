import { Link } from "react-router-dom"
import ProductCard from "../../components/productCard/ProductCard"

const Home = () => {
  const addToCart = () => {

  }
  return (
    <div className="home">
      <section></section>
      <div className="heading">
        <h1>Latest Products</h1>
        <Link to={'/search'} className="find-more">MORE</Link>
      </div>

      <main>
        <ProductCard productId="24fdrtsdgds" name="iPhone" price={500} stock={1} handler={addToCart} photoUrl="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/41GFCpGReNL._AC_UY327_FMwebp_QL65_.jpg" />
      </main>

    </div>
  )
}

export default Home