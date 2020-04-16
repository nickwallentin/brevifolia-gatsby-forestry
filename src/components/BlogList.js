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
            if (index === 0) {
              return (
                <LatestPost>
                  <div className="content">
                    <h2>
                      <Link to={`/${blog.node.fields.slug}`}>
                        {blog.node.frontmatter.title}
                      </Link>
                    </h2>
                    <p>{blog.node.excerpt}</p>
                  </div>
                  <figure>
                    <Link to={`/${blog.node.fields.slug}`}>
                      <Img
                        fluid={
                          blog.node.frontmatter.hero_image.childImageSharp.fluid
                        }
                        alt={blog.node.frontmatter.title}
                      />
                    </Link>
                  </figure>
                </LatestPost>
              )
            } else {
              return (
                <Post>
                  <figure>
                    <Link to={`/${blog.node.fields.slug}`} key={blog.node.id}>
                      <Img
                        fluid={
                          blog.node.frontmatter.hero_image.childImageSharp.fluid
                        }
                        alt={blog.node.frontmatter.title}
                      />
                    </Link>
                  </figure>

                  <div className="content">
                    <h2>
                      <Link to={`/${blog.node.fields.slug}`}>
                        {blog.node.frontmatter.title}
                      </Link>
                    </h2>
                    <h3>{blog.node.frontmatter.date}</h3>
                    <p>{blog.node.excerpt}</p>
                  </div>
                </Post>
              )
            }
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

const LatestPost = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4vw;

  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 4vh;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-size: 3rem;
      margin-bottom: 1rem;
      a {
        color: var(--c-heading);
        text-decoration: none;
      }
    }
  }
`
const Post = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4vw;
  margin-bottom: 4vh;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      a {
        color: var(--c-heading);
        text-decoration: none;
      }
    }
  }
`
