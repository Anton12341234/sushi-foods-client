import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation ,useNavigate} from 'react-router-dom';
import { selectPayment } from '../actions/orders';
const Payment = () => {
  const location = useLocation();
    const path = location.pathname
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const user = useSelector(state=>state.user.user)
    const cartItems = useSelector(state=>state.cart.cartItems)
    const cartPrice=cartItems.reduce((total,itm)=>total+itm?.price*itm?.qty,0)
    const deleviryPrice = (cartPrice>500||cartPrice===0)?0:50
    const discount = 0;
    const totalPrice= (cartPrice+deleviryPrice)-discount;
     const [paymentType,setPaymentType]=useState('COD')
    const handlePlaceOrder =()=>{
      dispatch(selectPayment(paymentType))
      navigate('/order')
    }

    console.log(paymentType)

    useEffect(()=>{
      if(!user){
          navigate('/signin')
      }
  },[])

  return (
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
   <h3>Виберіть тип оплати</h3>
   <div className="payments-opts">
     <div className="payment-method">
       <div className='select-opt' onClick={()=>setPaymentType("COD")}>
         <input  type="radio" value="COD" name="payment" id="cod" checked />
         <label htmlFor="cod">ОПЛАТА ПРИ ОТРИМАННІ</label>
       </div>
       <div className='select-opt' onClick={()=>setPaymentType("razorpay")}>
         <input  type="radio" value="paypal" name="payment" id="paypal" />
         <label htmlFor="paypal">RAZORPAY</label>
       </div>
       
     </div>
   </div>
   </div>
   <div className="checkout-area">
                      <div className="billing">
                        <h4>Детальні ціни</h4>
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
                            <h3><span>грн </span>{totalPrice}</h3>
                        </div>
                      </div>
                      <button onClick={handlePlaceOrder} disabled={totalPrice===0?true:false}>ДАЛІ</button>
        </div>
   </div>

  </div>
  );
};

export default Payment;
