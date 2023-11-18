import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import productsFromFile from "../../data/products.json";


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
  const previousMaximumId = Math.max(...productsFromFile.map(product => product.id));

  const addProduct = () => {
    if (nameRef.current.value === "") {
      return
    }

    if (priceRef.current.value === "") {
      return
    }
  
    productsFromFile.push(
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

    navigate("/admin/products");

    
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
      <input ref={categoryRef} type="text" /> <br />

      <label>{t("product.active")}</label> <br />
      <input ref={isActiveRef} type="checkbox"  /> <br />

      <button onClick={addProduct} >{t("admin.add")}</button> <br />
    </div>
  )
}

export default AddProduct