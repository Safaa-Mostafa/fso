import productService from '../services/productService'

const ProductsDashboard = ({ products, onProductDeleted }) => {

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await productService.deleteProduct(id)
      onProductDeleted(id)
    } catch (err) {
      console.error('Failed to delete product:', err)
      alert('Failed to delete product')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100">
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          <p className="text-sm text-gray-500">Manage your store products</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images?.[0]?.url || '/placeholder.png'}
                      alt={product.name}
                      className="w-16 h-16 max-w-[64px] max-h-[64px] rounded-xl object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.brand || '—'}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                    {product.category.name}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div>
                    <span className="font-semibold text-gray-900">
                      ${product.discountPrice ?? product.price}
                    </span>
                    {product.discountPrice && (
                      <span className="block text-sm text-gray-400 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {product.stock}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsDashboard
