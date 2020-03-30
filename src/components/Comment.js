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
            let buttonText = this.state.showReplies? 'Hide Replies' : 'Show Replies';
            return (
                <div>
                    <div className='reply-button-holder'>
                        <span className='reply-button' onClick={this.showReplies}>{buttonText}</span>
                    </div>
                    {this.renderReplies()}
                </div>
            )
        }
    };

    showReplies = () => {
        let show = this.state.showReplies;
        this.setState( {
            showReplies: !show,
        })
    };


    renderReplies() {
        if(this.state.showReplies) {
            let replies = this.props.commentData.replies;
            return (
                <ul className='replies'>
                    {replies.map((value, index) => {
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
            <div className='comment-structure'>
                <div className='comment'>
                    <div className='profile-picture'>
                        <img className='' src={this.props.commentData.authorImageUrl} alt=''/>
                    </div>
                    <div className='comment-contents'>
                        <span className='comment-author'>{this.props.commentData.author}</span>
                        <span className='comment-text'>{this.props.commentData.commentText}</span>
                    </div>
                </div>
                {this.renderReply()}
            </div>
        )
    }
}

export default Comment;