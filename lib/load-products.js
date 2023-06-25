export async function loadProducts() {
  const res = await fetch(
    "https://easy-plum-caridea-tie.cyclic.app/api/product"
  );
  const products = await res.json((data) => console.log(data));
  return products;
}
