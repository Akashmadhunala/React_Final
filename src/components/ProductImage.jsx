// src/components/ProductImage.jsx
import React, { useState } from 'react';
import { Image, Spin } from 'antd';

const ProductImage = ({ images }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  // Ensure `images` is defined and contains at least one image before rendering
  const imageSrc = images && images.length > 0 ? images[0] : '';

  return (
    <>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <Spin size="large" /> {/* Spinner while image is loading */}
        </div>
      )}

      {imageSrc ? (
        <Image.PreviewGroup items={images}>
          <Image
            width="80%"
            src={imageSrc}
            style={{ display: loading ? 'none' : 'block' }}
            onLoad={handleImageLoad}
          />
        </Image.PreviewGroup>
      ) : (
        <div style={{ textAlign: 'center', color: '#888' }}>No image available</div>
      )}
    </>
  );
};

export default ProductImage;
