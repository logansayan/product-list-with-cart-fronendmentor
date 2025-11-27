import { useEffect, useState } from 'react'
import './index.css'
import "./assets/fonts/RedHatText-VariableFont_wght.ttf"
import "./assets/fonts/RedHatText-Italic-VariableFont_wght.ttf"
import data from "./data.json"

function App() {
  const [desserts, setDesserts] = useState([])
  const [modalShown, setModalShown] = useState(false)

  useEffect(() => {
    setDesserts(data)
  }, [])

  function handleCart(type, itemName) {
    setDesserts(prevDesserts =>
      prevDesserts.map(item => {
        if (item.name !== itemName) return item;

        let modObject = {};
        const cartCount = item.cartCount ?? 0;
        if (type == "add") {
          modObject = {
            ...item,
            cartCount: cartCount + 1
          }
        } else if (type == "sub") {
          modObject = {
            ...item,
            cartCount: Math.max(cartCount - 1, 0)
          }
        } else if (type == "remove") {
          modObject = {
            ...item,
            cartCount: 0
          }
        }

        return modObject;
      })
    );
  }

  function handleModalClose () {
    setDesserts(prevDesserts =>
      prevDesserts.map(item => {
        return {...item, cartCount: 0}
      })
    );
    setModalShown(false)
  }

  return (
    <>
      {/* POPUP MODAL */}
      {
      modalShown &&
      <div className="fixed w-full h-full bg-black/40 flex items-end md:items-center justify-center z-10">
        <div className='bg-white p-8 rounded-t-lg md:rounded-lg w-screen md:w-lg flex flex-col max-h-11/12'>
          <img src="/assets/images/icon-order-confirmed.svg" className='size-10' />
          <h2 className='text-3xl mt-5 font-bold'>Order Confirmed</h2>
          <p className='text-customRose400 text-sm mt-2'>We hope you enjoy your food!</p>

          <div className='bg-customRose50 p-5 grow overflow-y-auto'>
            {
              desserts.filter(dessert => dessert.cartCount > 0).length > 0 &&
              <>
              {
                desserts.filter(dessert => dessert.cartCount > 0).map((dessert, index) => (
                  <div className='flex items-center gap-2 not-last:mb-3 not-last:pb-3 not-last:border-b not-last:border-customRose100' key={index}>
                    <div className='grow flex items-center gap-2'>
                      <img src={dessert.image.thumbnail} className='h-12 rounded' />
                      <div className='text-sm mt-1'>
                        <p className='font-semibold text-ellipsis line-clamp-1'>{dessert.name}</p>
                        <div className='flex gap-3 mt-1'>
                          <p className='font-semibold text-customRed'>{dessert.cartCount}x</p>
                          <p className='text-customRose300'>@ ${dessert.price}</p>
                        </div>
                      </div>
                    </div>
                    <p className='font-semibold text-customRose500 text-sm'>${dessert.price * dessert.cartCount}</p>
                  </div>
                ))
              }
              </>
            }
          </div>
          <div className="flex items-center justify-between mb-5 bg-customRose50 p-5">
            <p className='text-customRose500 font-semibold text-sm'>Order Total</p>
            <p className='text-lg font-bold'>${desserts.reduce((sum, dessert) => (sum + (dessert.cartCount ?? 0) * dessert.price), 0).toFixed(2)}</p>
          </div>
          
          <button className='px-5 py-3 bg-customRed text-white text-sm w-full font-semibold rounded-full mt-5 cursor-pointer' onClick={handleModalClose}>Start New Order</button>
        </div>
      </div>
      }
      
      <div className="max-w-6xl py-20 px-10 mx-auto">
        <div className='flex flex-col md:flex-row gap-5 items-start'>
          {/* MENU */}
          <div className='grow'>
            <h1 className='text-3xl font-bold mb-8'>Desserts</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 lg:gap-8'>
              {
                desserts.map((dessert, index) => (
                  <div key={index}>
                    <div className='relative mb-10'>
                      <img src={dessert.image.desktop} className={`hidden md:block rounded-lg border-2 ${desserts[index].cartCount > 0 ? 'border-customRed' : 'border-transparent'}`} />
                      <img src={dessert.image.mobile} className={`block md:hidden rounded-lg border-2 ${desserts[index].cartCount > 0 ? 'border-customRed' : 'border-transparent'}`} />
                      <div className='w-[70%] absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2'>
                        {
                          desserts[index].cartCount > 0
                          ? <div className='bg-customRed flex items-center justify-between gap-3 px-5 py-3 min-w-4/6 rounded-full text-white'>
                            <button className='w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-white group transition-colors cursor-pointer' onClick={() => handleCart('sub', dessert.name)}><img src="/assets/images/icon-decrement-quantity.svg" className='group-hover:hidden' /><img src="/assets/images/icon-decrement-quantity-filled.svg" className='hidden group-hover:inline' /></button>
                            {desserts[index].cartCount}
                            <button className='w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-white group transition-colors cursor-pointer' onClick={() => handleCart('add', dessert.name)}><img src="/assets/images/icon-increment-quantity.svg" className='group-hover:hidden' /><img src="/assets/images/icon-increment-quantity-filled.svg" className='hidden group-hover:inline' /></button>
                          </div>
                          : <button className='w-full flex justify-center gap-2 items-center bg-white py-3 px-5 border border-customRed text-gray-700 hover:text-customRed text-sm rounded-full font-semibold cursor-pointer transition-colors' onClick={() => handleCart('add', dessert.name)}><img src="/assets/images/icon-add-to-cart.svg" /> Add to Cart</button>
                        }
                      </div>
                    </div>
                    <p className='text-customRose500 text-sm'>{dessert.category}</p>
                    <p className='font-semibold'>{dessert.name}</p>
                    <p className='font-semibold text-customRed'>${dessert.price.toFixed(2)}</p>
                  </div>
                ))
              }
            </div>
          </div>

          {/* CART */}
          <div className='w-full md:w-auto md:basis-2xl p-8 bg-white shadow'>
            <h2 className='text-2xl text-customRed font-bold mb-5'>Your Cart ({desserts.reduce((sum, dessert) => (sum + (dessert.cartCount ?? 0)), 0)})</h2>
            {
              desserts.filter(dessert => dessert.cartCount > 0).length > 0 ?
              <>
              {
                desserts.filter(dessert => dessert.cartCount > 0).map((dessert, index) => (
                <div className='flex items-center gap-2 not-last:mb-3 not-last:pb-3 not-last:border-b not-last:border-customRose100' key={index}>
                  <div className='grow'>
                    <p className='font-semibold text-sm'>{dessert.name}</p>
                    <div className='flex gap-3 text-sm mt-1'>
                      <p className='font-semibold text-customRed'>{dessert.cartCount}x</p>
                      <p className='text-customRose300'>@ ${dessert.price}</p>
                      <p className='font-semibold text-customRose500'>${dessert.price * dessert.cartCount}</p>
                    </div>
                  </div>
                  <button className='opacity-60 hover:opacity-100 transition-opacity size-4 flex items-center justify-center border border-customRed rounded-full cursor-pointer' onClick={() => handleCart('remove', dessert.name)}><img src="/assets/images/icon-remove-item.svg" /></button>
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
              
              <button className='px-5 py-3 bg-customRed text-white text-sm w-full font-semibold rounded-full mt-5 cursor-pointer' onClick={() => setModalShown(true)}>Confirm Order</button>
              </> :
              <>
                <img className='w-1/2 mx-auto' src='/assets/images/illustration-empty-cart.svg' />
                <p className='text-center text-customRose500 font-semibold text-sm mt-5'>Your cart items will appear here!</p>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
