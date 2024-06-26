'use client'
import { IoIosAdd } from "react-icons/io";

import { FormEvent, useEffect, useState } from "react";
import { ActionButton, getLocalStorage, /* EmpresaType, */ UserType, EmpresaViewTableType } from "../../shared";
import { theme } from "../../settings.json";
/* import { MdEdit, MdDelete } from "react-icons/md"; */
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Table } from "../../shared";
import { AddButton, ContentSection, FooterSection, HeaderSection, MainDashboardView, StyledButton, StyledModal, StyledSubTitle } from "../../shared";
import { createEmpresa, deleteEmpresa, getAllEmpresas, updateEmpresa } from "./api";
import Button from 'react-bootstrap/Button';

function Empresas() {

 

/*     const headers: { key: string, text: string }[] =
        [
            { key: "id", text: "Id" }, { key: "nombre", text: "Name" },
            { key: "descripcion", text: "Descripción" },
            { key: "actionInput", text: "Inputs" },
            { key: "actionPlay", text: "Play" },
            { key: "actionEdit", text: "Edit" },
            { key: "actionDelete", text: "Delete" },
        ]; */


    

    const [tableEmpresaList, setTableEmpresaList] = useState<EmpresaViewTableType[]>([]);

    console.log(tableEmpresaList);
    
    /* const getEmpresaData = () => getLocalStorage<EmpresaType>("EmpresaData");
    const empresaData = getEmpresaData(); */

   const getUserData = () => getLocalStorage<UserType>("userData");
   const userData = getUserData();

    const headers: { key: string, text: string }[] =
        [
            { key: "cuit", text: "cuit" },
            { key: "nombre", text: "Razón Social" },
            { key: "email", text: "Email" },
            { key: "actionEdit", text: "Edit" },
            { key: "actionDelete", text: "Delete" }
        ];

    const setActions = (data: (EmpresaViewTableType)[]) => {


        data = data.map(Empresa => {
            return {
                ...Empresa,
                actionEdit: <ActionButton onClick={() => { setOpenEditEmpresa(true); setEditEmpresaFormInputs({ ...editEmpresaFormInputs, ...Empresa }); }}>{/* <MdEdit /> */}  <Button variant="warning"><i className="bi bi-pencil-square"></i></Button>{' '}</ActionButton>,
                actionDelete: <ActionButton onClick={() => {
                    deleteEmpresa({ cuit: Empresa.cuit })
                        .then(() => {
                            alert("Empresa eliminada correctamente");
                            getAllEmpresasV();
                        })
                        .catch(() => alert("Ocurrió un error al eliminar a la empresa, intentelo de nuevo más tarde"))
                }}>{/* <MdDelete /> */}  <Button variant="danger"><i className="bi bi-trash"></i></Button>{' '}</ActionButton>
            }
        })

        console.log(data);

        return data;
    }

    function getAllEmpresasV() {
        getAllEmpresas()
            .then((data) => { setTableEmpresaList(setActions(data)); console.log(data); })
            
            .catch(() => alert("Ocurrió un error inesperado, intentelo de nuevo más tarde"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllEmpresasV(); }, [])


    const [openCreateEmpresa, setOpenCreateEmpresa] = useState<boolean>(false);
    const [openEditEmpresa, setOpenEditEmpresa] = useState<boolean>(false);
    const [createEmpresaFormInputs, setCreateEmpresaFormInputs] = useState({
        cuit: "",
        nombre: "",
        address: "",
        email: "",
        rubro: ""        
    });
    const [editEmpresaFormInputs, setEditEmpresaFormInputs] = useState({
        cuit: "",
        nombre: "",
        address: "",
        email: "",
        rubro: "" 
    });

    const onInputChangeCreateEmpresa = (key: string, value: string) => {
        setCreateEmpresaFormInputs(prevState => { return { ...prevState, [key]: value } })
    }

    const onInputChangeEditEmpresa = (key: string, value: string) => {
        setEditEmpresaFormInputs(prevState => { return { ...prevState, [key]: value } })
    }

    const onSubmitCreateEmpresa = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createEmpresa(createEmpresaFormInputs)
            .then(() => { alert("Empresa creado correctamente"); setOpenCreateEmpresa(false); getAllEmpresasV(); })
            .catch(() => alert("Datos no válidos. Revise los datos ingresados"))
    }

    const onSubmitEditEmpresa = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateEmpresa((editEmpresaFormInputs as { cuit: string, [key: string]: string }))
            .then(() => { alert("Empresa actualizada exitosamente"); getAllEmpresasV(); setOpenEditEmpresa(false); })
            .catch(() => alert("Ocurrió un error al actualizar la empresa. Revise los datos ingresados"))
    }

    return <MainDashboardView>
        <HeaderSection>
            <h1>Empresas</h1>
        </HeaderSection>
        <ContentSection>
            <Table headers={headers} rows={tableEmpresaList} emptyText="No hay empresas" />
        </ContentSection>
        <FooterSection>
            {userData.idRol === "1" && <AddButton onClick={() => setOpenCreateEmpresa(true)} theme={theme}>
                <IoIosAdd size="1.5rem" />
                <h3>AGREGAR EMPRESA</h3>
            </AddButton>}
        </FooterSection>

        <Modal
            okButtonText="Actualizar empresa"
            onClose={() => setOpenEditEmpresa(false)}
            open={openEditEmpresa}
            onInputChange={onInputChangeEditEmpresa}
            onSubmit={(e) => onSubmitEditEmpresa(e)}
            title="Editar los datos de la empresa"
        />

        <Modal
            okButtonText="CREAR EMPRESA"
            onClose={() => setOpenCreateEmpresa(false)}
            open={openCreateEmpresa}
            onInputChange={onInputChangeCreateEmpresa}
            onSubmit={onSubmitCreateEmpresa}
            title="Completar los datos de la nueva empresa"
        >
            <FormControl fullWidth sx={{ marginTop: "20px"  }}>
                <InputLabel sx={{ transform:"translateX(0%)" }} id="select-label">Tipo de empresa</InputLabel>
                <Select
                    labelId="select-label"
                    id="simple-select"
                    value={createEmpresaFormInputs}
                    required
                    label="Age"
                    onChange={e => onInputChangeCreateEmpresa("cuit", (e.target.value as string))}
                    variant="standard"
                >
                    <MenuItem value={1}>Administrador</MenuItem>
                    <MenuItem value={2}>Cliente</MenuItem>
                    <MenuItem value={3}>Cliente operador</MenuItem>
                </Select>
            </FormControl>
        </Modal>
    </MainDashboardView>;
}


