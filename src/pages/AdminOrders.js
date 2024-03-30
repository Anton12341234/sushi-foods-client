import React,{useState,useEffect} from 'react'
import pizza from '../apis/pizza'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
const AdminOrders = () => {

    const [orders,setOrders]=useState([])
  const getOrders = async()=>{
    const {data} =await pizza.get('/api/orders/admin-orders')
  //  console.log(data)
  setOrders(data)
  }

  useEffect(()=>{
     getOrders()
  },[])
  return (
    <>
    <SideBar/>   
    <div className='mainarea admin '>
    <Header/>
    <div className="all-orders-area">
           <h2>Всі замовлення</h2>
           <div className="display-orders">
           { orders.length>0?orders.map((order)=>(
               <Link to={`/order/${order?._id}`}><div className="order-detail-card" key={order?._id}>
               <div className="order-left-details">
                 {
                   order.orderItems?.map(item=>(
                    <div className='image-card' key={item?._id}>
                    <div className="img">
                      <img src={item?.image} alt="" />
                    </div>
                    <div className="details">
                     <h4>{item?.name}</h4>
                     <p>кількість:{item?.qty}</p>
                     <p>Місце Дата : {order?.createdAt}</p>
                    </div>
                    </div>
                   ))
                 
                }
                </div>
                 <div className="status">
                  <p>Розташований на{order?.createdAt} </p>
                  <span>Ваш товар розміщено.</span>
                 </div>
               </div></Link>
           )):<h1>Без минулих замовлень</h1>
               
              }

           </div>
         </div>
    </div>
    </>
  )
}

export default AdminOrders