import React from 'react';
import '../stylesheets/Search.css'

function Search(props) {

    const searchOnEnter = (event) => {
        if(event.keyCode === 13) {
            props.onSearch();
        }
    };

    return (
        <div className='container'>
            <div className='main-search'>
                <div className='search-bar'>
                    <img onClick={props.onSearch} className='search-button' src={require('../resources/icons/search_icon.png')} alt=''/>
                    <input className='search-field' onKeyDown={searchOnEnter} type='text' placeholder='Enter URL Here'/>
                    <img onClick={props.onClear} className='clear-button' src={require('../resources/icons/clear_icon.png')} alt=''/>
                </div>
            </div>
        </div>
    )
}

export default Search;