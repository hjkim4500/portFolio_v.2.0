import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const CanvasStyle = styled.canvas`
    background-color: black;
    margin: 0;
    padding: 0;
`;

interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    opacityChangeSpeed: number;
}

function StarsParticle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;

        class StarCanvas {
            width: number;
            height: number;
            particles: Particle[];
            particleCount: number;
            isScrolling: boolean;
            scrollTimeout: any;

            constructor() {
                this.width = canvas.width = window.innerWidth;
                this.height = canvas.height = window.innerHeight;

                this.particles = [];
                this.particleCount = 100;
                this.isScrolling = false;

                this.init();
            }

            createParticles() {
                for (let i = 0; i < this.particleCount; i++) {
                    this.particles.push({
                        x: Math.random() * this.width,
                        y: Math.random() * this.height,
                        size: Math.random() * 4 + 2,
                        speed: Math.random() * 1 + 0.001,
                        opacity: Math.random(),
                        opacityChangeSpeed: Math.random() * 0.02 + 0.001, // 0.01 ~ 0.03
                    });
                }
            }

            drawParticles() {
                ctx.clearRect(0, 0, this.width, this.height);
                this.particles.forEach((p) => {
                    ctx.beginPath();
                    const gradient = ctx.createRadialGradient(
                        p.x,
                        p.y,
                        0,
                        p.x,
                        p.y,
                        p.size
                    );
                    gradient.addColorStop(0, `rgba(2, 219, 198, ${p.opacity})`);
                    gradient.addColorStop(1, `rgba(2, 219, 198, 0)`);
                    ctx.fillStyle = gradient;
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
                    ctx.fill();

                    p.y -= p.speed;

                    if (p.y <= -10) {
                        p.y = this.height + 10;
                        p.x = Math.random() * this.width;
                    }

                    if (this.isScrolling) {
                        if (p.size < 3) {
                            p.y -= p.speed * 2;
                        } else {
                            p.y -= p.speed * 0.5;
                        }
                    }

                    p.opacity += p.opacityChangeSpeed;
                    if (p.opacity <= 0 || p.opacity >= 1) {
                        p.opacityChangeSpeed = -p.opacityChangeSpeed;
                    }
                });

                requestAnimationFrame(this.drawParticles.bind(this));
            }

            onScroll() {
                this.isScrolling = true;
                clearTimeout(this.scrollTimeout);
                this.scrollTimeout = setTimeout(() => {
                    this.isScrolling = false;
                }, 200);
            }

            init() {
                this.createParticles();
                this.drawParticles();

                window.addEventListener(
                    "scroll",
                    this.onScroll.bind(this),
                    false
                );
            }
        }

        const starCanvas = new StarCanvas();

        let animationFrameId = requestAnimationFrame(
            starCanvas.drawParticles.bind(starCanvas)
        );

        const resizeHandler = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            starCanvas.width = canvas.width;
            starCanvas.height = canvas.height;
        };
        window.addEventListener("resize", resizeHandler);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener(
                "scroll",
                starCanvas.onScroll.bind(starCanvas)
            );
        };
    }, []);

    return (
        <>
            <CanvasStyle ref={canvasRef} id="canvas1"></CanvasStyle>
        </>
    );
}

export default StarsParticle;
