import React, { useEffect, useState } from "react"
import Card from "../../components/cards/Meme"
import styled from "styled-components"
import { Input } from "antd"
import "./Find.css"

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`

function renderMemes(meme) {
  return <Card id={meme.id} key={meme.id} url={meme.url} name={meme.name} />
}

function Home() {
  const [originalMemes, setOriginalMemes] = useState([])
  const [memes, setMemes] = useState([])
  const [searchText, setSearchText] = useState("")
  const [debounceTimer, setDebounceTimer] = useState(null)

  useEffect(() => {
    async function getMemes() {
      const response = await fetch("https://api.imgflip.com/get_memes")
      const result = await response.json()

      setOriginalMemes(result?.data?.memes)
      setMemes(result?.data?.memes)
    }

    getMemes()
  }, [])

  function handleSearchTextChange(event) {
    const text = event.target.value
    setSearchText(text)

    clearTimeout(debounceTimer)

    const newTimer = setTimeout(() => {
      filterMemes(text)
    }, 1000)

    setDebounceTimer(newTimer)
  }

  function filterMemes(text) {
    if (text === "") {
      setMemes(originalMemes)
    } else {
      const filteredMemes = originalMemes.filter((meme) =>
        meme.name.toLowerCase().includes(text.toLowerCase())
      )
      setMemes(filteredMemes)
    }
  }

  return (
    <Wrap>
      <Input
        className="length"
        placeholder="Caută meme-uri"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      {memes.length !== 0 && memes.map(renderMemes)}
    </Wrap>
  )
}

export default Home
