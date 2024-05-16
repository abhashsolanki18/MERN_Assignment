import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayImage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/images');
        setImages(response.data); // Update state with fetched images
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []); // Run once on component mount

  const extractTitle = (publicId) => {
    // Split the public_id string by slashes ('/')
    const parts = publicId.split('/');
    // Return the last part of the split array as the title
    return parts[parts.length - 1];
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Cloudinary Image Gallery</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map((image) => (
          <div key={image.public_id} style={{ margin: '10px', textAlign: 'center', width: '200px' }}>
            <img
              src={image.secure_url} // Use 'secure_url' to ensure HTTPS
              alt={image.public_id}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            />
            <p style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold' }}>
              {extractTitle(image.public_id)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayImage;