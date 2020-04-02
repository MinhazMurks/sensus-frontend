import React from 'react';
import Search from '../Search';
import DisplayedComments from '../DisplayedComments';
import '../../stylesheets/pages/Home.css'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPage: null,
            comments: [],
        }
    }

    loadMore = () => {
        if (this.state.nextPage) {
            this.loadResults();
        }
    };

    clearResults = () => {
        this.setState({
            nextPage: null,
            comments: [],
        })
    };

    loadResults = () => {
        let url = new URL("http://localhost:8080/api/v1/comments"),
            params = {
                //videoUrl: 'https://www.youtube.com/watch?v=u95fZaOqDi4&t=1s',
                videoUrl: 'https://www.youtube.com/watch?v=8zkcOSTAI-0',
                includeReplies: true,
                nextPageToken: this.state.nextPage
            };
        Object.keys(params).forEach(key => {
            if(params[key]) {
                url.searchParams.append(key, params[key]);
            }
        });

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    nextPage: json.pageToken,
                    comments: this.state.comments.concat(json.youtubeComments),
                });
            });
    };

    render() {
        return (
            <div className='home'>
                <div className='header-container'>
                    <div className='sensus-logo'>
                        <img className='sensus-logo-size' src={require('../../resources/icons/sensus_logo_full.png')} alt=''/>
                    </div>
                    <Search onSearch={this.loadResults}/>
                </div>
                <div className='search-container'>
                    <div className='search'>
                        <DisplayedComments onReset={this.clearResults} loadMore={this.loadMore} comments={this.state.comments}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;