import { useEffect, useState } from 'react'
import categoryService from '../services/categoryService'

const ProductForm = ({ createProduct, newProduct, setNewProduct }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAll()
        console.log(res)
        setCategories(res.data)
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      }
    }
    fetchCategories()
  }, [])

  return (
    <form
      onSubmit={createProduct}
      className="grid gap-4 p-6 mb-6 bg-white rounded-xl shadow-md"
    >
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Name</label>
        <input
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={newProduct.name || ''}
          placeholder="Product Name"
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Slug</label>
        <input
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={newProduct.slug || ''}
          placeholder="Product Slug"
          onChange={(e) =>
            setNewProduct({ ...newProduct, slug: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 h-20"
          value={newProduct.description || ''}
          placeholder="Product Description"
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Images</label>

        {newProduct.images?.map((img, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Image URL"
              value={img.url}
              onChange={(e) => {
                const updatedImages = [...newProduct.images]
                updatedImages[index].url = e.target.value
                setNewProduct({ ...newProduct, images: updatedImages })
              }}
            />
            <button
              type="button"
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => {
                const updatedImages = newProduct.images.filter(
                  (_, i) => i !== index
                )
                setNewProduct({ ...newProduct, images: updatedImages })
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          onClick={() => {
            const updatedImages = newProduct.images
              ? [...newProduct.images]
              : []
            updatedImages.push({
              url: '',
            })
            setNewProduct({ ...newProduct, images: updatedImages })
          }}
        >
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Price</label>
          <input
            type="number"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={newProduct.price || ''}
            placeholder="Price"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">
            Discount Price
          </label>
          <input
            type="number"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={newProduct.discountPrice || ''}
            placeholder="Discount Price"
            onChange={(e) =>
              setNewProduct({ ...newProduct, discountPrice: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Stock</label>
        <input
          type="number"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={newProduct.stock || 0}
          placeholder="Stock"
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Category</label>
        <select
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={newProduct.category || ''}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Brand</label>
        <input
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={newProduct.brand || ''}
          placeholder="Brand"
          onChange={(e) =>
            setNewProduct({ ...newProduct, brand: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
      >
        Add Product
      </button>
    </form>
  )
}

export default ProductForm
