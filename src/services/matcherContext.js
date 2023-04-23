import React, { createContext, useEffect, useState } from "react"
import { auth, db } from "../utils/firebase"

export const MatcherContext = createContext()

export default function MatcherContextProvider({ children }) {
  const [matchList, setMatchList] = useState([])
  const [userMatchIds, setUserMatchIds] = useState([])
  const [potentialMatches, setPotentialMatches] = useState([])
  const [memesByUser, setMemesByUser] = useState({})
  const [documentId, setDocumentId] = useState("")

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      const userDetails = snapshot.docs.find(
        (doc) => doc.data().userId === auth?.currentUser?.uid
      )
      const allUsers = snapshot.docs.map((doc) => doc.data())
      const userMatchesIds = userDetails.data().matching

      const filteredPotentialMatches = allUsers.filter(
        (user) => !userMatchesIds.includes(user.userId)
      )

      const currentMatches = allUsers.filter((user) =>
        userMatchesIds.includes(user.userId)
      )

      setUserMatchIds(userMatchesIds)
      setMatchList(currentMatches)
      setPotentialMatches(filteredPotentialMatches)
      setDocumentId(userDetails.id)
    })
  }, [])

  useEffect(() => {
    db.collection("memes").onSnapshot((snapshot) => {
      const memes = snapshot.docs.map((doc) => doc.data())

      const filteredMemesByUser = potentialMatches.reduce((acc, curr) => {
        acc[curr.userId] = memes.filter((doc) => doc.userId === curr.userId)
        return acc
      }, {})

      setMemesByUser(filteredMemesByUser)
    })
  }, [potentialMatches])

  return (
    <MatcherContext.Provider
      value={{
        matchList,
        documentId,
        userMatchIds,
        memesByUser,
        potentialMatches,
      }}
    >
      {children}
    </MatcherContext.Provider>
  )
}
