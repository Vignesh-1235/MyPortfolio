import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo('.project-col',
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="container" id="pro-container" ref={sectionRef}>
            <div className="row">
                <h2 className="title text-center text-md-start">Featured Projects</h2>
                <div className="col-12 col-md-6 project-col mb-4">
                    <div className="cards">
                        <div className="card">
                            <img src="TGG.png" alt="" className="pro-1" />
                            <div className="card-title">
                                <h5>The Gourmand's Guide (Full Stack)</h5>
                            </div>
                            <div className="card-body">
                                <h5>A full-stack recipe search web application built with React, FastAPI, and MongoDB Atlas that allows users to explore and discover a wide variety of recipes efficiently.</h5>
                                <div className="links">
                                    <span><a href="https://drive.google.com/file/d/1asOjEqKj0CTYdtAXtSA6QXKfBX9wmDdx/view" target="_blank" rel="noreferrer">Video Demo </a></span>
                                    <span><a href="https://github.com/Vignesh-1235/The-Gourmands-Guide" target="_blank" rel="noreferrer">GitHub</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 project-col mb-4">
                    <div className="cards">
                        <div className="card">
                            <img src="AuditForge.png" alt="" className="pro-1" />
                            <div className="card-title">
                                <h5>Audit Forge (Full Stack + AI)</h5>
                            </div>
                            <div className="card-body">
                                <h5>An AI-powered offline security audit generator built with Python and local LLMs (Ollama + Mistral) that analyzes multi-format vulnerability scan data and automatically produces structured security reports.</h5>
                                <div className="links">
                                    <span><a href="https://drive.google.com/file/d/1HKdYAc04ENuL1NQV9D8ULREpj5UpFEHE/view?usp=drive_link" target="_blank" rel="noreferrer">Video Demo </a></span>
                                    <span><a href="https://github.com/Vignesh-1235/AuditForge" target="_blank" rel="noreferrer">GitHub</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 project-col mb-4">
                    <div className="cards">
                        <div className="card">
                            <img src="IRS.png" alt="" className="pro-1" />
                            <div className="card-title">
                                <h5>AI - Based Internship Recommendation System</h5>
                            </div>
                            <div className="card-body">
                                <h5>A student-friendly web application that helps users discover internships aligned with their skills, interests, and career goals.</h5>
                                <div className="links">
                                    <span><a href="https://github.com/Vignesh-1235/AI-Based-Internship-Recommendation-System" target="_blank" rel="noreferrer">Live Demo </a></span>
                                    <span><a href="https://github.com/Vignesh-1235/AI-Based-Internship-Recommendation-System" target="_blank" rel="noreferrer">GitHub</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 project-col mb-4">
                    <div className="cards">
                        <div className="card">
                            <img src="vibe-x.jpg" alt="" className="pro-1" />
                            <div className="card-title">
                                <h5>Vibe-X (Front-end)</h5>
                            </div>
                            <div className="card-body">
                                <h5>A 3D headphone landing page</h5>
                                <div className="links">
                                    <span><a href="https://vignesh-1235.github.io/Vibe-X/" target="_blank" rel="noreferrer">Live Demo </a></span>
                                    <span><a href="https://github.com/Vignesh-1235/Vibe-X" target="_blank" rel="noreferrer">GitHub</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12 col-md-6 project-col mb-4">
                    <div className="cards">
                        <div className="card">
                            <img src="slt.jpg" alt="" />
                            <div className="card-title">
                                <h5>Sign-Language-Translator</h5>
                            </div>
                            <div className="card-body">
                                <h5>A tool which translates the sign-language into english subtitle</h5>
                                <div className="links">
                                    <span><a href="#" target="_blank" rel="noreferrer">Live Demo </a></span>
                                    <span><a href="https://github.com/Vignesh-1235/SID" target="_blank" rel="noreferrer">GitHub</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Projects;
