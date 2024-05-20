import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import TypeIt from "typeit-react";
import TextParticle from "./Component/TextParticle";
import styled, { css } from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import StarsParticle from "./Component/StarsParticle";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
interface PlanetProps {
    width: string;
    height: string;
    color1: string;
    color2: string;
}
const commonStyles = css`
    padding: 5%;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    border-radius: 10px;
    backface-visibility: hidden;
    .Header {
        h2 {
            font-family: "OrbitronBlack", sans-serif;
            color: #02dbc6;
            font-size: 25px;
            margin-bottom: 15px;
        }
    }

    .thingsWrap {
        padding: 5px;
        margin-bottom: 15px;
        border-radius: 5px;

        .Wrap {
            display: flex;
            justify-content: start;
            align-items: center;
            margin-bottom: 15px;

            img {
                margin-right: 20px;
                width: 20%;
            }

            p {
                font-size: 15px;
                font-family: "OrbitronBlack", sans-serif;
                color: white;
            }
        }

        .progressBar {
            width: 100%;
            height: 10px;
            background-color: white;
            border-radius: 10px;
            margin-top: 10px;

            .progressBarInner {
                width: 0%;
                height: 100%;
                background-color: #02dbc6;
                border-radius: 10px;
            }
        }
    }
`;
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
        font-size: 10vw;
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
    }

    svg {
        position: absolute;
    }
    &.section3 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .textBox {
            line-height: 1.15;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-family: "OrbitronBlack", sans-serif;
            color: #02dbc6;
            font-size: 3vw;
            z-index: 50;
            .textWrap {
                height: 4vw;
                display: flex;
                justify-content: center;
                align-items: center;

                div {
                    overflow: hidden;
                    height: 100%;
                    display: flex;

                    span {
                        white-space: nowrap;
                    }
                    p {
                        width: 100%;

                        font-weight: bolder;
                    }
                }
            }
        }
        .ImgWrap {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border-radius: 10px;
            opacity: 0;

            img {
                max-width: initial;
                width: 200%;
                margin-bottom: 50%;
            }
        }
        .EffortText {
            position: absolute;
            bottom: 5%;
            right: 5%;
            color: white;
            line-height: 1.3;
            font-size: 1.5vw;
            p {
                text-align: left;
            }

            a {
                font-family: "OrbitronBlack", sans-serif;
                text-align: right;
                color: #02dbc6;
            }
        }
        .HorizontalScroll {
            display: flex;
            width: 100%;
            height: 100vh;
            background-color: black;
            position: absolute;
            .fixedThing {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 2vw;
                font-family: "OrbitronBlack", sans-serif;
                text-align: center;
                h2 {
                    color: #02dbc6;
                    font-size: 3vw;
                    margin-bottom: 20px;
                }
            }
            .Stack {
                width: 400px;
                height: 75%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 2vw rgba(0, 255, 255, 0.5),
                    0 0 1vw rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                transform-style: preserve-3d;
                position: relative;
                opacity: 0;
                z-index: 1;
                .front {
                    ${commonStyles}
                    transform: translateZ(35px);
                }
                .back {
                    ${commonStyles}
                    transform: translateZ(-35px) rotateY(180deg);
                    .reactThing {
                        padding: 5px;
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        /* justify-content: space-around; */
                        img {
                            padding: 5px;
                            width: 90px;
                            /* height: 70px; */
                        }
                    }
                    .studyThing {
                        padding: 5px;
                        display: flex;
                        align-items: center;
                        /* justify-content: center; */
                        img {
                            padding: 5px;
                            width: 130px;
                            /* height: 70px; */
                        }
                    }
                }
            }
        }
        .developer {
            display: flex;
            width: 100%;
            height: 100vh;
            background-color: black;

            position: absolute;
            .developFixedThing {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 2vw;
                font-family: "OrbitronBlack", sans-serif;
                text-align: center;
                h2 {
                    color: #02dbc6;
                    font-size: 3vw;
                    margin-bottom: 20px;
                }
            }
            .developerWrap {
                box-shadow: 0 0 2vw rgba(0, 255, 255, 0.5),
                    0 0 1vw rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                width: 360px;

                height: auto;
                position: absolute;
                /* top: 50%;
                left: 50%;
                transform: translate(-50%, -50%); */
                background-color: black;
                padding: 10px;
                opacity: 0;
                left: 100%;
                &.first {
                    top: 5%;
                }
                &.second {
                    top: 50%;
                }
                z-index: 45;
                .Header {
                    display: flex;
                    align-items: center;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #02dbc6;

                    h2 {
                        font-family: "OrbitronBlack", sans-serif;
                        color: #02dbc6;
                        font-size: 25px;
                        margin-right: 15px;
                    }
                    p {
                        color: white;
                        font-size: 15px;
                    }
                }
                .Content {
                    h2 {
                        font-family: "OrbitronBlack", sans-serif;
                        color: #02dbc6;
                        font-size: 18px;
                        margin-bottom: 15px;
                    }
                    p {
                        line-height: 1.15;
                        color: white;
                        font-size: 16px;
                        margin-bottom: 15px;
                    }
                }
                .DoingThings {
                    margin-bottom: 15px;
                    h2 {
                        font-family: "OrbitronBlack", sans-serif;
                        color: #02dbc6;
                        font-size: 18px;
                        margin-bottom: 15px;
                    }
                    a {
                        color: white;

                        text-decoration: underline;
                        font-size: 16px;
                    }
                    .imgThings {
                        display: grid;
                        justify-content: center;
                        grid-template-columns: repeat(2, 1fr);
                        grid-template-rows: repeat(2, 1fr);
                        gap: 10px; /* 필요에 따라 간격을 조정하세요 */
                        img {
                            min-width: 160px;
                            width: 30%;
                        }
                    }
                }
            }
        }
    }

    &.section4 {
        .marQueeTrack {
            overflow: hidden;
            background-color: black;
            position: relative;
            height: 100%;
            /* white-space: nowrap; */
            .marqueeContainer {
                height: 14vh;
                font-size: 13vh;
                width: 100%;
                display: flex;
                align-items: center;

                /* display: inline-block; */
                white-space: nowrap;
                font-family: "OrbitronBlack", sans-serif;
                /* transform: translate(-100%, 0px); */

                &.l {
                    transform: translate(-80%, 0px);
                    color: white;
                }
                &.r {
                    transform: translate(-100%, 0px);
                    color: #02dbc6;
                }
            }
        }
    }
    &.section5 {
        display: flex;
        justify-content: center;
        align-items: center;
        .Content {
            /* box-shadow: 0 0 2vw rgba(0, 255, 255, 0.5),
                0 0 1vw rgba(255, 255, 255, 0.2); */
            border-radius: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            margin: 5vw;
            padding: 20px;
            max-width: 1000px;
            .MyInfo {
                .Header {
                    font-family: "OrbitronBlack", sans-serif;
                    color: #02dbc6;
                    font-size: 35px;
                    padding: 10px;
                    margin-bottom: 10px;
                }
            }
            .MyImg {
                width: 50%;
                /* height: 100%; */
                img {
                    width: 100%;
                }
            }
            @media (max-width: 768px) {
                flex-direction: column;
                align-items: center;
            }
        }
    }
