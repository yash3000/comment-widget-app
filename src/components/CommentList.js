import React from "react";
import Comment from "./Comment";

const CommentList = ({
  comments,
  editComment,
  deleteComment,
  likeComment,
  sortComments,
  addReplyComment,
}) => {
  return (
    <div className="commentList">
      <button className="action-buttons" onClick={() => sortComments("date")}>
        Sort by Date
      </button>
      <button className="action-buttons" onClick={() => sortComments("likes")}>
        Sort by Likes
      </button>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          editComment={editComment}
          deleteComment={deleteComment}
          likeComment={likeComment}
          addReplyComment={addReplyComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
