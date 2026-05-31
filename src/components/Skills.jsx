import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    { name: 'HTML', img: 'html.png', percent: 90 },
    { name: 'CSS', img: 'css.png', percent: 90 },
    { name: 'JavaScript', img: 'js.png', percent: 75 },
    { name: 'React', img: 'react.png', percent: 85 },
    { name: 'Bootstrap', img: 'bs.png', percent: 90 },
    { name: 'GSAP', img: 'gsap.png', percent: 75 },
    { name: 'Java', img: 'java.svg', percent: 85 },
    { name: 'SQL', img: 'sql.svg', percent: 85 },
    { name: 'FastAPI', img: 'fastapi.svg', percent: 50 },
    { name: 'Git', img: 'git.png', percent: 80 },
    { name: 'VS Code', img: 'vscode.svg', percent: 95 },
    { name: 'DSA', img: 'dsa.png', percent: 60 }
];

const Skills = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Card stagger animation
        gsap.fromTo('.skill-card',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

        const fills = gsap.utils.toArray('.progress-fill');

        fills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            gsap.fromTo(fill,
                { width: '0%' },
                {
                    width: targetWidth,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: fill,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="container" ref={sectionRef}>
            <h2 className="title" id="skills">Skills</h2>
            <div className="row g-4 justify-content-center mb-5 pt-3">
                {skillsData.map((skill, index) => (
                    <div className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch" key={index}>
                        <div className="skill-card text-center w-100">
                            <div className="skill-icon-wrapper mb-3">
                                <img src={skill.img} alt={skill.name} className="skill-icon" />
                            </div>
                            <h5 className="skill-name mb-3">{skill.name}</h5>
                            <div className="skill-progress text-start">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="skill-percent-label">Proficiency</span>
                                    <span className="skill-percent-value">{skill.percent}%</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-fill" data-width={`${skill.percent}%`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
