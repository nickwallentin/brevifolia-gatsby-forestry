import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Widget } from "../../components/styled"
import useBlogData from "../../static_queries/useBlogData"

const LatestPostsWidget = () => {
  const allBlogData = useBlogData()
  return (
    <Widget>
      <strong>Senaste inläggen</strong>
      <Posts>
        {allBlogData.map(post => (
          <Post>
            <Img
              fluid={post.node.frontmatter.thumbnail.childImageSharp.fluid}
            />
            <Content>
              <h6>{post.node.frontmatter.title}</h6>
            </Content>
          </Post>
        ))}
      </Posts>
    </Widget>
  )
}

export default LatestPostsWidget

const Posts = styled.div``
const Post = styled.div``
const Image = styled(Img)`
  margin: 0;
  display: block;
`
const Content = styled.div``
