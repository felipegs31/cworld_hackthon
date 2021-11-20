import { Container, Image, TextContainer } from './styles'
import React, { useEffect } from 'react';

interface Props {
  type: string
  photo: string
  title: string
  hadleSelectCard: CallableFunction
}

function Card({photo, title, type, hadleSelectCard}: Props) {
  return (
    <Container onClick={() => hadleSelectCard(type)}>
      <Image src={photo}/>
      <TextContainer >
        {title}
      </TextContainer>
    </Container>
  );
}
  
export default Card;
