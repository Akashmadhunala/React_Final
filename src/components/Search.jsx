import React, { useState, Suspense, lazy, useEffect, useMemo } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined, DownOutlined } from '@ant-design/icons';
import { AutoComplete, Dropdown, Space, Spin, Pagination } from 'antd';
import NewProductModal from './NewProductModal';
import { useProductContext } from './ProductContext';
import useMapping from '../hooks/useMapping';
import { Form, Div, SortButton, ProductContainer, CardWrapper, PriceDropdown } from './SearchStyles';

const ProductImage = lazy(() => import('./ProductImage'));

const Search = () => {
  const [inp, setInp] = useState(""); // state for search input
  const [currentPage, setCurrentPage] = useState(1); // pagination state
  const itemsPerPage = 5; // items per page for pagination

  const { loading, error } = useProductContext();
  const { sortedProducts, sortData } = useMapping(); // Use sorted products from custom hook

  // AutoComplete options for search
  const options = useMemo(
    () => sortedProducts?.map(({ id, title }) => ({ label: title, value: title, key: id })) || [],
    [sortedProducts]
  );

  // Filter products based on search input (starts with the entered value)
  const filteredProducts = useMemo(
    () => sortedProducts?.filter(({ title }) => title.toLowerCase().startsWith(inp.toLowerCase())) || [],
    [sortedProducts, inp]
  );

  // Pagination logic
  const currentItems = useMemo(
    () => filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredProducts, currentPage]
  );

  // Sorting menu items
  const items = [
    { key: '1', label: <SortButton onClick={() => sortData('lowToHigh')}>Low To High</SortButton>, icon: <ArrowUpOutlined /> },
    { key: '2', label: <SortButton onClick={() => sortData('highToLow')}>High To Low</SortButton>, icon: <ArrowDownOutlined /> },
    { key: '3', label: <SortButton onClick={() => sortData('discount')}>By Discount</SortButton> },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <h2>Error loading products!</h2>;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column-reverse' }}>
        <Form onSubmit={e => { e.preventDefault(); setCurrentPage(1); }}>
          <AutoComplete
            style={{ width: 300 }}
            options={inp ? options.filter(option => option.value.toLowerCase().startsWith(inp.toLowerCase())) : []}
            onSearch={setInp}
            placeholder="Search Any Product"
            value={inp}
          />
        </Form>
        <NewProductModal />
      </div>

      {sortedProducts?.length > 0 && (
        <div style={{ position: 'absolute', right: '2%', marginTop: '3%' }}>
          <PriceDropdown>
            <Dropdown menu={{ items }}>
              <a onClick={e => e.preventDefault()}>
                <Space>Filter <DownOutlined /></Space>
              </a>
            </Dropdown>
          </PriceDropdown>
        </div>
      )}

      <CardWrapper>
        {currentItems.length > 0 ? currentItems.map(item => (
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
                        <h2 style={{ margin: 0 }}>{item.title}</h2>
                        <div style={{ display: "flex", alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem' }}>{item.rating}</span> &nbsp;
                          <div className="Stars" style={{ "--rating": item.rating }}></div>
                        </div>
                        <p>Brand: {item.brand || <i className="fa-solid fa-ban" style={{ color: "#ff1e00" }}></i>}</p>
                      </div>
                      <hr />
                      <div>
                        <h2 style={{ display: 'inline' }}>&#36;{item.price}</h2><br />
                        Discount: {item.discountPercentage}%
                      </div>
                      <hr />
                      <div>About This Item: <br /> {item.description}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Div>
          </ProductContainer>
        )) : <h2>No Products Found</h2>}
      </CardWrapper>

      <div style={{ display: "flex", justifyContent: 'center' }}>
        <Pagination
          current={currentPage}
          onChange={setCurrentPage}
          total={filteredProducts.length}
          pageSize={itemsPerPage} // Fixed page size without the "items per page" dropdown
          showSizeChanger={false} // Disable the "items per page" dropdown
        />
      </div>
    </>
  );
};

export default Search;
