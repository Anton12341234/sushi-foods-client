import React , { useEffect } from 'react'
import {IoMdAdd} from 'react-icons/io';
import '../styles/bigCart.css'
const BigCart = ({product,cartHandler,showModal,closeModal}) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.cart-box')) {
                closeModal(false);
            }
        };

        if (showModal) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showModal, closeModal]);

    
    return (
        <div className={`black-scree ${showModal&&'show'}`} >
        <div className="big-product-card">
          <div className="big-product-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="big-product-details">
            <h3 className="big-product-name">{product?.name}</h3>
            <p className="big-product-description">{product?.description}</p>
            <p className="big-product-price">{product?.price} грн</p>
          </div>
          <div className="add-bbutton" onClick={(e)=>{e.stopPropagation();cartHandler(product)}}>
                          Додати у кошик
                      </div>
        </div></div>
      );
        
    
}

export default BigCart
