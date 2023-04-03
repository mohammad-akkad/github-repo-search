import { useQuery } from "@apollo/client";
import { Input, Spin, Table } from "antd";
import Column from "antd/es/table/Column";
import { useState } from "react";
import { SEARCH_REPOSITORIES } from "../graphql";
import { SearchOutlined } from "@ant-design/icons";

const RepositoriesList = () => {
    const [query, setQuery] = useState("");
  
    const { loading, data, fetchMore } = useQuery(SEARCH_REPOSITORIES, {
      variables: { query },
    });

  
    const handleLoadMore = () => {
      fetchMore({
        variables: { query, after: data.search.pageInfo.endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const previousEdges = previousResult.search.edges;
          const newEdges = fetchMoreResult.search.edges;
          const pageInfo = fetchMoreResult.search.pageInfo;
          const repositoryCount = fetchMoreResult.search.repositoryCount;
  
          return newEdges.length
            ? {
                search: {
                  __typename: previousResult.search.__typename,
                  edges: [...previousEdges, ...newEdges],
                  pageInfo,
                  repositoryCount
                },
              }
            : previousResult;
        },
      });
    };
  
    const dataSource =
      data && data.search ? data.search.edges.map((edge:any) => edge.node) : [];
  
    return (
      <div style={{ padding: 24 }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search repositories..."
          size="large"
          value={query}
          onChange={(e:any) => setQuery(e.target.value)}
          style={{ marginBottom: 24 }}
        />
        <Spin spinning={loading}>
          <Table
            dataSource={dataSource}
            rowKey={(repo:any) => repo.id}
            pagination={{
              pageSize: 10,
              total: data && data.search ? data.search.repositoryCount : 0,
              showTotal: (total:any) => `Total ${total} repositories`,
              showSizeChanger: false,
              onChange: handleLoadMore,
              hideOnSinglePage: true,
            }}
          >
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Owner" dataIndex={["owner", "login"]} key="owner" />
            <Column
              title="Stars"
              dataIndex="stargazers"
              key="stargazers"
              render={(stargazers:any) => stargazers.totalCount}
            />
            <Column
              title="Created At"
              dataIndex="createdAt"
              key="createdAt"
              render={(createdAt:any) => new Date(createdAt).toLocaleDateString()}
            />
          </Table>
        </Spin>
      </div>
    );
  };

  export default RepositoriesList;