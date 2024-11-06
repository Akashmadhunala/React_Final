import { useState, useEffect } from 'react';
import { useProductContext } from '../components/ProductContext';

const useMapping = () => {
  const { products } = useProductContext(); // Access products from context
  const [sortedProducts, setSortedProducts] = useState(products); // State to hold the sorted products

  // This function handles the sorting based on the selected criteria
  const sortData = (criteria) => {
    let sortedArray = [...products]; // Create a copy of the products array to sort
    
    switch (criteria) {
      case 'lowToHigh':
        sortedArray = sortedArray.sort((a, b) => a.price - b.price); // Sort by price (low to high)
        break;
      case 'highToLow':
        sortedArray = sortedArray.sort((a, b) => b.price - a.price); // Sort by price (high to low)
        break;
      case 'discount':
        sortedArray = sortedArray.sort((a, b) => b.discountPercentage - a.discountPercentage); // Sort by discount
        break;
      default:
        break;
    }

    setSortedProducts(sortedArray); // Update the sorted products state
  };

  // Update the sorted products whenever products change
  useEffect(() => {
    setSortedProducts(products); // Reset sorted products when the product list changes
  }, [products]);

  return { sortedProducts, sortData }; // Return the sorted products and sortData function
};

export default useMapping;
