import React, {  useState } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import LeftSide from '../components/LeftSide';
import '../styles/profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateprofile } from '../actions/auth';
import { Link } from 'react-router-dom';
const Profile = () => {
  const user = useSelector(state=>state.user?.user)
  const [name,setName]=useState(user?.name?user?.name:'')
  const [mobNo,setMobNo]=useState(user?.mobNo?user?.mobNo:'')
  const [showBtn,setShowBtn]=useState(false)
const dispatch =useDispatch()
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(updateprofile({name,mobNo}))
    setShowBtn(false)

  }

const handleInputChange=(value,text)=>{
  setShowBtn(true)
if(text==='name'){
  setName(value)
}
if(text==='mob'){
  setMobNo(value)
}
}

  return(
      <>
       
       <div className='mainarea all-oredrs'>
         
         <div className="profile-section">
           {
             user?(
               <>
               <div className="profile-photo">
               <h1>{user?.name?.charAt(0)}</h1>
             </div>
             <div className="profile-detail">
                 <form onSubmit={handleSubmit}>
                     <div className="profile-input">
                        <label htmlFor="name">Повне ім'я</label>
                        <input type="text" id='name' onChange={(e)=>handleInputChange(e.target.value,'name')} value={name} />
                     </div>
                     <div className="profile-input">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' value={user?.eamil} />
                     </div>
                     <div className="profile-input">
                        <label htmlFor="mob">Мобільний номер.</label>
                        <input type="text" id='mob' onChange={(e)=>handleInputChange(e.target.value,'mob')} value={mobNo} />
                     </div>
                     {showBtn&&<button type='submit'>ОНОВИТИ</button>}
                 </form>
             </div>
             </>
             ):(
               <div>
                 <h1>Ви не ввійшли! Будь ласка, увійдіть</h1>
                 <Link to="/signin"><button>Вход</button></Link>
                 </div>
             )
           }
             
         </div>
       </div>
       <LeftSide/>
      </>
  );
};

export default Profile;
