import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import Img from "gatsby-image"

import { Wrap } from "./styled"

export default function BlogList() {
  const blogData = useBlogData()
  function renderBlogData() {
    return (
      <BlogListContainer>
        {blogData
          .filter(blog => blog.node.frontmatter.title !== "")
          .map((blog, index) => {
            return (
              <Post key={blog.node.fields.slug}>
                <Link to={`/${blog.node.fields.slug}`}>
                  <figure>
                    <Img
                      fluid={blog.node.frontmatter.hero.childImageSharp.fluid}
                      alt={blog.node.frontmatter.title}
                    />
                  </figure>

                  <div className="content">
                    <h2>{blog.node.frontmatter.title}</h2>
                    <span className="date">{blog.node.frontmatter.date}</span>

                    <p>{blog.node.frontmatter.excerpt}</p>
                  </div>
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
const BlogListContainer = styled.div``

const Post = styled.li`
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
