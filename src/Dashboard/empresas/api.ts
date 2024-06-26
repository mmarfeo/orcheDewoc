import { EmpresaType, EmpresaViewTableType, getUserRolString } from "../../shared";
import { EmpresaListResData, post } from "../../shared/api/index.u";
import { UpdateEmpresaResData } from "../../shared/api/types.u";


export async function createEmpresa(reqParams: { cuit: string, nombre: string , address: string , email: string , rubro: string}) {
    try {
        let body = reqParams;

        console.log("body:" , body);
        


        await post("/empresas/add", { ...body, fechaVencimiento: "3000-01-01 00:00:00" });

        console.log("...body:" , {...body});

        return { message: "Empresa creada exitosamente" };
    } catch (e) {
        console.log("Error:" , e);
        return e;
    }
};


export async function deleteEmpresa(reqParams: { cuit: string }) {
    try {
        const { cuit } = reqParams;

        await post("/empresas/delete/", { cuit })

        console.log( { cuit });

        return "Empresa eliminado correctamente";
    } catch (e) {
        return e;
    }
}

/* function parseDataForFront(EmpresaList: EmpresaType[]) { */
function parseDataForFront(empresa: EmpresaType): EmpresaViewTableType[] {


    const headers: string[] = ["cuit", "nombre", "direccion", "email" , "rubro"];

/* VERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR */
    /* const tableEmpresaList: EmpresaViewTableType[] = EmpresaList.map(empresa => { */
        const row: any = {};

        /* headers.forEach(key => { */
            /* if(key === "idRol") row["role"] = getUserRolString(user["idRol"]);
            else  *//* row[key] = user[(key as keyof EmpresaType)];
        }); */

   
        headers.forEach(key => {
            row[key] = empresa[(key as keyof EmpresaType)];
        });


        /* return (row as EmpresaViewTableType); */
        return [row as EmpresaViewTableType];
    }/* )
    
    return tableEmpresaList;
} */





export async function getAllEmpresas(): Promise<EmpresaViewTableType[]> {
    try {
        console.log("llego 1");
        const { data: EmpresaList } = await post<EmpresaListResData>("/empresas/list", {})
     
        
        console.log("llego 2");
/*         console.log(EmpresaList);
   
        if (!Array.isArray(EmpresaList)) {
            throw new Error("La respuesta de la API no es un arreglo");
        } */

        console.log("llego 3");

        return parseDataForFront(EmpresaList);

    } catch (e) {
        console.log(e);
        return [];
    }
}


export async function updateEmpresa(reqParams: { cuit: string, [key: string]: string }) {
    try {
        const body: { cuit: string, [key: string]: string } = reqParams;

        
        
        const { data: EmpresaData } = await post<UpdateEmpresaResData>("/empresas/list", { cuit: body.cuit });
       /*  console.log( body); */
        /* console.log(body.cuit); */
        const newEmpresaData = { ...EmpresaData, ...body };
        /* console.log(newEmpresaData); */
        await post<any>("/empresas/update", newEmpresaData)

        return "Empresa actualizado correctamente";
    } catch (e) {
        return e;
    }
}
