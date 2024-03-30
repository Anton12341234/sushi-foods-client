import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import pizza from '../apis/pizza'
import { doc, setDoc } from "firebase/firestore"; 
import { db, firestore } from '../firebase'
import ImageUploadComponent from './ImageUploadComponent.js'


const dropzoneStyles = {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  };

const AddProduct = () => {
    const [img,setImg]=useState("")
    const [name,setName]=useState("")
    const [des,setDes]=useState("")
    const [price,setPrice]=useState()
    const [show,setShow]=useState(false)
    const [category,setCategory]=useState("")
    const [fileName,setFileName]=useState("Add Image")
    const [loading,setLoading]=useState(false)
    console.log(img)
    const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const myStyle = {
    width: '327px',
    height: '200px',
  };



    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData();
            formData.append('image', file);
      
           const response = await axios.post('http://sushi-foods.store:5000/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data)
            const urlImg = `http://sushi-foods.store:5000/${response.data.url}`
            
      
            const {data}=await pizza.post("/api/products/add-product",{name,description:des,price:parseInt(price),image:urlImg,category}) 
            await setDoc(doc(firestore,db.pizzas,name),{
              name,
              inStockItem:7,
              outOfStock:false,
              img
            });
      
            setLoading(false)
            setShow(true)  
          } catch (error) {
            console.error('Error uploading image:', error);
          }

      setLoading(false)
      setShow(true)  
    }

  
  return (
    <>
    <SideBar/>
    <div className='mainarea admin '>
        <Header/>

        <div className='auth'>
            <div className="form">
                <div className="logo">
                    <img src="https://cdn-icons-png.flaticon.com/512/4039/4039232.png" alt="" />
                </div>
                
                <form>
                    <input type="text" onChange={(e)=>setName(e.target.value)} name='name' placeholder='Product Name'  />
                    <input type="text" onChange={(e)=>setPrice(e.target.value)} name="price" id="" placeholder='Price'  />
                    <textarea style={myStyle} type="text" onChange={(e)=>setDes(e.target.value)} name='description' placeholder='description'></textarea> 
                      <select onChange={(e)=>setCategory(e.target.value)} >
                       <option value="">Category</option>
                       <option value="Морепродукти">Морепродукти</option>
                       <option value="Риба">Риба</option>
                       <option value="Соуси">Соуси</option>
                       <option value="Рис">Рис</option>
                       <option value="Імбир">Імбир</option>
                       <option value="Васабі">Васабі</option>
                       <option value="Локшина">Локшина</option>
                       <option value="Сири, молоко">Сири, молоко</option>
                       <option value="Водорості, гриби">Водорості, гриби</option>
                       <option value="Борошно, панірування">Борошно, панірування</option>
                       <option value="Палички, килимки">Палички, килимки</option>
                       <option value="Супутні товари">Супутні товари</option>
                      </select>
                      <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
        </div>
      )}
    </div>
                    <button onClick={handleSubmit}>Добавить товар</button>
                </form>
                
            </div>
        </div>

    </div>

    <Message
 showModal={show}
 msg={"Product Added Successfuly"}
 img={"https://cdn.dribbble.com/users/335541/screenshots/7102045/media/5b7237fe7bbfa31531d6e765576f1bc4.jpg?compress=1&resize=400x300"}
 type="error"
 closeModal={setShow}
/>
    </>
  )
}

export default AddProduct