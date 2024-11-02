import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, InputNumber, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ProductContext } from '../ProductContext';
import { useNavigate } from "react-router-dom";

const NewProductModal = () => {
  const { setProductData } = useContext(ProductContext);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 
  const navigate=useNavigate(); //Used to redirect to other pages

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setProductData(values);
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields(); // Reset the form after submission
        }, 2000);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });

      return navigate('/confirm')

  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
        <Button type="primary" onClick={showModal}>
            Add New Product
        </Button>
        <Modal
            title="Add New Product"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
        >
            <Form
            form={form} 
            layout="vertical" 
            name="productForm"
            initialValues={{ remember: true }} // Set initial form values
            >
            <Form.Item
                label="Product Name"
                name="title"
                rules={[{ required: true, message: 'Please input the product name!' }]}
            >
                <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input the price!' }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter product price" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the product description!' }]}
            >
                <Input.TextArea placeholder="Enter product description" />
            </Form.Item>

            <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: false}]}
            >
                <Input style={{ width: '100%' }} placeholder="Enter product brand" />
            </Form.Item>

            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true,message:'Please input the product category!'}]}
            >
                <Input style={{ width: '100%' }} placeholder="Enter product category" />
            </Form.Item>

            <Form.Item
                label="Dimensions"
                name="dimensions"
                rules={[{ required: true, message: 'Please input the dimensions!' }]}
            >
            <Space>
                <Form.Item
                    name="height"
                    noStyle
                    rules={[{ required: true, message: 'Please input the height!' }]}
                >
                    <InputNumber placeholder="Height" />
                </Form.Item>

                <Form.Item
                    name="width"
                    noStyle
                    rules={[{ required: true, message: 'Please input the width!' }]}
                >
                    <InputNumber placeholder="Width" />
                </Form.Item>

                <Form.Item
                    name="depth"
                    noStyle
                    rules={[{ required: true, message: 'Please input the depth!' }]}
                >
                    <InputNumber placeholder="Depth" />
                </Form.Item>
                </Space>
            </Form.Item>

            <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: false}]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter product discount percentage" />
            </Form.Item>

            <Form.Item
                label="Minimum Order Quantity"
                name="minimumOrderQuantity"
                rules={[{ required: true, message: 'Please input the minimum order quantity!' }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter product minimum order quantity" />
            </Form.Item>


            <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please input the rating!' }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter product rating" />
            </Form.Item>

            <Form.Item
                label="Availability Status"
                name="availabilityStatus"
                rules={[{ required: true, message: 'Please input the availability status!' }]}
            >
                <Input style={{ width: '100%' }} placeholder="Enter product availability status" />
            </Form.Item>

            <Form.Item
                label="Shipping Information"
                name="shippingInformation"
                rules={[{ required: true, message: 'Please input the shipping information!' }]}
            >
                <Input style={{ width: '100%' }} placeholder="Enter product shipping information" />
            </Form.Item>

            <Form.Item
                label="Warranty Information"
                name="warrantyInformation"
                rules={[{ required: true, message: 'Please input the warranty information!' }]}
            >
                <Input style={{ width: '100%' }} placeholder="Enter product warranty information" />
            </Form.Item>

            <Form.List name="images">
                    {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                            {...restField}
                            name={[name]}
                            fieldKey={[fieldKey]}
                            rules={[{ required: true, message: 'Please input the image URL!' }]}
                            >
                            <Input placeholder="Enter image URL" style={{ width: '400px' }} />
                            </Form.Item>
                            {/* Button to remove this specific field */}
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                        ))}

                        {/* Button to add more fields */}
                        <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Image URL
                        </Button>
                        </Form.Item>
                    </>
                    )}
            </Form.List>

            </Form>
        </Modal>
    </>
  );
};


export default NewProductModal;