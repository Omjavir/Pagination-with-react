import './App.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const data = await axios.get('https://dummyjson.com/products?limit=100')
    // console.log(data.data.products);
    setProducts(data.data.products)
  }
  useEffect(() => {
    fetchProducts();
  }, [])
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
      setPage(selectedPage);
    }
  }
  return (
    <div>
      <div className='heading'>
        <h1>Pagination</h1>
      </div>
      {products.length > 0 && <div className="products">
        {products.slice(page * 10 - 10, page * 10).map((prod) => {
          return <span className="products__single" key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
            <span>
              {prod.title}
            </span>
          </span>
        })}
      </div>}
      {
        products.length > 0 && <div className="pagination">
          <span className={page === 1 ? "pagination__disable" : ""} onClick={() => selectPageHandler(page - 1)}>◀</span>
          {[...Array(products.length / 10)].map((_, i) => {
            return <span className={page === i + 1 ? "pagination__selected" : ""} key={i} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
          })}
          <span className={page === 10 ? "pagination__disable" : ""} onClick={() => selectPageHandler(page + 1)}>▶</span>
        </div>
      }
    </div>
  )
}

export default App