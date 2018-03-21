import React, { Component } from 'react';

import TestContainer from './../containers/TestContainer';

class Test extends Component {
  render() {
    return (
      <div>
        <h1>Spectiv Boilerplate is ALIVE</h1>
      </div>
    );
  }
}

export default TestContainer(Test);
