import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"

const MemeCard = styled.div`
  height: 100%;
  width: 450px;
  border-radius: 10px;
  background: white;
  padding: 30px 20px;
  margin-bottom: 30px;
  border: 1px solid lightgrey;
`
const Meme = styled.div`
  height: 480px;
  background: url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: white;
  margin: 10px 0;
`
const Details = styled.div`
  font-size: 18px;
`

const User = styled.div`
  font-weight: 600;
  margin-right: 10px;
  color: grey;

  span {
    margin-left: 4px;
  }
`

export default function Card({ img, name, username }) {
  return (
    <MemeCard>
      <User>
        <FontAwesomeIcon icon={faUserCircle} />
        <span>{username}</span>
      </User>
      <Meme img={img} />
      <hr />
      <Details>Caption: {name}</Details>
    </MemeCard>
  )
}
