import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { decode } from 'jsonwebtoken';

import Navbar from './components/Navbar';
import Home from './components/Home';
import GameBoardComponent from './components/gameBoardComponent/gameBoardComponent';
import UserContext from './utils/user-context';

class App extends Component {
  state = {
    user: null,
  };

  /* eslint-disable no-console, react/destructuring-assignment */
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!this.state.user && token) {
      this.loginUsingJWT(token);
    }
  }

  loginUsingJWT = (token) => {
    const decoded = decode(token);
    const tokenIsValid = decoded !== null;
    if (!tokenIsValid) {
      this.removeTokenFromLocalStorage();
      return;
    }
    const expired = decoded.exp <= new Date() / 1000;
    if (expired) {
      this.removeTokenFromLocalStorage();
      return;
    }
    this.login({ id: decoded.id, username: decoded.username });
  };

  removeTokenFromLocalStorage = () => localStorage.removeItem('token');

  logout = () => {
    this.removeTokenFromLocalStorage();
    this.setState({ user: null });
  };

  login = user => this.setState({ user });

  render() {
    const { user } = this.state;
    const { login, logout } = this;
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        <Navbar />
        <Router>
          <div>
            <Route exact path="/" render={props => <Home {...props} user={user} />} />
            <Route exact path="/game" component={GameBoardComponent} />
          </div>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
