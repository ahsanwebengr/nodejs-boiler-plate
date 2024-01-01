import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/loader/Loader";
const Home = lazy(() => import('./pages/home/Home'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const Search = lazy(() => import('./pages/search/Search'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;