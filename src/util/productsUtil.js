
export const findProduct = (id, list) => {
    return list.find(product => product.id === Number(id));
}

export const findIndex = (id, list) => {
 return list.findIndex(product => product.id === id);
}
