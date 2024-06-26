// src/api.ts
import axios from 'axios';

const UPLOAD_URL = 'http://192.168.0.158:8000/upload';
const LIST_FILES_URL = 'http://192.168.0.158:8000/list_files';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return `Archivo subido exitosamente! Respuesta del servidor: ${response.data}`;
  } catch (error) {
    throw new Error('Error al subir el archivo. Intenta nuevamente.');
  }
};

export const getFiles = async (): Promise<string[]> => {
  try {
    const response = await axios.get(LIST_FILES_URL);
    console.log(response.data); // Verifica que esto sea un array de strings
    return response.data; // Asumimos que la respuesta es un array de strings con los nombres de los archivos
  } catch (error) {
    throw new Error('Error al obtener la lista de archivos.');
  }
};
