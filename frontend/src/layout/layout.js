import { Outlet } from "react-router-dom"

import Navegacion from './navegation';
import Footer from './footer';
import GlobalNotification from './globalNotification';

export default function Layout(){
    return(
        <div className="d-flex flex-column min-vh-100 position-relative">

            <Navegacion />

            <Outlet />

            <Footer />

            <GlobalNotification />
        </div>
    )
}