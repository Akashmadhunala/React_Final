import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs'; // Import dayjs for better date handling
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px;
`;

const DatePickerContainer = styled.div`
    padding: 1%;
    margin: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export default function DatePickers() {
    const [start, setStart] = useState(dayjs().subtract(7, 'days'));  // Default start date (7 days ago)
    const [end, setEnd] = useState(dayjs());  // Default end date (today)

    // When the start date is changed
    const onStartChange = (date) => {
        console.log("Start Date Changed:", date ? date.format("DD-MM-YYYY") : null); // dayjs format
        if (date) {
            // If the selected end date is before the new start date, show an alert and reset the end date
            if (end.isBefore(date, 'day')) {
                alert('End date should not be before the start date.');
                setEnd(date); // Reset end date to the start date
            }
            setStart(date); // Update start date
        }
    };

    // When the end date is changed
    const onEndChange = (date) => {
        console.log("End Date Changed:", date ? date.format("DD-MM-YYYY") : null); // dayjs format
        if (date) {
            // If the end date is before the start date, show an alert and do not update
            if (date.isBefore(start, 'day')) {
                alert('End date must be greater than or equal to the start date.');
                return; // Do not update the end date if invalid
            }
            setEnd(date); // Update end date if it's valid
        }
    };

    // Disable end date selection before the start date
    const disabledEndDate = (current) => {
        return current && current.isBefore(start, 'day'); // Disable any date before the start date
    };

    return (
        <Div>
            <DatePickerContainer>
                <label>Enter Start Date: </label>
                <DatePicker
                    id='startDate'
                    onChange={onStartChange}
                    format={"DD-MM-YYYY"}
                    placeholder='DD-MM-YYYY'
                    value={start}
                />
            </DatePickerContainer>
            <DatePickerContainer>
                <label>Enter End Date: </label>
                <DatePicker
                    id='endDate'
                    onChange={onEndChange}
                    format={"DD-MM-YYYY"}
                    placeholder='DD-MM-YYYY'
                    value={end}
                    disabledDate={disabledEndDate} // Disable end dates before the start date
                />
            </DatePickerContainer>
        </Div>
    );
}
