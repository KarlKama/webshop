import React, { useEffect, useRef, useState } from 'react'

const MaintainCategories = () => {

  const url = process.env.REACT_APP_CATEGORIES_DB_URL;
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setCategories(json || []))
  }, [url]);

  const add = () => {
    categories.push({"name": categoryRef.current.value});
    fetch(url, {"method": "PUT", "body": JSON.stringify(categories)})  // PUT kirjutab terve kategooria listi üle ehk terve andmebaasi
      .then(() => {
        setCategories(categories.slice())
        categoryRef.current.value = "";
      });
  }

  const remove = (index) => {
    categories.splice(index, 1);
    fetch(url, {"method": "PUT", "body": JSON.stringify(categories)})  // PUT kirjutab terve kategooria listi üle ehk terve andmebaasi
      .then(() => {
        setCategories(categories.slice())
      });
  }

  return (
    <div>
      <label>Kategooria nimi</label> <br />
      <input ref={categoryRef} type="text"/> <br />
      <button onClick={add}>Lisa</button> <br />
      {
      categories.map(
        (category, index) => 
          <div>
            {category.name} 
            <button onClick={() => remove(index)}>x</button>
          </div>)
      }
    </div>
  );
}

export default MaintainCategories