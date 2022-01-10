import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cardIsShown, setCardIsShown] = useState(false)

  const showCardHendler = () => {
    setCardIsShown(true)
  }

  const hideCardHendler = () => {
    setCardIsShown(false)
  }

  return (
    <CartProvider>
      {cardIsShown && <Cart onHideCart={hideCardHendler} />}
      <Header onShowCart={showCardHendler} />
      <main><Meals /></main>
    </CartProvider>
  );
}

export default App;
