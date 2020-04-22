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
      file(relativePath: { eq: "lena-bergkvist-portrait.jpg" }) {
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
