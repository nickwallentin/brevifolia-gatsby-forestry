import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

export default function Nav(props) {
  return (
    <HeaderStyled>
      <nav role="navigation" aria-label="main navigation">
        <Link to="/" id="logo">
          Lenas blogg
        </Link>
        <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <p onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}>
              {theme} mode
            </p>
          )}
        </ThemeToggler>
      </nav>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  nav {
    padding: 2vw;
    display: flex;
    justify-content: space-between;
    #logo {
      font-size: 2rem;
      color: var(--c-heading);
      text-decoration: none;
    }
  }
`
