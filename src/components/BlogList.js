import Img from "gatsby-image"
import { Link } from "gatsby"
import Media from "react-media"
import React from "react"
import { Wrap } from "./styled"
import { motion } from "framer-motion"
import styled from "styled-components"
import useBlogData from "../static_queries/useBlogData"

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

export default function BlogList() {
  const blogData = useBlogData()
  function renderBlogData() {
    return (
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
                    <div id="body" className="body">
                      {blog.node.rawMarkdownBody.substring(0, 100).trim()}...
                    </div>
                  </motion.div>
                </Link>
              </Post>
            )
          })}
      </BlogListContainer>
    )
  }
  return (
    <section>
      <ul>{renderBlogData()}</ul>
    </section>
  )
}
const BlogListContainer = styled(motion.div)``

const Post = styled(motion.li)`
  #body {
    font-size: 1rem;
    line-height: 1.5rem;
  }
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
    display: grid;
    grid-template-columns: 1fr 2fr;
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
