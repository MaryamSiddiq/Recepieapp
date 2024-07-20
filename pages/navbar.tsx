// components/Navbar.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="header">
      <div className="logo">
        <Image src="/Imges/logo.png" alt="Logo" height={56} width={80} />
      </div>
      <div className="menuitems">
        <ul>
          <li className="menu-item">
            <Link href="/addrecepie" as="/addrecepie" passHref={true} legacyBehavior>
              <a className="menu-link">Add Recipe</a>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/contactus" as="/contactus" passHref={true} legacyBehavior>
              <a className="menu-link">Services</a>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/aboutus" as="/aboutus" passHref={true} legacyBehavior>
              <a className="menu-link">About Us</a>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/addrecepie" as="/addrecepie" passHref={true} legacyBehavior>
              <a className="menu-link">Contact Us</a>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/addrecepie" as="/addrecepie" passHref={true} legacyBehavior>
              <a className="menu-link">Add Favourate</a>
            </Link>
          </li>
        </ul>
      </div>

      {/* Styles */}
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 6%;
          background-color: #000; /* Adjust background color as needed */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
        }

        .menuitems {
          display: flex;
          align-items: center;
        }

        .menuitems ul {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .menuitems ul li {
          margin-right: 40px; /* Adjust spacing between menu items */
        }

        .menuitems ul li:last-child {
          margin-right: 0;
        }

        .menu-link {
          text-decoration: none;
          color: white; /* Adjust link color */
          font-weight: 550;
          font-size: 18px;
          transition: color 0.3s ease; /* Smooth color transition */
        }

        .menu-link:hover {
          color: pink; /* Adjust hover color */
        }
      `}</style>
    </div>
  );
};

export default Navbar;
