import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import AuthorBlock from "../components/AuthorBlock"

//this component handles the blur img & fade-ins
import Img from "gatsby-image"

export default function Blog(props) {
  const data = props.data.markdownRemark
  const allBlogData = useBlogData()
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

  const heading = document.querySelector("h2")
  heading.setAttribute(
    "id",
    heading.innerText
      .toLowerCase()
      .replace(/\W+/g, "")
      .replace(/([åäö])+/g, "")
  )

  return (
    <Layout>
      <Article>
        <div className="header">
          <figure>
            <Img
              fluid={data.frontmatter.hero_image.childImageSharp.fluid}
              alt={data.frontmatter.title}
            />
          </figure>
        </div>
        <div className="content">
          <div>
            <div className="heading">
              <h1>{data.frontmatter.title}</h1>
              <span className="date">
                Publicerades {data.frontmatter.date}, i{" "}
                {data.frontmatter.category}
              </span>
            </div>
            <div
              className="body"
              dangerouslySetInnerHTML={{ __html: data.html }}
            />
            <AuthorBlock />
          </div>
          <Sidebar></Sidebar>
        </div>
        <div>
          <Link to={`/${nextSlug}`}></Link>
        </div>
      </Article>
    </Layout>
  )
}

const Article = styled.article`
  .header {
    max-width: 1200px;

    margin: 0 auto;
  }
  .heading {
    margin-bottom: 2rem;
    .date {
      margin-bottom: 0rem;
      display: block;
    }
    h1 {
      font-size: 4rem;
      margin: 0px 0px 1rem 0px;
    }
  }

  .content {
    max-width: 1080px;
    width: 90%;
    margin: 4rem auto;
    grid-gap: 4vw;
    display: grid;
    grid-template-columns: 2fr 1fr;
    p {
      margin-bottom: 2rem;
    }

    @media screen and (max-width: 840px) {
      grid-template-columns: 1fr;
    }
  }
`
const Sidebar = styled.div``

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
      }
      html
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
