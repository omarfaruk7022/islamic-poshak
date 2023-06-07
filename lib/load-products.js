export async function loadProducts() {
  const res = await fetch("http://localhost:5000/api/product");
  const products = await res.json((data) => console.log(data));
  return products;
}
