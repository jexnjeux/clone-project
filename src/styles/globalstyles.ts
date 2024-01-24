import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${reset}
*{
  box-sizing: border-box;
}
html, body, div, span,h1, h2, h3, h4, h5, h6, p, pre,
a,ol, ul, li, form, label, legend,
article, figure, figcaption, footer, header, hgroup, 
menu, nav, output, section, summary {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
a {
  text-decoration: none;
  color: inherit;
}
button {
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}
input {
	padding-left: 10px;
	outline: none;
	border: none;
	border-radius: 8px;
	color: ${({ theme }) => theme.palette.black};
	font-size: ${({ theme }) => theme.font.md}
}

/* 모바일 스타일 (기본) */
html {

}
body {
    margin: 0;
    padding: 0;
		background-color: ${(props) => props.theme.palette.background};
    color: ${(props) => props.theme.palette.gray600};
  }
`;

export default GlobalStyles;
