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

const HeaderStyled = styled.header``
