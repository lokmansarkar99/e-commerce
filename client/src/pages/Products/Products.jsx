import { useEffect, useState } from "react"
import { getProducts } from "../../api/productApi"
import { useSearch } from "../../context/SearchContext"

export default function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("ALL")
  const [sort, setSort] = useState("none")
  const { search } = useSearch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts()
        setProducts(data.products)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  // Filtering, Sorting, Searching
  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category === "ALL" ? true : p.category?.name === category
    )
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price
      if (sort === "high-low") return b.price - a.price
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Filter + Sort */}
      <div className="flex space-x-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2"
        >
          <option value="ALL">All Categories</option>
          <option value="Fashion">Fashion</option>
          <option value="Gadgets">Gadgets</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2"
        >
          <option value="none">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="border p-4 rounded-lg shadow-sm">
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover mb-3"
              />
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-600">${p.price}</p>
              <p className="text-sm text-gray-500">{p.category?.name || "Unknown"}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  )
}
