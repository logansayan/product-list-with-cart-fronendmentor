import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.scss'
import addToCartIcon from "/assets/images/icon-add-to-cart.svg"
import minusIcon from "/assets/images/icon-decrement-quantity.svg"
import plusIcon from "/assets/images/icon-increment-quantity.svg"
import removeIcon from "/assets/images/icon-remove-item.svg"

function App() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    axios.get("/data.json")
      .then(res => {
        setProducts(res.data)
      })
  }, [])

  useEffect(() => {

  }, [Object.keys(cartItems).length])

  const sumValues = obj => {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el].count );
      }
    }
    return sum;
  };

  function incrementItemToCart(name, price) {
    setCartItems(prevState => ({
      ...prevState,
      [name]: {
        name: name,
        price: price,
        count: prevState[name] && prevState[name].count && typeof prevState[name].count == "number" && prevState[name].count > 0 ? prevState[name].count + 1 : 1
      }
    }))
  }

  function decrementItemFromCart(name, price) {
    setCartItems(prevState => ({
      ...prevState,
      [name]: {
        name: name,
        price: price,
        count: prevState[name] && prevState[name].count && typeof prevState[name].count == "number" && prevState[name].count > 0 ? prevState[name].count - 1 : 0
      }
    }))
  }

  function removeItemFromCart(name) {
    setCartItems(prevState => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        count: 0
      }
    }))
  }

  return (
    <>
      <div className="wrapper">
        <div className="products__side">
          <h3>Desserts</h3>
          <div className="products">
            {products && products.length > 0 &&
              products.map((product, index) => (
                <div className="product" key={index}>
                  <div className="product__img__wrapper">
                    <img className="product__img" src={product.image.desktop} alt={product.name} />
                    {
                      cartItems[product.name] && cartItems[product.name].count > 0 ?
                      <div className="product__manage">
                        <button className='product__decrement' onClick={() => decrementItemFromCart(product.name, product.price)}><img src={minusIcon} /></button>
                        <span>{cartItems[product.name].count}</span>
                        <button className='product__decrement' onClick={() => incrementItemToCart(product.name, product.price)}><img src={plusIcon} /></button>
                      </div> :
                      <button className="product__add_to_cart" onClick={() => incrementItemToCart(product.name, product.price)}><img src={addToCartIcon} /> Add to Cart</button>
                    }
                  </div>
                  <div className="product__info__wrapper">
                    <p className="product__category">{product.category}</p>
                    <h5 className="product__name">{product.name}</h5>
                    <p className="product__price">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="cart__side">
          <div className="cart">
            <h4>
              Your Cart 
              <span className="cart__count">({sumValues(cartItems) > 0 ? sumValues(cartItems) : 0})</span>
            </h4>
            {
              Object.keys(cartItems).length > 0 && sumValues(cartItems) > 0 ?
              <div className="cart__content">
                {
                  Object.keys(cartItems).map(key => {
                    let val = cartItems[key]
                    let count = val.count
                    let price = val.price

                    if (count > 0) {
                      return <div className="cart__item" key={key}>
                        <div>
                          <p className="cart__item__name">{key}</p>
                          <div className="cart__item__info">
                            <span className="cart__item__count">{count}x</span>
                            <span className="cart__item__price">@{price.toFixed(2)}</span>
                            <span className="cart__item__total">${(count * price).toFixed(2)}</span>
                          </div>
                        </div>
                        <button className="cart__item__remove" onClick={() => removeItemFromCart(key)}><img src={removeIcon} /></button>
                      </div>
                    }
                  })
                }
              </div> :
              <div className="cart__empty">
                <img src="./assets/images/illustration-empty-cart.svg" alt="Cart Empty" />
                <p>Your added items will appear here</p>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
