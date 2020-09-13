import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import moment from 'moment';

import Layout from 'src/components/templates/layout';
import SEO, { getSchemaOrgJSONLD } from 'src/components/templates/seo';
import { Tag } from 'src/components/atoms';
import {
  MIDDLE_GREY,
  BLACK,
  LIGHT_GREY,
} from 'src/constants/colors';

function BlogPostTemplate({ data, pageContext, location }) {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  const { excerpt } = post;
  const { slug } = post.fields;
  const { title, date, thumbnail } = post.frontmatter;
  const url = `${data.site.siteMetadata.siteUrl}${slug}`;
  const image = thumbnail.childImageSharp.fluid.src;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title,
    image,
    description: excerpt,
    datePublished: date,
    siteTitle,
    siteUrl: data.site.siteMetadata.siteUrl,
  });

  return (
    <Layout selectedTag={undefined} pathname={location.pathname}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        meta={[
          { name: 'image', content: image },
          { name: 'og:image', content: image },
          { name: 'og:type', content: 'article' },
          { name: 'og:url', content: url },
        ]}
      >
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </SEO>
      <Article>
        <header>
          <H1>{post.frontmatter.title}</H1>
          <Row>
            {post.frontmatter.tags.map((tag) => (
              <Tag key={tag} title={tag} />
            ))}
          </Row>
          <Row>
            <StyledLink to="/">
              <Name>박효진 (@gywlsp)</Name>
            </StyledLink>
            <Date>
              {moment(post.frontmatter.date).format('YYYY년 MM월 DD일')}
            </Date>
          </Row>
        </header>
        <section
          className="postContents"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
        <footer>
          {/* <Bio /> */}
        </footer>
      </Article>
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
    </Layout>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        description
        tags
      }
    }
  }
`;

const Article = styled.article`
  flex: 1;
`;

const H1 = styled.h1`
  && {
    margin: 0;
    margin-bottom: 0.8rem;
    font-size: 2.8rem;
  }
`;

const Row = styled.div`
  display: flex;
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
  color: ${MIDDLE_GREY};
`;

const StyledLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: ${BLACK};
`;
