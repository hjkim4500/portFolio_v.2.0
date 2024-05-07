import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import TextParticle from "./Component/TextParticle";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import StarsParticle from "./Component/StarsParticle";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Section = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #222222;
    &.section2 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 10vh;
    }
    .text {
        transform: translateY(0px); /* 시작 위치를 아래로 조정합니다. */
        position: absolute;
        color: #02dbc6;
        font-family: "OrbitronBlack", sans-serif;
    }
    img {
        width: 150px;
        position: absolute;
    }
`;
const ParallaxProgress = styled.progress`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    appearance: none;
    width: 100%;
    height: 5px;
    border: none;
    background: transparent;

    &::-webkit-progress-bar {
        background: transparent;
    }

    &::-webkit-progress-value {
        background: linear-gradient(
            to left,
            #db38b5,
            #01b3e3,
            #25ce7b,
            #fdc741,
            #ff6b01,
            #fc4236
        );
        background-attachment: fixed;
    }

    &::-moz-progress-bar {
        background: linear-gradient(
            to left,
            #db38b5,
            #01b3e3,
            #25ce7b,
            #fdc741,
            #ff6b01,
            #fc4236
        );
        background-attachment: fixed;
    }
`;
function App() {
    const section_1Ref = useRef<HTMLDivElement>(null); // DOM 요소에 접근하기 위한 ref 생성
    const ufoElementRef = useRef<HTMLImageElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    useGSAP(() => {
        const path = pathRef.current!;
        const ufoElement = ufoElementRef.current!;
        if (path !== null && ufoElement !== null) {
            gsap.to(ufoElement, {
                duration: 5,
                motionPath: {
                    path: path,
                    align: path,
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5],
                },
                ease: "power1.inOut",
            });
        }
    });
    useGSAP(() => {
        const panel = section_1Ref.current!;

        ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false,
        });
        gsap.to("progress", {
            value: 100,
            ease: "none",
            scrollTrigger: { scrub: 0.3 },
        });
        const Sec2 = gsap.timeline();
        Sec2.from(".section2 .t1", { autoAlpha: 0, duration: 1, y: 30 }, "+=1")
            .to(".section2 .t1", { autoAlpha: 0, duration: 0.25 }, "+=1")
            .from(".section2 .t2", { autoAlpha: 0, duration: 1, y: 30 }, "+=1")
            .to(".section2 .t2", { autoAlpha: 0, duration: 0.25 }, "+=1")
            .from(".section2 .t3", { autoAlpha: 0, duration: 1, y: 30 }, "+=1")
            .to(".section2 .t3", { scale: 60, duration: 2, autoAlpha: 3 })
            .to(".section2 .t3", { autoAlpha: 0, duration: 0.5 });
        ScrollTrigger.create({
            animation: Sec2,
            trigger: ".section2",
            start: "top top",
            end: "+=3000",
            scrub: true,
            pin: true,
            markers: true,
            anticipatePin: 1,
        });
    });
    return (
        <div className="App">
            <Section ref={section_1Ref}>
                <TextParticle />
            </Section>
            <Section className="section2">
                <StarsParticle />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <path
                        ref={pathRef}
                        id="sPath"
                        fill="none"
                        stroke="red"
                        d="M10,180 Q100,10 190,180"
                    />
                </svg>
                <img
                    ref={ufoElementRef}
                    src="../assets/img/UFO.png"
                    alt="UFO"
                />
                <div className="text t1">HELLO!</div>
                <div className="text t2">I'M FRONTEND</div>
                <div className="text t3">DEVELOPER!</div>
            </Section>
            <Section className="section3"></Section>
            <Section></Section>
            <Section></Section>
            <Section></Section>
            <ParallaxProgress value="0" max="100" />
        </div>
    );
}

export default App;
