import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { findProduct } from '../../util/productsUtil.js';
import { Spinner } from 'react-bootstrap';
//import productsFromFile from "../../data/products.json";

const SingleProduct = () => {

  const { t } = useTranslation();
  const { id } = useParams();

  const [dbProducts, setDbProducts] = useState([]);
  const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL; // npm start-iga võtab .env.development.localist  npm run build võtab .env.production.localist, kui seal ei ole siis mõlemal juhul läheb järgmisena .env.localisse
  const [loading, setLoading] = useState(true); // kui api päring toimub siis true

  useEffect(() => {
    fetch(productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setDbProducts(json); //et saada originaalset DB seisu
        setLoading(false);
      })
  }, [productsDbUrl]);


  const product = findProduct(id, dbProducts);
  

  if (product === undefined) {
    return <div>{t("product.error.notfound")}</div>
  }

  if (loading) {
    return <Spinner/>
  }

  return (
    <div>
      <img src={product.image} alt="" />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.description}</div>
      <div>{product.category}</div>
      <div>{product.active}</div>
    </div>
  )
}

export default SingleProduct