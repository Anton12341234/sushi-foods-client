import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiMenuAlt1 } from 'react-icons/hi'
import { BsCart3 } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@react-hook/media-query';
import { useDispatch, useSelector } from 'react-redux'
import { searchProducts, showSideBar } from '../actions'
import logo from '../assests/logo.png'
import Spinner from './Spinner'
const Header = ({ show }) => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const isSmallScreen = useMediaQuery('(max-width: 1104px)');
    const card = useSelector(state => state?.cart?.cartItems || [])
    const search = useSelector(state => state.search)
    const showSide = useSelector(state => state.sidebar.show)
    const dispatch = useDispatch()

    const info = useSelector(state => state)
    console.log(info)

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(searchProducts(name))
        navigate(`/search?=${name}`)

    }
    const handleBurger = () => {
        dispatch(showSideBar(!showSide)) 
    }
    return (

        <div className='header'>
            <div className="logo">
                <div className="burger" onClick={() => handleBurger()}>
                    <HiMenuAlt1 />
                </div>

                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <form onSubmit={handleSearch} className="search-bar">
                <div className="input">
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Пошук' />
                    {search?.loading ? (<div>
                        <Spinner />
                    </div>) : <FiSearch onClick={handleSearch} />}   
                </div>
            </form>
            {isSmallScreen && (<Link to="/cart"><div className="icon">
                    <span>{card ? card?.length : 0}</span>
                    <BsCart3 />
                </div></Link>)}
        </div>
    )
}

export default Header
