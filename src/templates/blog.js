import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"

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
              <span className="date">{data.frontmatter.date}</span>
              <h1>{data.frontmatter.title}</h1>
            </div>
            <div
              className="body"
              dangerouslySetInnerHTML={{ __html: data.html }}
            />
          </div>
          <Sidebar>
            <div className="author">
              <h4>Skriven av:</h4>
              <div>
                <img
                  src={props.data.site.siteMetadata.author.authorImage}
                  alt={
                    "Porträtt av " + props.data.site.siteMetadata.author.author
                  }
                />
                <strong>{props.data.site.siteMetadata.author.author}</strong>
              </div>
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
  padding: 2vw;
  .header {
    max-width: 1080px;
    margin: 0 auto;
  }
  .heading {
    margin-bottom: 2rem;
    .date {
      margin-bottom: 1rem;
      display: block;
    }
    h1 {
      font-size: 4rem;
    }
  }

  .content {
    max-width: 1080px;
    margin: 4rem auto;
    grid-gap: 4vw;
    display: grid;
    grid-template-columns: 2fr 1fr;
    p {
      margin-bottom: 2rem;
    }
  }
`
const Sidebar = styled.aside`
  .author {
    background: var(--bg-pop);
    padding: 2vw;
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
        author
        date(formatString: "D MMMM, YYYY", locale: "sv")
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1200, maxHeight: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
    site {
      siteMetadata {
        author {
          author
          authorDescription
          authorImage
          email
          instagram_url
        }
      }
    }
  }
`
