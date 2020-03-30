import React from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Search from '../Search';
import Comment from '../Comment';
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
            console.log("loading more");
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
        return (
            <div className='home'>
                <BottomScrollListener onBottom={this.loadMore}/>
                <div className='search-container'>
                    <Search onSearch={this.loadResults} onClear={this.clearResults}/>
                    <div>
                        <ul className='comments-list'>
                            {this.state.comments.map((comment, i) => {
                                return <li key={comment.commentId}><Comment commentData={comment}/></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;