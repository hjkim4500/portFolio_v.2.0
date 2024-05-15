import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import TypeIt from "typeit-react";
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
                    padding: 5%;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: black;
                    border-radius: 10px;
                    transform: translateZ(35px);
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
                        //progressbar 디자인 해줘
                        .progressBar {
                            width: 100%;
                            height: 10px;
                            background-color: white;
                            border-radius: 10px;
                            margin-top: 10px;
                            .progressBarInner {
                                width: 20%;
                                height: 100%;
                                background-color: #02dbc6;
                                border-radius: 10px;
                            }
                        }
                    }
                }
                .back {
                    padding: 5%;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: black;
                    border-radius: 10px;
                    transform: translateZ(-35px) rotateY(180deg);
                    backface-visibility: hidden;
                }
            }
        }
    }
    &.section4 {
        background-color: #000000;
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

        gsap.to("progress", {
            value: 100,
            ease: "none",
            scrollTrigger: { scrub: 0.3 },
        });

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
                { duration: 1, width: "20%", y: "-100%", bottom: "100%" },
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
            .to(".Stack", { duration: 1, rotationY: 180 }, "+=0.1");

        ScrollTrigger.create({
            animation: Sec3,
            trigger: ".section3",
            start: "top top",
            endTrigger: ".section4",
            end: "+=6000",
            scrub: true,
            pin: true,
            markers: false,
            anticipatePin: 1,
        });
    });

    return (
        <div className="App">
            <ParallaxProgress value="0" max="100" />
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
                    // src={'https://hjkim4500.github.io/portFolio_v.2.0/assets/img/UFO.png'}
                    src={"./assets/img/UFO.png"}
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
                    <img src={"./assets/img/picture1.jpg"} alt="developer" />
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
                                    <img
                                        src={"./assets/img/icon_HTML.png"}
                                        alt="HTML"
                                    />
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
                                    <img
                                        src={"./assets/img/icon_CSS.png"}
                                        alt="CSS"
                                    />
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
                                        src={"./assets/img/icon_JS.png"}
                                        alt="CSS"
                                    />
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
                            <div className="Typescript thingsWrap">
                                <div className="Wrap">
                                    <img
                                        src={"./assets/img/icon_Typescript.png"}
                                        alt="CSS"
                                    />
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
                        </div>
                        <div className="back">
                            <div className="React"></div>
                        </div>
                    </div>
                    {/* <div className="Stack ReactStack"></div>
                    <div className="Stack StudyingNow"></div> */}
                </div>
            </Section>
            <Section className="section4"></Section>
            <Section></Section>
            <Section></Section>
        </div>
    );
}

export default App;
