import React, { useState } from 'react'
import productsFromFile from "../../data/products.json";


const MaintainProducts = () => {

    const [products, setProducts] = useState(productsFromFile);
  
    // failist kustutada üks toode

    // minna toodet muutma, saates ID url

    return (
      <div>
        { 
        products.map(product =>
        <div>
          <img src={product.image} alt="" />
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price} €</div>
          <div>{product.description}</div>
          <div>{product.category}</div>
          <div>{product.active}</div>
          <button>Kustuta</button>
          <button>Muutma</button>
        </div>
        )}
        
      </div>
    )
  }

export default MaintainProducts