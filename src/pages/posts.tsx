import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import withLocation from 'src/withLocation';
import Layout from 'src/components/templates/layout';
import SEO from 'src/components/templates/seo';
import PostPreviewCard from 'src/components/molecules/post-card/preview';
import { POINT_BLUE } from 'src/constants/colors';

function PostsPage({ data, location, search }) {
  const { tag } = search;
  const posts = data?.allMarkdownRemark.edges.filter(
    ({ node }) => !tag || node.frontmatter.tags?.includes(tag)
  );

  return (
    <Layout selectedTag={tag} pathname={location.pathname}>
      <SEO title="posts" />
      <PageTitle>
        POSTS
        <Tag>{tag ? ` #${tag}` : ''}</Tag>
      </PageTitle>
      <PostsWrapper>
        {posts.map(({ node }) => (
          <PostPreviewCard
            key={JSON.stringify(node)}
            {...node}
            thumbnail={node.frontmatter.thumbnail?.childImageSharp.fluid}
          />
        ))}
        {[...Array(3 - (posts.length % 3))].map(() => (
          <Blank />
        ))}
      </PostsWrapper>
    </Layout>
  );
}

export default withLocation(React.memo(PostsPage));

export const pageQuery = graphql`
  query {
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

const Blank = styled.div`
  height: 0.1rem;
  @media (max-width: 1679px) {
    display: none;
  }
  @media (min-width: 1680px) {
    width: 31%;
  }
`;

const Tag = styled.strong`
  color: ${POINT_BLUE};
`;
