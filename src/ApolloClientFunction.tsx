import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ContainerProps } from '@material-ui/core';
import { useState } from 'react';
import TokenModal from './components/TokenModal';

const ApolloClientFunction = (props: ContainerProps) => {
  const [token, setToken] = useState("");
  let setTokenHandler = (token: string) => {
    setToken(token)
  }
  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  return (
    <ApolloProvider client={client}>
      <TokenModal setTokenHandler={setTokenHandler}></TokenModal>
      {props.children}
    </ApolloProvider>
  );
}


export default ApolloClientFunction;