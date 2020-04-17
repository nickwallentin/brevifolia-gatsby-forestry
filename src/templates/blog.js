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
  console.log(data)

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
            <Author>
              <div className="author">
                <figure className="author-image">
                  <Img
                    fluid={props.data.file.childImageSharp.fluid}
                    alt="Porträtt av Lena Bergkvist"
                  />
                </figure>
                <div className="author-content">
                  <strong className="name">
                    <span>Författare:</span>
                    {props.data.site.siteMetadata.author.authorName}
                  </strong>

                  <p className="author-bio">
                    {props.data.site.siteMetadata.author.authorDescription}
                  </p>
                </div>
              </div>
            </Author>
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
const Sidebar = styled.div``
const Author = styled.div`
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
    file(
      relativePath: {
        eq: "14707027_10154252586886865_4684513269585435247_o.jpg"
      }
    ) {
      childImageSharp {
        fluid(maxWidth: 100, maxHeight: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
