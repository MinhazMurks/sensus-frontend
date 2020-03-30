import React from 'react';
import '../stylesheets/Search.css'

function Search(props) {
    return (
        <div className='container'>
            <div className='main-search'>
                <div className='search-bar'>
                    <img onClick={props.onClear} className='clear-button' src={require('../resources/icons/clear_icon.png')} alt=''/>
                    <input className='search-field' type='text' placeholder='Enter URL Here'/>
                    <img onClick={props.onSearch} className='search-button' src={require('../resources/icons/search_icon.png')} alt=''/>
                </div>
            </div>
        </div>
    )
}

export default Search;