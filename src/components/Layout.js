import React from "react"
import styled from "styled-components"
import Nav from "./Nav"
import Helmet from "react-helmet"
import useSiteMetadata from "../static_queries/useSiteMetadata"
import Sidebar from "./sidebar/Sidebar"

export default function Layout(props) {
  const { title, description } = useSiteMetadata()
  const { hasSidebar } = props

  return (
    <LayoutWrapper>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Nav page={props.page} title={title} />

      {hasSidebar ? (
        <SideBarLayout>
          <Main>{props.children}</Main>
          <Sidebar />
        </SideBarLayout>
      ) : (
        <NormalLayout>
          <Main>{props.children}</Main>
        </NormalLayout>
      )}

      <footer>
        {" "}
        Copyright {new Date().getFullYear()} © {title} . Alla rättigheter
        reserverade.
      </footer>
    </LayoutWrapper>
  )
}
const Main = styled.main``
const SideBarLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2vw;
  max-width: var(--max-width);
  margin: 2rem auto;

  @media screen and (max-width: 875px) {
    grid-template-columns: 1fr;
  }
`
const NormalLayout = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`

const LayoutWrapper = styled.div`
  footer {
    padding: 4vh;
    text-align: center;
    color: var(--c-body);
  }
`
