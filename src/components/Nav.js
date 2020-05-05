import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"
import ThemeMode from "../components/ui/themeMode"

import Logo from "../assets/svg/ha-kul-for-fan.svg"

export default function Nav(props) {
  return (
    <HeaderStyled>
      <nav role="navigation" aria-label="main navigation">
        <Link to="/" id="logo">
          <Logo />
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
    padding: 1rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1200px;
    #logo {
      font-size: 2rem;
      line-height: 2.5rem;
      color: var(--c-heading);
      text-decoration: none;
      margin-right: 2rem;
      font-weight: 700;
      svg {
        width: 100px;
        path {
          fill: var(--c-heading);
        }
      }
      @media screen and (max-width: 500px) {
        font-size: 1.2rem;
      }
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
