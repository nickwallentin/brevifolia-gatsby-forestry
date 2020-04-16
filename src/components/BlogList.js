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
                <LatestPost key={blog.node.fields.slug}>
                  <Link to={`/${blog.node.fields.slug}`}>
                    <div className="content">
                      <span className="date">{blog.node.frontmatter.date}</span>
                      <h2>{blog.node.frontmatter.title}</h2>
                      <p>{blog.node.excerpt}</p>
                    </div>
                    <figure>
                      <Img
                        fluid={
                          blog.node.frontmatter.hero_image.childImageSharp.fluid
                        }
                        alt={blog.node.frontmatter.title}
                      />
                    </figure>
                  </Link>
                </LatestPost>
              )
            } else {
              return (
                <Post key={blog.node.fields.slug}>
                  <Link to={`/${blog.node.fields.slug}`}>
                    <figure>
                      <Img
                        fluid={
                          blog.node.frontmatter.hero_image.childImageSharp.fluid
                        }
                        alt={blog.node.frontmatter.title}
                      />
                    </figure>

                    <div className="content">
                      <span className="date">{blog.node.frontmatter.date}</span>
                      <h2>{blog.node.frontmatter.title}</h2>

                      <p>{blog.node.excerpt}</p>
                    </div>
                  </Link>
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

const LatestPost = styled.li`
  background: var(--bg-pop);

  max-width: 1200px;
  width: 100%;
  margin: 2vh auto;
  margin-bottom: 4vh;
  a {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4vw;
    padding: 3vw;
    color: var(--c-heading);
    text-decoration: none;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  }
  @media screen and (max-width: 800px) {
    a {
      grid-template-columns: 1fr;
    }
  }
`
const Post = styled.li`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;

  a {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4vw;
    padding: 3vw;
    color: var(--c-heading);
    text-decoration: none;
  }

  transition: all 200ms;

  &:hover {
    background: var(--bg-pop);
  }

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

  @media screen and (max-width: 800px) {
    a {
      grid-template-columns: 1fr;
    }
  }
`
