import { gql } from "@apollo/client";

export const SEARCH_REPOSITORIES = gql`
query search($query: String!, $after: String) {
  search(query: $query, type: REPOSITORY, first: 10, after: $after) {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ... on Repository {
          id
          name
          url
          owner {
            login
          }
          stargazers {
            totalCount
          }
          createdAt
        }
      }
    }
  }
}
`;