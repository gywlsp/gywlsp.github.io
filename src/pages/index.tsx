import React from 'react';
import styled from 'styled-components';
import { Link } from "gatsby"
import { graphql } from 'gatsby';

import Layout from 'src/components/templates/layout';
import SEO from 'src/components/templates/seo';
import PostPreviewCard from 'src/components/molecules/post-card/preview';
import ChevronRightIcon from 'src/assets/icon/chevron/right';

import withLocation from 'src/withLocation';

function MainPage({ data, location }) {
  const posts = data.allMarkdownRemark.edges.slice(0, 8);

  return (
    <Layout selectedTag="ALL" pathname={location.pathname}>
      <SEO title="main" />
      <Row>
        <PageTitle>RECENT POSTS</PageTitle>
        <Link to="/posts">
          <ChevronRightIcon />
        </Link>
      </Row>
      <PostsWrapper>
        {posts.map(({ node }) => (
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

export default withLocation(React.memo(MainPage));

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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const PageTitle = styled.p`
  margin: 0;
  font-size: 2.8rem;
  font-weight: 700;
`;

const A = styled.a`
  margin: 0;
  text-decoration: none;
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;
