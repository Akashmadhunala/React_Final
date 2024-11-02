// SearchStyles.js
import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 15px;
`;

export const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 6%;
`;

export const Button = styled.button`
    height: 32px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 0 10px;
    margin-left: 8px; // Add some space between buttons
`;

export const SortButton = styled(Button)`
    background-color: ${(props) => (props.sortOrder === 'asc' ? '#d4edda' : '#f8d7da')};
    color: #155724; // Color for low to high
    &:hover {
        opacity: 0.8; // Add hover effect
    }
`;

export const PriceDropdown = styled.div`
    background-color: #f9f9f9; /* Light background for contrast */
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const ProductContainer = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 10px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9; /* Light background for better contrast */
    transition: box-shadow 0.3s;
    
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px; /* Limit width of product cards */
    margin: 0 auto; /* Center the cards */
`;
