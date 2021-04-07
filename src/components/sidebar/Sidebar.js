import AboutWidget from "./aboutWidget"
import InstagramWidget from "./instagramWidget"
import LatestPostsWidget from "./latestPostsWidget"
import React from "react"
import TagsWidget from "./tagsWidget"
import styled from "styled-components"

const Sidebar = () => {
  return (
    <Container>
      <AboutWidget />
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  @media screen and (max-width: 875px) {
    width: 90%;
    margin: 0 auto;
  }
`
