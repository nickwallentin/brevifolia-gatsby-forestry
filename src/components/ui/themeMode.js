import React from "react"
import styled from "styled-components"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import DarkIcon from "../../assets/svg/darkmode.svg"
import LightIcon from "../../assets/svg/lightmode.svg"

const ThemeMode = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <Icon
          className={theme === "light" ? "light" : "dark"}
          onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? (
            <React.Fragment>
              <DarkIcon />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LightIcon />
            </React.Fragment>
          )}
        </Icon>
      )}
    </ThemeToggler>
  )
}

export default ThemeMode

const Icon = styled.span`
  color: var(--c-heading);
  display: flex;
  align-items: center;
  padding: 10px;
  background: var(--bg-pop);
  border-radius: 99px;
  &:hover {
    cursor: pointer;
  }

  svg {
    path {
      fill: var(--c-heading);
    }
  }
`
