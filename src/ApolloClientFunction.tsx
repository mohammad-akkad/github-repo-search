import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ContainerProps } from '@material-ui/core';
import { useState } from 'react';
import TokenModal from './components/TokenModal';
  /**
   * a wrapper function for graphql calls.
   *
   * @remarks
   * This method is for setting up the API client.
   *
   * @param props - to allow child components to be wrapped in this component
   * @returns ApolloClient
   *
   */
const ApolloClientFunction = (props: ContainerProps) => {
  const [token, setToken] = useState("");
    /**
   * a function to set the token.
   * 
   * @param token - for the github API
   *
   */
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