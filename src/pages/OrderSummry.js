import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation ,useNavigate} from 'react-router-dom';
import { getAdress, selectAddress } from '../actions/address';
import {DELETE_CART} from "../actions/types"
import { placeOrder } from '../actions/orders';
import pizza from '../apis/pizza';
import logo from '../assests/pizzaSilce.png'
import Message from '../components/Message';
import Spinner from '../components/Spinner';
const OrderSummry = () => {

 

  const location = useLocation();
    const path = location.pathname
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const user = useSelector(state=>state.user.user)
    const paymentMethod=useSelector(state=>state.order.pyamentMethod)
    const orderCreate =useSelector(state=>state.order)
    const cartItems = useSelector(state=>state.cart.cartItems)
    const cartPrice=cartItems.reduce((total,itm)=>total+itm?.price*itm?.qty,0)
    const deleviryPrice = (cartPrice>500||cartPrice===0)?0:50
    const discount = 0;
    const totalPrice= (cartPrice+deleviryPrice)-discount;
    const address = useSelector(state=>state.address.slectedAddress)
    
  const {loading,sucess,order,error}=orderCreate

  const [showModal,setShowModal]=useState(false)


    const handlePlaceOrder =()=>{
       dispatch(placeOrder({orderItems:cartItems,shippingAddress:address,paymentMethod:paymentMethod,itemsPrice:cartPrice,totalprice:totalPrice,shippingPrice:deleviryPrice,email:user.eamil,userName:user.name}))
       dispatch({type:DELETE_CART})
       navigate('/')
    }

    const PaymentHandler=(paymentResult)=>{
      const {razorpay_payment_id}=paymentResult
      dispatch(placeOrder({orderItems:cartItems,shippingAddress:address,paymentMethod:paymentMethod,itemsPrice:cartPrice,totalprice:totalPrice,shippingPrice:deleviryPrice,email:user.eamil,userName:user.name,paymentId:razorpay_payment_id}))

    }


    if(!paymentMethod){
      navigate('/payment')
    }
 
   useEffect(()=>{
     if(sucess){
       navigate(`/order/${order._id}`)
     }
   },[sucess,order])

    useEffect(()=>{

      if(!user){
          navigate('/signin')
      }else{
        if(!address){
          dispatch(getAdress(user._id))
        }
      }


  },[])


// load razorpay script tag
const loadScripts=(src)=>{
  return new Promise((resolve)=>{
  const script = document.createElement('script');
  script.src=src;
  
  script.onload= ()=>{
      resolve(true)
  }
  script.onerror=()=>{
      resolve(false)
  }
  document.body.appendChild(script);
})
}   








  const getPaymentButton=()=>{
    if(paymentMethod==='COD'){
     return <button onClick={handlePlaceOrder} disabled={totalPrice===0?true:false}>{loading?<Spinner/>:'ЗРОБИТИ ЗАМОВЛЕННЯ'}</button>
      
    }
    if(paymentMethod==='razorpay'){
      return (
        <div className='razorpay' >
           <img src="https://razorpay.com/blog-content/uploads/2020/10/rzp-glyph-positive.png" alt="" />
           <p>Razorpay</p>
        </div>
      )
    }
  }

  const getPaymentMethodText=()=>{
    if(paymentMethod==='COD'){
      return 'ОПЛАТА ПРИ ОТРИМАННІ'
    }
    if(paymentMethod==='razorpay'){
      return 'RAZORPAY'
    }
  }

  return (
    <>
  <div className='shipping'>
       <div className="progress">
        <div className="status">
            <p>Кошик</p>
            <div className={`divider`}></div>
            <p className={` ${path==='/shipping'&& 'active'}`}>Доставка</p>
            <div className="divider"></div>
           <p className={` ${path==='/payment'&& 'active'}`}>Оплата</p>
           <div className="divider"></div>
           <p className={` ${path==='/order'&& 'active'}`}>Замовлення</p>
        </div>
   </div>
   <div className="shipping-details">
   <div className="address">
   <h3>ПІДСУМОК ЗАМОВЛЕННЯ</h3>
   <div className="add-sec-area">
       <h4>Доставка</h4>
         {address&&(
             <div  className={`og-add`}>
                <p>{address.name}</p>
                <span>{address.address},{address.town}</span>
                <span>{address.city},{address.state} -{address.pinCode} </span>
                <span><b>Мобільний номер:</b>{address.mobNo}</span>
               </div>
                 )}
        </div>
        <h4>Продукти</h4>
                     <div className="cart-area">
                         
                     <div className="all-items">
                        {cartItems.map((item)=>(
                            <div className='cart-card' key={item.product}>
                            <div className="img">
                               <img src={item.image} alt={item.name} />
                            </div>
                            <div className="des">
                               <h3>{item.name}</h3>
                               <p>кількість:{item.qty}</p>
                               <p className='des'>{item.description?item.description:'Treat your taste buds with Double Pepper Barbecue Chicken, Peri-Peri Chicken, Chicken Tikka & Grilled Chicken Rashers'}</p>
                            </div>
                            <div className="price">
                              <h2><span>грн </span>{item.price}</h2>
                            </div>
                        </div>
                        ))}
                      </div>
                      </div>
                      <h4>Спосіб оплати</h4>
                      <div className="payments-opts">
                    <div className="payment-method">
                    <div className='select-opt'>
                        <label htmlFor="cod">{getPaymentMethodText()}</label>
                    </div>
                    </div>
                    </div>
   </div>
   <div className="checkout-area">
                      <div className="billing">
                        <h4>ДЕТАЛЬНІ ЦІНИ</h4>
                        <div className="details">
                            <div className="item">
                                <p>Ціна</p>
                                <p><span>грн </span>{cartPrice}</p>
                            </div>
                           
                            <div className="item">
                                <p>Плата за доставку</p>
                                <p>{deleviryPrice===0?<span className='free'>безкоштовно</span>:<span>грн {deleviryPrice}</span>}</p>
                            </div>
                        </div>
                        <div className="total">
                            <h3>Всього</h3>
                            <h3><span>грн </span>{totalPrice.toFixed(2)}</h3>
                        </div>
                      </div>
                      {
                       getPaymentButton()
                      }
        </div>
   </div>

  </div>
  <Message showModal={showModal} closeModal={setShowModal}
  msg={'Opss, faild to create order!'}
  img={"https://image.flaticon.com/icons/png/512/835/835408.png"}
  type="error"
  
  />
  </>
  );
};

export default OrderSummry;
