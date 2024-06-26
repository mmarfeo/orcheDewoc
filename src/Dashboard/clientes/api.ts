import { EmpresaType, EmpresaViewTableType, getUserRolString } from "../../shared";
import { EmpresaListResData, post } from "../../shared/api/index.u";
import { UpdateEmpresaResData } from "../../shared/api/types.u";

export async function createEmpresa(reqParams: { nombre: string, email: string}) {
    try {
        let body = reqParams;
        
        await post("/empresas/add", { ...body, fechaVencimiento: "3000-01-01 00:00:00" });

        return { message: "Usuario creado exitosamente" };
    } catch (e) {
        return e;
    }
};


export async function deleteEmpresa(reqParams: { email: string }) {
    try {
        const { email } = reqParams;

        await post("/empresas/delete", { email })

        return "Empresa eliminado correctamente";
    } catch (e) {
        return e;
    }
}

function parseDataForFront(EmpresaList: EmpresaType[]) {
    const headers: string[] = ["apellido", "nombre", "email", "idRol", "id"];

    const tableEmpresaList: EmpresaViewTableType[] = EmpresaList.map(Empresa => {
        const row: any = {};

        headers.forEach(key => {
            if(key === "idRol") row["role"] = getUserRolString(Empresa["idRol"]);
            else row[key] = Empresa[(key as keyof EmpresaType)];
        });

        return (row as EmpresaViewTableType);
    })

    return tableEmpresaList;
}

export async function getAllEmpresas(): Promise<EmpresaViewTableType[]> {
    try {
        const { data: EmpresaList } = await post<EmpresaListResData>("/empresas/list", {})

        return parseDataForFront(EmpresaList);
    } catch (e) {
        return [];
    }
}


export async function updateEmpresa(reqParams: { id: string, [key: string]: string }) {
    try {
        const body: { id: string, [key: string]: string } = reqParams;
        
        const { data: EmpresaData } = await post<UpdateEmpresaResData>("/empresas/list", { id: body.id });
        
        const newEmpresaData = { ...EmpresaData, ...body };

        await post<any>("/empresas/update", newEmpresaData)

        return "Empresa actualizado correctamente";
    } catch (e) {
        return e;
    }
}