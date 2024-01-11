import React, { useContext } from 'react'
import styles from "../../css/HomePage.module.css";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartSumContext } from '../../store/CartSumContext';
import { calculateCartSum, calculateTotalItems } from '../../util/calculationsUtil.js';

const Product = ({product}) => {
    const { t } = useTranslation();
    const { setCartSum, setCartDifferentItems, setCartTotalItems } = useContext(CartSumContext);

    const addToCart = (productClicked) => {
        /* cartFromFile.push(product);
        localStorage.setItem("cart", cartFromFile); */
    
        // localStorageisse ei saa pushida/addida uusi objecte
        // 1. võtta vana seis localStorages
        // 2. parse-da Array kujule ehk võtta jutumärgid ära
        // 3. lisada juurde .push()
        // 4. paneme jutumärgid ise peale -> keerame Array stringiks
        // 5. panna tagasi localStoragesse (set abil ehk asend uue väärtusega vana)
    
        const cartLS = JSON.parse(localStorage.getItem("cart") || "[]"); // juhuks kui cart on tühi
    
        const index = cartLS.findIndex(p => p.productId === productClicked.id); // saan aru kas toode on juba ostukorvis
        if (index >= 0) { // kui toode leitakse siis lisatakse 1 quantity juurde
          cartLS[index].quantity++;
        } 
        else {
          cartLS.push({"quantity": 1, "productId": productClicked.id})
        }
        setCartSum(calculateCartSum(cartLS));
        setCartDifferentItems(cartLS.length);
        setCartTotalItems(calculateTotalItems(cartLS));

        localStorage.setItem("cart", JSON.stringify(cartLS));
    }

    return (
            <div className={styles.product}>
            <img src={product.image} alt="" />
            <div>{product.id}</div>
            <div>{product.name}</div>
            <div>{product.price.toFixed(2)} €</div>
            <div>{product.description}</div>
            <div>{product.category}</div>
            <div>{product.active}</div>
            <Link to={"/product/" + product.id}>
                <button>{t("home.detailed")}</button>
            </Link>
            <button onClick={() => addToCart(product)} >{t("home.add-to-cart")}</button>
            </div>
            
    )
}

export default Product