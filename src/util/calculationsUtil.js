export const calculateCartSum = (cart) => {
    let sum = 0;
    cart.forEach((p) => (sum += p.product.price * p.quantity));
    return sum.toFixed(2);
}

export const calculateTotalItems = (cart) => {
    let count = 0;
    cart.forEach((p) => (count += p.quantity));
    return count;
}