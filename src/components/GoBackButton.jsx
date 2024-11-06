// src/components/GoBackButton.js

import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

// A reusable component for the "Go Back" button
const GoBackButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
      Go Back
    </Button>
  );
};

export default GoBackButton;
