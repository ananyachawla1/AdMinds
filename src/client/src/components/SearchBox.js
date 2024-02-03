import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </span>
            </div>
            <input
                type="text"
                name="query"
                className="form-control search-box"
                placeholder='Search'
                aria-label='Search'
                aria-describedby='basic-addon1'
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
            />
            <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </span>
        </div>
    );
}

export default SearchBox;

