import React from "react"
import styled from "styled-components"
import TagsWidget from "./tagsWidget"
import AboutWidget from "./aboutWidget"
import InstagramWidget from "./instagramWidget"
import LatestPostsWidget from "./latestPostsWidget"

const Sidebar = () => {
  return (
    <Container>
      <AboutWidget />
      <TagsWidget />
      <InstagramWidget />
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
