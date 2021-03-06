import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import DarkIcon from "../../assets/svg/darkmode.svg"
import LightIcon from "../../assets/svg/lightmode.svg"

const icons = {
  light: {
    rotate: 0,
  },
  dark: {
    rotate: -360,
  },
}

const ThemeMode = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <Icon
          initial="light"
          animate={theme === "light" ? "light" : "dark"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          variants={icons}
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

const Icon = styled(motion.span)`
  color: var(--c-heading);
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
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
