import './footer.css'
import Logo from "../../assets/logo2"

const Footer = () => {
    const today = new Date();
    return <footer className="Footer">
        <Logo />
        <h1>
            &copy; {today.getFullYear() }
        </h1>
        <span style={{fontSize:"1rem"}} className='logoText'>&nbsp; BlogGrame</span>
    </footer>
}

export default Footer