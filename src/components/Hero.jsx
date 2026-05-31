import React, { useEffect, useRef } from 'react';

const Hero = () => {
    const blocksRef = useRef(null);

    useEffect(() => {
        const container = blocksRef.current;
        if (!container) return;

        const BLOCK_SIZE = 30;
        const TRAIL_LENGTH = 50;
        // Vertical spread: how many rows above/below pointer also light up
        const SPREAD_ROWS = 3;
        // How quickly neighbours fade vs the actual hovered block — raised for more intensity
        const NEIGHBOUR_FALLOFF = 0.72;

        let blocks = [];
        let blocksPerRow = 0;
        let numRows = 0;
        let activeTrail = [];    // list of {idx, col, row}
        let fadeInterval = null;

        const buildGrid = () => {
            container.innerHTML = '';
            const w = container.offsetWidth;
            const h = container.offsetHeight;
            blocksPerRow = Math.ceil(w / BLOCK_SIZE);
            numRows = Math.ceil(h / BLOCK_SIZE);
            const total = blocksPerRow * numRows;

            const frag = document.createDocumentFragment();
            for (let i = 0; i < total; i++) {
                const el = document.createElement('div');
                el.className = 'block';
                el.dataset.index = i;
                el.style.width = BLOCK_SIZE + 'px';
                el.style.height = BLOCK_SIZE + 'px';
                frag.appendChild(el);
            }
            container.appendChild(frag);
            blocks = Array.from(container.querySelectorAll('.block'));
            attachListeners();
        };

        const resetBlocks = () => {
            blocks.forEach(b => {
                b.style.borderColor = 'rgba(255,255,255,0.025)';
                b.style.backgroundColor = 'transparent';
            });
        };

        const drawTrail = () => {
            resetBlocks();
            activeTrail.forEach(({ col, row }, step) => {
                const baseOpacity = 1 - step / TRAIL_LENGTH;

                // Light up the actual hovered block — brighter intensity
                const ti = row * blocksPerRow + col;
                if (ti >= 0 && ti < blocks.length) {
                    blocks[ti].style.borderColor = `rgba(220,95,3,${baseOpacity})`;
                    blocks[ti].style.backgroundColor = `rgba(220,95,3,${baseOpacity * 0.18})`;
                }

                // Vertical neighbours (above and below)
                for (let dr = 1; dr <= SPREAD_ROWS; dr++) {
                    const neighbourOpacity = baseOpacity * NEIGHBOUR_FALLOFF * (1 - dr / (SPREAD_ROWS + 1));

                    // Above
                    const rowAbove = row - dr;
                    if (rowAbove >= 0) {
                        const idxAbove = rowAbove * blocksPerRow + col;
                        if (idxAbove >= 0 && idxAbove < blocks.length) {
                            const cur = parseFloat(blocks[idxAbove].style.borderColor?.match(/[\d.]+(?=\))/)?.[0] || 0);
                            if (neighbourOpacity > cur) {
                                blocks[idxAbove].style.borderColor = `rgba(220,95,3,${neighbourOpacity})`;
                                blocks[idxAbove].style.backgroundColor = `rgba(220,95,3,${neighbourOpacity * 0.12})`;
                            }
                        }
                    }

                    // Below
                    const rowBelow = row + dr;
                    if (rowBelow < numRows) {
                        const idxBelow = rowBelow * blocksPerRow + col;
                        if (idxBelow >= 0 && idxBelow < blocks.length) {
                            const cur = parseFloat(blocks[idxBelow].style.borderColor?.match(/[\d.]+(?=\))/)?.[0] || 0);
                            if (neighbourOpacity > cur) {
                                blocks[idxBelow].style.borderColor = `rgba(220,95,3,${neighbourOpacity})`;
                                blocks[idxBelow].style.backgroundColor = `rgba(220,95,3,${neighbourOpacity * 0.12})`;
                            }
                        }
                    }
                }
            });
        };

        const highlightTrail = (col, row) => {
            activeTrail.unshift({ col, row });
            if (activeTrail.length > TRAIL_LENGTH) activeTrail.pop();
            drawTrail();
        };

        const handleMouseEnter = (e) => {
            const index = parseInt(e.target.dataset.index, 10);
            if (isNaN(index)) return;
            const col = index % blocksPerRow;
            const row = Math.floor(index / blocksPerRow);
            highlightTrail(col, row);

            if (fadeInterval) clearInterval(fadeInterval);
            fadeInterval = setInterval(() => {
                if (activeTrail.length > 0) {
                    activeTrail.pop();
                    drawTrail();
                } else {
                    clearInterval(fadeInterval);
                }
            }, 20);
        };

        const handleMouseLeave = () => {
            activeTrail = [];
            resetBlocks();
            if (fadeInterval) clearInterval(fadeInterval);
        };

        const attachListeners = () => {
            blocks.forEach(b => b.addEventListener('mouseenter', handleMouseEnter));
        };

        buildGrid();
        container.addEventListener('mouseleave', handleMouseLeave);

        let resizeTimer;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(buildGrid, 150);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            if (fadeInterval) clearInterval(fadeInterval);
        };
    }, []);

    return (
        <React.Fragment>
            {/* z-index 2, pointer-events auto — mouse hits blocks directly */}
            <div className="blocks" ref={blocksRef} id="blocks-container"></div>

            {/* z-index 3, pointer-events none via CSS — mouse passes through to blocks */}
            <div className="container" id="cont1">
                <div className="intro-bor">
                    <h1 className="intro fs-sm-6 fs-md-3 fs-lg-1 text-center text-md-start">Vignesh V</h1>
                    <h3 className="role display-6 display-md-3 display-lg-1 text-center text-md-start">
                        FullStack Developer /<span className="designer display-6 display-md-3 display-lg-1"> Designer</span>
                    </h3>
                    <div className="tagline fs-6 fs-md-5 text-center text-md-start">
                        Turning ideas into pixel-perfect experiences.
                        <div className="contact">
                            <ul className="justify-content-center justify-content-md-end mt-4 mt-md-0">
                                <li>
                                    <a href="https://www.linkedin.com/in/" className="icon" target="_blank" rel="noreferrer">
                                        <i className="bi bi-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/Vignesh-1235" className="icon" target="_blank" rel="noreferrer">
                                        <i className="bi bi-github"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:vignesh12035@gmail.com" className="icon">
                                        <i className="bi bi-envelope-fill"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pic-container">
                        <img src="fpic2.png" alt="" id="picture" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Hero;
