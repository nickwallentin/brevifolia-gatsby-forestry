import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import useAuthorData from "../../static_queries/useAuthorData"
import { Widget } from "../styled"

import InstagramIcon from "../../assets/svg/instagram.svg"

const AboutWidget = () => {
  const allAuthorData = useAuthorData()
  const {
    authorName,
    authorDescription,
    authorInstagramUrl,
  } = allAuthorData.site.siteMetadata.author
  const imgSrc = allAuthorData.file.childImageSharp.fluid

  return (
    <Widget center block>
      <AuthorImage>
        <Img fluid={imgSrc} alt={"Porträtt av " + authorName} />
      </AuthorImage>
      <AuthorName>{authorName}</AuthorName>
      <AuthorDescription>{authorDescription}</AuthorDescription>
      <AuthorLinks>
        <li>
          <a
            href={authorInstagramUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <InstagramIcon />
            hakulforfan
          </a>
        </li>
      </AuthorLinks>
    </Widget>
  )
}

export default AboutWidget

const AuthorImage = styled.figure`
  width: 150px;
  height: 150px;
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 2rem;
`

const AuthorName = styled.h4`
  margin: 0px 0px;
  font-size: 1.2rem;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-style: italic;
`
const AuthorDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1rem;
  margin-top: 1rem;
  font-family: Arial, Helvetica, sans-serif;
`
const AuthorLinks = styled.ul`
  margin-top: 1rem;

  li {
    a {
      display: flex;
      color: var(--c-heading);
      text-decoration: none;
    }
  }
  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    path {
      fill: var(--c-heading);
    }
  }
`
