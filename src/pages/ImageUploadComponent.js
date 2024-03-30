import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const ImageUploadComponent = ({setImg}) => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

     const response = await axios.post('http://sushi-foods.store:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      setImg(`http://sushi-foods.store:5000/${response.data.url}`)
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
          <button onClick={handleUpload}>Добавить картинку</button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImageUploadComponent;