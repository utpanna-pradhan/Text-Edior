import React, { useState, useEffect } from 'react';

function CommentSection() {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  // ✅ Load comments from localStorage when component mounts
  useEffect(() => {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      setAllComments(JSON.parse(savedComments));
    }
  }, []);

  // ✅ Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(allComments));
  }, [allComments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;

    const newComment = {
      id: Date.now(),
      text: comment.trim(),
    };

    setAllComments([newComment, ...allComments]);
    setComment('');
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '2px solid #ccc' }}>
      <h2>💬 Comments</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows="4"
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            resize: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Post Comment
        </button>
      </form>

      {/* Show Comments */}
      {allComments.length === 0 ? (
        <p style={{ color: '#777' }}>No comments yet. Be the first to comment!</p>
      ) : (
        allComments.map((c) => (
          <div
            key={c.id}
            style={{
              background: '#f9f9f9',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              borderRadius: '5px',
            }}
          >
            {c.text}
          </div>
        ))
      )}
    </div>
  );
}

export default CommentSection;
