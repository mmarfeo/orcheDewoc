'use client'
import { IoIosAdd } from "react-icons/io";

import { FormEvent, useEffect, useState } from "react";
import { ActionButton, getLocalStorage, UserType, RolViewTableType } from "../../shared";
import { theme } from "../../settings.json";
/* import { MdEdit, MdDelete } from "react-icons/md"; */
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Table } from "../../shared";
import { AddButton, ContentSection, FooterSection, HeaderSection, MainDashboardView, StyledButton, StyledModal, StyledSubTitle } from "../../shared";
import { createRol, deleteRol, getAllRoles, updateRol } from "./api";
import Button from 'react-bootstrap/Button';

function Roles() {
    const getUserData = () => getLocalStorage<UserType>("userData");

    const [tableRolList, setTableRolList] = useState<RolViewTableType[]>([]);
    const userData = getUserData();

    const headers: { key: string, text: string }[] =
        [
            { key: "id", text: "Id" },
            { key: "nombre", text: "Tipo de Rol" },            
            { key: "actionEdit", text: "Edit" },
            { key: "actionDelete", text: "Delete" }
        ];

    const setActions = (data: (RolViewTableType)[]) => {

        data = data.map(Rol => {
            return {
                ...Rol,
                actionEdit: <ActionButton onClick={() => { setOpenEditRol(true); setEditRolFormInputs({ ...editRolFormInputs, ...Rol }); }}>{/* <MdEdit /> */}  <Button variant="warning"><i className="bi bi-pencil-square"></i></Button>{' '}</ActionButton>,
                actionDelete: <ActionButton onClick={() => {
                    deleteRol({ id: Rol.id })
                        .then(() => {
                            alert("Rol eliminado correctamente");
                            getAllRolesV();
                        })
                        .catch(() => alert("Ocurrió un error al eliminar el rol, intentelo de nuevo más tarde"))
                }}>{/* <MdDelete /> */}  <Button variant="danger"><i className="bi bi-trash"></i></Button>{' '}</ActionButton>
            }
        })

        return data;
    }

    function getAllRolesV() {
        getAllRoles()
            .then((data) => { setTableRolList(setActions(data)); })
            .catch(() => alert("Ocurrió un error inesperado, intentelo de nuevo más tarde"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllRolesV(); }, [])


    const [openCreateRol, setOpenCreateRol] = useState<boolean>(false);
    const [openEditRol, setOpenEditRol] = useState<boolean>(false);
    const [createRolFormInputs, setCreateRolFormInputs] = useState({
        id: "",
        nombre: ""
    });
    const [editRolFormInputs, setEditRolFormInputs] = useState({
        id: "",
        nombre: ""
    });

    const onInputChangeCreateRol = (key: string, value: string) => {
        setCreateRolFormInputs(prevState => { return { ...prevState, [key]: value } })
    }

    const onInputChangeEditRol = (key: string, value: string) => {
        setEditRolFormInputs(prevState => { return { ...prevState, [key]: value } })
    }

    const onSubmitCreateRol = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createRol(createRolFormInputs)
            .then(() => { alert("Rol creado correctamente"); setOpenCreateRol(false); getAllRolesV(); })
            .catch(() => alert("Datos no válidos. Revise los datos ingresados"))
    }

    const onSubmitEditRol = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateRol((editRolFormInputs as { id: string, [key: string]: string }))
            .then(() => { alert("Usuario actualizado exitosamente"); getAllRolesV(); setOpenEditRol(false); })
            .catch(() => alert("Ocurrió un error al actualizar el usuario. Revise los datos ingresados"))
    }

    return <MainDashboardView>
        <HeaderSection>
            <h1>Roles</h1>
        </HeaderSection>
        <ContentSection>
            <Table headers={headers} rows={tableRolList} emptyText="No hay usuarios" />
        </ContentSection>
        <FooterSection>
            {userData.idRol === "1" && <AddButton onClick={() => setOpenCreateRol(true)} theme={theme}>
                <IoIosAdd size="1.5rem" />
                <h3>AGREGAR ROL</h3>
            </AddButton>}
        </FooterSection>

        <Modal
            okButtonText="Actualizar usuario"
            onClose={() => setOpenEditRol(false)}
            open={openEditRol}
            onInputChange={onInputChangeEditRol}
            onSubmit={(e) => onSubmitEditRol(e)}
            title="Editar los datos del usuario"
        />

        <Modal
            okButtonText="CREAR Rol"
            onClose={() => setOpenCreateRol(false)}
            open={openCreateRol}
            onInputChange={onInputChangeCreateRol}
            onSubmit={onSubmitCreateRol}
            title="Completar los datos del nuevo rol"
        >
            <FormControl fullWidth sx={{ marginTop: "20px"  }}>
                <InputLabel sx={{ transform:"translateX(0%)" }} id="select-label">Tipo de Rol</InputLabel>
                <Select
                    labelId="select-label"
                    id="simple-select"
                    value={createRolFormInputs}
                    required
                    label="Age"
                    onChange={e => onInputChangeCreateRol("idRol", (e.target.value as string))}
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
                {/* Completar los datos del nuevo usuario */}
            </StyledSubTitle>
            <form autoComplete="off" onSubmit={onSubmit}>
                <TextField autoComplete="new-password-password" sx={{ marginTop: "10px" }} id="Nombre-input" required color="warning" label="Nombre del rol" variant="standard"
                    onChange={e => onInputChange("nombre", e.target.value)} />

              {/*   <TextField autoComplete="new-password" sx={{ marginTop: "10px" }} id="Email-input" required color="warning" label="Email" variant="standard"
                    onChange={e => onInputChange("email", e.target.value)} /> */}

                {/* <TextField autoComplete="new-password" sx={{ marginTop: "10px" }} id="Email-input" type="email" required color="warning" label="Email" variant="standard"
                    onChange={e => onInputChange("email", e.target.value)} /> */}
                {/* {okButtonText === "CREAR Rol" &&
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

export default Roles;