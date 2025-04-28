import React, { useState, useEffect } from 'react'

const ProductModal = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    count: 0,
    imageUrl: '',
    size: { width: 0, height: 0 },
    weight: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'width' || name === 'height') {
      setFormData((prevData) => ({
        ...prevData,
        size: { ...prevData.size, [name]: Number(value) },
      }))
    } else if (name === 'count') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const validateForm = () => {
    let errors = {}
    if (!formData.name.trim()) errors.name = 'Title is required'
    if (formData.count <= 0) errors.count = 'The number must be more than 0'
    if (!formData.imageUrl.trim()) errors.imageUrl = 'Image URL is required'
    if (formData.size.width <= 0)
      errors.width = 'The width must be greater than 0'
    if (formData.size.height <= 0)
      errors.height = 'The height must be greater than 0'
    if (!formData.weight.trim()) errors.weight = 'Weight is required'
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length === 0) {
      onSave(formData)
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <div className="shop-modal">
      <div className="shop-modal__content">
        <h2 className="shop-modal__title">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="shop-form">
          <div className="shop-form__group">
            <label className="shop-form__label" htmlFor="name">
              Product Name:
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="shop-input"
            />
            {errors.name && (
              <div className="shop-form__error">{errors.name}</div>
            )}
          </div>

          <div className="shop-form__group">
            <label className="shop-form__label" htmlFor="count">
              Quantity:
            </label>
            <input
              id="count"
              name="count"
              type="number"
              value={formData.count}
              onChange={handleChange}
              placeholder="Quantity"
              className="shop-input"
            />
            {errors.count && (
              <div className="shop-form__error">{errors.count}</div>
            )}
          </div>

          <div className="shop-form__group">
            <label className="shop-form__label" htmlFor="imageUrl">
              Photo URL:
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="URL photo"
              className="shop-input"
            />
            {errors.imageUrl && (
              <div className="shop-form__error">{errors.imageUrl}</div>
            )}
          </div>

          <div className="shop-form__row">
            <div className="shop-form__group shop-form__group--half">
              <label className="shop-form__label" htmlFor="width">
                Width:
              </label>
              <input
                id="width"
                name="width"
                type="number"
                value={formData.size.width}
                onChange={handleChange}
                placeholder="Width"
                className="shop-input"
              />
              {errors.width && (
                <div className="shop-form__error">{errors.width}</div>
              )}
            </div>

            <div className="shop-form__group shop-form__group--half">
              <label className="shop-form__label" htmlFor="height">
                Height:
              </label>
              <input
                id="height"
                name="height"
                type="number"
                value={formData.size.height}
                onChange={handleChange}
                placeholder="Height"
                className="shop-input"
              />
              {errors.height && (
                <div className="shop-form__error">{errors.height}</div>
              )}
            </div>
          </div>

          <div className="shop-form__group">
            <label className="shop-form__label" htmlFor="weight">
              Weight:
            </label>
            <input
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight"
              className="shop-input"
            />
            {errors.weight && (
              <div className="shop-form__error">{errors.weight}</div>
            )}
          </div>

          <div className="shop-form__actions">
            <button
              type="button"
              onClick={onCancel}
              className="shop-btn shop-btn--danger"
            >
              Cancel
            </button>
            <button type="submit" className="shop-btn shop-btn--success">
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
