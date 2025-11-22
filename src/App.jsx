import { useEffect, useState } from 'react'
import './index.css'
import "./assets/fonts/RedHatText-VariableFont_wght.ttf"
import "./assets/fonts/RedHatText-Italic-VariableFont_wght.ttf"
import data from "./data.json"

function App() {
  const [desserts, setDesserts] = useState([])

  useEffect(() => {
    setDesserts(data)
  }, [])

  function handleCart(type, itemIndex) {
    setDesserts(prevDesserts =>
      prevDesserts.map((item, index) => {
        if (index !== itemIndex) return item;

        const cartCount = item.cartCount ?? 0;
        return {
          ...item,
          cartCount: type === "add" ? cartCount + 1 : Math.max(cartCount - 1, 0)
        };
      })
    );
  }

  console.log(desserts);
  return (
    <>
      <div className="max-w-6xl py-20 mx-auto">
        <div className='grid grid-cols-12 gap-5'>
          {/* MENU */}
          <div className='col-span-8'>
            <h1 className='text-3xl font-bold mb-8'>Desserts</h1>
            <div className='grid grid-cols-3 gap-8'>
              {
                desserts.map((dessert, index) => (
                  <div key={index}>
                    <div className='relative mb-10'>
                      <img src={dessert.image.desktop} className={`rounded-lg border-2 ${desserts[index].cartCount > 0 ? 'border-customRed' : 'border-transparent'}`} />
                      {
                        desserts[index].cartCount > 0
                        ? <div className='absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 bg-customRed flex items-center justify-between gap-3 px-5 py-3 min-w-4/6 rounded-full text-white'>
                          <button className='w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-white group transition-colors cursor-pointer' onClick={() => handleCart('sub', index)}><img src="/assets/images/icon-decrement-quantity.svg" className='group-hover:hidden' /><img src="/assets/images/icon-decrement-quantity-filled.svg" className='hidden group-hover:inline' /></button>
                          {desserts[index].cartCount}
                          <button className='w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-white group transition-colors cursor-pointer' onClick={() => handleCart('add', index)}><img src="/assets/images/icon-increment-quantity.svg" className='group-hover:hidden' /><img src="/assets/images/icon-increment-quantity-filled.svg" className='hidden group-hover:inline' /></button>
                        </div>
                        : <button className='absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 flex gap-2 items-center bg-white py-3 px-5 border border-customRed text-gray-700 hover:text-customRed text-sm rounded-full font-semibold cursor-pointer transition-colors' onClick={() => handleCart('add', index)}><img src="/assets/images/icon-add-to-cart.svg" /> Add to Cart</button>
                      }
                    </div>
                    <p className='text-customRose300 text-sm'>{dessert.category}</p>
                    <p className='font-semibold'>{dessert.name}</p>
                    <p className='font-semibold text-customRed'>${dessert.price.toFixed(2)}</p>
                  </div>
                ))
              }
            </div>
          </div>

          {/* CART */}
          <div className='col-span-4 p-8 bg-white shadow'>
            <h2 className='text-2xl text-customRed font-bold mb-5'>Your Cart ({desserts.reduce((sum, dessert) => (sum + (dessert.cartCount ?? 0)), 0)})</h2>
            {
              desserts.filter(dessert => dessert.cartCount > 0).map((dessert) => (
                <div className='flex items-center gap-2 not-last:mb-3 not-last:pb-3 not-last:border-b not-last:border-customRose100'>
                  <div className='grow'>
                    <p className='font-semibold text-sm'>{dessert.name}</p>
                    <div className='flex gap-3 text-sm mt-1'>
                      <p className='font-semibold text-customRed'>{dessert.cartCount}x</p>
                      <p className='text-customRose300'>@ ${dessert.price}</p>
                      <p className='font-semibold text-customRose500'>${dessert.price * dessert.cartCount}</p>
                    </div>
                  </div>
                  <button className='opacity-60 hover:opacity-100 transition-opacity size-4 flex items-center justify-center border border-customRed rounded-full cursor-pointer'><img src="/assets/images/icon-remove-item.svg" /></button>
                </div>
              ))
            }

            <div className="flex items-center justify-between mb-5">
              <p className='text-customRose500 font-semibold text-sm'>Order Total</p>
              <p className='text-lg font-bold'>${desserts.reduce((sum, dessert) => (sum + (dessert.cartCount ?? 0) * dessert.price), 0).toFixed(2)}</p>
            </div>

            <div className='bg-customRose100 flex justify-center gap-2 items-center rounded-lg p-5'>
              <img src="/assets/images/icon-carbon-neutral.svg" />
              <p className='text-xs'>This is a <b>carbon-neutral</b> delivery</p>
            </div>

            <button className='px-5 py-3 bg-customRed text-white w-full font-semibold rounded-full mt-5 cursor-pointer'>Confirm Order</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
