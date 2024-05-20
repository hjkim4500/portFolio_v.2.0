import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { fonts } from "./font";
const GlobalStyles = createGlobalStyle` 
${reset}
${fonts}

* {
	box-sizing: border-box;
}
html{
	overflow-y: scroll;
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
