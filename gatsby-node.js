const path = require("path")
const _ = require("lodash")

module.exports.onCreateNode = ({ node, actions }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(
      node.fileAbsolutePath.replace(/([åä])+/g, "a").replace(/(ö)+/g, "o"),
      ".md"
    )
    createNodeField({
      //same as node: node
      node,
      name: "slug",
      value: slug,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  //dynamically create pages here
  //get path to template
  const blogTemplate = path.resolve("./src/templates/blog.js")
  const categoryTemplate = path.resolve("./src/templates/category.js")

  //get slugs
  const response = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
            }
          }
        }
      }
    }
  `)
  //create new pages with unique slug
  const category = []
  response.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })

    category.push(edge.node.frontmatter.category)
  })

  const cats = _.uniq(category)
  cats.forEach(cat => {
    const slug = _.trim(
      cat.replace(/["åä"]+/g, "a").replace(/["ö"]+/g, "o")
    ).toLowerCase()

    createPage({
      component: categoryTemplate,
      path: `/${slug}`,
      context: {
        category: cat,
      },
    })
  })
}
