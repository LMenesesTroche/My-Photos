// cloudinaryService.js
import axios from 'axios';

const cloudName = 'your_cloud_name'; // Reemplaza con tu nombre de cloud
const apiKey = 'your_api_key'; // Reemplaza con tu clave de API
const apiSecret = 'your_api_secret'; // Reemplaza con tu secreto de API

const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;

export const fetchPhotos = async () => {
  try {
    const response = await axios.get(url, {
      params: {
        prefix: 'photos/', // La carpeta donde están tus fotos
        max_results: 100 // Número máximo de resultados
      },
      auth: {
        username: apiKey,
        password: apiSecret
      }
    });
    return response.data.resources.map(resource => resource.secure_url);
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};
