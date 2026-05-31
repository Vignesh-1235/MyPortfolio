import React from 'react';

const Contact = () => {
    return (
        <React.Fragment>
            <div className="container" id="con-container">
                <h2 className="title">Contact</h2>
                <div className="contact-premium-card mt-4">
                    <div className="row g-0">
                        {/* Left Side: Let's Connect */}
                        <div className="col-12 col-lg-6 contact-info-panel">
                            <h2 className="contact-heading fs-3 fs-md-2 fs-lg-1">Let’s Connect!</h2>
                            <p className="contact-subtitle fs-6 fs-md-5">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>

                            <ul className="contact-list">
                                <li>
                                    <a href="mailto:vignesh12035@gmail.com" className="contact-link" onClick={(e) => e.preventDefault()}>
                                        <div className="icon-box"><i className="bi bi-envelope-fill"></i></div>
                                        <span>vignesh12035@gmail.com</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/" className="contact-link" target="_blank" rel="noreferrer">
                                        <div className="icon-box"><i className="bi bi-linkedin"></i></div>
                                        <span>Linked-In Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/Vignesh-1235" className="contact-link" target="_blank" rel="noreferrer">
                                        <div className="icon-box"><i className="bi bi-github"></i></div>
                                        <span>GitHub Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Right Side: Resume Download */}
                        <div className="col-12 col-lg-6 contact-action-panel d-flex justify-content-center align-items-center">
                            <div className="resume-box text-center">
                                <i className="bi bi-file-earmark-person resume-icon"></i>
                                <h3 className="fs-4 fs-md-3">Grab My Resume</h3>
                                <p>Get a summary of my skills, experience, and education.</p>
                                <a href="Vignesh_Resume.pdf" download="Vignesh_Resume-1.pdf" className="download-btn premium-btn mt-3">
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <p>© {new Date().getFullYear()} Vignesh V | Full-Stack Developer.</p>
            </footer>
        </React.Fragment>
    );
};

export default Contact;
