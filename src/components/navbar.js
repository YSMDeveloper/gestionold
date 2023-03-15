import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import { router } from "next/router";


export default function Navbar(){

    const {data: session, status} = useSession();

    if (status === 'loading') {
        return <p></p>
    }

    if(status === 'unauthenticated') {
        router.push('/login')
    }

    return(
<div className="ui menu">
<Link legacyBehavior href="/">
  <a className="active item" href="#">Inicio</a>
  </Link>
  <Link legacyBehavior href="/sale">
  <a className="item" href="#">Ventas</a>
  </Link>
  <Link legacyBehavior href="/gestion">
  <a className="item" href="#">Gestión</a>
  </Link>
  <Link legacyBehavior href="/config">
  <a className="item" href="#">Configuración</a>
  </Link>
  <Link legacyBehavior href="/faq">
  <a className="item" href="#">FAQ</a>
  </Link>
  <div className="right menu">
    <a className="item" href="#" onClick={() => signOut()}><i className="sign-out icon"></i> Cerrar sesión</a>
  </div>
</div>
    );
}
