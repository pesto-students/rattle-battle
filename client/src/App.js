import React, { Fragment, Component } from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';

class App extends Component {
  state = {
    loggedInUser: null,
  };

  componentDidMount() {
    // get logged in user
  }

  render() {
    const { loggedInUser } = this.state;
    return (
      <Fragment>
        <Navbar loggedInUser={loggedInUser} />
        <Home />
      </Fragment>
    );
  }
}

export default App;