function Modal({ open, onClose, onSubmit, onInputChange/* , children */, title, okButtonText }:
    {
        onClose: () => void, onSubmit: (e: FormEvent<HTMLFormElement>) => void, onInputChange: (fieldKey: string, newValue: string) => void,
        children?: React.JSX.Element, open: boolean, title: string,
        okButtonText: string
    }) {
    return <StyledModal
        open={open}
        onClose={onClose}
    >
        <Box component="section">
            <StyledSubTitle style={{ textAlign: "center" }}>
                {title}
                {/* Completar los datos de la nueva empresa */}
            </StyledSubTitle>
            <form autoComplete="off" onSubmit={onSubmit}>

                <TextField autoComplete="cuit" sx={{ marginTop: "10px" }} id="cuit-input" required color="warning" label="cuit" variant="standard"
                    onChange={e => onInputChange("cuit", e.target.value)} />

                <TextField autoComplete="new-password-password" sx={{ marginTop: "10px" }} id="Nombre-input" required color="warning" label="Nombre" variant="standard"
                    onChange={e => onInputChange("nombre", e.target.value)} />

                <TextField autoComplete="new-address" sx={{ marginTop: "10px" }} id="address-input" required color="warning" label="address" variant="standard"
                    onChange={e => onInputChange("address", e.target.value)} />

                <TextField autoComplete="new-password" sx={{ marginTop: "10px" }} id="Email-input" required color="warning" label="Email" variant="standard"
                    onChange={e => onInputChange("email", e.target.value)} />

                <TextField autoComplete="new-rubro" sx={{ marginTop: "10px" }} id="Rubro-input" required color="warning" label="Rubro" variant="standard"
                    onChange={e => onInputChange("rubro", e.target.value)} />

                {/* <TextField autoComplete="new-password" sx={{ marginTop: "10px" }} id="Email-input" type="email" required color="warning" label="Email" variant="standard"
                    onChange={e => onInputChange("email", e.target.value)} /> */}
                {/* {okButtonText === "CREAR EMPRESA" &&
                    <>
                        <TextField autoComplete="new-password" sx={{ marginTop: "10px" }} id="Password-input" required type="password" color="warning" label="Password" variant="standard"
                            onChange={e => onInputChange("password", e.target.value)} />

                        <TextField autoComplete="new-password" sx={{ marginTop: "10px" }} id="Email-input" type="email" required color="warning" label="Email" variant="standard"
                            onChange={e => onInputChange("email", e.target.value)} />
                    </>
                } */}


                {/* <TextField autoComplete="new-password" sx={{ marginTop: "10px" }}
                    id="Cuit-input" required color="warning" label="Cuit" variant="standard" type="number"
                    onChange={e => onInputChange("cuit", e.target.value)} />

                <TextField autoComplete="new-password" sx={{ marginTop: "10px" }} id="Cargo-input" required color="warning" label="Cargo" variant="standard"
                    onChange={e => onInputChange("cargo", e.target.value)} />

                <TextField autoComplete="new-password" sx={{ marginTop: "10px" }} id="Departamento-input" required color="warning" label="Departamento" variant="standard"
                    onChange={e => onInputChange("departamento", e.target.value)} /> */}

                {/* {children} */}
                <Box component="div" className="formButtonContainer">
                    <StyledButton theme={theme} onClick={onClose}>Cancelar</StyledButton>
                    <StyledButton theme={theme}>{okButtonText}</StyledButton>
                </Box>
            </form>
        </Box>
    </StyledModal>
}

export default Empresas;