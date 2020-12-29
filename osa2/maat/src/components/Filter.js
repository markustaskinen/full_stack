import React from 'react';

const Filter = ({ inputValue, showChange }) => {
    return (
      <div>
        find countries:
        <input
          value={inputValue}
          onChange={showChange}
        />
      </div>
    )
}

export default Filter;