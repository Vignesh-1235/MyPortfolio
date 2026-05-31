import React from 'react';

const Navbar = ({ toggleTheme, isDark }) => {
    return (
        <header className="sticky-top top">
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="#">V V.</a>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarid">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarid">
                        <ul className="navbar-nav ms-auto align-items-lg-center">
                            <li className="nav-item"><a className="nav-link" href="#cont1">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#skills">Skills</a></li>
                            <li className="nav-item"><a className="nav-link" href="#pro-container">Projects</a></li>
                            <li className="nav-item"><a className="nav-link" href="#con-container">Contact</a></li>
                            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                                <button
                                    onClick={toggleTheme}
                                    className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center theme-toggle-btn"
                                    style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                                    aria-label="Toggle theme"
                                >
                                    {isDark ? (
                                        <i className="bi bi-sun-fill fs-5" style={{ color: '#BE5103' }}></i>
                                    ) : (
                                        <i className="bi bi-moon-stars-fill fs-5" style={{ color: '#BE5103' }}></i>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
