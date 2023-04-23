import React from "react"
import styled from "styled-components"

import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faMagnifyingGlass,
  faUser,
  faSignOut,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "antd"
import { auth } from "../../utils/firebase"

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid white;
  height: 60px;
  position: sticky;
  top: 0;
  width: 100%;
  background: linear-gradient(to left, #34e89e, #0f3443);
`
const Navigation = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;

  li,
  a,
  svg,
  span {
    color: white;
  }

  li {
    list-style-type: none;
    margin: 0px 20px;

    :last-child {
      margin: 0px;
    }
  }
  a {
    text-decoration: none;
    :hover {
      color: #ffffffc4;
    }
  }
  svg {
    margin-right: 5px;
  }
`

const menuItems = [
  {
    icon: faHouse,
    title: "Home",
    path: "/",
  },
  {
    icon: faMagnifyingGlass,
    title: "Find",
    path: "/find",
  },
  {
    icon: faUser,
    title: "My Profile",
    path: "/profile",
  },
  {
    icon: faFireFlameCurved,
    title: "Match",
    path: "/matcher",
  },
]

export default function NavBar() {
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.clear("isLoggedIn")
    auth.signOut()
    navigate("/auth/login")
  }

  const renderMenuItem = (item) => {
    return (
      <li key={item.title}>
        <FontAwesomeIcon icon={item.icon} />
        <Link to={item.path}>{item.title}</Link>
      </li>
    )
  }

  return (
    <Layout>
      <Navigation>
        {menuItems.map(renderMenuItem)}

        <li key="signOut">
          <Button type="text" onClick={signOut}>
            <FontAwesomeIcon icon={faSignOut} />
            Log out
          </Button>
        </li>
      </Navigation>
    </Layout>
  )
}
