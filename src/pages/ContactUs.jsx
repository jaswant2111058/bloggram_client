import React, { useState } from 'react'
import { FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import './ContactUs.css'
import { Link } from 'react-router-dom';
import api from '../api/post'

const ContactUs = () => {
    const [response, setResponse] = useState({ name: "", email: "", message: "" });
    const handleChange = (e) => {
        setResponse((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleSubmit = async () => {
        try {
            if (response.name && response.email && response.message) {
                const resp = await api.post('feedback/contactUs', response);
                setResponse({ name: "", email: "", message: "" });
                alert(resp.data.message)
                console.log(resp)
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='contactUsConatiner'>
            <div className='contactUsChild'>
                <img src="	http://res.cloudinary.com/dusjaet8n/image/upload/v1702921502/BlogImages/nlq5orzdpupvfrhymwmw.jpg" alt="" />
                <div className=''>
                    <h1 className='contactUsHead'>Contact Us</h1>
                    <div className='conatctUsform'>
                        <form onSubmit={handleSubmit}>
                            <input name="name" placeholder='Full Name' required type='text' value={response.name} onChange={handleChange}/>
                            <input name="email" placeholder='E-mail' required type='email' value={response.email} onChange={handleChange}/>
                            <input name="message" placeholder='Message' required type='text' value={response.message} onChange={handleChange}/>
                            <button type="submit">Contact Us</button>
                        </form>
                        <div>
                            <h6>Contact</h6>
                            <p>bloggrame@gmail.com</p>
                            <br /><br />
                            <h6>Based in</h6>
                            <p>New Delhi,</p>
                            <p>India</p>
                            <br /><br />
                            <div className='socialLinksContainer'>
                                <Link className='socialLinks' to="https://www.instagram.com/__nikhil___sinha__"><FaSquareInstagram /></Link>
                                <Link className='socialLinks' to="https://twitter.com/sin88394"><FaSquareXTwitter /></Link>
                                <Link className='socialLinks' to="https://www.linkedin.com/in/nikhilsinha822/"><FaLinkedin /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs