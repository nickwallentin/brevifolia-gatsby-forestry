import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"
import ThemeMode from "../components/ui/themeMode"

export default function Nav(props) {
  return (
    <HeaderStyled>
      <nav role="navigation" aria-label="main navigation">
        <Link to="/" id="logo">
          Lena Bergkvist
        </Link>
        <Links>
          <li>
            <Link to="/">Blogg</Link>
          </li>
        </Links>
        <ThemeMode />
      </nav>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  z-index: 99;
  position: relative;
  background: var(--bg);
  nav {
    padding: 1vw 2vw;
    display: flex;
    justify-content: space-between;
    #logo {
      font-size: 2rem;
      line-height: 2.5rem;
      color: var(--c-heading);
      text-decoration: none;
      margin-right: 2rem;
      font-weight: 700;
    }
  }
`
const Links = styled.ul`
  display: flex;
  flex: 1;

  li {
    margin: 0px 10px;
    display: flex;
    align-items: center;
    a {
      color: var(--c-heading);
      text-decoration: none;
      font-size: 1.4rem;
    }
  }
`
