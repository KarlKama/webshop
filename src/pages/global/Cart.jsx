import React, {useContext, useEffect, useMemo, useState} from 'react'
//import cartFromFile from "../../data/cart.json";
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import ParcelMachines from '../../components/cart/ParcelMachines';
import styles from "../../css/Cart.module.css";
import Payment from '../../components/cart/Payment';
import { CartSumContext } from '../../store/CartSumContext';
import { calculateCartSum, calculateTotalItems } from '../../util/calculationsUtil.js';
import { Spinner } from 'react-bootstrap';


const Cart = () => {

  const [cart, setCart] = useState(
    //JSON.parse(localStorage.getItem("cart") || "[]"));
    []
  );
  const cartLS = useMemo(() => JSON.parse(localStorage.getItem("cart") || "[]"), []); // kasutada, et seda ei updateta iga kord kui rerenderdus toimub
  const { t } = useTranslation();                                   // samuti hea kasutada kulukate funktsioonide puhul
  const { setCartSum, setCartDifferentItems, setCartTotalItems } = useContext(CartSumContext);
  const [loading, setLoading] = useState(true);


  useEffect( () => {
    fetch(process.env.REACT_APP_PRODUCTS_DB_URL)
    .then(res => res.json())
    .then(json => {
      const cartWithProducts = cartLS.map(element => {return { //iga elemendi asendab {} -ga
        "quantity": element.quantity,
        "product": json.find(product => product.id === element.productId) // tekitame uue listi et hinda ja muud infot võtta DBst ja seda ei saaks Localstorages muuta
      }});                    // sisuliselt otsime localstoragest id ja võrdleme db idga et infot saada
      
      setCart(cartWithProducts);
      setLoading(false);
    })
  },[cartLS]); // põhjustab endless loopi kui useMemo ei kasutata
  
  const setCartContent = () => {
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cartLS));
    setCartSum(calculateCartSum(cart));
    setCartDifferentItems(cart.length);
    setCartTotalItems(calculateTotalItems(cart));
  }

  const emptyCart = () => {
    cart.splice(0);
    cartLS.splice(0);
    setCartContent();
  }

  const decreaseQuantity = (index) => {
    cart[index].quantity--;
    cartLS[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
      cartLS.splice(index, 1);
    }
    setCartContent();
  }

  const increaseQuantity = (index) => {
    cart[index].quantity++;
    cartLS[index].quantity++;
    setCartContent();
  }

  const deleteFromCart = (index) => {
    cart.splice(index, 1);
    cartLS.splice(index, 1);
    setCartContent();
  }

  if (loading) {
    return <Spinner/>
  }

  return (
    <div>
      {
      cart.length > 0 && (
        <>
          <button onClick={emptyCart}>{t("cart.empty")}</button>
          <div>
            {t("cart.cart-has")} {cart.length} {t("cart.products")}
          </div>
        </>
        )}
      {
      cart.map((cartProduct, id) =>
        <div className={styles.product} key={id}>
          <img className={styles.image} src={cartProduct.product.image} alt="" />
          <div className={styles.name}>{cartProduct.product.name}</div>
          <div className={styles.price}>{cartProduct.product.description}</div>
          <div>{cartProduct.product.category}</div>
          <div>{cartProduct.product.active + 0}</div>
          <div className={styles.quantity}>
            <button className={styles.button} onClick={() => decreaseQuantity(id)}>
              <img src={require("../../images/minus.png")} alt=''/>
            </button>
            <div>{cartProduct.quantity} pcs</div>
            <button className={styles.button} onClick={() => increaseQuantity(id)}>
            <img src={require("../../images/plus.png")} alt=''/>
            </button>
          </div>
          <div className={styles.total}>{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €</div>
          <button className={styles.button} onClick={() => deleteFromCart(id)}>
          <img src={require("../../images/remove.png")} alt=''/>
          </button>
        </div>
      )}
      {
        cart.length === 0 ? (
        <> 
          <div className={styles["cart-bottom"]}>  {/* kui tahta "-" kasutada nimes */}
            {t("cart.empty-cart")}
          </div>
          <Link to="/">
              <button>{t("cart.view-products")}</button>
          </Link>
        </>
      ) :
        <>
          <div>{t("cart.total-sum")}: {calculateCartSum(cart)} € </div>
          
          <ParcelMachines />

          <Payment cartSum={calculateCartSum(cart)} />
        </>
      }
      
    </div>
  )
}

export default Cart