import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/templates/layout';
import SEO from '../components/seo';
import withLocation from '../withLocation';

function HomePage({ data, location, search }) {
  const posts = data.allMarkdownRemark.edges;
  const { tag } = search;

  return (
    <Layout selectedTag={tag || (location.pathname = '/' ? 'ALL' : undefined)}>
      <SEO title="Home" />
      {posts
        .filter(({ node }) =>
          tag ? node.frontmatter.tags?.includes(tag) : true
        )
        .map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <header>
                <h3>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt
                  }}
                />
              </section>
            </article>
          );
        })}
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
