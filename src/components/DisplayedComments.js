import React from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener'
import Comment from './Comment';
import '../stylesheets/DisplayedComments.css'

class DisplayedComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterType: 'author',
            filterString: '',
            displayedComments: props.comments,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            displayedComments: JSON.parse(JSON.stringify(props.comments)),
        }
    }

    testFilter = (event) => {
        console.log(event.target.value);
        this.setState({
            filterString: event.target.value,
        });
    };

    filterTypeChange = (event) => {
        console.log(event.target.value);
        this.setState({
            filterType: event.target.value,
        });
    };

    filterList = () => {
        return this.props.comments.filter((comment) => {
            if(comment[this.state.filterType]) {
                return comment[this.state.filterType].toLowerCase().includes(this.state.filterString.toLowerCase());
            }
        });
    };

    loadMoreCheck = () => {
        if(!this.state.filterString) {
            this.props.loadMore();
        }
    };

    render() {
        return (
            <div className='comments-list-container'>
                <div className='filter-bar'>
                    <input className='filter-box' onKeyUp={this.testFilter} type='text' placeholder='Filter here'/>
                    <select onChange={this.filterTypeChange} defaultValue={this.state.filterType} className='filter-box' name='filterOptions' id=''>
                        <option value='author'>author</option>
                        <option value='commentText'>text</option>
                    </select>
                </div>
                <BottomScrollListener onBottom={this.loadMoreCheck}>
                    {scrollRef => (
                        <ul ref={scrollRef} className='comments-list'>
                            {this.filterList().map((comment) => {
                                return <li key={comment.commentId}><Comment commentData={comment}/></li>
                            })}
                        </ul>
                    )}
                </BottomScrollListener>
            </div>
        );
    }
}

export default DisplayedComments;