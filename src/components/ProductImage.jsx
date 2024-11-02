import React, { useState } from 'react';
import { Image, Spin } from 'antd';

const ProductImage = ({ images }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <Spin size='large'/> {/* Spinner while image is loading */}
        </div>
      )}
  
      <Image.PreviewGroup items={images}>
        <Image
          width="80%"
          src={images[0]}
          style={{ display: loading ? 'none' : 'block' }} 
          onLoad={handleImageLoad} 
        />
      </Image.PreviewGroup>
    </>
  );
};

export default ProductImage;
