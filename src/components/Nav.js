import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

export default function Nav(props) {
  return (
    <HeaderStyled>
      <nav role="navigation" aria-label="main navigation">
        <Link to="/" id="logo">
          Lenas blogg
        </Link>
      </nav>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  nav {
    padding: 2vw;
    #logo {
      font-size: 2rem;
      color: var(--c-heading);
      text-decoration: none;
    }
  }
`
