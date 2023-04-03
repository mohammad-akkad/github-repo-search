
import './App.css';
import React from "react";

import RepositoriesList from './components/RepositoryList';

import ApolloClientFunction from './ApolloClientFunction';




function App() {
  return (
    <div className="App">

      <ApolloClientFunction>
        <RepositoriesList></RepositoriesList>
      </ApolloClientFunction>

    </div>
  );
}

export default App;
