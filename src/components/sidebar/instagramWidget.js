import Img from "gatsby-image"
import React from "react"
import { Widget } from "../styled"
import styled from "styled-components"
import useAuthorData from "../../static_queries/useAuthorData"

const InstagramWidget = () => {
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
            <strong>Ha kul för fan!</strong>
            <a
              href={authorInstagramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Följ
            </a>
          </BioMeta>
        </Bio>
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
  }
`
const Bio = styled.div`
  margin: 0 auto;
  display: flex;
  padding: 1rem;
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
  padding: 1rem;

  .post-meta {
    margin: 10px 0;
  }
  p {
    font-size: 0.9rem;
    line-height: 1.2rem;
    font-family: Arial, Helvetica, sans-serif;
  }
`
