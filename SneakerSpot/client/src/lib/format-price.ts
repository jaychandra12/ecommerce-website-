/**
 * Formats a price value to a standard format
 * Safely handles different price formats from the API
 */
export function formatPrice(price: number | string): string {
  try {
    const numericPrice = typeof price === 'number' 
      ? price 
      : parseFloat(String(price));
    
    return `$${numericPrice.toFixed(2)}`;
  } catch (error) {
    console.error("Error formatting price:", error);
    return `$${price}`;
  }
}