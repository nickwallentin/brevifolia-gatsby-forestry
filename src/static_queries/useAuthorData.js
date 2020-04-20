import { graphql, useStaticQuery } from "gatsby"

export default function useAuthorData() {
  const data = useStaticQuery(graphql`
    query getAuthorData {
      site {
        siteMetadata {
          author {
            authorName
            authorDescription
            authorEmail
            authorInstagramUrl
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
  `)
  return data
}
