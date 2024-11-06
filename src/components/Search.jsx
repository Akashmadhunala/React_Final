import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined, DownOutlined } from '@ant-design/icons';
import { AutoComplete, Dropdown, Space, Spin, Pagination } from 'antd';
import axios from 'axios';
import NewProductModal from './NewProductModal';
import { useQuery } from '@tanstack/react-query';
import { Form, Div, Button, SortButton, ProductContainer, CardWrapper, PriceDropdown } from './SearchStyles';

const ProductImage = lazy(() => import('./ProductImage'));

const Search = () => {
    const [options, setOptions] = useState([]);
    const [inp, setInp] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch products using React Query
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['searchProducts', inp],
        queryFn: async () => {
            const response = await axios.get(`https://dummyjson.com/products/search`, {
                params: { q: inp },
            });
            return response.data.products || [];
        },
        enabled: false, // disable auto-fetch until search is submitted
    });

    useEffect(() => {
        if (data) {
            setSearchData(data); // Set local state with fetched data for sorting
        }
    }, [data]);

    // Fetch options for AutoComplete
    useEffect(() => {
        const fetchOptions = async () => {
            const res = await fetch('https://dummyjson.com/products?limit=0');
            const data = await res.json();
            const opt = data.products.map(product => ({
                label: product.title,
                value: product.title,
                key: product.id,
            }));
            setOptions(opt);
        };
        fetchOptions();
    }, []);

    const handleInput = (value) => {
        setInp(value);
    };

    const handleSelect = (value) => {
        setInp(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCurrentPage(1);
        refetch(); // Trigger data fetch with React Query
    };

    // Sorting functions for different sorting options
    const sortAsc = () => {
        const sortedData = [...searchData].sort((a, b) => a.price - b.price);
        setSearchData(sortedData);
    };

    const sortDsc = () => {
        const sortedData = [...searchData].sort((a, b) => b.price - a.price);
        setSearchData(sortedData);
    };

    const sortByDiscount = () => {
        const sortedData = [...searchData].sort((a, b) => b.discountPercentage - a.discountPercentage);
        setSearchData(sortedData);
    };

    const items = [
        { key: '1', label: <SortButton onClick={sortAsc}>Low To High</SortButton>, icon: <ArrowUpOutlined /> },
        { key: '2', label: <SortButton onClick={sortDsc}>High To Low</SortButton>, icon: <ArrowDownOutlined /> },
        { key: '3', label: <SortButton onClick={sortByDiscount}>By Discount</SortButton> },
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(searchData.length / itemsPerPage);

    return (
        <>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column-reverse' }}>
                <Form onSubmit={handleSubmit}>
                    <AutoComplete
                        style={{ width: 300 }}
                        options={inp ? options : []}
                        onSearch={handleInput}
                        onSelect={handleSelect}
                        filterOption={true}
                        placeholder="Search Any Product"
                        value={inp}
                    />
                    &nbsp;&nbsp;
                    <Button type="submit">Search</Button>
                </Form>
                <NewProductModal />
            </div>

            {searchData.length > 0 && (
                <div style={{ position: 'absolute', right: '2%', marginTop: '3%' }}>
                    <PriceDropdown>
                        <Dropdown menu={{ items }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>Filter <DownOutlined /></Space>
                            </a>
                        </Dropdown>
                    </PriceDropdown>
                </div>
            )}

            <CardWrapper>
                {currentItems.length > 0 ? currentItems.map((item) => (
                    <ProductContainer key={item.id}>
                        <Div>
                            <table width="80%">
                                <tbody>
                                    <tr>
                                        <td style={{ width: '40%' }}>
                                            <Suspense fallback={<Spin />}>
                                                <ProductImage images={item.images} />
                                            </Suspense>
                                        </td>
                                        <td style={{ width: '60%' }}>
                                            <div>
                                                <h2 style={{ display: 'inline', margin: 0 }}>{item.title}</h2>
                                                <div style={{ display: "flex", alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.8rem' }}>{item.rating}</span> &nbsp;
                                                    <div className="Stars" style={{ "--rating": item.rating, display: "inline" }}></div>
                                                </div>
                                                <p>
                                                    Brand: {item.brand || <i className="fa-solid fa-ban" style={{ color: "#ff1e00" }}></i>}
                                                </p>
                                            </div>
                                            <hr />
                                            <div>
                                                <h2 style={{ display: 'inline' }}>&#36;{item.price}</h2><br />
                                                Discount: {item.discountPercentage}%
                                            </div>
                                            <hr />
                                            <div>About This Item: <br /> {item.description}</div>
                                            <hr />
                                            <div style={{ textTransform: 'capitalize' }}>
                                                Category: {item.category} <br />
                                                Availability Status: <span style={{ color: item.availabilityStatus === 'Dead Stock' ? 'red' : item.availabilityStatus === 'In Stock' ? 'green' : 'goldenrod', fontWeight: '400' }}> {item.availabilityStatus}</span><br />
                                                Warranty Information: {item.warrantyInformation} <br />
                                                Dimensions: {item.dimensions.height} X {item.dimensions.width} X {item.dimensions.depth} (Height X Width X Depth)
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Div>
                        <br /><br />
                        <div style={{ textAlign: 'center', marginBottom: '5%' }}>
                            <h2>Reviews</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '80%', margin: '0 auto' }}>
                                {item.reviews?.map((rev, index) => (
                                    <div key={index} style={{ borderRadius: '8px', textAlign: 'center', padding: '8px', backgroundColor: '#f9f6ee' }}>
                                        <strong>{rev.reviewerName}</strong><br />
                                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '0.8rem' }}>{rev.rating}</span> &nbsp;
                                            <div className="Stars" style={{ "--rating": rev.rating, display: "inline" }}></div>
                                        </div>
                                        <span>{rev.comment}</span><br />
                                        <span>{new Date(rev.date).toLocaleDateString('en-US')}</span><br />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ProductContainer>
                )) : <Div style={{ fontWeight: "500", fontSize: "1.5rem" }}>Product not available</Div>}
            </CardWrapper>

            {totalPages > 1 && (
                <Pagination
                    current={currentPage}
                    total={searchData.length}
                    pageSize={itemsPerPage}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ textAlign: 'center', marginTop: '20px' }}
                />
            )}
        </>
    );
};

export default Search;
