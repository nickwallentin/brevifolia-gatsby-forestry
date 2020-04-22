import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import useInstagramData from "../../static_queries/useInstagramData"
import useAuthorData from "../../static_queries/useAuthorData"
import { Widget } from "../styled"

const InstagramWidget = () => {
  const data = useInstagramData()
  const allAuthorData = useAuthorData()
  const image = allAuthorData.file.childImageSharp.fluid
  const {
    authorName,
    authorInstagramUrl,
  } = allAuthorData.site.siteMetadata.author
  return (
    <Widget>
      <Container>
        <Bio>
          <BioImage fluid={image} />
          <BioMeta>
            <strong>{authorName}</strong>
            <a
              href={authorInstagramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Följ
            </a>
          </BioMeta>
        </Bio>
        <Images>
          {data.map(edge => (
            <a
              href={authorInstagramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Img fluid={edge.node.localFile.childImageSharp.fluid} />
              <Caption>
                <div className="post-meta">{edge.node.likes} likes</div>
                <p>{edge.node.caption}</p>
              </Caption>
            </a>
          ))}
        </Images>
      </Container>
    </Widget>
  )
}

export default InstagramWidget

const Container = styled.div``
const Images = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.2rem;

  a {
    text-decoration: none;
    color: var(--c-heading);
    margin-bottom: 2rem;
  }
`
const Bio = styled.div`
  margin: 1rem auto;
  max-width: 250px;
  display: flex;
`
const BioImage = styled(Img)`
  width: 54px;
  height: 54px;
  border-radius: 99px;
  overflow: hidden;
  margin-right: 15px;
`

const BioMeta = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  strong {
    font-weight: 700;
    display: block;
  }
  a {
    margin-top: 10px;
    padding: 5px;
    background: var(--c-heading);
    color: var(--bg);
    text-decoration: none;
    text-align: center;
    border-radius: 4px;
    font-size: 0.8rem;
    width: 40px;
  }
`
const Caption = styled.div`
  .post-meta {
    margin: 10px 0;
  }
  p {
    font-size: 0.9rem;
    line-height: 1.2rem;
    font-family: Arial, Helvetica, sans-serif;
  }
`
