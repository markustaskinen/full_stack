import React from 'react';

const Filter = ({ inputValue, showChange }) => {
    return (
      <div>
        filter by name:
        <input
          value={inputValue}
          onChange={showChange}
        />
      </div>
    )
}

export default Filter;