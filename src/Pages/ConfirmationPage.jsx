// src/pages/ConfirmationPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../components/ProductContext';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@tanstack/react-query';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { pendingProduct, setPendingProduct, addProduct } = useProductContext();

  // Form submission handler
  const handleSubmit = (values) => {
    const newProduct = { 
      id: uuidv4(), 
      title: values.title, 
      description: values.description, 
      price: values.price,
      discountPercentage: values.discountPercentage,
    };

    // Call addProduct function to add the product
    addProduct(newProduct);
  };

  // Redirect to home if no pending product is found
  useEffect(() => {
    if (!pendingProduct) {
      navigate('/');  
    }
  }, [pendingProduct, navigate]);

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Confirm Your Product Details</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item 
          label="Product Name" 
          name="title" 
          initialValue={pendingProduct?.title}
          rules={[
            { required: true, message: 'Please input the product name!' },
            { whitespace: true, message: 'Product name cannot be empty or just spaces!' }
          ]}
        >
          <Input placeholder="Enter product name" style={{ width: '100%', borderRadius: '5px' }} />
        </Form.Item>
        
        <Form.Item 
          label="Product Description" 
          name="description" 
          initialValue={pendingProduct?.description}
          rules={[
            { required: true, message: 'Please input the product description!' },
            { whitespace: true, message: 'Description cannot be empty or just spaces!' }
          ]}
        >
          <Input.TextArea placeholder="Enter product description" style={{ width: '100%', borderRadius: '5px' }} />
        </Form.Item>

        <Form.Item 
          label="Price" 
          name="price" 
          initialValue={pendingProduct?.price}
          rules={[
            { required: true, message: 'Please input the product price!' },
            { type: 'number', min: 0, message: 'Price must be a positive number!' }
          ]}
        >
          <InputNumber placeholder="Enter product price" style={{ width: '100%', borderRadius: '5px' }} min={0} precision={2} />
        </Form.Item>

        <Form.Item 
          label="Discount Percentage" 
          name="discountPercentage" 
          initialValue={pendingProduct?.discountPercentage}
          rules={[
            { required: true, message: 'Please input the discount percentage!' },
            { type: 'number', min: 0, max: 100, message: 'Discount should be between 0 and 100!' }
          ]}
        >
          <InputNumber placeholder="Enter discount percentage" style={{ width: '100%', borderRadius: '5px' }} min={0} max={100} precision={2} />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '5px', backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
          Confirm
        </Button>
      </Form>
    </div>
  );
}
