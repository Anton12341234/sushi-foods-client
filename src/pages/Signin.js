import React,{useEffect, useState} from 'react';
import '../styles/auth.css';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assests/logo.png'


import Spinner from '../components/Spinner'
import { siginUser } from '../actions/auth';
const Signin = () => {
    const [isLoading,setLoading]=useState(false)
    const dispatch =useDispatch();
    const user= useSelector(state=>state.user)
    const location =useLocation()
    const navigate = useNavigate()
    const userInfo= user?.user;
    const redirect= location.search ? `/${location.search.split('=')[1]}`:'/';
    console.log(redirect)
    //form validation
    let schema = yup.object().shape({
        email:yup.string().required("Please Enter your Email").email(),
        password:yup.string().required("Please Enter your password")
        .test(
            "regex",
            "Password must be min 6 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
          val => {
            let regExp = new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
            )
            return regExp.test(val);
       })   

    })
  

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })
// console.log(errors)
 
    const submitHandler=(data)=>{
        dispatch(siginUser(data.email,data.password))
        console.log(data.email,data.password)
        setLoading(true)
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo])

    return (
        <div className='auth'>
            <div className="form">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                {user?.error&&(<div className="err">
                 {user?.error}
                </div>)}
                <form onSubmit={handleSubmit(submitHandler)}>
                    <input className="inputAuth" type="email" name='email' placeholder='Пошта' {...register('email', { required: true })} />
                    {errors?.email?.message&&<p className="err">{errors?.email?.message}</p>}
                    <input className="inputAuth" type="password" name="password" id="" placeholder='Пароль' {...register('password', { required: true })} />
                    {errors?.password?.message&&<p className="err">{errors?.password?.message}</p>}
                    <div className="text">
                      <Link to="/updatepassword">  <p>Загубили пароль?</p></Link>
                    </div>
                    <button type="submit">{user?.loading? <Spinner/>:'Login'}</button>
                </form>
                <div className="forget">
                 <p>Новий відвідувач? </p>
                </div>
                <div className="forget">
                <Link to="/signup">Регістрація</Link>
                </div>
                
            </div>
        </div>
    )
}

export default Signin
