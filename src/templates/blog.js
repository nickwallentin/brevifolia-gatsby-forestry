import { Link, graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import { motion, useTransform, useViewportScroll } from "framer-motion"

import AuthorBlock from "../components/AuthorBlock"
import FacebookIcon from "../assets/svg/facebook.svg"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Sticky from "react-sticky-el"
import styled from "styled-components"
import useAuthorData from "../static_queries/useAuthorData"
import useBlogData from "../static_queries/useBlogData"

const fadeIn = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
}

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
  }, [])

  return (
    <Layout>
      <SEO title={data.frontmatter.title}></SEO>
      <Article initial="start" animate="end">
        <div className="navigation">
          <Link to="/">Tillbaka</Link>
        </div>
        <motion.div className="header">
          <motion.figure variants={fadeIn} className="featured-image">
            <Img
              fluid={data.frontmatter.hero_image.childImageSharp.fluid}
              alt={data.frontmatter.title}
            />
          </motion.figure>
          <motion.div className="heading" variants={fadeIn}>
            <h1>{data.frontmatter.title}</h1>

            <div className="content">
              <div
                id="body"
                className="body"
                dangerouslySetInnerHTML={{ __html: data.html }}
              />
            </div>
            <div className="meta">
              <div className="social-share">
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=#url"
                  target="_blank"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <AuthorBlock />
        </div>

        <div>
          <Link to={`/${nextSlug}`}></Link>
        </div>
      </Article>
    </Layout>
  )
}

const Article = styled(motion.article)`
  .navigation {
    padding: 1rem;
    @media (min-width: 600px) {
      padding: 1rem 0px;
    }
    a {
      text-decoration: none;
      color: var(--c-body);
    }
  }
  .featured-image {
    border-radius: 4px;
    overflow: hidden;
  }
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
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 2rem;
    margin: 2rem auto;

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
      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: center;

      .category {
        font-family: Georgia, "Times New Roman", Times, serif;
        font-style: italic;
        font-size: 1.2rem;
        margin-bottom: 15px;
        color: var(--c-body);
      }
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
    p {
      margin-bottom: 2rem;
    }

    @media screen and (max-width: 840px) {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 840px) {
    .header {
      grid-template-columns: 1fr;
      max-width: 100%;
      .heading {
        padding: 0px;
        width: 90%;
        margin: 0 auto;
        max-width: 100%;
      }
    }
  }
`
const Sidebar = styled(Sticky)`
  h4 {
    margin-top: 0px;
  }
  ul li a {
    text-decoration: none;
    color: var(--c-body);
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
            fluid(maxWidth: 900, maxHeight: 900, cropFocus: ATTENTION) {
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
