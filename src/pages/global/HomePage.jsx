import React, { useState } from 'react'
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useTranslation } from 'react-i18next';
import productsFromFile from "../../data/products.json";
import cartFromFile from "../../data/cart.json";

// NÕUDED
// võimaldada minna SingleProduct lehele +

// lisa localStorage-sse ostukorv
// võiks läbi faili teha ehk lisada faili üks toode juurde +

// Sorteerimine A-Z ja teistpidi +
// Sorteerimine hind mõlemat pidi +

// Kategooriate alusel filterdamine: +
//    -star wars +
//    -lego +
//    -figure +

const HomePage = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState(productsFromFile);
  const [productsCopy] = useState(productsFromFile);
  const [nameSortToggle, setNameSortToggle] = useState(true); // kasutame selleks, et toggledada name sortimist
  const [priceSortToggle, setPriceSortToggle] = useState(true); // kasutame selleks, et toggledada hinna sortimist

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
    let filteredProducts = products.filter(product => product.category === name);
    setProducts(filteredProducts);
  }

  const clearFilter = () => {
    setProducts(productsCopy);
  }

  const addToCart = (product) => {
    cartFromFile.push(product);
    localStorage.setItem("cart", cartFromFile);
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
        <div>{product.price} €</div>
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