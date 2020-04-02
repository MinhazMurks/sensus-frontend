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
            let replyCount = this.props.commentData.replies.length;
            replyCount = replyCount > 1? replyCount + ' Replies' : this.props.commentData.replies.length + ' Reply';
            let buttonText = this.state.showReplies? 'Hide ' + replyCount : 'Show ' + replyCount;
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

    parseDate = () => {
        return new Date(this.props.commentData.publishedAt).toLocaleString();
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
                        <a href={this.props.commentData.authorChannelUrl} target='_blank'><img className='' src={this.props.commentData.authorImageUrl} alt=''/></a>
                    </div>
                    <div className='comment-contents'>
                        <a className='author-link' href={this.props.commentData.authorChannelUrl} target='_blank'>{this.props.commentData.author}</a>
                        <span className='comment-text'>{this.props.commentData.commentText}</span>
                        <div className='info-bar'>
                            <div className='info-bar-item'>
                                <img className='comment-icon' src={require('../resources/icons/like_icon.png')} alt=''/>
                                <span className='comment-text'>{this.props.commentData.likeCount}</span>
                            </div>
                            <div className='info-bar-item'>
                                <img className='comment-icon' src={require('../resources/icons/calendar_icon.png')} alt=''/>
                                <span>{this.parseDate()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderReply()}
            </div>
        )
    }
}

export default Comment;