import React, { useEffect, useRef } from "react";

import TextParticle from "./Component/TextParticle";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Section = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #222222;
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
    const sectionRef = useRef<HTMLDivElement>(null); // DOM 요소에 접근하기 위한 ref 생성

    useEffect(() => {
        const panel = sectionRef.current!; // sectionRef를 통해 DOM 요소에 접근
        const stInstance = ScrollTrigger.create({
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
        return () => {
            // ScrollTrigger의 인스턴스를 제거해주는 코드
            stInstance.kill();
        };
    }, []);
    return (
        <div className="App">
            <Section ref={sectionRef}>
                <TextParticle />
            </Section>
            <Section></Section>
            <Section></Section>
            <Section></Section>
            <Section></Section>
            <Section></Section>
            <ParallaxProgress value="0" max="100" />
        </div>
    );
}

export default App;
