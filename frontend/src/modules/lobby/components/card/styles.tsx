
import styled from 'styled-components';

export const Container = styled.div`
    box-shadow: 0 2px 10px #000;
	transition: all 450ms ease-out 0s;
    width: 300px;
    height: 300px;
	position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    &:hover {
        box-shadow: 0 2px 35px #000;
    }
`;


export const Image = styled.img.attrs(props => ({
    src: props.src
  }))`
    position: absolute;
    width: 100%;
    height: auto;
`;

export const TextContainer = styled.div`
    position: relative;
	background: #ecebeb;
	height: 40%;
	top: 60%;
	box-shadow: 0 -2px 12px #272727;
    opacity: 0.6;
	padding: 10px 12px;
	overflow: hidden;
	transition: all 450ms ease-in-out 0s;
	cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    &:hover {
        opacity: 0.9;
        height: 50%;
        top: 50%;
    }
`;