import { Outlet } from "react-router-dom";
import Header from "../header/header";

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <>
                <Outlet />
                <footer style={{ textAlign: 'right' }}>
                    {(new Date()).getFullYear()}
                </footer>
            </>
        </>
    );
};

export default Layout;
