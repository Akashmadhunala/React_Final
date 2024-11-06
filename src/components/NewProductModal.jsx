// src/components/NewProductModal.js
import React, { useState } from 'react';
import { Modal, Input, Button, Form, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from './ProductContext';

const NewProductModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const { setPendingProduct } = useProductContext();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleProceed = () => {
    const newProduct = {
      title: productTitle,
      price: parseFloat(productPrice),
      discountPercentage: parseFloat(productDiscount),
      description: productDescription,
    };

    setPendingProduct(newProduct);
    setIsModalVisible(false);
    navigate('/confirmation');
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>Add Product</Button>
      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ borderRadius: '10px' }}
      >
        <Form layout="vertical" onFinish={handleProceed}>
          <Form.Item 
            label="Title" 
            required
            name="title"
            rules={[
              { required: true, message: 'Please input the product title!' },
              { whitespace: true, message: 'Title cannot be empty or just spaces!' }
            ]}
          >
            <Input
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              style={{ borderRadius: '5px' }}
            />
          </Form.Item>

          <Form.Item 
            label="Price" 
            required
            name="price"
            rules={[
              { required: true, message: 'Please input the product price!' },
              { type: 'number', min: 0, message: 'Price must be a positive number!' }
            ]}
          >
            <InputNumber
              value={productPrice}
              onChange={(value) => setProductPrice(value)}
              style={{ width: '100%', borderRadius: '5px' }}
              min={0}
              precision={2}
              placeholder="Enter product price"
            />
          </Form.Item>

          <Form.Item 
            label="Discount Percentage" 
            name="discountPercentage"
            rules={[
              { required: true, message: 'Please input the discount percentage!' },
              { type: 'number', min: 0, max: 100, message: 'Discount should be between 0 and 100!' }
            ]}
          >
            <InputNumber
              value={productDiscount}
              onChange={(value) => setProductDiscount(value)}
              style={{ width: '100%', borderRadius: '5px' }}
              min={0}
              max={100}
              precision={2}
              placeholder="Enter discount percentage"
            />
          </Form.Item>

          <Form.Item 
            label="Description" 
            required
            name="description"
            rules={[
              { required: true, message: 'Please input the product description!' },
              { whitespace: true, message: 'Description cannot be empty or just spaces!' }
            ]}
          >
            <Input.TextArea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              style={{ borderRadius: '5px' }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '5px' }}>
              Proceed to Confirmation
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewProductModal;
