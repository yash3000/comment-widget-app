import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const CommentApp = () => {
  // Getting comments from localStorage and setting it's value 
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem("comments")) || []);

  // Setting user to show name and image
  const user = {
    userName: "Yash Verma",
    image: "",
  };

  useEffect(() => {
    // Save comments to local storage whenever they change
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const addComment = (newComment) => {
    // Function to add new comments in comments state
    setComments([...comments, newComment]);
  };

  const editComment = (comment, updatedText) => {
    // Function to update the text of the comment with commentId
    let commentsArr = [...comments];
    let parentComment = comment.parentComment;
    let commentId = comment.id;
    // Checking if comment is a reply or not
    if (parentComment && parentComment.length) {
      let currComment = commentsArr.find(
        (comment) => comment.id === parentComment[0]
      );
      let iter = 1;
      while(iter < parentComment.length){
        currComment = currComment.replies.find(
          (comment) => comment.id === parentComment[iter]
        )
        iter++;
      }
      let particularComment = currComment.replies.find(
        (comment) => comment.id === commentId
      );
      particularComment.text = updatedText;
    } else {
      let particularComment = commentsArr.find(
        (comment) => comment.id === commentId
      );
      particularComment.text = updatedText;
    }
    setComments(commentsArr);
  };

  const deleteComment = (comment) => {
    // Function to delete the comment with commentId
    let commentsArr = [...comments];
    let parentComment = comment.parentComment;
    let commentId = comment.id;
    // Checking if comment is a reply or not
    if (parentComment && parentComment.length) {
      let currComment = commentsArr.find(
        (comment) => comment.id === parentComment[0]
      );
      let iter = 1;
      while(iter < parentComment.length){
        currComment = currComment.replies.find(
          (comment) => comment.id === parentComment[iter]
        )
        iter++;
      }
      currComment.replies = currComment.replies.filter((comment) => comment.id !== commentId)
    } else {
      commentsArr = commentsArr.filter((comment) => comment.id !== commentId);
    }
    setComments(commentsArr);
  };

  const likeComment = (comment, action) => {
    // Function to increase or decrease the likes of comment with commentId
    let commentsArr = [...comments];
    let parentComment = comment.parentComment;
    let commentId = comment.id;
    let particularComment;
    // Checking if comment is a reply or not
    if (parentComment && parentComment.length) {
      let currComment = commentsArr.find(
        (comment) => comment.id === parentComment[0]
      );
      let iter = 1;
      while(iter < parentComment.length){
        currComment = currComment.replies.find(
          (comment) => comment.id === parentComment[iter]
        )
        iter++
      }
      particularComment = currComment.replies.find(
        (comment) => comment.id === commentId
      );
    } else {
      particularComment = commentsArr.find(
        (comment) => comment.id === commentId
      );
    }
    if (action.toLowerCase() === "increase") {
      particularComment.likes += 1;
    } else {
      particularComment.likes -= 1;
    }
    setComments(commentsArr);
  };

  const addReplyComment = (comment, replyComment) => {
    // Function to add replies of the comment 
    let commentsArr = [...comments];
    let parentComment = comment.parentComment;
    let commentId = comment.id;
    let particularComment;
    // Checking if comment is a reply or not
    if (parentComment && parentComment.length) {
      let currComment = commentsArr.find(
        (comment) => comment.id === parentComment[0]
      );
      let iter = 1;
      while(iter < parentComment.length){
        currComment = currComment.replies.find(
          (comment) => comment.id === parentComment[iter]
        )
        iter++;
      }
      particularComment = currComment.replies.find(
        (comment) => comment.id === commentId
      );
      
    } else {
      particularComment = commentsArr.find(
        (comment) => comment.id === commentId
      );
    }
    if(particularComment.replies){
      particularComment.replies.push(replyComment);
    }else{
      particularComment.replies = [replyComment];
    }
    setComments(commentsArr);
  }

  const sortComments = (sortBy) => {
    // Sort comments based on sortBy (date or likes)
    let commentsArr = [...comments];
    if (sortBy.toLowerCase() === "likes") {
      commentsArr.sort((comment1, comment2) => {
        if (comment2.likes < comment1.likes) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (sortBy.toLowerCase() === "date") {
      commentsArr.sort((comment1, comment2) => comment1.id - comment2.id);
    }
    setComments(commentsArr);
  };

  return (
    <div className="commentApp">
      <CommentForm addComment={addComment} user={user} />
      <CommentList
        comments={comments}
        editComment={editComment}
        deleteComment={deleteComment}
        likeComment={likeComment}
        sortComments={sortComments}
        addReplyComment={addReplyComment}
      />
    </div>
  );
};

export default CommentApp;
