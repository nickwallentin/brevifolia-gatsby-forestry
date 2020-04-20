import React from "react"
import styled from "styled-components"
import useAuthorData from "../static_queries/useAuthorData"
import Img from "gatsby-image"

import InstagramIcon from "../assets/svg/instagram.svg"

const AuthorBlock = () => {
  const data = useAuthorData()
  return (
    <Author>
      <div className="author">
        <figure className="author-image">
          <Img
            fluid={data.file.childImageSharp.fluid}
            alt="Porträtt av Lena Bergkvist"
          />
        </figure>
        <div className="author-content">
          <strong className="name">
            <span>Författare:</span>
            {data.site.siteMetadata.author.authorName}
          </strong>

          <p className="author-bio">
            {data.site.siteMetadata.author.authorDescription}
          </p>
          <div className="socials">
            <ul>
              <li>
                <a
                  href={data.site.siteMetadata.author.authorInstagramUrl}
                  target="_blank"
                >
                  <InstagramIcon /> lenabergkvist
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Author>
  )
}

const Author = styled.div`
  margin-top: 4rem;
  .author {
    padding-top: 4vh;
    border-top: 1px solid var(--bg-pop);
    display: grid;
    grid-gap: 4vw;
    grid-template-columns: 100px 2fr;

    figure {
      width: 100px;
      height: 100px;
      border-radius: 99px;
      overflow: hidden;
      margin-right: 15px;
    }
    strong.name {
      margin-bottom: 15px;
      display: block;
      font-size: 1.5rem;
      span {
        display: block;
        font-size: 1rem;
        margin-bottom: 5px;
        color: var(--c-body);
        font-family: Georgia, "Times New Roman", Times, serif;
      }
    }
    .author-bio {
      font-size: 1rem;
      line-height: 1.4rem;
      margin-bottom: 0px;
    }
    .socials {
      margin-top: 20px;
      li {
        a {
          display: flex;
          align-items: center;
          color: var(--c-heading);
          text-decoration: none;
        }
        svg {
          width: 24px;
          height: 24px;
          margin-right: 10px;
          path {
            fill: var(--c-heading);
          }
        }
      }
    }
  }
`

export default AuthorBlock
