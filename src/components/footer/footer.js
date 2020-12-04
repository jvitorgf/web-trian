import React from 'react'
import './footer.css'


function Footer() {
    return (
        <div className="footer">
            <div className="contact-us">
                <h3>Contact Us</h3>
                <div ><i className="fas fa-envelope"></i><span className="contact-us-links">trian@gmail.com</span></div>
                <div ><i className="fas fa-phone"></i><span className="contact-us-links">99 9999-9999</span></div>
                <div ><i className="fas fa-store"></i><span className="contact-us-links">Find a store</span></div>
            </div>

            <div className="social">
                <h3 id="social-title">Social</h3>
                <div className="social-div">
                    <a className="social-links" href="https://facebook.com"><img src={require('./icon-facebook.svg')} alt="Link para o facebook"></img></a>
                    <a className="social-links" href="https://instagram.com"><img src={require('./icon-instagram.svg')} alt="Link para o instagram"></img></a>
                    <a className="social-links" href="https://twitter.com"><img src={require('./icon-twitter.svg')} alt="Link para o twitter"></img></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;