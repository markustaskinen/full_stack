import React from 'react';

const Country = ({ country, onClick }) => {
    return (
      <li className='country'>
        {country.name}
        <button onClick={() => onClick(country.alpha2Code)}>
            show
        </button>
      </li>
    )
  }

  export default Country;