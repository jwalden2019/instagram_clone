import React from 'react'
import "../styles/Post.css";
import Avatar from "@material-ui/core/Avatar";

export default function Post({ username, caption, imageURL }) {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar 
                className="post__avatar"
                alt="jwalden2021"
                src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
            </div>
            {/* {header -> avatar + username} */}
            <img className="post__image" alt="" src={imageURL}></img>
            {/* {image} */}
            <h4 className="post__userCaption"><strong>{username}</strong> {caption}</h4>
            {/* {username + caption} */}
        </div>
    )
}
