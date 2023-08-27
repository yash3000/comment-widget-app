import React, { useState } from "react";
import CommentForm from "./CommentForm";
import userImage from "../assets/user.png";
import { ReactComponent as UpArrow } from "../assets/arrow_up_icon.svg";

const Comment = ({
  comment,
  editComment,
  deleteComment,
  likeComment,
  addReplyComment,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const handleEdit = () => {
    // Setting isEditing true to enable editing feature
    setIsEditing(true);
  };

  const handleEditComment = (updatedComment) => {
    // Handle the edit functionality
    editComment(comment, updatedComment.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Handle the delete functionality
    deleteComment(comment);
  };

  const handleLikeIncrease = () => {
    // Handle like functionality
    likeComment(comment, "increase");
  };

  const handleLikeDecrease = () => {
    // Handle dislike functionality
    likeComment(comment, "decrease");
  };

  const handleReply = () => {
    // Setting isReplying true to enable reply feature
    setIsReplying(true);
  };

  const handleReplyComment = (replyComment) => {
    // Handle adding of reply functionality
    addReplyComment(comment, replyComment);
    setIsReplying(false);
  }

  // Getting current date to get difference of time when commented and now
  let currDate = Date.now();

  return (
    <div>
      {isEditing ? (
        <CommentForm
          addComment={handleEditComment}
          user={comment.user}
          commentValue={comment.text}
        />
      ) : (
        <div className="comment-box">
          <img
            src={comment?.user?.image ? comment.user.image : userImage}
            alt="user"
          />
          <div className="comment-box-text">
            <div className="user-name">
              <div className="user-name-text">{comment?.user?.userName}</div>
              <span className="action-period">-</span>
              <span className="user-name-time">{Math.floor((currDate - comment.id) / (1000*60*60))} hours ago</span>
            </div>
            <div className="comment-text">
              <span>{comment.text}</span>
            </div>
            <div className="comment-box-action-items">
              <div>{comment.likes ? comment.likes : ""}</div>
              <div className="action-buttons" onClick={handleLikeIncrease}>
                <UpArrow className="up-arrow"/>
              </div>
              <div>|</div>
              <div className="action-buttons" onClick={handleLikeDecrease}>
              <UpArrow className="down-arrow"/>
              </div>
              <div className="action-period">.</div>
              <div className="action-buttons" onClick={handleReply}>
                Reply
              </div>
              <div className="action-period">.</div>
              <div className="action-buttons" onClick={handleEdit}>
                Edit
              </div>
              <div className="action-period">.</div>
              <div className="action-buttons" onClick={handleDelete}>
                Delete
              </div>
            </div>
            {isReplying ? (
              <CommentForm
                addComment={handleReplyComment}
                user={comment.user}
                parentComment={[...comment.parentComment, comment.id]}
              />
            ) : (
              <></>
            )}
            {/* Nested replies */}
            {comment.replies.map((replyComment) => (
              <Comment
                key={replyComment.id}
                comment={replyComment}
                editComment={editComment}
                deleteComment={deleteComment}
                likeComment={likeComment}
                addReplyComment={addReplyComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
