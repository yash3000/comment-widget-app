import React, { useState } from 'react';
import userImage from '../assets/user.png';

const CommentForm = ({ addComment, user, commentValue, parentComment }) => {
  const [newComment, setNewComment] = useState(commentValue ? commentValue : '');

  // Function to handle submit of new comment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const comment = {
        id: Date.now(),
        text: newComment,
        likes: 0,
        user: user,
        replies: [], 
        parentComment : parentComment ? parentComment : [],
      };
      addComment(comment);
      setNewComment('');
    }
  };

  return (
    <form className='commentForm' onSubmit={handleSubmit}>
      <img className='commentForm-img' src={user.image ? user.image : userImage} alt='user'/>
      <textarea
        value={newComment}
        rows={1}
        onChange={(e) => setNewComment(e.target.value)}
        maxLength={200}
        placeholder={"Join the discussion..."}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CommentForm;
