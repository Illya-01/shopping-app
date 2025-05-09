import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from './components/ProductList'
import ProductModal from './components/ProductModal'
import ProductView from './components/ProductView'
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from './store/slice'

function App() {
  // Component state
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Redux
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)

  // Fetch products based on sort order
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      await dispatch(fetchProducts(sortBy)).unwrap()
    } catch (err) {
      setError('Failed to load products. Please try again.')
      console.error('Error fetching products:', err)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, sortBy])

  // Initial data load
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  // Product management
  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
    setIsViewing(false)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
    setIsViewing(false)
  }

  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setIsViewing(true)
    setIsModalOpen(false)
  }

  const handleSaveProduct = async (productData) => {
    try {
      if (selectedProduct) {
        await dispatch(
          updateProduct({
            id: selectedProduct._id,
            productData,
          })
        ).unwrap()
      } else {
        await dispatch(addProduct(productData)).unwrap()
      }
      setIsModalOpen(false)
    } catch (err) {
      console.error('Error saving product:', err)
      alert('Failed to save the product. Please try again.')
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      try {
        await dispatch(deleteProduct(productId)).unwrap()
      } catch (err) {
        console.error('Error deleting product:', err)
        alert('Failed to delete the product. Please try again.')
      }
    }
  }

  // Render UI
  return (
    <div className="shop-app">
      <header className="shop-header">
        <h1>Products Catalog</h1>
        <div className="shop-controls">
          <button
            className="shop-btn shop-btn--success"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
          <select
            className="shop-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by name</option>
            <option value="count">Sort by quantity</option>
          </select>
        </div>
      </header>

      <main className="shop-main">
        {isLoading && <div className="shop-loader">Loading products...</div>}
        {error && <div className="shop-error">{error}</div>}

        {!isLoading && !error && (
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
          />
        )}
      </main>

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {isViewing && selectedProduct && (
        <ProductView
          product={selectedProduct}
          onClose={() => setIsViewing(false)}
        />
      )}
    </div>
  )
}

export default App
