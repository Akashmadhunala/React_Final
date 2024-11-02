import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
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
    const [start, setStart] = useState(moment().subtract(7, 'days'));
    const [end, setEnd] = useState(moment());

    const onStartChange = (date) => {
        console.log("Start Date Changed:", date ? date.format("DD-MM-YYYY") : null);
        if (date) {
            setStart(date);
            if (end.isBefore(date)) {
                alert('End date should not be before the start date.'); // Alert
            }
        }
    };

    const onEndChange = (date) => {
        console.log("End Date Changed:", date ? date.format("DD-MM-YYYY") : null);
        if (date) {
            if (date.isBefore(start)) {
                alert('End date must be greater than or equal to the start date.'); // Show alert
            } else {
                setEnd(date); // Update end date only if it's valid
            }
        }
    };

    const disabledEndDate = (current) => {
        return current && current < start; // Disable dates before the start date
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
                    disabledDate={disabledEndDate}
                />
            </DatePickerContainer>
        </Div>
    );
}
