import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const SortButtons = (props) => { 

    const [nameSortToggle, setNameSortToggle] = useState(true); // kasutame selleks, et toggledada name sortimist
    const [priceSortToggle, setPriceSortToggle] = useState(true); // kasutame selleks, et toggledada hinna sortimist
    const { t } = useTranslation();
  

    const sortByName = () => {
        let sortDesc = nameSortToggle;
    
        if (sortDesc) {
          props.products.sort((a,b) => b.name.localeCompare(a.name));
        }
        else {
          props.products.sort((a,b) => a.name.localeCompare(b.name));
        }
        props.setProducts(props.products.slice());
        setNameSortToggle(!sortDesc); // anname vastupidise väärtuse järgmiseks sortimiseks
      }
    
      const sortByPrice = () => {
        let sortDesc = priceSortToggle;
    
        if (sortDesc) {
          props.products.sort((a,b) => b.price - a.price);
        }
        else {
          props.products.sort((a,b) => a.price - b.price);
        }
        props.setProducts(props.products.slice());
        setPriceSortToggle(!sortDesc); // anname vastupidise väärtuse järgmiseks sortimiseks
      }

  return (
    <React.Fragment> {/* tühi div kuhu külge saab atribuute panna */}
        <div> {t("home.sort-by")} </div>
        <div className="btn-group p-4" role="group">
            <button className="btn btn-secondary btn-sm" onClick={sortByName}> {t("home.sort-by-name")} </button>
            <button className="btn btn-secondary btn-sm" onClick={sortByPrice}> {t("home.sort-by-price")} </button><br />
        </div>
    </React.Fragment>
  )
}

export default SortButtons