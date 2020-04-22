import { graphql, useStaticQuery } from "gatsby"

export default function useBlogData() {
  const data = useStaticQuery(graphql`
    query getBlogData {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
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
                  fluid(maxWidth: 800, maxHeight: 500) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              thumbnail: hero_image {
                childImageSharp {
                  fluid(maxWidth: 200, maxHeight: 200, cropFocus: CENTER) {
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
