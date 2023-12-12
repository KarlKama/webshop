import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
//import productsFromFile from "../../data/products.json";



const HomePage = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  //const [productsCopy] = useState(productsFromFile);
  const [productsCopy, setDbProducts] = useState([]);
  const [nameSortToggle, setNameSortToggle] = useState(true); // kasutame selleks, et toggledada name sortimist
  const [priceSortToggle, setPriceSortToggle] = useState(true); // kasutame selleks, et toggledada hinna sortimist
  const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL; // npm start-iga võtab .env.development.localist  npm run build võtab .env.production.localist, kui seal ei ole siis mõlemal juhul läheb järgmisena .env.localisse
  const [loading, setLoading] = useState(true); // kui api päring toimub siis true

  useEffect(() => {
    fetch(productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json);  // väljanäidatav HTMLis
        setDbProducts(json); //et saada originaalset DB seisu
        setLoading(false);
      })
  }, [productsDbUrl]);

  const sortByName = () => {
    let sortDesc = nameSortToggle;

    if (sortDesc) {
      products.sort((a,b) => b.name.localeCompare(a.name));
    }
    else {
      products.sort((a,b) => a.name.localeCompare(b.name));
    }
    setProducts(products.slice());
    setNameSortToggle(!sortDesc); // anname vastupidise väärtuse järgmiseks sortimiseks
  }

  const sortByPrice = () => {
    let sortDesc = priceSortToggle;

    if (sortDesc) {
      products.sort((a,b) => b.price - a.price);
    }
    else {
      products.sort((a,b) => a.price - b.price);
    }
    setProducts(products.slice());
    setPriceSortToggle(!sortDesc); // anname vastupidise väärtuse järgmiseks sortimiseks
  }

  const filterByGroup = (name) => {
    clearFilter();
    let filteredProducts = productsCopy.filter(product => product.category === name);
    setProducts(filteredProducts);
  }

  const clearFilter = () => {
    setProducts(productsCopy);
  }

  const addToCart = (product) => {
    /* cartFromFile.push(product);
    localStorage.setItem("cart", cartFromFile); */

    // localStorageisse ei saa pushida/addida uusi objecte
    // 1. võtta vana seis localStorages
    // 2. parse-da Array kujule ehk võtta jutumärgid ära
    // 3. lisada juurde .push()
    // 4. paneme jutumärgid ise peale -> keerame Array stringiks
    // 5. panna tagasi localStoragesse (set abil ehk asend uue väärtusega vana)

    const cartLS = JSON.parse(localStorage.getItem("cart") || "[]"); // juhuks kui cart on tühi
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));
  }

  if (loading) {
    return <Spinner/>
  }

  return (
    <div>
      <div> {t("home.sort-by")} </div>
      <div className="btn-group p-4" role="group">
        <button className="btn btn-secondary btn-sm" onClick={sortByName}> {t("home.sort-by-name")} </button>
        <button className="btn btn-secondary btn-sm" onClick={sortByPrice}> {t("home.sort-by-price")} </button><br />
      </div>
      <div>
      <div> {t("home.filter-by-category")} </div>
      <div className="btn-group p-4" role="group">
        <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("lego")}>{t("home.filter-lego")}</button>
        <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("star wars")}>{t("home.filter-star")}</button>
        <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("figure")}>{t("home.filter-figure")}</button>
        <button className="btn btn-primary btn-sm" onClick={() => clearFilter()}>{t("home.clear-filter")}</button>
      </div>
        
      </div>
      { 
      products.map(product =>
      <div key={product.id}>
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
      )}
      
    </div>
  )
}

export default HomePage