import React from "react"

import { Link } from "gatsby"
import styled from "styled-components"
import * as _ from "lodash"
import useBlogData from "../../static_queries/useBlogData"
import { Widget } from "../styled"

const AllTagsWidget = () => {
  const data = useBlogData()
  const categories = data.map(node => {
    return node.node.frontmatter.category
  })

  return (
    <Container>
      <h4>Katerogier</h4>
      <Tags>
        {_.uniq(categories).map(cat => (
          <Link
            key={cat}
            to={
              "/" +
              _.trim(
                cat.replace(/["åä"]+/g, "a").replace(/["ö"]+/g, "o")
              ).toLowerCase()
            }
          >
            <li>{cat}</li>
          </Link>
        ))}
      </Tags>
    </Container>
  )
}

export default AllTagsWidget

const Tags = styled.ul`
  color: var(--c-body);
  display: flex;
  a {
    color: var(--c-body);
    text-decoration: none;
  }
  li {
    padding: 8px;
    background: var(--bg-pop);
    margin: 5px;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 700;
    border-radius: 4px;
    cursor: pointer;

    &:first-of-type {
      margin-left: 0px;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`

const Container = styled.div`
  margin-bottom: 2rem;
  h4 {
    margin: 0px;
    margin-bottom: 10px;
  }
`
