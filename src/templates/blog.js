import React, { useEffect } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import useAuthorData from "../static_queries/useAuthorData"
import AuthorBlock from "../components/AuthorBlock"
import Sticky from "react-sticky-el"
import Img from "gatsby-image"

import FacebookIcon from "../assets/svg/facebook.svg"

export default function Blog(props) {
  const data = props.data.markdownRemark
  const allBlogData = useBlogData()
  const allAuthorData = useAuthorData()
  const nextSlug = getNextSlug(data.fields.slug)

  function getNextSlug(slug) {
    const allSlugs = allBlogData.map(blog => {
      return blog.node.fields.slug
    })
    const nextSlug = allSlugs[allSlugs.indexOf(slug) + 1]
    if (nextSlug !== undefined && nextSlug !== "") {
      return nextSlug
    } else {
      return allSlugs[0]
    }
  }
  useEffect(() => {
    const headings = []
    const allHeadings = document.querySelectorAll("h2, h3")

    allHeadings.forEach((heading, index) => {
      heading.setAttribute("id", "heading-" + (index + 1))
    })

    console.log(headings)
  }, [])

  return (
    <Layout>
      <Article>
        <div className="header">
          <div className="heading">
            <h1>{data.frontmatter.title}</h1>
            <p className="excerpt">{data.frontmatter.excerpt}</p>
            <div className="meta">
              <div className="author">
                <figure className="author-image">
                  <Img fluid={allAuthorData.file.childImageSharp.fluid} />
                </figure>
                <div className="author-meta">
                  <strong>
                    {allAuthorData.site.siteMetadata.author.authorName}
                  </strong>
                  <span>
                    {data.frontmatter.date} - {data.timeToRead} minuter
                  </span>
                </div>
              </div>
              <div className="social-share">
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=#url"
                  target="_blank"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>

          <figure className="featured-image">
            <Img
              fluid={data.frontmatter.hero_image.childImageSharp.fluid}
              alt={data.frontmatter.title}
            />
          </figure>
        </div>
        <div className="content">
          <div>
            <div
              className="body"
              dangerouslySetInnerHTML={{ __html: data.html }}
            />
            <AuthorBlock />
          </div>
          <Sidebar stickyStyle={{ marginTop: "2rem" }}>
            <div className="content-list">
              <h4>Rubriker i inlägget</h4>
              <ul>
                {props.data.markdownRemark.headings.map((heading, index) => (
                  <li className={"depth-" + heading.depth}>
                    <a href={"#heading-" + (index + 1)}>{heading.value}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="social-share">
              <h4>Dela inlägget</h4>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=#url"
                target="_blank"
              >
                <FacebookIcon />
              </a>
            </div>
          </Sidebar>
        </div>
        <div>
          <Link to={`/${nextSlug}`}></Link>
        </div>
      </Article>
    </Layout>
  )
}

const Article = styled.article`
  .meta {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    margin-top: 2rem;

    .social-share {
      display: flex;
      align-items: center;
      svg {
        width: 24px;
        height: 24px;
        path {
          fill: var(--c-body);
        }
      }
    }
  }

  .header {
    figure.featured-image {
      max-width: 1200px;
      margin: 0 auto;
    }
    .author {
      text-align: left;
      display: block;

      .author-image {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 99px;
        overflow: hidden;
      }
      .author-meta {
        strong {
          display: block;
          font-weight: 700;
          margin-bottom: 5px;
        }
        span {
          color: var(--c-body);
        }
      }
      display: flex;
      align-items: center;
    }
    .heading {
      margin-bottom: 2rem;
      max-width: 700px;
      width: 90%;
      margin: 4rem auto;
      .date {
        margin-bottom: 0rem;
        display: block;
      }
      h1 {
        margin: 0px 0px 1rem 0px;
      }
    }
  }

  .content {
    max-width: 1080px;
    width: 90%;
    margin: 4rem auto;
    grid-gap: 4vw;
    display: grid;
    grid-template-columns: 700px 1fr;
    p {
      margin-bottom: 2rem;
    }

    @media screen and (max-width: 840px) {
      grid-template-columns: 1fr;
    }
  }
`
const Sidebar = styled(Sticky)`
  h4 {
    margin-top: 0px;
  }
  ul li a {
    text-decoration: none;
    color: var(--c-heading);
  }

  .depth-2 {
    margin: 15px 0px 10px 0px;
  }
  .depth-3 {
    margin: 5px 0px;
    margin-left: 10px;
  }

  .social-share {
    margin-top: 2rem;

    svg {
      width: 24px;
      height: 24px;
      path {
        fill: var(--c-body);
      }
    }
  }
`

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        category
        excerpt
        date(formatString: "D MMMM, YYYY", locale: "sv")
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1200, maxHeight: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      headings {
        value
        depth
      }
      html
      timeToRead
    }
    site {
      siteMetadata {
        author {
          authorName
          authorDescription
        }
      }
    }
  }
`
