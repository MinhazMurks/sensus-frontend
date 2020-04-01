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
        console.log('loading results');
        let url = new URL("http://localhost:8080/api/v1/comments"),
            params = {
                videoUrl: 'https://www.youtube.com/watch?v=u95fZaOqDi4&t=1s',
                //videoUrl: 'https://www.youtube.com/watch?v=8zkcOSTAI-0',
                includeReplies: true,
                nextPageToken: this.state.nextPage
            };
        Object.keys(params).forEach(key => {
            if(params[key]) {
                url.searchParams.append(key, params[key]);
            }
        });

        console.log("request: " + url);

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
        console.log("re-rendering");
        console.log(this.state);
        return (
            <div className='home'>
                <div className='search-container'>
                    <Search onSearch={this.loadResults} onClear={this.clearResults}/>
                    <DisplayedComments loadMore={this.loadMore} comments={this.state.comments}/>
                </div>
            </div>
        );
    }
}

export default Home;