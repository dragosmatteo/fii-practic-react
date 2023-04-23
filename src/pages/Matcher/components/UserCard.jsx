import React, { useCallback, useContext, useState } from "react"
import styled, { css } from "styled-components"
import { faCircleXmark, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, Carousel, Image } from "antd"
import { db } from "../../../utils/firebase"
import { MatcherContext } from "../../../services/matcherContext"

const ProfileCard = styled(Card)`
  width: 510px;
  position: absolute;
  ${(props) =>
    props.isAdded &&
    css`
      transform: translate(2230px, -100px) rotate(-30deg);
      transition: all 800ms ease-out;
    `}

  ${(props) =>
    props.isRejected &&
    css`
      transform: translate(-2230px, -100px) rotate(30deg);
      transition: all 800ms ease-out;
    `}
`

const Details = styled.div`
  h3 {
    margin: 5px 0;
  }

  p {
    margin: 0px;
  }
`

const CardButton = styled.button`
  border-radius: 50%;
  padding: 18px;
  font-size: 30px;
  border: none;
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
`

function MemeCarousel({ memes }) {
  return (
    <Carousel>
      {memes.map(({ imageUrl, caption }) => (
        <Image key={imageUrl} src={imageUrl} alt={caption} height={500} />
      ))}
    </Carousel>
  )
}

export default function UserCard({ userId, username, description }) {
  const [isAdded, setIsAdded] = useState(false)
  const [isRejected, setIsRejected] = useState(false)
  const { memesByUser, documentId, userMatchIds } = useContext(MatcherContext)

  const addMatch = useCallback(() => {
    const pushToMatches = async () => {
      db.collection("users")
        .doc(documentId)
        .update({
          matching: [...userMatchIds, userId],
        })
    }

    setIsAdded(true)
    setTimeout(pushToMatches, 800)
  }, [documentId, userMatchIds, userId])

  const buttons = [
    {
      id: "reject",
      icon: faCircleXmark,
      handleClick: () => setIsRejected(!isRejected),
    },
    {
      id: "add",
      icon: faHeart,
      handleClick: addMatch,
    },
  ]

  function renderButton({ id, icon, handleClick }) {
    return (
      <CardButton key={id} onClick={handleClick}>
        <FontAwesomeIcon icon={icon} />
      </CardButton>
    )
  }

  return (
    <ProfileCard
      key={`profile-card-${userId}`}
      isAdded={isAdded}
      isRejected={isRejected}
    >
      <MemeCarousel memes={memesByUser[userId] || []} userId={userId} />

      <Details>
        <h3>{username}</h3>
        <p>{description}</p>
      </Details>

      <ButtonWrap>{buttons.map(renderButton)}</ButtonWrap>
    </ProfileCard>
  )
}
