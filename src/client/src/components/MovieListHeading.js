import React from 'react';

const MovieListHeading = (props) => {
    return (
        <div className='row d-flex align-items-center' style={{ paddingLeft: 20 }}>
            <div className='col'>
                <h1>{props.heading}</h1>
            </div>
            {/* <div className='col'>
                <i className="fa fa-user" aria-hidden="true"></i>
            </div> */}
        </div>
    );
};

export default MovieListHeading;
