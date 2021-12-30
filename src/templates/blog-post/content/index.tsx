import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import dayjs from 'dayjs';

import TableOfContents from './toc';
import Bio from 'src/components/molecules/bio';
import { Tag } from 'src/components/atoms';
import { MIDDLE_GREY, BLACK, LIGHT_GREY } from 'src/constants/colors';

export type BlogPostTemplateContentProps = {
  frontmatter: {
    thumbnail: any;
    title: string;
    tags: string[];
    date: string;
  };
  html: string;
  tableOfContents: string;
};

function BlogPostTemplateContent({
  frontmatter,
  html,
  tableOfContents,
}: BlogPostTemplateContentProps) {
  const [currentHeaderHref, setcurrentHeaderHref] = useState<string>();
  const { thumbnail, title, tags, date } = frontmatter;

  useEffect(() => {
    const handleScroll = (event) => {
      const autoLinkHeaders = document.querySelectorAll(
        '.anchor-header'
      ) as NodeListOf<HTMLAnchorElement>;

      for (let i = 0; i < autoLinkHeaders.length; i++) {
        const header = autoLinkHeaders[i];
        const isLast = i === autoLinkHeaders.length - 1;
        const { top: autoLinkHeaderTop } = header.getBoundingClientRect();

        if (autoLinkHeaderTop <= 10 && !isLast) {
          continue;
        }
        const headerHref =
          autoLinkHeaderTop > 10 ? autoLinkHeaders[i - 1]?.href : header.href;
        setcurrentHeaderHref(headerHref?.replace(window.location.origin, ''));
        break;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <Article>
        <header>
          <H1>{title}</H1>
          <Row>
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </Row>
          <Row>
            <StyledLink to="/">
              <Name>박효진 (@gywlsp)</Name>
            </StyledLink>
            <Date>{dayjs(date).format('YYYY년 MM월 DD일')}</Date>
          </Row>
          <Image
            fluid={thumbnail.childImageSharp.fluid}
            style={{
              width: '80%',
              height: 'auto',
              objectFit: 'cover',
              margin: '0.8rem auto 2.4rem',
              border: `0.1px solid ${LIGHT_GREY}`,
            }}
          />
        </header>
        <section
          className="postContents"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </Article>
      {tableOfContents && (
        <TableOfContents
          content={tableOfContents}
          currentHeaderHref={currentHeaderHref}
        />
      )}
    </Wrapper>
  );
}

export default BlogPostTemplateContent;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Article = styled.article`
  width: calc(100% - 260px - 1.6rem);
  @media (max-width: 1400px) {
    width: 100%;
  }
`;

const H1 = styled.h1`
  && {
    margin: 0;
    margin-bottom: 0.8rem;
    font-size: 2.6rem;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
`;

const Name = styled.p`
  font-size: 1.4rem;
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
