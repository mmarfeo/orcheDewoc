// src/FileUpload.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { uploadFile, getFiles } from './api';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesList = await getFiles();
        setFiles(filesList);
      } catch (error: any) {
        setMessage(error.message);
      }
    };

    fetchFiles();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor, selecciona un archivo primero.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const message = await uploadFile(file);
      setMessage(message);
      const filesList = await getFiles(); // Actualizamos la lista de archivos después de subir uno nuevo
      
      setFiles(filesList);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
      <h1>Subir Archivo</h1>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Selecciona un archivo</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Subiendo...' : 'Subir Archivo'}
        </Button>
      </Form>
      {message && <p>{message}</p>}
      <h2>Archivos Guardados</h2>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre del Archivo</th>
          </tr>
        </thead>
        <tbody>
          {files.map((fileName, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{fileName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FileUpload;
