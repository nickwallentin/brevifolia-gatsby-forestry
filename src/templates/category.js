import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Media from "react-media"

import FacebookIcon from "../assets/svg/facebook.svg"

const List = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
const Item = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

export default function Blog(props) {
  const blogData = props.data.allMarkdownRemark.edges
  return (
    <Layout hasSidebar={true}>
      <SEO title={props.pageContext.category}></SEO>
      <BlogListContainer initial="hidden" animate="visible" variants={List}>
        {blogData
          .filter(blog => blog.node.frontmatter.title !== "")
          .map((blog, index) => {
            return (
              <Post
                variants={Item}
                key={blog.node.fields.slug}
                whileHover="hover"
              >
                <Link to={`/${blog.node.fields.slug}`}>
                  <motion.figure>
                    <Media
                      query="(min-width: 501px)"
                      render={() => (
                        <Img
                          fluid={
                            blog.node.frontmatter.hero.childImageSharp.fluid
                          }
                          alt={blog.node.frontmatter.title}
                        />
                      )}
                    />
                    <Media
                      query="(max-width: 500px)"
                      render={() => (
                        <Img
                          fluid={
                            blog.node.frontmatter.mobile.childImageSharp.fluid
                          }
                          alt={blog.node.frontmatter.title}
                        />
                      )}
                    />
                  </motion.figure>

                  <motion.div className="content">
                    <h2>{blog.node.frontmatter.title}</h2>
                    <span className="date">{blog.node.frontmatter.date}</span>

                    <p>{blog.node.frontmatter.excerpt}</p>
                  </motion.div>
                </Link>
              </Post>
            )
          })}
      </BlogListContainer>
    </Layout>
  )
}

const BlogListContainer = styled(motion.div)``

const Post = styled(motion.li)`
  list-style: none;
  figure {
    border-radius: 4px;
    overflow: hidden;
    @media screen and (max-width: 500px) {
      border-radius: 0px;
    }
  }
  margin: 4vh 0px;
  &:first-of-type {
    margin: 0px 0px 4vh 0px;
  }
  a {
    color: var(--c-heading);
    text-decoration: none;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    padding: 4vh 0px;

    .date {
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 0rem;
      margin-top: 0px;
      a {
        color: var(--c-heading);
        text-decoration: none;
      }
    }
  }

  @media screen and (max-width: 800px) {
    a {
      grid-template-columns: 1fr;
    }
  }
`

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getPostsByCategoryData = graphql`
  query($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "D MMMM, YYYY", locale: "sv")
            category
            title
            excerpt
            hero: hero_image {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            mobile: hero_image {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 400, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }

          fields {
            slug
          }
        }
      }
    }
  }
`
