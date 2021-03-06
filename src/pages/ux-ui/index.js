import React from "react"
import { css } from "emotion"
import Link from "gatsby-link"

const headerStyle = css`
  display: inline-block;
  border-bottom: 1px solid;
`

const portfolioStyle = css`
  display: flex;
  flex-flow: wrap row;
`

const projectStyle = css`
  width: 450px;
  margin: 0 15px 200px 15px;
  @media(max-width: 568px){
    margin: 0 15px 100px 15px;
  }
`

export default ({ data }) => {
  const images = [
    require('./tradesmen-app/tradesmen-app-display.png'),
  ];
  const Project = ({ node, index }) =>
    <div key={node.id} className={projectStyle}>
      <Link to={node.fields.slug}>
        <h3 style={{ marginBottom: 10 }}>
          {node.frontmatter.title}{" "}
          <span style={{ color: '#BBB' }}>— {node.frontmatter.date}</span>
        </h3>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={images[index]} style={{ width: 400 }} />
        </div>
      </Link>
      <p>{node.excerpt}</p>
    </div>
  const Portfolio = () =>
    <article className={portfolioStyle}>
      {
        data.allMarkdownRemark.edges.map(({ node }, index) =>
          <Project
            node={node}
            index={index}
          />
        )}
    </article>
  return (
    <section>
      <h1 className={headerStyle}> UX/UI </h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      <Portfolio />
    </section>
  );
};

export const query = graphql`
  query DesignProjectQuery {
    allMarkdownRemark( filter: { frontmatter: { type: { eq: "ux-ui" }}}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            type
            img
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;