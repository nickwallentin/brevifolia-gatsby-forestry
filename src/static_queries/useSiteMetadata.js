import { graphql, useStaticQuery } from "gatsby"

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query getMetadata {
      site {
        siteMetadata {
          title
          description

          contact {
            email
            github_handle
            twitter_handle
          }
          cta
          description
          background_color
        }
      }
    }
  `)
  return data.site.siteMetadata
}
