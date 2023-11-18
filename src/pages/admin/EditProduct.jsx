import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productsFromFile from "../../data/products.json";
import { useTranslation } from 'react-i18next';
import {findProduct, findIndex} from '../../util/productsUtil.js';

// NÕUDED
// URList võtma ID +
// õige toote üles otsima ID abil ehk .find() +
// leidma indeksi eraldi .indexOf() .findIndex abil +
// defaultValue-d vormis +
// useNavigate-ga kui muudetud, siis liikuda +
// refreshiga muudatused kaovad +

const EditProduct = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const imageRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const isActiveRef = useRef();

  const foundProduct = findProduct(id, productsFromFile); // leiab toote
  if (foundProduct === undefined) {
    return <div>{t('product.error.notfound')}</div>
  }
  
  const index = findIndex(foundProduct.id, productsFromFile); // leiab toote indexi, et seda muuta
  
  const commitChanges = () => {

    productsFromFile[index] = {
      "id": foundProduct.id,
      "image": imageRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "description": descriptionRef.current.value,
      "category": categoryRef.current.value,
      "active": isActiveRef.current.checked
    }

    navigate("/admin/products");

  }  

  return (
    <div>
      <label>ID: {foundProduct.id} </label> <br />
      <label>{t('product.name')}</label> <br />
      <input ref={nameRef} type="text" defaultValue={foundProduct.name} /> <br />

      <label>{t('product.price')}</label> <br />
      <input ref={priceRef} type="text" defaultValue={foundProduct.price}/> <br />

      <label>{t('product.image')}</label> <br />
      <input ref={imageRef} type="text" defaultValue={foundProduct.image} /> <br />

      <label>{t('product.description')}</label> <br />
      <input ref={descriptionRef} type="text" defaultValue={foundProduct.description} /> <br />

      <label>{t('product.category')}</label> <br />
      <input ref={categoryRef} type="text" defaultValue={foundProduct.category} /> <br />

      <label>{t('product.active')}</label> <br />
      <input ref={isActiveRef} type="checkbox" defaultChecked={foundProduct.active} /> <br />

      <button onClick={commitChanges} >{t("admin.update")}</button> <br />
    </div>
  )
}

export default EditProduct