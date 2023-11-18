import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { findProduct } from '../../util/productsUtil.js';
import productsFromFile from "../../data/products.json";

//NÕUDED
// URLi saatma HomePage-ist ID +
// alla võtma + 
// õige üles otsida +
// välja kuvama +
// kui ei leitud siis mingi sõnum +

const SingleProduct = () => {

  const { t } = useTranslation();
  const { id } = useParams();

  const product = findProduct(id, productsFromFile);
  

  if (product === undefined) {
    return <div>{t("product.error.notfound")}</div>
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