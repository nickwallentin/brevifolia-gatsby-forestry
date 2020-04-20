import React, { useEffect } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import useAuthorData from "../static_queries/useAuthorData"
import AuthorBlock from "../components/AuthorBlock"
import Sticky from "react-sticky-el"

//this component handles the blur img & fade-ins
import Img from "gatsby-image"

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
            <p>yoyoyoyo</p>
            <div className="author">
              <figure className="author-image">
                <Img fluid={allAuthorData.file.childImageSharp.fluid} />
              </figure>
              <div className="author-meta">
                <strong>
                  {allAuthorData.site.siteMetadata.author.authorName}
                </strong>
                <span>{data.frontmatter.date}</span>
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
          <Sidebar>
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
  .header {
    figure.featured-image {
      max-width: 1200px;
      margin: 0 auto;
    }
    .author {
      text-align: left;
      display: block;
      margin: 20px 0px;
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

      max-width: 1080px;
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
    grid-template-columns: 2fr 1fr;
    p {
      margin-bottom: 2rem;
    }

    @media screen and (max-width: 840px) {
      grid-template-columns: 1fr;
    }
  }
`
const Sidebar = styled(Sticky)`
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
