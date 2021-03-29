import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

import Layout from 'src/components/templates/layout';
import SEO from 'src/components/templates/seo';
import AboutMe from 'src/components/organisms/about-me';
import HorizontalScrollable from 'src/components/atoms/horizontal-scrollable';
import PostPreviewCardSmall from 'src/components/molecules/post-card/preview/small';
import ChevronRightIcon from 'src/assets/icon/chevron/right';

import withLocation from 'src/withLocation';

function MainPage({ data, location }) {
  const recentPosts = data.allMarkdownRemark.edges.slice(0, 8);
  return (
    <Layout pathname={location.pathname}>
      <SEO title="main" />
      <AboutMe />
      <Row>
        <SectionTitle>RECENT POSTS</SectionTitle>
        <Link to="/posts">
          <ChevronRightIcon />
        </Link>
      </Row>
      <HorizontalScrollable>
        {recentPosts.map(({ node }) => (
          <PostPreviewCardSmall
            key={JSON.stringify(node)}
            {...node}
            thumbnail={node.frontmatter.thumbnail?.childImageSharp.fluid}
          />
        ))}
      </HorizontalScrollable>
    </Layout>
  );
}

export default withLocation(React.memo(MainPage));

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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 2rem 0 0.8rem;
`;

const SectionTitle = styled.p`
  margin: 0;
  margin-bottom: 0.4rem;
  font-size: 2.4rem;
  font-weight: 700;
`;
