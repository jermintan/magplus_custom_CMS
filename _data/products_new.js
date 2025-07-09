module.exports = async function() {
    try {
      const response = await fetch("https://your-worker-name.uxjermin.workers.dev/products");
  
      if (!response.ok) {
        console.error(`Failed to fetch products from worker: ${response.status} ${response.statusText}`);
        return []; // Return an empty array to prevent build errors
      }
  
      const products = await response.json();
      return products || []; // Ensure we return an array, even if the worker returns null
    } catch (error) {
      console.error("Error fetching products from worker:", error);
      return []; // Return an empty array to prevent build errors
    }
  };