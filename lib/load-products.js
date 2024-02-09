export async function loadProducts() {
  const res = await fetch("https://frantic-crab-cape.cyclic.app/api/product");
  const products = await res.json((data) => console.log(data));
  return products;
}
