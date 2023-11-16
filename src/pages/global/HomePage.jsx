import React, { useState } from 'react'
import productsFromFile from "../../data/products.json";

const HomePage = () => {
  const [products, setProducts] = useState(productsFromFile);

  //lisa localStorage-sse ostukorv

  // võiks läbi faili teha ehk lisada faili üks toode juurde

  // võimaldada minna SingleProduct lehele

  // Sorteerimine A-Z ja teistpidi
  // Sorteerimine hind mõlemat pidi

  // Kategooriate alusel filterdamine:

  //    -star wars
  //    -lego
  //    -figure

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
        <button>Lisa ostukorvi</button>
      </div>
      )}
      
    </div>
  )
}

export default HomePage