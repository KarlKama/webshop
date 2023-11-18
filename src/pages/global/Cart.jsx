import React, {useState} from 'react'
import cartFromFile from "../../data/cart.json";
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';


//NÕUDED
// võtta failist kogu ostukorv +
// kuvada välja + 
// võimaldada ühte ostukorvist kustutada +
// ostukorvi tühjendada +
// dünaamiline väljakuvamine ehk kui ostukorv on tühi, näidatakse midagi muud +
// ostukorvi kogusumma +

const Cart = () => {

  const [cart, setCart] = useState(cartFromFile);
  const { t } = useTranslation();

  const emptyCart = () => {
    cart.splice(0);
    setCart(cart.slice());
  }

  const deleteFromCart = (index) => {
    cartFromFile.splice(index, 1);
    setCart(cartFromFile.slice());
    localStorage.setItem("cart", cartFromFile);
  }

  const calculateCartSum = () => {
    let sum = 0;
    
    cart.forEach(product => sum += product.price);
    return sum;
  }

  return (
    <div>
      {cart.length > 0 && <button onClick={emptyCart}>{t("cart.empty")}</button>}
      <div>{t("cart.cart-has")} {cart.length} {t("cart.products")}</div>
      {
      cart.map((product, id) =>
        <div key={id}>
          <img src={product.image} alt="" />
          <div>{product.name}</div>
          <div>{product.description}</div>
          <div>{product.category}</div>
          <div>{product.price} €</div>
          <div>{product.active + 0}</div>
          <button onClick={() => deleteFromCart(id)}>x</button>
        </div>
      )}
      {
        cart.length === 0 &&
        <> 
          <div>
            {t("cart.empty-cart")}
          </div>
          <Link to="/">
              <button>{t("cart.view-products")}</button>
          </Link>
        </>
      }

      <div>{t("cart.total-sum")}: {calculateCartSum()} € </div>
    </div>
  )
}

export default Cart