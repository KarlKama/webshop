import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

  const [dbProducts, setDbProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const productsDbUrl = process.env.REACT_APP_PRODUCTS_DB_URL;
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


  const foundProduct = findProduct(id, dbProducts); // leiab toote
  if (foundProduct === undefined) {
    return <div>{t('product.error.notfound')}</div>
  }
  
  const index = findIndex(foundProduct.id, dbProducts); // leiab toote indexi, et seda muuta
  
  const commitChanges = () => {

    dbProducts[index] = {
      "id": foundProduct.id,
      "image": imageRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "description": descriptionRef.current.value,
      "category": categoryRef.current.value,
      "active": isActiveRef.current.checked
    }

    fetch(productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts)})
      .then(() => navigate("/admin/products"));

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
      <select ref={categoryRef} defaultValue={foundProduct.category}>
        {categories.map(category => <option key={category.name}>{category.name}</option>)}
      </select> <br />

      <label>{t('product.active')}</label> <br />
      <input ref={isActiveRef} type="checkbox" defaultChecked={foundProduct.active} /> <br />

      <button onClick={commitChanges} >{t("admin.update")}</button> <br />
    </div>
  )
}

export default EditProduct