import React from "react"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"

export default function IndexPage() {
  return (
    <Layout hasSidebar={true} page="home" bgColor="inherit">
      <BlogList />
    </Layout>
  )
}
