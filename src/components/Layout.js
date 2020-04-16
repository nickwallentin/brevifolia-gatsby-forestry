import React from "react"
import styled from "styled-components"
import Nav from "./Nav"
import Helmet from "react-helmet"
import useSiteMetadata from "../static_queries/useSiteMetadata"
import Sidebar from "./Sidebar"

export default function Layout(props) {
  const { title, description } = useSiteMetadata()
  return (
    <LayoutWrapper>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Nav page={props.page} title={title} />
      <Main>{props.children}</Main>
      <Sidebar />
    </LayoutWrapper>
  )
}
const Main = styled.main``
const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`
