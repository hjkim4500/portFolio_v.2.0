import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CanvasStyle = styled.canvas`
    background-color: black;
    position: absolute;
    top: 0;
    left: 0;
`;
const CanvasInput = styled.input`
    position: absolute;
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px;
    z-index: 100;
`;

function TextParticle() {
    const [inputValue, setInputValue] = useState("WELCOME TO MY PORTFOLIO");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInputValue(event.target.value);
    };

    class Particle {
        effect: Effect;
        x: number;
        y: number;
        color: string;
        originX: number;
        originY: number;
        size: number;
        dx: number;
        dy: number;
        vx: number;
        vy: number;
        force: number;
        angle: number;
        distance: number;
        friction: number;
        ease: number;

        constructor(effect: Effect, x: number, y: number, color: string) {
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = this.effect.canvasHeight; //0이면 위에서 나옴
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap - 1;
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.force = 0;
            this.angle = 0;
            this.distance = 0;
            this.friction = Math.random() * 0.8 + 0.15;
            this.ease = Math.random() * 0.1 + 0.025;
        }
        draw() {
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.mouse.radius / this.distance;

            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }

            this.x +=
                (this.vx *= this.friction) +
                (this.originX - this.x) * this.ease;
            this.y +=
                (this.vy *= this.friction) +
                (this.originY - this.y) * this.ease;

            this.x += (this.originX - this.x) * this.ease;
            this.y += (this.originY - this.y) * this.ease;
        }
    }
    class Effect {
        context: CanvasRenderingContext2D;
        canvasWidth: number;
        canvasHeight: number;
        textX: number;
        textY: number;
        fontSize: number;
        lineHeight: number;
        maxTextWidth: number;
        textInput: HTMLInputElement; // nullable type for potential null value
        verticalOffset: number;
        particles: Particle[]; // array of particle objects
        gap: number;
        mouse: { radius: number; x: number; y: number };
        constructor(
            context: CanvasRenderingContext2D,
            canvasWidth: number,
            canvasHeight: number,
            input: HTMLInputElement
        ) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.fontSize = this.canvasWidth * 0.11;
            this.lineHeight = this.fontSize * 1.2;
            this.maxTextWidth = this.canvasWidth * 0.8;
            this.textInput = input;
            this.verticalOffset = 0; // 크기에 따라 위치 조정..
            this.textInput.addEventListener("keyup", (e) => {
                if (e.key !== " ") {
                    this.context.clearRect(
                        0,
                        0,
                        this.canvasWidth,
                        this.canvasHeight
                    );

                    this.wrapText(inputValue);
                    // this.wrapText(e.target.value);
                }
            });
            //particle text
            this.particles = [];
            this.gap = 2;
            this.mouse = { radius: 20000, x: 0, y: 0 };
            window.addEventListener("mousemove", (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
            window.addEventListener("touchmove", (e) => {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            });
        }
        drawTextWithSpacing(
            text: string,
            x: number,
            y: number,
            spacing: number
        ) {
            let currentPosition = x;
            // textAlign가 'center'인 경우, 텍스트의 시작 위치를 조정합니다.
            if (this.context.textAlign === "center") {
                const textWidth = Array.from(text).reduce(
                    (acc, char) =>
                        acc + this.context.measureText(char).width + spacing,
                    0
                );
                currentPosition -= textWidth / 2;
            }
            // 각 글자를 개별적으로 그리면서 letterSpacing을 적용합니다.
            Array.from(text).forEach((char) => {
                this.context.fillText(char, currentPosition, y);
                // measureText를 사용하여 현재 글자의 너비를 구하고, 간격을 더해 다음 글자의 위치를 결정합니다.
                const charWidth = this.context.measureText(char).width;
                currentPosition += charWidth + spacing;
            });
        }
        wrapText(text: string) {
            // console.log(inputValue);
            // const gradient = this.context.createLinearGradient(
            //     0,
            //     0,
            //     this.canvasWidth,
            //     this.canvasHeight
            // );
            // gradient.addColorStop(0.3, "red");
            // gradient.addColorStop(0.5, "orange");
            // gradient.addColorStop(0.7, "yellow");
            // this.context.fillStyle = gradient;
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.context.lineWidth = this.canvasWidth * 0.003;
            this.context.strokeStyle = "cyan";
            const letterSpacing = 10; // 픽셀 단위로 간격 지정
            this.drawTextWithSpacing(
                text,
                this.textX,
                this.textY,
                letterSpacing
            );
            this.context.font = this.fontSize + "px Orbitron";

            //break multiline text
            let linesArray = [];
            let words = text.split(" ");
            let lineCounter = 0;
            let line = "";
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + " ";
                if (
                    this.context.measureText(testLine).width > this.maxTextWidth
                ) {
                    line = words[i] + " ";
                    lineCounter++;
                } else {
                    line = testLine;
                }
                linesArray[lineCounter] = line;
            }
            let textHeight = this.lineHeight * lineCounter;
            this.textY =
                this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;
            linesArray.forEach((el, index) => {
                // this.context.fillText(
                //     el,
                //     this.textX,
                //     this.textY + index * this.lineHeight
                // );
                this.context.strokeText(
                    el,
                    this.textX,
                    this.textY + index * this.lineHeight
                );
            });
            this.convertToParticles();
        }
        convertToParticles() {
            this.particles = [];
            const pixels = this.context.getImageData(
                0,
                0,
                this.canvasWidth,
                this.canvasHeight
            ).data;
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            for (let y = 0; y < this.canvasHeight; y += this.gap) {
                for (let x = 0; x < this.canvasWidth; x += this.gap) {
                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];
                    if (alpha > 0) {
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = `rgb(${red},${green},${blue})`;
                        this.particles.push(new Particle(this, x, y, color));
                    }
                }
            }
        }
        render() {
            this.particles.forEach((particle: Particle) => {
                particle.update();
                particle.draw();
            });
        }
        resize(width: number, height: number) {
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.fontSize = this.canvasWidth * 0.11;
            this.lineHeight = this.fontSize * 1.2;
            this.maxTextWidth = this.canvasWidth * 0.8;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current!;
        const input = inputRef.current!;

        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const effect = new Effect(ctx, canvas.width, canvas.height, input);

        effect.wrapText(inputValue);
        // this.setTimeout(function () {
        //     effect.textInput.value = "MADE BY HJKIM";
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     effect.wrapText(effect.textInput.value);
        // }, 3000);
        effect.render();
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            effect.render();
            requestAnimationFrame(animate);
            // console.log("animating");
        }
        animate();
        window.addEventListener("resize", function () {
            canvas.width = this.window.innerWidth;
            canvas.height = this.window.innerHeight;
            effect.resize(canvas.width, canvas.height);
            effect.wrapText(inputValue);
        });
    }, []);
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(inputValue);
        console.log(inputValue);
    }, [inputValue]);
    return (
        <>
            <CanvasStyle ref={canvasRef} id="canvas1"></CanvasStyle>;
            <CanvasInput
                ref={inputRef}
                type="text"
                id="textInput"
                placeholder="Type something.."
                value={inputValue}
                onChange={handleChange}
            />
        </>
    );
}

export default TextParticle;
