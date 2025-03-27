import React, { useState, useEffect } from 'react';

function CommentSection() {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Improved localStorage loading with proper initialization
  useEffect(() => {
    const loadComments = () => {
      try {
        const savedComments = localStorage.getItem('comments');
        if (savedComments) {
          const parsed = JSON.parse(savedComments);
          if (Array.isArray(parsed)) {
            setAllComments(parsed);
          }
        }
      } catch (error) {
        console.error('Failed to load comments:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadComments();
  }, []);

  // ✅ Reliable localStorage saving
  useEffect(() => {
    if (!isLoaded) return; // Don't save before initial load
    
    try {
      localStorage.setItem('comments', JSON.stringify(allComments));
    } catch (error) {
      console.error('Failed to save comments:', error);
      // Handle storage full error
      if (error.name === 'QuotaExceededError') {
        alert('Storage is full. Please delete some comments.');
      }
    }
  }, [allComments, isLoaded]);



  // ... (keep other functions like handleEdit, handleSaveEdit, etc. the same)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;

    const newComment = {
      id: Date.now(),
      text: comment.trim(),
      timestamp: new Date().toISOString()
    };

    setAllComments([newComment, ...allComments]);
    setComment('');
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim() === '') return;

    setAllComments(allComments.map(c => 
      c.id === id ? { ...c, text: editText.trim() } : c
    ));
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setAllComments(allComments.filter(c => c.id !== id));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div style={{ 
      marginTop: '2rem', 
      padding: '1rem', 
     
      maxWidth:  '800px',
      margin: '0 auto'
   
    }}>
      <h2 style={{ color: '#333', marginBottom: '1rem' }}>💬 Comments</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows="4"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid #ddd',
            resize: 'none',
            fontSize: '1rem',
            marginBottom: '0.5rem'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#4a6bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.2s'
          }}
        >
          Post Comment
        </button>
      </form>

      {allComments.length === 0 ? (
        <p style={{ color: '#777', textAlign: 'center' }}>No comments yet. Be the first to comment!</p>
      ) : (
        <
          div style={{ marginTop: '1rem' }} >
          {allComments.map((c) => (
            <div
              key={c.id}
              style={{
                background: '#f8f9fa',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                boxShadow: '0  10px 20px rgba(0,0,0,0.1)'
              }}
            >
              {editingId === c.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      resize: 'none',
                      marginBottom: '0.5rem'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleSaveEdit(c.id)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{
                        padding: '0.4rem 0.8rem',
                        backgroundColor: '#6c757d',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', whiteSpace: 'pre-wrap' }}>{c.text}</p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    color: '#666'
                  }}>
                    <span>Posted on {formatDate(c.timestamp)}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEdit(c)}
                        style={{
                          padding: '0.2rem 0.5rem',
                          backgroundColor: '#ffc107',
                          color: '#212529',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        style={{
                          padding: '0.2rem 0.5rem',
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;