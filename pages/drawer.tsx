import Link from 'next/link';
import { useState } from 'react';

const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleDrawer} style={styles.menuButton}>
        <span style={styles.menuIcon}>
          <span style={{ ...styles.menuIconBar, transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ ...styles.menuIconBar, opacity: isOpen ? 0 : 1 }}></span>
          <span style={{ ...styles.menuIconBar, transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </span>
      </button>
      <div style={{ ...styles.drawer, transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <button onClick={toggleDrawer} style={styles.closeButton}>Close</button>
        <ul style={styles.menuList}>
        <Link href="/addrecepie" as="/addrecepie" passHref={true} legacyBehavior>
              <a className="menu-link">Add Recipe</a>
            </Link>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      {isOpen && <div style={styles.overlay} onClick={toggleDrawer} />}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  menuButton: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    zIndex: 1000,
  },
  menuIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '24px',
    width: '30px',
  },
  menuIconBar: {
    height: '4px',
    width: '100%',
    backgroundColor: '#333',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
  drawer: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '250px',
    height: '100%',
    backgroundColor: '#DFC3C3',
    color: 'white',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.3s ease',
    zIndex: 999,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
  },
  menuList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '20px',
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
};

export default Drawer;
