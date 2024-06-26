import /* React, */ { useState, ChangeEvent} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';







/* const [tableFilesList, setTableFilesList] = useState<FilesViewTableType[]>([]);
const [tableInmutableFilesList, setTableInmutableFilesList] = useState<FilesViewTableType[]>([]); */


/* const getAllFilesV = () => {
    getAllFiles()
        .then((data) => {
            setTableFilesList(data);
            setTableInmutableFilesList(data);
        })
        .catch(() => alert("Ocurrió un error inesperado"));
} */


/* useEffect(() => { getAllFilesV(); }, []);

const filterFiles = (string: string) => {
    const l = tableInmutableFilesList.filter(trigger =>
        Object.values(trigger).some(v => (typeof v === "string" && v.toLowerCase().includes(string.toLowerCase())))
    );

    setTableInmutableFilesList(l);
} */



/* const headers: { key: string, text: string }[] =
[
    { key: "nombre", text: "Nombre Archivo" },
    { key: "time", text: "fechaCarga" }
]; */

const FileUpload = () => {
  /* const [file, setFile] = useState(null); */
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

/*   const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }; */

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

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setMessage('');

    try {
        const response = await axios.post('http://192.168.0.158:8000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });
      setMessage(`Archivo subido exitosamente! Respuesta del servidor: ${response.data}`);
    } catch (error) {
      setMessage('Error al subir el archivo. Intenta nuevamente.');
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


      {/* <ContentSection> */}
           {/*  <Table headers={headers} rows={tableFilesList} emptyText="No hay Archivos" /> */}
        {/* </ContentSection> */}

    </Container>
  );
};


export default FileUpload;