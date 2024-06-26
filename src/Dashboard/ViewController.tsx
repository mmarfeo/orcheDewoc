import Assets from "./assets/page";
import Bots from "./bots/page";
import JobsView from "./jobs/page";
import Logs from "./logs/page";
import Triggers from "./triggers/page";
import Users from "./users/page";
import FileUpload from "./SubirArchivos/page";
import Empresas from "./empresas/page";
import Roles from "./roles/page";

function ViewController({ currentView }: { currentView: number }) {
    switch (currentView) {
        case 0: return <Users />
        case 1: return <Bots />
        case 2: return <Triggers />
        case 3: return <JobsView />
        case 4: return <Assets />
        case 5: return <Logs />
        case 6: return <FileUpload />
        case 7: return <Empresas />
        case 8: return <Roles />
    }
}

export default ViewController;