import { graphql, useStaticQuery } from "gatsby"

export default function useBlogData() {
  const data = useStaticQuery(graphql`
    query getInstagramData {
      allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 3) {
        edges {
          node {
            id
            username
            caption

            localFile {
              childImageSharp {
                fluid(maxWidth: 200, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)
  return data.allInstaNode.edges
}
