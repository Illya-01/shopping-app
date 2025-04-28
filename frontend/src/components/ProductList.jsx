import { useState } from 'react'

const ProductList = ({ products, onEdit, onDelete, onView }) => {
  if (products.length === 0) {
    return (
      <div className="product-empty">
        <h3>No products found</h3>
        <p>Add a product to get started</p>
      </div>
    )
  }

  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product._id} className="product-card">
          {/* Add image container */}
          <div className="product-card__image">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image'
                }}
              />
            ) : (
              <div className="product-image-placeholder">No Image</div>
            )}
          </div>

          <h3 className="product-card__title">{product.name}</h3>
          <div className="product-card__info">
            <p>Quantity: {product.count}</p>
          </div>
          <div className="product-card__actions">
            <button className="shop-btn" onClick={() => onView(product)}>
              Details
            </button>
            <button className="shop-btn" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button
              className="shop-btn shop-btn--danger"
              onClick={() => onDelete(product._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ProductList
