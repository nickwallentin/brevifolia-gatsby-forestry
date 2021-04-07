import { graphql, useStaticQuery } from "gatsby"

export default function useBlogData() {
  const data = useStaticQuery(graphql`
    query getBlogData {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { eq: false } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            html
            rawMarkdownBody
            frontmatter {
              date(formatString: "D MMMM, YYYY", locale: "sv")
              category
              title

              hero: hero_image {
                childImageSharp {
                  fluid(maxWidth: 800, maxHeight: 800, cropFocus: ATTENTION) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              mobile: hero_image {
                childImageSharp {
                  fluid(maxWidth: 400, maxHeight: 400, cropFocus: ATTENTION) {
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
  `)
  return data.allMarkdownRemark.edges
}
