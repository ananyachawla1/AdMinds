// import React from 'react';
// import './SearchBox.css'; // Import the CSS file

// const SearchBox = (props) => {
//   return (
//     <div className='search-box'>
//       <input
//         className='form-control'
//         value={props.value}
//         onChange={(event) => props.setSearchValue(event.target.value)}
//         placeholder='Type to search...'
//       />
//     </div>
//   );
// };

// export default SearchBox;

import React from 'react'
const SearchBox = ({value,onChange}) => {
    return ( 
        <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder='Search...'
        value={value}
        onChange={e=>onChange(e.currentTarget.value)}
        />
     );
}
 
export default SearchBox;