`;
const Planet = styled.div<PlanetProps>`
    width: ${(props) => props.width}vw;
    height: ${(props) => props.height}vw;
    border-radius: 50%; /* 원형 모양을 만듭니다 */
    position: absolute;
    z-index: 30;
    left: 100%;
    background: radial-gradient(
        circle at 10% 20%,
        ${(props) => props.color1},
        ${(props) => props.color2}
    ); /* 그라디언트 배경을 설정합니다 */
    opacity: 0;
    &.P_one {
        top: 20%;
    }
    &.P_two {
        top: 60%;
    }
    &.P_three {
        top: 33%;
    }
    &.P_four {
        top: 70%;
    }
`;
// const ParallaxProgress = styled.progress`
//     position: fixed;
//     top: 0;
//     left: 0;
//     z-index: 1000;
//     appearance: none;
//     width: 100%;
//     height: 5px;
//     border: none;
//     background: transparent;

//     &::-webkit-progress-bar {
//         background: transparent;
//     }

//     &::-webkit-progress-value {
//         background: linear-gradient(
//             to left,
//             #db38b5,
//             #01b3e3,
//             #25ce7b,
//             #fdc741,
//             #ff6b01,
//             #fc4236
//         );
//         background-attachment: fixed;
//     }

//     &::-moz-progress-bar {
//         background: linear-gradient(
//             to left,
//             #db38b5,
//             #01b3e3,
//             #25ce7b,
//             #fdc741,
//             #ff6b01,
//             #fc4236
//         );
//         background-attachment: fixed;
//     }
// `;
const InfoBox = styled.div`
    padding: 10px;
    h2 {
        font-family: "OrbitronBlack", sans-serif;
        color: #02dbc6;
        font-size: 25px;
        margin-bottom: 10px;
    }
    p {
        color: white;
        font-size: 20px;
    }
`;
function App() {
    const section_1Ref = useRef<HTMLDivElement>(null); // DOM 요소에 접근하기 위한 ref 생성
    const section_3Ref = useRef<HTMLDivElement>(null); // DOM 요소에 접근하기 위한 ref 생성
    const ufoElementRef = useRef<HTMLImageElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    // const [startAnimation, setStartAnimation] = useState(false);
    useGSAP(() => {
        const path = pathRef.current!;
        const ufoElement = ufoElementRef.current!;

        gsap.set(ufoElement, { visibility: "hidden" });
        gsap.to(ufoElement, {
            scrollTrigger: {
                trigger: ".section3",
                scrub: 3,
                end: "+=3000",
                onEnter: () => gsap.set(ufoElement, { visibility: "visible" }),
                onLeave: () => gsap.set(ufoElement, { visibility: "hidden" }),
                onEnterBack: () =>
                    gsap.set(ufoElement, { visibility: "visible" }),
                onLeaveBack: () =>
                    gsap.set(ufoElement, { visibility: "hidden" }),
            },
            motionPath: {
                path: path,
                align: path,
                autoRotate: false, // 우주선이 뒤집혀지지 않게 설정
                alignOrigin: [0.5, 0.5],
            },

            ease: "power1.inOut",
        });
    });
    useGSAP(() => {
        const section1 = section_1Ref.current!;

        ScrollTrigger.create({
            trigger: section1,
            start: "top top",
            pin: true,
            pinSpacing: false,
        });

        // gsap.to("progress", {
        //     value: 100,
        //     ease: "none",
        //     scrollTrigger: { scrub: 0.3 },
        // });

        const Sec2 = gsap.timeline({
            // onComplete: () => {
            // ScrollTrigger.create({
            //     trigger: section3,
            //     start: "top top",
            //     pin: true,
            //     pinSpacing: false,
            // });
            // },
        });
        Sec2.from(".section2 .t1", { autoAlpha: 0, duration: 1, y: 30 }, "+=1")
            .to(".section2 .t1", { autoAlpha: 0, duration: 0.25 }, "+=1")
            .from(".section2 .t2", { autoAlpha: 0, duration: 1, y: 30 }, "+=1")
            .to(".section2 .t2", { autoAlpha: 0, duration: 0.25 }, "+=1")
            .from(".section2 .t3", { autoAlpha: 0, duration: 1, y: 30 }, "+=1")
            .to(".section2 .t3", { scale: 60, duration: 2, autoAlpha: 3 })
            .to(".section2 .t3", { display: "none" });
        ScrollTrigger.create({
            animation: Sec2,
            trigger: ".section2",
            start: "top top",
            end: "+=3000",
            scrub: true,
            pin: true,
            markers: false,
            anticipatePin: 1,
            // onLeave: () => {
            //     console.log("onLeave");
            //     ScrollTrigger.create({
            //         trigger: section3,
            //         start: "top top",
            //         pin: true,
            //         pinSpacing: false,
            //     });
            //     gsap.set(".section3", { transform: "translate(0px, 0px)" });
            // },
            // onEnterBack: () => {
            //     console.log("onEnterBack");
            // },
        });
    });
    useGSAP(() => {
        const Sec3 = gsap.timeline();
        // gsap.set(Rocket, { visibility: "hidden" });
        Sec3.from(
            ".section3 .textBox .textWrap div",
            { duration: 1, height: 0, y: 50 },
            "-=0.5"
        )
            .to(
                ".section3 .textBox .textWrap div",
                { duration: 0.25, height: "auto", y: 0 },
                "+=0.2"
            )
            .to(
                ".section3 .textBox .textWrap div span",
                { duration: 0.25, opacity: 0 },
                "-=0.3"
            )
            .to(".section3 .textBox ", { duration: 0.25, x: "-30%" }, "+=0.3")

            .to(
                ".section3 .textBox .one ",
                { duration: 0.2, x: "-7%" },
                "-=0.4"
            )
            .to(".section3 .textBox .two ", { duration: 0.2 }, "-=0.4")
            .to(
                ".section3 .textBox .three ",
                { duration: 0.2, x: "-11%" },
                "-=0.4"
            )
            .to(".section3 .textBox", { duration: 0.2, y: "-70%" }, "+=0.1")
            .to(
                ".section3 .textBox .textWrap .one p",
                {
                    duration: 0.2,
                    borderBottomColor: "#02dbc6",
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    opacity: 1,
                    // display: "inline-block",
                },
                "-=0.2"
            )
            .to(
                [
                    ".section3 .textBox .textWrap .two p",
                    ".section3 .textBox .textWrap .three p",
                ],
                {
                    duration: 0.2,
                    opacity: 0.5,
                    borderBottomColor: "#02dbc6",
                    borderBottomWidth: "0px",
                    borderBottomStyle: "solid",
                },
                "-=0.2"
            )
            .from(
                ".section3 .ImgWrap ",
                {
                    duration: 1,
                    y: "200%",
                    opacity: 1,
                    maxWidth: "20%",
                    maxHeight: "20%",
                    bottom: "20%",
                },
                "-=0.3"
            )
            .to(
                ".section3 .ImgWrap",
                {
                    duration: 1,
                    y: "0%",
                    opacity: 1,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    bottom: "0%",
                    fillOpacity: 1,
                },
                "-=0.2"
            )
            .to(
                ".section3 .ImgWrap img",
                {
                    width: "100%",
                    marginBottom: "0%",
                },
                "-=0.2"
            )
            .from(
                ".section3 .EffortText",
                { duration: 1, opacity: 0, y: "100%" },
                "-=0.2"
            )
            .to(
                ".section3 .ImgWrap",
                {
                    duration: 1,
                    width: "20%",
                    y: "-100%",
                    bottom: "100%",
                },
                "+=0.1"
            )
            .to(
                ".section3 .EffortText",
                {
                    opacity: 0,
                    y: "100%",
                },
                "-=1"
            )
            .to(
                ".section3 .textBox .textWrap .two p",
                {
                    duration: 0.2,
                    borderBottomColor: "#02dbc6",
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    opacity: 1,
                    // display: "inline-block",
                },
                "-=1"
            )
            .to(
                [
                    ".section3 .textBox .textWrap .one p",
                    ".section3 .textBox .textWrap .three p",
                ],
                {
                    duration: 0.2,
                    opacity: 0.5,
                    borderBottomColor: "#02dbc6",
                    borderBottomWidth: "0px",
                    borderBottomStyle: "solid",
                },
                "-=1"
            )

            .from(
                ".section3 .HorizontalScroll",
                { duration: 1, y: "100%", width: "20%" },
                "-=1"
            )
            .from(".section3 .Stack", { duration: 1, opacity: 0 }, "+=0.1")
            .to(".section3 .Stack", { duration: 1, opacity: 1 }, "+=0.1")
            .to(
                ".section3 .Stack .front .HTML .progressBar .progressBarInner",
                { duration: 1, width: "95%" },
                "+=0.1"
            )
            .to(
                ".section3 .Stack .front .CSS .progressBar .progressBarInner",
                { duration: 1, width: "90%" },
                "+=0.1"
            )
            .to(
                ".section3 .Stack .front .JavaScript .progressBar .progressBarInner",
                { duration: 1, width: "75%" },
                "+=0.1"
            )
            .to(
                ".section3 .Stack .front .TypeScript .progressBar .progressBarInner",
                { duration: 1, width: "45%" },
                "+=0.1"
            )
            .to(".Stack", { duration: 1, rotationY: 180 }, "+=0.1")
            .to(
                ".section3 .Stack .back .React .progressBar .progressBarInner",
                { duration: 1, width: "50%" },
                "+=0.1"
            )
            .to(
                ".section3 .textBox .textWrap .three p",
                {
                    duration: 0.2,
                    borderBottomColor: "#02dbc6",
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    opacity: 1,
                    // display: "inline-block",
                },
                "+=0.1"
            )
            .to(
                [
                    ".section3 .textBox .textWrap .one p",
                    ".section3 .textBox .textWrap .two p",
                ],
                {
                    duration: 0.2,
                    opacity: 0.5,
                    borderBottomColor: "#02dbc6",
                    borderBottomWidth: "0px",
                    borderBottomStyle: "solid",
                },
                "-=0.1"
            )
            .to(
                ".section3 .HorizontalScroll",
                { duration: 1, width: "20%", y: "-100%", bottom: "100%" },
                "-=0.1"
            )
            .from(
                ".section3 .developer",
                { duration: 1.5, y: "100%", width: "20%" },
                "-=0.1"
            )
            .to(".section3 .developerWrap.first", { opacity: 1 }, "-=0.1")
            .to(".section3 .developerWrap.second", { opacity: 1 }, "-=0.1")
            .to(".section3 .P_one", { opacity: 1 }, "-=0.1")
            .to(".section3 .P_two", { opacity: 1 }, "-=0.1")
            .to(".section3 .P_three", { opacity: 1 }, "-=0.1")
            .to(".section3 .P_four", { opacity: 1 }, "-=0.1")
            .to(
                ".section3 .developerWrap.first",
                { duration: 0.7, x: "-550%" },
                "-=0.3"
            )
            .to(".section3 .P_one", { duration: 0.8, x: "-1000%" }, "-=0.9")
            .to(".section3 .P_two", { duration: 1.3, x: "-1000%" }, "-=0.7")
            .to(".section3 .P_three", { duration: 1.2, x: "-1200%" }, "-=1")
            .to(".section3 .P_four", { duration: 1.1, x: "-1200%" }, "-=1.1")
            .to(
                ".section3 .developerWrap.second",
                { duration: 0.9, x: "-550%" },
                "-=1.2"
            );

        ScrollTrigger.create({
            animation: Sec3,
            trigger: ".section3",
            start: "top top",
            endTrigger: ".section4",
            end: "+=8000",
            scrub: true,
            pin: true,
            markers: false,
            anticipatePin: 1,
        });
    });

    useGSAP(() => {
        const Sec4 = gsap.timeline();
        Sec4.to(".marqueeContainer.l ", {
            x: "-200%",
            ease: "linear",
            repeat: -1,
            // duration: 10,
        }).to(".marqueeContainer.r", {
            x: "200%",
            ease: "linear",
            repeat: -1,
            // duration: 10,
        });

        ScrollTrigger.create({
            animation: Sec4,
            trigger: ".section4",
            start: "top top",
            end: "+=2000",
            scrub: true,
            anticipatePin: 1,
        });
    });

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: ".section4",
            start: "bottom bottom",
            pin: true,
            pinSpacing: false,
        });
    });
    return (
        <div className="App">
            {/* <ParallaxProgress value="0" max="100" /> */}
            <Section ref={section_1Ref}>
                <TextParticle />
            </Section>
            <Section className="section2">
                <StarsParticle />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1920 1080"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ width: "100%", height: "100%" }}
                >
                    <path
                        ref={pathRef}
                        fill="none"
                        stroke="none"
                        d="M384.5-47.5c0,0-308,144-312,216s434,25,436,76s-421,147-426,219s1757,187,1767,331s-1620,83-1690,197
        c-48.51,78.99,148,158,148,158"
                    />
                </svg>
                <img
                    ref={ufoElementRef}
                    src={"blob/master/public/UFO.PNG?raw=true"}
                    alt="UFO"
                />
                <div className="text t1">HELLO!</div>
                <div className="text t2">I'M FRONTEND</div>
                <div className="text t3">DEVELOPER!</div>
            </Section>
            <Section className="section3 " ref={section_3Ref}>
                {/* {startAnimation && (
                    <TypeIt
                        className="text"
                        getBeforeInit={(instance) => {
                            instance
                                .type("Intrudocing")
                                .pause(500)
                                .delete("Intrudocing".length)
                                .type("Introducing My Self! ")
                                .pause(500)
                                .go();
                            return instance;
                        }}
                    />
                )} */}
                <div className="textBox">
                    <div className="textWrap">
                        <div className="one">
                            <p>꾸준한 노력</p>
                            <span>과</span>
                        </div>
                    </div>
                    <div className="textWrap">
                        <div className="two">
                            <p>다양한 기술</p>
                            <span>들로</span>
                        </div>
                    </div>
                    <div className="textWrap">
                        <div className="three">
                            <span>발전하는&nbsp;</span>
                            <p>개발자</p>
                            <span>가 되고 싶은</span>
                        </div>
                    </div>
                    <div className="textWrap">
                        <div>
                            <span>김현준입니다.</span>
                        </div>
                    </div>
                </div>
                <div className="ImgWrap">
                    <img src={"/picture1.jpg"} alt="developer" />
                </div>
                <div className="EffortText">
                    <p>
                        공부한 부분을{" "}
                        <span>
                            {" "}
                            <a href="https://github.com/hjkim4500">Github</a>
                        </span>
                        에 매일 업로드하기 목표를 두고
                        <br />
                        꾸준히 노력하고 있습니다.
                    </p>
                </div>
                <div className="HorizontalScroll">
                    <div className="fixedThing">
                        <h2>Used Stack</h2>
                        <p>이 기술들을 사용해 봤어요!</p>
                    </div>
                    <div className="Stack ">
                        <div className="front">
                            <div className="Header">
                                <h2>Using Stack</h2>
                            </div>
                            <div className="HTML thingsWrap">
                                <div className="Wrap">
                                    <img src={"/icon_HTML.png"} alt="HTML" />
                                    <p>
                                        HTML 태그 왠만한 태그 부분은 다 알고
                                        있으며, 누구보다 빠르게 태그 배치를 할
                                        수 있습니다.
                                    </p>
                                </div>
                                <div>
                                    <div className="progressBar">
                                        <div className="progressBarInner"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="CSS thingsWrap">
                                <div className="Wrap">
                                    <img src={"/icon_CSS.png"} alt="CSS" />
                                    <p>
                                        CSS는 기본적인 스타일링을 할 수 있으며,
                                        SCSS를 사용해 변수, mixin, 함수 등을
                                        사용할 수 있으며, 반응형을 구현할 수
                                        있습니다.
                                    </p>
                                </div>
                                <div>
                                    <div className="progressBar">
                                        <div className="progressBarInner"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="JavaScript thingsWrap">
                                <div className="Wrap">
                                    <img
                                        src={"/icon_JS.png"}
                                        alt="JavaScript"
                                    />
                                    <p>
                                        JavaScript를 사용해 DOM 조작, 이벤트
                                        처리, 비동기 처리 등을 할 수 있으며, ES6
                                        문법을 사용해 코드를 작성할 수 있습니다.
                                    </p>
                                </div>
                                <div>
                                    <div className="progressBar">
                                        <div className="progressBarInner"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="TypeScript thingsWrap">
                                <div className="Wrap">
                                    <img
                                        src={"/icon_Typescript.png"}
                                        alt="Typescript"
                                    />
                                    <p>
                                        TypeScript를 사용해 타입을 정의하고
                                        코드를 작성할 수 있으며, 인터페이스를
                                        사용해 타입을 정의할 수 있습니다. 현재
                                        더 공부중에 있습니다.
                                    </p>
                                </div>
                                <div>
                                    <div className="progressBar">
                                        <div className="progressBarInner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="back">
                            <div className="Header">
                                <h2>FrontEnd Stack</h2>
                            </div>
                            <div className="React thingsWrap">
                                <div className="Wrap">
                                    <img src={"/icon_React.png"} alt="React" />
                                    <p>
                                        React를 사용해 컴포넌트 기반의
                                        프로그래밍을 할 수 있으며, Hook을 사용해
                                        상태관리를 할 수 있습니다.
                                    </p>
                                </div>
                                <div>
                                    <div className="progressBar">
                                        <div className="progressBarInner"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="Header">
                                <h2>Used Libraries</h2>
                            </div>
                            <div className="reactThing">
                                <img src="/icon_recoil.png" alt="recoil" />
                                <img
                                    src="/icon_StyledComponent.png"
                                    alt="styledcomponent"
                                />
                                <img
                                    src="/icon_ReactQuery.png"
                                    alt="ReactQuery"
                                />
                                <img
                                    src="/icon_FramerMotion.png"
                                    alt="FramerMotion"
                                />
                            </div>
                            <div className="Header">
                                <h2>Studying Libraries</h2>
                            </div>
                            <div className="studyThing">
                                <img src="/icon_Nextjs.png" alt="Nextjs" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="developer">
                    <div className="developFixedThing">
                        <h2>Developer History</h2>
                        <p>이런 일을 했었어요!</p>
                    </div>
                    <div className="developerWrap first">
                        <div className="Header">
                            <h2>Design Comma</h2>
                            <p>재직기간 : 1년 7개월</p>
                        </div>
                        <div className="Content">
                            <h2>In Company</h2>
                            <p>
                                디자인 외주 업체로, 외주 웹페이지 제작을 주로
                                했었으며, 원하는 로고 느낌을 통하여 로고를
                                제작하는 자사 웹 사이트제작도 했습니다.
                            </p>
                            <p>
                                디자인콤마에서는 프론트엔드 개발 및 퍼블리싱을
                                담당했습니다. 프론트엔드 개발은 HTML, CSS,
                                JavaScript를 사용해 작업을 하였습니다.
                            </p>
                        </div>
                        <div className="DoingThings">
                            <h2>Doing Things</h2>
                            <div className="imgThings">
                                <img src="/Alob.png" alt="Alob" />
                                <img
                                    src="/Design_Comma.png"
                                    alt="Design_Comma"
                                />
                                <img src="/jhc_tour.png" alt="jhc_tour" />
                                <img src="/mems.png" alt="mems" />
                            </div>
                        </div>
                    </div>
                    <div className="developerWrap second">
                        <div className="Header">
                            <h2>CashCow</h2>
                            <p>재직기간 : 1년 4개월</p>
                        </div>
                        <div className="Content">
                            <h2>In Company</h2>
                            <p>
                                사람들에게 결제한 영수증 사진을 받아 포인트를
                                적립해주는 플랫폼 앱 서비스 회사입니다.
                            </p>
                            <p>
                                캐시카우내에서는 프론트엔드 개발을 담당했습니다.
                                개발은 react,react-query, recoil,
                                styled-component,react-virtualized,등 다양한
                                라이브러리를 사용해 hybrid 앱 개발을 하였습니다.
                            </p>
                        </div>
                        <div className="DoingThings">
                            <h2>Doing Things</h2>
                            <a href="https://hybrid.sweiver.co.kr/SweiverHome?cidx=0&os=1&osver=14&appver=8.0.4&isUserAdult=0&apiBaseUrl=https%3A%2F%2Fapi.cash-cow.co.kr%2Fv8.0%2F&is_session=1">
                                캐시카우 앱 보러가기
                            </a>
                        </div>
                    </div>
                    <Planet
                        className="P_one"
                        width="12"
                        height="12"
                        color1="#BDE0FE"
                        color2="#A2D2FF"
                    />
                    <Planet
                        className="P_two"
                        width="15"
                        height="15"
                        color1="#FFB347"
                        color2="#FFCC5C"
                    />
                    <Planet
                        className="P_three"
                        width="10"
                        height="10"
                        color1="#02dbc6"
                        color2="#A0C4FF"
                    />
                    <Planet
                        className="P_four"
                        width="9"
                        height="9"
                        color1="#02dbc6"
                        color2="#FFC1CF"
                    />
                </div>
            </Section>
            <Section className="section4">
                <div className="marQueeTrack">
                    <div className="marqueeContainer r">
                        Thanks for Watching My Portfolio! Thanks for Watching My
                        Portfolio!
                    </div>
                    <div className="marqueeContainer l">
                        Please Contact Me! Please Contact Me! Please Contact Me!
                    </div>
                    <div className="marqueeContainer r">
                        Thanks for Watching My Portfolio! Thanks for Watching My
                        Portfolio!
                    </div>
                    <div className="marqueeContainer l">
                        Please Contact Me! Please Contact Me! Please Contact Me!
                    </div>
                    <div className="marqueeContainer r">
                        Thanks for Watching My Portfolio! Thanks for Watching My
                        Portfolio!
                    </div>
                    <div className="marqueeContainer l">
                        Please Contact Me! Please Contact Me! Please Contact Me!
                    </div>
                    <div className="marqueeContainer r">
                        Thanks for Watching My Portfolio! Thanks for Watching My
                        Portfolio!
                    </div>
                    <div className="marqueeContainer l">
                        Please Contact Me! Please Contact Me! Please Contact Me!
                    </div>
                </div>
            </Section>
            <Section className="section5">
                <div className="Content">
                    <div className="MyImg">
                        <img src="/MyImg.jpeg" alt="MyImg" />
                    </div>
                    <div className="MyInfo">
                        <div className="Header">Contact Me</div>
                        <InfoBox className="Email">
                            <h2>Email</h2>
                            <p>hjkim4500@naver.com</p>
                        </InfoBox>
                        <InfoBox className="Github">
                            <h2>Github</h2>
                            <p>https://github.com/hjkim4500</p>
                        </InfoBox>
                        <InfoBox className="Phone">
                            <h2>Phone</h2>
                            <p>010-4028-1161</p>
                        </InfoBox>
                        <InfoBox className="Codepen">
                            <h2>Codepen</h2>
                            <p>https://codepen.io/nxvsfrpj-the-looper</p>
                        </InfoBox>
                    </div>
                </div>
            </Section>
        </div>
    );
}

export default App;
