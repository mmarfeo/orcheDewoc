// src/FileUpload.tsx
import React, { useState, ChangeEvent } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { uploadFile } from './api';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

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
    </Container>
  );
};

export default FileUpload;
