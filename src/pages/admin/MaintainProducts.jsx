import React, { useState,  useRef, useEffect } from 'react'
//import productsFromFile from "../../data/products.json";
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {findIndex} from '../../util/productsUtil.js';
import ConfirmationModal from '../../components/ConfirmationModal.jsx';

// NÕUDED
// failist kustutada üks toode +
// minna toodet muutma, saates ID url +

const MaintainProducts = () => {
    const { t } = useTranslation();
    const searchedRef = useRef();
    const confirmationModal = useRef(); // tekitame childile refi

    const [products, setProducts] = useState([]);

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


    const searchFromProducts = () => {
      const result = productsCopy.filter(products => 
        products.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()) || 
        products.description.toLowerCase().includes(searchedRef.current.value.toLowerCase()) ||
        products.id.toString().includes(searchedRef.current.value)     
      );
      setProducts(result);

    }

    const deleteProduct = (id) => {
      const index = findIndex(id, productsCopy);
      if (index >= 0) { // kui index on -1 siis ei leitud, kui -1ga kustutatakse siis kustutatakse viimane element
        productsCopy.splice(index, 1);
        //setProducts(productsCopy.slice());
        //fetch(productsDbUrl, {"method": "PUT", "body": JSON.stringify(productsCopy)})
        searchFromProducts();
        confirmationModal.current.closeModal();
      }
    }


    if (loading) {
      return <Spinner/>
    }

    return (
      <div>
        <ConfirmationModal
          ref={confirmationModal} // childis forwardRef
          modalMessage="product"
          confirmed={deleteProduct}
        />
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
          <button onClick={() => confirmationModal.current.handleShow(product.id)}>{t("admin.delete")}</button> {/* saan ligi funktsioonile */}

          <Link to={"/admin/edit/" + product.id}>
            <button>{t("admin.update")}</button>
          </Link>
        </div>
        )}
        
      </div>
    )
  }

export default MaintainProducts