import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
${reset}
@font-face {
	font-family: 'OrbitronBlack';
	font-style: normal;
	font-weight: bold;
	src: url('assets/font/OrbitronBlack.ttf') format('truetype');

}
@font-face {
	font-family: 'OrbitronMedium';
	font-style: normal;
	font-weight: bold;
	src: url('assets/font/OrbitronMedium.ttf') format('truetype');

}

* {
	box-sizing: border-box;
}
    
body {
	overflow-x: hidden;
	font-family: apple-system, 'Open Sans', sans-serif;
}

ol, ul {
	list-style: none;
}

a{
	text-decoration: none;
	color: inherit;

	&:hover {
    	text-decoration: none;
		color: none;
	}
    
	&:active {
    	text-decoration: none;
		color: black;
	}
        
    &:visited {
    	text-decoration: none;
		color: black;
	}
        
	&:link {
    	text-decoration: none;
		color: black; 
	}
}
`;

export default GlobalStyles;
