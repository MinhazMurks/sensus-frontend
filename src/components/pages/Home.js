import React from 'react';
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

    htmlDecode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html");
        let decodedHtml =  doc.documentElement.textContent;
        return decodedHtml === '' ? input : decodedHtml;
    }

    searchOnClick() {
        console.log('in searchOnClick');
        let url = new URL("http://localhost:8080/api/v1/comments"),
            params = {
                videoUrl:'https://www.youtube.com/watch?v=yygRFtIbxII&t=1s',
                includeReplies:true
            };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    nextPage: json.pageToken,
                    comments: json.youtubeComments,
                });
            });
    }

    render() {
        return (
            <div>
                <Search onSearch={this.searchOnClick.bind(this)}/>
                <div className='comments-container'>
                    <ul>
                        {this.state.comments.map((comment, i) => {
                            return <li key={comment.commentId}><Comment commentData={comment}/></li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Home;