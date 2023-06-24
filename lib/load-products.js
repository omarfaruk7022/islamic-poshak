export async function loadProducts() {
  const res = await fetch("https://bmw-server.onrender.com/api/product");
  const products = await res.json((data) => console.log(data));
  return products;
}
