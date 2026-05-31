import React from 'react'
import './navbar.css' 
const Navbar = () => {
  return (
    <div>
      <header /*className ={sticky-top}*/ >
            <nav className={navbar}>
                <div className={container}>
                    <a className={navbar-brand} href="#">V V.</a>
                    <button className={navbar-toggler}><span className={navbar-toggler-icon} data-bs-toggle={collapse}
                            data-bs-target="#navbarid"></span></button>
                    <div className={collapse} id="navbarid">
                        <ul className={navbar-nav}>
                            <li className={nav-item}><a className={nav-link} href="#cont1">Home</a></li>
                            <li className={nav-item}><a className={nav-link} href="#about">About</a></li>
                            <li className={nav-item}><a className={nav-link} href="#skills">Skills</a></li>
                            <li className={nav-item}><a className={nav-link} href="#pro-container">Projects</a></li>
                            <li className={nav-item}><a className={nav-link} href="#con-container">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar
