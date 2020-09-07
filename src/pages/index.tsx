import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'src/components/templates/layout';
import SEO from 'src/components/seo';
import PostPreviewCard from 'src/components/organisms/post/preview';

import withLocation from 'src/withLocation';

function HomePage({ data, location, search }) {
  const posts = data.allMarkdownRemark.edges;
  const { tag } = search;

  return (
    <Layout selectedTag={tag || 'ALL'}>
      <SEO title="Home" />
      {posts
        .filter(({ node }) =>
          tag ? node.frontmatter.tags?.includes(tag) : true
        )
        .map(({ node }) => <PostPreviewCard {...node} />)}
    </Layout>
  );
}

export default withLocation(HomePage);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
