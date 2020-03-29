import React from 'react';
import '../stylesheets/Comment.css'

class Comment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showReplies: false,
        }
    }

    renderReply() {
        if(this.props.commentData.replies) {
            return (
                <div>
                    <button onClick={this.showReplies.bind(this)}>View Replies</button>
                    {this.renderReplies()}
                </div>
            )
        }
    };

    showReplies() {
        let show = this.state.showReplies;
        this.setState( {
            showReplies: !show,
        })
    }


    renderReplies() {
        if(this.state.showReplies) {
            let replies = this.props.commentData.replies;
            return (
                <ul>
                    {replies.map((value, index) => {
                        console.log(value);
                        return (
                            <li key={value.commentId}><Comment commentData={value}/></li>
                        )
                    })}
                </ul>
            );
        }
    };

    render() {
        return (
            <div className='comment'>
                <div className='comment-contents'>
                    <h1>{this.props.commentData.author}</h1>
                    <p>{this.props.commentData.commentText}</p>
                    {this.renderReply()}
                </div>
            </div>
        )
    }
}

export default Comment;