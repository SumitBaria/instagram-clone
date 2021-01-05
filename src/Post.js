import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Sumit"
          src="/static/images/avatar/1.png"
        />
        <h3>{username}</h3>
      </div>
      <img src={imageUrl} className="post__image" />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <div>
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>

      {user && (
        <form className="post__commentbox">
          <input
            className="post__input"
            type="text"
            placeholder="Enter a Comment...."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="button" className="post__button" onClick={postComment}>
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
