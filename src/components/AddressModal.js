import React ,{ useEffect, useState}from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addAddress, updateAddress } from '../actions/address';
// import axios from 'axios'
const AddressModal = ({show,setShow,addressToEdit}) => {
    const [pinCode,setPinCode]=useState('')
    const [name,setName]=useState('')
    const [mobNo,setMobNo]=useState('')
    const [address,setAdress]=useState('')
    const [state,setState]=useState('нью харків')
    const [town,setTown]=useState('хз')
    const [city,setCity]=useState('Харків')


    useEffect(()=>{
         if(addressToEdit){
           setPinCode(addressToEdit.pinCode)
           setName(addressToEdit.name)
           setMobNo(addressToEdit.mobNo)
           setAdress(addressToEdit.address)
           setState(addressToEdit.state)
           setTown(addressToEdit.town)
           setCity(addressToEdit.city)
         }
    },[addressToEdit])
    const dispatch =useDispatch()
    const user = useSelector(state=>state.user.user)
    // console.log(pinCode)
    // const getPinCode=async()=>{
    // const {data} = await axios.get(`https://api.postalpincode.in/pincode/${415110}`)
    // console.log(data)
    // setData(data)

    // }
    // useEffect(()=>{
    //    getPinCode()
    // },[])

    const handleSubmit=(e)=>{
        e.preventDefault()
      dispatch(addAddress(name,mobNo,pinCode,address,town,state,city,user._id))
      setShow(false)
    }
const handleUpdateAddress=(e)=>{
  e.preventDefault()
 dispatch(updateAddress(name,mobNo,pinCode,address,town,state,city,user._id,addressToEdit._id))
 setShow(false)
}

  return (
  <div className={`black-scree ${show&&'show'}`} onClick={()=>setShow(false)}>
      <div className="address-form" onClick={(e)=>e.stopPropagation()}>
          <form onSubmit={addressToEdit?handleUpdateAddress:handleSubmit} >
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" name='name' placeholder="Ім'я" />
              <input onChange={(e)=>setMobNo(e.target.value)} value={mobNo} type="text" name='mobNo' placeholder='Мобільний номер.' />
              <input onChange={(e)=>setAdress(e.target.value)} value={address} type="text" name='address' placeholder='Адреса' />
              <input onChange={(e)=>setPinCode(Number(e.target.value))} value={pinCode} type="text" name='pinCode' placeholder="Код від під'їзду" />
              <div className="submit-btn">
              <button type='submit'>{addressToEdit?'ОНОВИТИ АДРЕСУ':'ДОДАТИ АДРЕСУ'}</button>
          </div>
          </form>
         
      </div>

  </div>
  );
};

export default AddressModal;
