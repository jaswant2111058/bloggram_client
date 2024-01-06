import { Link } from "react-router-dom";
import './header.css'
import { useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi"
import { BsSearch } from "react-icons/bs"
import { useAuth0 } from '@auth0/auth0-react';
import useWindowSize from '../../hooks/useWindowSize';

const Header = ({searchbarref}) => {
    const navRef = useRef();
    const { width, height } = useWindowSize();
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()
    function showNavbar() {
        return navRef.current.classList.toggle("responsive_nav");
    }

    return <header className="Header">
        {width <= height && <span className='logoText'><span><h3>BlogGram</h3></span></span>}
        <nav className="Nav" ref={navRef} onClick={showNavbar}>
            {width > height && <span className='logoText'><span><h1>BlogGram</h1></span></span>}
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li><Link to="/post">Create</Link></li>
                {/* <li><Link to="/about">Profile</Link></li> */}
                <li><Link to="/contactUs">Contact Us</Link></li>
                <li>{
                    isLoading ? 
                    <button className="navButton" onClick={() => loginWithRedirect()} disabled>Login</button>
                    :
                    !isAuthenticated ?
                        <button className="navButton" onClick={() => loginWithRedirect()}>Login</button>
                        :
                        <button className="navButton" onClick={() => logout()}>LogOut</button>
                }</li>
                <li><button className="navButton" onClick={()=>{
                    searchbarref?.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: "center"
                    })
                    searchbarref?.current?.focus()
                    }}><BsSearch /></button></li>
            </ul>
            {/* <span>
                {
                    isLoading
                            ?
                            <div style={{ color: "white" }}>Loading.....</div>
                    :
                    !isAuthenticated
                        ?
                        <button style={{ color: "white", fontSize:"1rem" }} onClick={() => loginWithRedirect()}>Login</button>
                            :
                            <>
                                <p style={{ color: "white" }} dangerouslySetInnerHTML={{ __html: user.name }}></p>
                                <button style={{ color: "white" }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
                            </>
                }
            </span> */}
        </nav>

        <button className="nav-btn nav-open-btn" onClick={showNavbar}>
            <GiHamburgerMenu color="fff" size="1.5rem" />
        </button>

    </header>
}

export default Header