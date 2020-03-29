import React from 'react';
import '../stylesheets/Search.css'

function Search(props) {
    return (
        <div className='container'>
            <div className='main-search'>
                <h1> Search </h1>
                <div>
                    <input type='text' placeholder='Search Here'/>
                    <button onClick={props.onSearch}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Search;