import React, { useState,  useRef } from 'react'
import productsFromFile from "../../data/products.json";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {findIndex} from '../../util/productsUtil.js';

// NÕUDED
// failist kustutada üks toode +
// minna toodet muutma, saates ID url +

const MaintainProducts = () => {
    const { t } = useTranslation();
    const searchedRef = useRef();

    const [products, setProducts] = useState(productsFromFile);

    const searchFromProducts = () => {
      const result = productsFromFile.filter(products => 
        products.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()) || 
        products.description.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
        products.id.toString().includes(searchedRef.current.value)     
      );
      setProducts(result);

    }

    const deleteProduct = (id) => {
      const index = findIndex(id, productsFromFile);
      productsFromFile.splice(index, 1);
      setProducts(productsFromFile.slice());
    }

    return (
      <div>
        <input onChange={searchFromProducts} ref={searchedRef} type='text' />
        <div>{products.length} tk</div>
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
          <button onClick={() => deleteProduct(product.id)}>{t("admin.delete")}</button>

          <Link to={"/admin/edit/" + product.id}>
            <button>{t("admin.update")}</button>
          </Link>
        </div>
        )}
        
      </div>
    )
  }

export default MaintainProducts