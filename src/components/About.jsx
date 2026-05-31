import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const textRef = useRef(null);
    const imgRef = useRef(null);
    const aboutText = "Dynamic Full-Stack Developer skilled in HTML, CSS, JavaScript, Bootstrap, GSAP, React, and Python (FastAPI). Experienced in building responsive, user-focused web applications that combine modern UI/UX with high-performance backend systems. Proficient in developing scalable architectures, creating RESTful APIs, and integrating front-end and back-end technologies to deliver efficient and reliable solutions. Strong problem-solving skills with a focus on writing clean, maintainable, and optimized code. Passionate about learning new technologies and continuously improving development practices. Dedicated to creating modern, efficient, and visually engaging digital experiences that are scalable, user-friendly, and performance-driven.";

    useEffect(() => {
        const letters = textRef.current.querySelectorAll('.about-char');

        // Detect current theme to set correct starting color
        // const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        // // Light mode: dark faded → solid dark.  Dark mode: light-white → pure white.
        // const startColor = isDark
        //     ? 'rgba(255, 250, 250, 0.55)'   // visible light-white in dark before scroll
        //     : 'rgba(0, 0, 0, 0.4)';           // original dim dark in light mode

        // // Change 2: in dark mode end at pure white so text is clearly readable after scroll
        // const endColor = isDark ? '#ffffff' : '#111111';
        // Detect current theme to set correct starting color
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const startColor = "var(--about-char-start)";
        const endColor = "var(--title-color)";


        // Set starting color immediately
        gsap.set(letters, { color: startColor });

        // Image animation
        gsap.fromTo(imgRef.current,
            { y: 150, scale: 0.5, opacity: 0 },
            {
                y: 0, scale: 1, opacity: 1,
                scrollTrigger: {
                    trigger: imgRef.current,
                    start: "top 95%",
                    end: "top 65%",
                    scrub: 1.5,
                }
            }
        );

        // Text reveal: fromTo with explicit start and end colors
        gsap.fromTo(letters,
            { color: startColor },
            {
                color: endColor,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 95%",
                    end: "bottom 90%",
                    scrub: 1,
                }
            }
        );

        // Subtle fade + slide for text container
        gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 85%",
                    end: "top 60%",
                    scrub: 1,
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="container">
            <h2 className="title text-left fs-2 fs-md-1 mb-5" id="about">About</h2>
            <div className="row justify-content-center" id="row">
                <div className="col-12 d-flex justify-content-center mb-5" id="img-contain">
                    <div className="about-img-wrapper" ref={imgRef}>
                        <img src="pp1.jpg" alt="Vignesh V" className="pic" />
                    </div>
                </div>
                <div className="col-12 col-lg-10 text-center">
                    <p className="about fs-3 fs-md-2 fs-lg-1" ref={textRef}>
                        {aboutText.split(' ').map((word, wordIndex, arr) => (
                            <React.Fragment key={wordIndex}>
                                <span className="about-word" style={{ display: 'inline-block' }}>
                                    {word.split('').map((char, charIndex) => (
                                        <span key={charIndex} className="about-char">{char}</span>
                                    ))}
                                </span>
                                {wordIndex < arr.length - 1 ? ' ' : ''}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
