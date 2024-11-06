import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../ProductContext';
import { Button, Form, InputNumber, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    flex-wrap:wrap;

`;

export default function ConfirmationPage({addProductSubmit}) {
    const navigate=useNavigate(); //Used to redirect to other pages
    const { productData } = useContext(ProductContext);
    const [form] = Form.useForm(); 

    // Set the form values whenever productData changes
    useEffect(() => {
        if (productData) {
            form.setFieldsValue(productData);
        }
    }, [productData, form]);

    const handleSubmit = (values) => {
        const {
            availabilityStatus, brand, category, depth, description, discount, height, images,
            minimumOrderQuantity, price, rating, shippingInformation, title, warrantyInformation, width
        } = values;

        const newProduct = {
            id: uuidv4(),
            title,
            description,
            category,
            price,
            discountPercentage: discount,
            rating,
            stock: 0,
            tags: [],
            brand,
            sku: "",
            weight: 0,
            dimensions: {
                width,
                height,
                depth
            },
            warrantyInformation,
            shippingInformation,
            availabilityStatus,
            reviews: [{}],
            returnPolicy: "",
            minimumOrderQuantity,
            meta: {},
            images,
            thumbnail: ""
        };

        addProductSubmit(newProduct);
        toast.success("Product added successfully");
        navigate('/');
    };
    return (
        <>
        <h2 style={{textAlign:'center'}}>Confirm - Add New Product</h2>
        <Div>
        <Form 
            form={form} // Link the form instance
            layout="vertical" // Make it a vertical layout form
            name="productForm"
            initialValues={{ remember: true }} // Initial values can be kept simple
            onFinish={handleSubmit}
            
        >
            <Form.Item
                label="Product Name"
                name="title"
                rules={[{ required: true, message: 'Please input the product name!' }]}
            >
                <Input placeholder="Enter product name" style={{ width: '250px' }} />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input the price!' }]}
            >
                <InputNumber style={{ width: '250px' }} placeholder="Enter product price" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the product description!' }]}
            >
                <Input.TextArea placeholder="Enter product description" style={{ width: '250px' }} />
            </Form.Item>

            <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: false }]}
            >
                <Input style={{ width: '250px' }} placeholder="Enter product brand" />
            </Form.Item>

            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please input the product category!' }]}
            >
                <Input style={{ width: '250px' }} placeholder="Enter product category" />
            </Form.Item>

            <Form.Item
    label="Dimensions"
    name="dimensions"
    // No longer apply validation to the whole `dimensions` object
>
    <Space>
        <Form.Item
            name="height"
            noStyle
            rules={[{ required: true, message: 'Please input the height!' }]}
        >
            <InputNumber placeholder="Height" style={{ width: '80px' }} />
        </Form.Item>

        <Form.Item
            name="width"
            noStyle
            rules={[{ required: true, message: 'Please input the width!' }]}
        >
            <InputNumber placeholder="Width" style={{ width: '80px' }} />
        </Form.Item>

        <Form.Item
            name="depth"
            noStyle
            rules={[{ required: true, message: 'Please input the depth!' }]}
        >
            <InputNumber placeholder="Depth" style={{ width: '80px' }} />
        </Form.Item>
    </Space>
</Form.Item>

            <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: false }]}
            >
                <InputNumber style={{ width: '250px' }} placeholder="Enter product discount percentage" />
            </Form.Item>

            <Form.Item
                label="Minimum Order Quantity"
                name="minimumOrderQuantity"
                rules={[{ required: true, message: 'Please input the minimum order quantity!' }]}
            >
                <InputNumber style={{ width: '250px' }} placeholder="Enter product minimum order quantity" />
            </Form.Item>

            <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please input the rating!' }]}
            >
                <InputNumber style={{ width: '250px' }} placeholder="Enter product rating" />
            </Form.Item>

            <Form.Item
                label="Availability Status"
                name="availabilityStatus"
                rules={[{ required: true, message: 'Please input the availability status!' }]}
            >
                <Input style={{ width: '250px' }} placeholder="Enter product availability status" />
            </Form.Item>

            <Form.Item
                label="Shipping Information"
                name="shippingInformation"
                rules={[{ required: true, message: 'Please input the shipping information!' }]}
            >
                <Input style={{ width: '250px' }} placeholder="Enter product shipping information" />
            </Form.Item>

            <Form.Item
                label="Warranty Information"
                name="warrantyInformation"
                rules={[{ required: true, message: 'Please input the warranty information!' }]}
            >
                <Input style={{ width: '250px' }} placeholder="Enter product warranty information" />
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
                                    <Input placeholder="Enter image URL" style={{ width: '250px' }} />
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
            <Div>
                <Button type="primary" htmlType="submit" style={{ padding: '10px 15px', borderRadius: '10px', fontWeight: '500', fontSize: '1rem' }}>
                    Confirm
                </Button>
            </Div>
        </Form>
        
        </Div>
        
        </>
    );
}
