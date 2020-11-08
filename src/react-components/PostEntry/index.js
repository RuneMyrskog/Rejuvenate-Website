import React from 'react';
import {ListGroup} from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import './styles.css';

export default class PostEntry extends React.Component {
    render() {
        const {tag, content, user, comments, likes} = this.props;
        const commentRows = [];
        let showcomments=[];

        if (comments.length > 3){
            showcomments = comments.slice(0, 3);
        }
        else{
            showcomments = comments;
        }
        
        showcomments.forEach((usercomment) => {
            commentRows.push(
                <ListGroup.Item className="commentListItem" key={uuid()}>
                    <div className="commentuser">{usercomment.user}</div>
                    <div className="comment">{usercomment.comment}</div>
                </ListGroup.Item>
            );
        });

        const image = [];

        if (content.have_pic){
            image.push(<img className='img' src={content.picture} key={uuid()}/>);
        }
        
        return (
            <div className="PostEntryContainer">
                <div className="tag">{tag}</div>
                <div className="user">
                    <img className="avatar" src={user.avatar} alt="" />
                    <div className="username">{user.username}</div>
                </div>
                <div className="text">{content.text}</div>
                <div className="imageContainer">{image}</div>
                <div className="likes">{likes}</div>
                <ListGroup className="commentSection">{commentRows}</ListGroup>
            </div>
        );
    }
}