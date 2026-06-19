import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
       
      if (data && data.products) {
        console.log(data.products);
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPage = (page) => {
    setPage(page);
  };

  return (
    <div className={toggle ? "app dark" : "app"}>
      {/* Header section jisme Toggle Button add kiya hai */}
      <div className="header-section">
        <h1>Welcome to PageN</h1>
        <button 
          className="toggle-btn" 
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
         
      <div>
        {products.length > 0 && (
          <div className='product'> 
            {products.slice(page * 10 - 10, page * 10).map((prod, index) => (
              <div key={prod.id || index}>
                <div className="card">
                  <img src={prod.images[0]} alt={prod.title} width="150px" />
                  <h3>{prod.title}</h3>
                  <p> &#8377; {prod.price}</p>
                </div>
              </div>
            ))} 
          </div>
        )}
      </div>

      {products.length > 0 && (
        <div className="pagination">
          <span onClick={() => selectedPage(page > 1 ? page - 1 : 1)}>◀️</span>
          {[...Array(Math.ceil(products.length / 10))].map((_, i) => (
            <span 
              key={i}
              className={`number ${page === i + 1 ? 'pagination-selected' : ""}`} 
              onClick={() => selectedPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span onClick={() => selectedPage(page < products.length / 10 ? page + 1 : products.length / 10)}>▶️</span>
        </div>
      )} 
    </div>
  );
};

export default App;