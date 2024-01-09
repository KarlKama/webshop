import React, { useState, useEffect } from 'react'

import { Spinner } from 'react-bootstrap';
import styles from "../../css/HomePage.module.css";
import SortButtons from '../../components/home/SortButtons';
import FilterButtons from '../../components/home/FilterButtons';
import Product from '../../components/home/Product';
//import productsFromFile from "../../data/products.json";



const HomePage = () => {
 
  const [products, setProducts] = useState([]);
  //const [productsCopy] = useState(productsFromFile);
  const [productsCopy, setDbProducts] = useState([]);
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


  if (loading) {
    return <Spinner/>
  }

  return (
    <div>
      Tooteid kokku: {products.length}
      <div>
        <SortButtons 
          products={products}
          setProducts={setProducts}
        />
        <FilterButtons
          productsCopy={productsCopy}
          setProducts={setProducts}
        />
      </div>
      <div className={styles.products}>
        { 
        products.map(product =>
          <Product
            key={product.id} product={product} /* !!! key peab olema komponendi väljakutse juures */
          />
        )}
      </div>
      
    </div>
  )
}

export default HomePage