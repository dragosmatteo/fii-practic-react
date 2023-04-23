import React, { useState } from "react"
import { Input } from "antd"
import AuthLayout from "../../components/layout/Auth"

import { auth, db } from "../../utils/firebase"
import { useNavigate } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [signupError, setSignupError] = useState("")
  const navigate = useNavigate()

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        await authUser.user.updateProfile({
          displayName: username,
        })
        await db.collection("users").add({
          userId: authUser.user.uid,
          username: username,
          description: "",
          avatarUrl: "",
          matching: [],
        })
        navigate("/auth/login")
      })
      .catch((err) => setSignupError(err.message))
  }

  return (
    <AuthLayout
      errorMessage={signupError}
      handleSubmit={handleRegister}
      submitText="Register"
      redirectLink="/auth/login"
      redirectLinkText="Login"
    >
      <Input
        label="Email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Password"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthLayout>
  )
}

export default Register
