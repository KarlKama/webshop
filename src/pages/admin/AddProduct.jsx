import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import productsFromFile from "../../data/products.json";
//import { Spinner } from 'react-bootstrap';


// NÕUDED
// lisada faili üks toode juurde (refreshiga kustub)

const AddProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const imageRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const isActiveRef = useRef();

  const [dbProducts, setDbProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL; // npm start-iga võtab .env.development.localist  npm run build võtab .env.production.localist, kui seal ei ole siis mõlemal juhul läheb järgmisena .env.localisse
  const categoriesDbUrl = process.env.REACT_APP_CATEGORIES_DB_URL;


  useEffect(() => {
    fetch(productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setDbProducts(json); //et saada originaalset DB seisu
      })
    fetch(categoriesDbUrl)
    .then(res => res.json())
    .then(json => {
      setCategories(json); //et saada originaalset DB seisu
    })
  }, [productsDbUrl, categoriesDbUrl]);

  const addProduct = () => {
    if (nameRef.current.value === "") {
      return
    }

    if (priceRef.current.value === "") {
      return
    }

    const previousMaximumId = Math.max(...dbProducts.map(product => product.id));
  
    dbProducts.push(
      {
        "id": previousMaximumId + 1,
        "image": imageRef.current.value,
        "name": nameRef.current.value,
        "price": Number(priceRef.current.value),
        "description": descriptionRef.current.value,
        "category": categoryRef.current.value,
        "active": isActiveRef.current.checked,
      }
    )
    fetch(productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts)})
      .then(() => navigate("/admin/products"));
    
  }

  return (
    <div>
      <label>{t("product.name")}</label> <br />
      <input ref={nameRef} type="text" /> <br />

      <label>{t("product.price")}</label> <br />
      <input ref={priceRef} type="number"/> <br />

      <label>{t("product.image")}</label> <br />
      <input ref={imageRef} type="text" /> <br />

      <label>{t("product.description")}</label> <br />
      <input ref={descriptionRef} type="text" /> <br />

      <label>{t("product.category")}</label> <br />
      <select ref={categoryRef} >
        {categories.map(category => <option key={category.name}>{category.name}</option>)}
      </select> <br />

      <label>{t("product.active")}</label> <br />
      <input ref={isActiveRef} type="checkbox"  /> <br />

      <button onClick={addProduct} >{t("admin.add")}</button> <br />
    </div>
  )
}

export default AddProduct