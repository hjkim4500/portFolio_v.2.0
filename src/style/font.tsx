import { css } from "styled-components";

import OrbitronBlack from "../font/OrbitronBlack.ttf";
import OrbitronBold from "../font/OrbitronBold.ttf";

export const fonts = css`
    @font-face {
        font-family: "Orbitron";
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: local("Orbitron"), url(${OrbitronBlack}) format("truetype");
    }

    @font-face {
        font-family: "Orbitron";
        font-style: normal;
        font-weight: bolder;
        font-display: swap;
        src: local("Orbitron"), url(${OrbitronBold}) format("truetype");
    }
`;
