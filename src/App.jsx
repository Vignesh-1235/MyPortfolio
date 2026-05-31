import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

/* ─────────────────────────────────────────────────────────────
   SectionBlocks — thin block grid that covers all of page2.
   Uses WINDOW-level mousemove so the trail works even when the
   mouse is over text/cards (which would block canvas events).
   The canvas itself has pointer-events:none.
───────────────────────────────────────────────────────────── */
const SectionBlocks = ({ isDark }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const BLOCK = 40;          // grid cell size in px
        const TRAIL_LEN = 28;      // how many cells stay lit
        const FADE_DELAY = 350;    // ms before trail fades after mouse stops

        let cols = 0, rows = 0;
        let trail = [];            // [{col, row}]
        let fadeTimer = null;
        let fadeRaf = null;

        // Accent colour for trail highlights
        const accentR = 190, accentG = 81, accentB = 3;

        /* Resize canvas to match its CSS box */
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width  = rect.width  || canvas.offsetWidth;
            canvas.height = rect.height || canvas.offsetHeight;
            cols = Math.ceil(canvas.width  / BLOCK);
            rows = Math.ceil(canvas.height / BLOCK);
            draw();
        };

        /* Draw static grid + trail */
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Static grid lines — brighter than before (Change 2)
            const gridOpacity = isDark ? 0.13 : 0.15;
            ctx.strokeStyle = `rgba(${accentR},${accentG},${accentB},${gridOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            for (let c = 0; c <= cols; c++) {
                const x = c * BLOCK;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let r = 0; r <= rows; r++) {
                const y = r * BLOCK;
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            // Trail: cells highlighted with fading opacity
            trail.forEach(({ col, row }, i) => {
                const t = 1 - i / TRAIL_LEN;
                const fillOpacity  = t * 0.09;
                const strokeOpacity = t * 0.65;

                // faint fill
                ctx.fillStyle = `rgba(${accentR},${accentG},${accentB},${fillOpacity})`;
                ctx.fillRect(col * BLOCK, row * BLOCK, BLOCK, BLOCK);

                // brighter border
                ctx.strokeStyle = `rgba(${accentR},${accentG},${accentB},${strokeOpacity})`;
                ctx.lineWidth = 0.7;
                ctx.strokeRect(col * BLOCK + 0.5, row * BLOCK + 0.5, BLOCK - 1, BLOCK - 1);
            });
        };

        /* Start a gradual fade of the trail */
        const startFade = () => {
            cancelAnimationFrame(fadeRaf);
            const step = () => {
                if (trail.length === 0) return;
                trail.pop();
                draw();
                fadeRaf = requestAnimationFrame(step);
            };
            fadeRaf = requestAnimationFrame(step);
        };

        /* Convert window-space mouse to canvas-cell col/row */
        const windowToCell = (clientX, clientY) => {
            const rect = canvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;
            return {
                col: Math.floor(x / BLOCK),
                row: Math.floor(y / BLOCK),
            };
        };

        /* Window-level mousemove — fires even over text/cards */
        const onMouseMove = (e) => {
            const cell = windowToCell(e.clientX, e.clientY);
            if (!cell) return; // outside canvas

            const { col, row } = cell;
            // Only add if different from last cell
            if (trail.length > 0 && trail[0].col === col && trail[0].row === row) return;

            trail.unshift({ col, row });
            if (trail.length > TRAIL_LEN) trail.pop();

            cancelAnimationFrame(fadeRaf);
            clearTimeout(fadeTimer);
            draw();

            // After mouse pauses, fade the trail out
            fadeTimer = setTimeout(startFade, FADE_DELAY);
        };

        const onMouseLeave = () => {
            clearTimeout(fadeTimer);
            startFade();
        };

        // Attach to window so content never blocks events
        resize();
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(fadeRaf);
            clearTimeout(fadeTimer);
            ro.disconnect();
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="page2-blocks-canvas"
            aria-hidden="true"
        />
    );
};

/* ─────────────────────────────────────────────────────────────
   Main App
───────────────────────────────────────────────────────────── */
const App = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [theme, setTheme] = useState('light');

    // Preloader
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 100);
                    return 100;
                }
                return prev + 1;
            });
        }, 14);
        return () => clearInterval(interval);
    }, []);

    // Apply theme attribute
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
    const isDark = theme === 'dark';

    if (loading) {
        return (
            <div className="preloader-screen">
                <div className="preloader-content text-center">
                    <div className="progress-number">{progress}%</div>
                    <div className="preloader-bar-container mt-3">
                        <div className="preloader-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <section className="page1">
                <Navbar toggleTheme={toggleTheme} isDark={isDark} />
                <Hero />
            </section>

            <section className="page2">
                {/* Canvas behind everything — pointer-events:none in CSS */}
                <SectionBlocks isDark={isDark} />

                {/* Content layer — sits above canvas at z-index 1 */}
                <div className="page2-content">
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </div>
            </section>
        </React.Fragment>
    );
};

export default App;
