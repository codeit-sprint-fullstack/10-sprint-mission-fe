export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(
      ` https://panda-market-api.vercel.app/docs/products?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function createProduct(productData) {
  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/docs/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
}
