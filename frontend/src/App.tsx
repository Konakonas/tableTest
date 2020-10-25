import React from 'react';
import { Provider } from 'mobx-react'
import { Table } from './components/Table';
import { LocationsStore } from './components/Stores/LocationStore';

const stores = {
  locationsStore: new LocationsStore()
}

function App() {
  return (
    <Provider {...stores}> 
      <Table /> 
    </Provider> 
  );
}

export default App;
