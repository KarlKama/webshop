import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const FilterButtons = ({productsCopy, setProducts}) => {
    const { t } = useTranslation();

    const [categories, setCategories] = useState([]);
    const categoriesDbUrl = process.env.REACT_APP_CATEGORIES_DB_URL;

    useEffect(() => {
        fetch(categoriesDbUrl)
        .then(res => res.json())
        .then(json => {
        setCategories(json); //et saada originaalset DB seisu
        })
    }, [categoriesDbUrl]);

    const filterByGroup = (name) => {
        clearFilter();
        let filteredProducts = productsCopy.filter(product => product.category === name);
        setProducts(filteredProducts);
    }
    
    const clearFilter = () => {
        setProducts(productsCopy);
    }

    return (
        <>
            <div> {t("home.filter-by-category")} </div>
            <div className="btn-group p-4" role="group">
                {/* <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("lego")}>{t("home.filter-lego")}</button>
                <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("star wars")}>{t("home.filter-star")}</button>
                <button className="btn btn-secondary btn-sm" onClick={() => filterByGroup("figure")}>{t("home.filter-figure")}</button> */}
                {
                categories.map(category => 
                    <button 
                        key={category.name}
                        className="btn btn-secondary btn-sm" 
                        onClick={() => filterByGroup(category.name)}>
                            {t("category." + category.name)}
                    </button>
                )}
                <button className="btn btn-primary btn-sm" onClick={() => clearFilter()}>{t("home.clear-filter")}</button>
            </div>
        </>
    )
}

export default FilterButtons