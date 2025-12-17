import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <>
                <Outlet />
            </>
            <Footer />
        </>
    );
};

export default Layout;
