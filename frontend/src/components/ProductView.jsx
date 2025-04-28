import React, { useState } from 'react'

const ProductView = ({ product, onClose }) => {
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(product.comments || [])

  const handleAddComment = async () => {
    if (!commentText.trim()) return

    const newComment = {
      description: commentText,
      date: new Date().toLocaleString(),
      productId: product._id,
    }

    try {
      const response = await fetch(
        `http://localhost:8000/products/${product._id}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newComment),
        }
      )

      if (response.ok) {
        const updatedProduct = await response.json()
        setComments(updatedProduct.comments)
        setCommentText('')
      } else {
        console.error('Failed to add comment:', response.status)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment._id !== commentId
    )

    try {
      const response = await fetch(
        `http://localhost:8000/products/${product._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...product, comments: updatedComments }),
        }
      )

      if (response.ok) {
        setComments(updatedComments)
      } else {
        console.error('Failed to delete comment:', response.status)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="shop-modal">
      <div className="shop-modal__content">
        <h2 className="shop-modal__title">{product.name}</h2>

        <div className="product-details">
          <div className="product-details__info">
            <p>
              <strong>Quantity:</strong> {product.count}
            </p>
            <p>
              <strong>Size:</strong> {product.size.width}x{product.size.height}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight}
            </p>
          </div>

          {product.imageUrl && (
            <div className="product-details__image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
          )}
        </div>

        <div className="comments-section">
          <h3>Comments ({comments.length})</h3>

          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={comment._id || index} className="comment-item">
                <p className="comment-item__text">{comment.description}</p>
                <div className="comment-item__meta">
                  <small>{comment.date}</small>
                  <button
                    className="shop-btn shop-btn--danger"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="comment-form">
            <textarea
              className="shop-input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
            />
            <button
              className="shop-btn shop-btn--success"
              onClick={handleAddComment}
              disabled={!commentText.trim()}
            >
              Add comment
            </button>
          </div>
        </div>

        <div className="shop-modal__actions">
          <button className="shop-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductView
