// ProductContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Create the context
export const ProductContext = createContext();

// Custom hook to use the product context
export const useProductContext = () => useContext(ProductContext);

// Fetching function for React Query
const fetchProducts = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=100');
  if (!res.ok) throw new Error('Error fetching products');
  const data = await res.json();
  return data.products;
};

// ProductProvider component
export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: products, isLoading: loading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [pendingProduct, setPendingProduct] = useState(null);

  // Function to add a confirmed product
  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error('Failed to add product');

      const addedProduct = await res.json();

      // Update the context's product list after successful addition
      queryClient.setQueryData(['products'], (oldData) => {
        const updatedData = [...oldData, addedProduct];
        console.log('Updated Products:', updatedData); // Log the updated products list
        return updatedData;
      });

      setPendingProduct(null); // Clear pending product after adding
    } catch (error) {
      console.error('Error adding product:', error);
      throw error; // Allow the component to handle error if needed
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, pendingProduct, setPendingProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
