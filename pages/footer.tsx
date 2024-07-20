// components/Footer.js
import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="footer">
            <div className="col1">
                <Image src='/logo.png' height={60} width={80} alt='eor' />
            </div>
            <div className='col2'>
                <h4>Company</h4>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                    <li>Terms and Conditions</li>

            </div>
            <div className='col3'>
                <h4>Get Help</h4>
                    <li>Training Videos</li>
                    <li>Request Help</li>
            </div>
            <div className='col4'>
                <h4>Socialize with us</h4>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-whatsapp"></i></a>
                </div>
                    <li>+923453191638 </li>
                    <li>info@internee.pk</li>
                    <li>Copyright ©2024 internee.pk Pvt Ltd.</li>
                    <li>All rights reserved.</li>
            </div>
            <style jsx>{`
                .footer {
                    padding-left: 6%;
                    padding-right: 6%;
                    padding-top: 5%;
                    padding-bottom: 5%;
                    display: flex;
                    column-gap: 4%;
                    background-color: #000;
                    color:white;
                }
                .col1 {
                    width: 20%;
                    display: flex;
                }
                .col2 {
                    width: 25%;
                }
                .col3 {
                    width: 25%;
                }
                .col4 {
                    width: 25%;
                }
                #limage {
                    display: inline-block;
                    padding-top: 11%;
                    padding-right: 5%;
                }
                .social-icons i {
                    color: orange;
                    font-size: 30px;
                    padding: 2%;
                }
                .social-icons {
                    padding-bottom: 3%;
                }
                .footer li {
                    text-decoration: none;
                    list-style: none;
                    color: var(--secondary-color);
                    padding: 5px 5px 5px 0px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

export default Footer;
