import React, { useEffect, useRef, useState } from "react";
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
                // this.canvas = canvasRef.current!;
                // this.ctx = this.canvas.getContext("2d");

                this.width = canvas.width = window.innerWidth;
                this.height = canvas.height = window.innerHeight * 3;

                this.particles = [];
                this.particleCount = 200;
                this.isScrolling = false;

                this.init();
            }

            createParticles() {
                for (let i = 0; i < this.particleCount; i++) {
                    this.particles.push({
                        x: Math.random() * this.width,
                        y: Math.random() * this.height,
                        size: Math.random() * 4 + 1, // 1 ~ 6 사이 크기
                        speed: Math.random() * 1 + 0.1, // 기본 속도
                    });
                }
            }

            drawParticles() {
                ctx.clearRect(0, 0, this.width, this.height);
                this.particles.forEach((p) => {
                    ctx.beginPath();
                    ctx.fillStyle = "#02dbc6";
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
                    ctx.fill();

                    // 위로 이동. 스크롤 시 원근감 조절.
                    p.y -= p.speed;

                    // 화면 위로 넘어가면 아래에서 다시 시작.
                    if (p.y <= -10) {
                        p.y = this.height + 10;
                        p.x = Math.random() * this.width;
                    }

                    if (this.isScrolling) {
                        // 크기가 작은 파티클은 더 빨리 움직임.
                        if (p.size < 3) {
                            p.y -= p.speed * 2;
                        } else {
                            // 크기가 큰 파티클은 상대적으로 느리게.
                            p.y -= p.speed * 0.5;
                        }
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

                // 스크롤 이벤트 리스너 추가
                window.addEventListener(
                    "scroll",
                    this.onScroll.bind(this),
                    false
                );
            }
        }
        console.log("test...");
    }, []);
    return (
        <>
            <CanvasStyle ref={canvasRef} id="canvas1"></CanvasStyle>
        </>
    );
}
