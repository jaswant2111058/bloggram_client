import React, { useState } from 'react'
import { AiFillGithub,AiFillLinkedin,AiFillInstagram,AiFillMail } from 'react-icons/ai'
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
                            <input name="name" placeholder='Full Name' required type='text' value={response.name} onChange={handleChange} />
                            <input name="email" placeholder='E-mail' required type='email' value={response.email} onChange={handleChange} />
                            <input name="message" placeholder='Message' required type='text' value={response.message} onChange={handleChange} />
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
                                <a className='socialLinks' href='https://github.com/jaswant2111058'><AiFillGithub /></a>
                                <a className='socialLinks' href='https://www.linkedin.com/in/jaswant-kushwaha-037281252/'><AiFillLinkedin /></a>
                                <a className='socialLinks' href='https://www.instagram.com/jassi_maurya/'><AiFillInstagram /></a>
                                <a className='socialLinks' href='mailto:jaswant21110583@akgec.ac.in'><AiFillMail /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs