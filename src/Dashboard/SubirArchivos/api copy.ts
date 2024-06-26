// src/api.ts
import axios from 'axios';

const API_URL = 'http://192.168.0.158:8000/upload';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return `Archivo subido exitosamente! Respuesta del servidor: ${response.data}`;
  } catch (error) {
    throw new Error('Error al subir el archivo. Intenta nuevamente.');
  }
};
