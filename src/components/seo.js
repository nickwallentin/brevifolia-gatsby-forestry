import React from "react"
import Helmet from "react-helmet"
import useAuthorData from "../static_queries/useAuthorData"
import useSiteMetadata from "../static_queries/useSiteMetadata"

const SEO = ({ title, desc, keywords }) => {
  const allAuthorData = useAuthorData()
  const { description } = useSiteMetadata()

  const { authorName } = allAuthorData.site.siteMetadata.author
  console.log(authorName)
  return (
    <Helmet>
      <title>{title ? title + " | " + authorName : "Lena Bergkvist"}</title>
      <meta charset="UTF-8" />
      <meta name="description" content={desc ? desc : description} />
      <meta
        name="keywords"
        content={"hälsa, träning, mat, kost, upplevelser"}
      />
      <meta name="author" content={authorName} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <html lang="sv" />
    </Helmet>
  )
}

export default SEO
