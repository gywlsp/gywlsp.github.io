import React from 'react';
import { Link, graphql } from 'gatsby';
import moment from 'moment';
import styled from 'styled-components';

import Layout from 'src/components/templates/layout';
import Bio from 'src/components/bio';
import SEO from 'src/components/seo';
import { MIDDLE_GREY, BLACK } from 'src/constants/colors';

function BlogPostTemplate({ data, pageContext, location }) {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout selectedTag={undefined} pathname={location.pathname}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <H1
          >
            {post.frontmatter.title}
          </H1>
          <Row>
            <StyledLink to='/'>
              <Name>
                박효진 (@gywlsp)
            </Name>
            </StyledLink>
            <Date
            >
              {moment(post.frontmatter.date).format('YYYY년 MM월 DD일')}
            </Date>
          </Row>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout >
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`;

const H1 = styled.h1`
  margin-bottom: 0.8rem;
  font-size: 2.8rem;
`;

const Row = styled.div`
  display:flex;
  align-items: baseline;
`;

const Name = styled.p`
font-size: 1.4rem;
font-weight: 500;
margin-right: 1.2rem;
`;

const Date = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${MIDDLE_GREY}
`;

const StyledLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: ${BLACK}
`;