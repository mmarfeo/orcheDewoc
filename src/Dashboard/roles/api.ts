import { RolType, RolViewTableType, getUserRolString } from "../../shared";
import { RolListResData, post } from "../../shared/api/index.u";
import { UpdateRolResData } from "../../shared/api/types.u";

export async function createRol(reqParams: { nombre: string, email: string}) {
    try {
        let body = reqParams;
        
        await post("/roles/add", { ...body, fechaVencimiento: "3000-01-01 00:00:00" });

        return { message: "Usuario creado exitosamente" };
    } catch (e) {
        return e;
    }
};


export async function deleteRol(reqParams: { id: string }) {
    try {
        const { id } = reqParams;

        await post("/roles/delete", { id })

        return "Rol eliminado correctamente";
    } catch (e) {
        return e;
    }
}

function parseDataForFront(RolList: RolType[]) {
    const headers: string[] = ["id", "nombre"];

    const tableRolList: RolViewTableType[] = RolList.map(Rol => {
        const row: any = {};

        headers.forEach(key => {
            if(key === "idRol") row["role"] = getUserRolString(Rol["idRol"]);
            else row[key] = Rol[(key as keyof RolType)];
        });

        return (row as RolViewTableType);
    })

    return tableRolList;
}

export async function getAllRoles(): Promise<RolViewTableType[]> {
    try {
        const { data: RolList } = await post<RolListResData>("/roles/list", {})

        return parseDataForFront(RolList);
    } catch (e) {
        return [];
    }
}


export async function updateRol(reqParams: { id: string, [key: string]: string }) {
    try {
        const body: { id: string, [key: string]: string } = reqParams;
        
        const { data: RolData } = await post<UpdateRolResData>("/roles/list", { id: body.id });
        
        const newRolData = { ...RolData, ...body };

        await post<any>("/roles/update", newRolData)

        return "Rol actualizado correctamente";
    } catch (e) {
        return e;
    }
}