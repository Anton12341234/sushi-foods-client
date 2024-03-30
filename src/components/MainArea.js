import React, { useState } from 'react'
import '../styles/mainarea.css'
import Header from './Header'
import pizzaboy from '../assests/pizzaboy.png'
import fish from '../assests/fish.png'
import sous from '../assests/sous.png'
import rice from '../assests/rice.png'
import ikra from '../assests/ikra.png'
import imbir from '../assests/imbir.png'
import wasabi from '../assests/wasabi.png'
import fila from '../assests/fila.png'
import lapsha from '../assests/lapsha.png'
import nori from '../assests/nori.png'
import tempura from '../assests/tempura.png'
import makisu from '../assests/makisu.png'
import list from '../assests/list.jpg'
import pizzaSilce from '../assests/pizzaSilce.png'
import Product from './products/Product'
import { useSelector } from 'react-redux'
const MainArea = () => {
    const user = useSelector(state=>state.user)
    const [category,setCategory]=useState('Морепродукти')
    
    return (
        <div className='mainarea'>
            
            <div className="banner">
                <div className="img">
                    <img src={pizzaboy} alt="" />
                </div>
                <div className="text">
                <h2>{user?.user?.name&&`Вітаемо ${user?.user?.name}`}</h2>
                <h2>Доставимо до ваших дверей</h2>
                <p>Безкоштовна доставка по Харкову від <span>500 грн</span></p>
                <img className='full circle' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orange_circle_100%25.svg/768px-Orange_circle_100%25.svg.png" alt="" />
                <img className='small circle' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orange_circle_100%25.svg/768px-Orange_circle_100%25.svg.png" alt="" />
                <img className='smaller circle' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orange_circle_100%25.svg/768px-Orange_circle_100%25.svg.png" alt="" />
               
                <img className='half circle' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orange_circle_100%25.svg/768px-Orange_circle_100%25.svg.png" alt="" />
               
                
                
                </div>
               
            </div>

         {/* category area */}
         <div className='category-area'>
             <h3>Menu</h3>
            <div className="category">
              <div className={`cat-icon ${category==='Морепродукти'&&'active'} `} onClick={()=>setCategory('Морепродукти')}>
                  <div className="img">

                  <img src={pizzaSilce} alt="pizza" />
                  </div>
                  <div className="text">
                  Морепродукти
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Риба'&&'active'} `} onClick={()=>setCategory('Риба')}>
                  <div className="img">

                  <img src={fish} alt="pizza" />
                  </div>
                  <div className="text">
                  Риба
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Соуси'&&'active'} `} onClick={()=>setCategory('Соуси')}>
                  <div className="img">

                  <img src={sous} alt="pizza" />
                  </div>
                  <div className="text">
                  Соуси
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Рис'&&'active'} `} onClick={()=>setCategory('Рис')}>
                  <div className="img">

                  <img src={rice} alt="pizza" />
                  </div>
                  <div className="text">
                  Рис
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Ікра'&&'active'} `} onClick={()=>setCategory('Ікра')}>
                  <div className="img">

                  <img src={ikra} alt="pizza" />
                  </div>
                  <div className="text">
                  Ікра
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Імбир'&&'active'} `} onClick={()=>setCategory('Імбир')}>
                  <div className="img">

                  <img src={imbir} alt="pizza" />
                  </div>
                  <div className="text">
                  Імбир
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Васабі'&&'active'} `} onClick={()=>setCategory('Васабі')}>
                  <div className="img">

                  <img src={wasabi} alt="pizza" />
                  </div>
                  <div className="text">
                  Васабі
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Локшина'&&'active'} `} onClick={()=>setCategory('Локшина')}>
                  <div className="img">

                  <img src={lapsha} alt="pizza" />
                  </div>
                  <div className="text">
                  Локшина
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Сири, молоко'&&'active'} `} onClick={()=>setCategory('Сири, молоко')}>
                  <div className="img">

                  <img src={fila} alt="pizza" />
                  </div>
                  <div className="text">
                  Сири, молоко
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Водорості, гриби'&&'active'} `} onClick={()=>setCategory('Водорості, гриби')}>
                  <div className="img">

                  <img src={nori} alt="pizza" />
                  </div>
                  <div className="text">
                  Водорості, гриби
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Борошно, панірування'&&'active'} `} onClick={()=>setCategory('Борошно, панірування')}>
                  <div className="img">

                  <img src={tempura} alt="pizza" />
                  </div>
                  <div className="text">
                  Борошно, панірування
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Палички, килимки'&&'active'} `} onClick={()=>setCategory('Палички, килимки')}>
                  <div className="img">

                  <img src={makisu} alt="pizza" />
                  </div>
                  <div className="text">
                  Палички, килимки
                  </div>
                  
              </div>
              <div className={`cat-icon  ${category==='Супутні товари'&&'active'} `} onClick={()=>setCategory('Супутні товари')}>
                  <div className="img">

                  <img src={list} alt="pizza" />
                  </div>
                  <div className="text">
                  Супутні товари
                  </div>
                  
              </div>
            </div>
            <div className="all-list">
             <Product category={category}/>
            </div>
         </div>
         

        </div>
    )
}

export default MainArea
