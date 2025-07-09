module.exports = async () => {
  const workerUrl = 'https://magplus-cms-worker.uxjermin.workers.dev/'; // Replace with your Worker's URL

  try {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const response = await fetch(workerUrl);

    if (!response.ok) {
      console.error(`Error fetching products from Worker: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json(); // Parse the JSON response

     if (!data || typeof data !== 'object' || !data.products || !Array.isArray(data.products)) {
        console.error('Invalid data format from Worker:', data);
        return [];
      }

    const products = data.products; // Access the 'products' array inside the JSON object

    // Add Slug?
    const filteredProducts = products.map(product => ({
        ...product,
        slug: product.slug || slugify(product.title) // Generate the slug
      }));

    return filteredProducts;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

function slugify(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}