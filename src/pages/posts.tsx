import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import withLocation from 'src/withLocation';
import Layout from 'src/components/templates/layout';
import SEO from 'src/components/templates/seo';
import PostPreviewCard from 'src/components/molecules/post-card/preview';
import { BLUE } from 'src/constants/colors';

function PostsPage({ data, location, search }) {
  const posts = data?.allMarkdownRemark.edges;
  const tags = data.allMarkdownRemark.group;

  const { tag } = search;

  return (
    <Layout selectedTag={tag || 'ALL'} pathname={location.pathname} tags={tags}>
      <SEO title="posts" />
      <PageTitle>
        POSTS<strong style={{ color: BLUE }}>{tag ? ` - ${tag}` : ''}</strong>
      </PageTitle>
      <PostsWrapper>
        {posts
          .filter(({ node }) =>
            tag ? node.frontmatter.tags?.includes(tag) : true
          )
          .map(({ node }) => (
            <PostPreviewCard
              key={JSON.stringify(node)}
              {...node}
              thumbnail={node.frontmatter.thumbnail?.childImageSharp.fluid}
            />
          ))}
      </PostsWrapper>
    </Layout>
  );
}

export default withLocation(React.memo(PostsPage));

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
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
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PageTitle = styled.p`
  margin: 0;
  margin-bottom: 0.8rem;
  font-size: 2.8rem;
  font-weight: 700;
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;
