import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'src/components/templates/layout';
import SEO from 'src/components/templates/seo';

import withLocation from 'src/withLocation';

function ProjectsPage({ data, location, search }) {
  const posts = data.allMarkdownRemark.edges;
  const { tag } = search;

  return (
    <Layout selectedTag={tag || 'ALL'} pathname={location.pathname}>
      <SEO title="projects" />
    </Layout>
  );
}

export default withLocation(React.memo(ProjectsPage));

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
