import React, { Component } from 'react';
import './FriendListComponent.css';
import LoaderComponent from '../common/loaderComponent/loaderComponent';

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentPlayerList: [
        { online: true, username: 'zarathustra', requestPlayLink: '/request/zarathustra' },
        { online: false, username: 'socrates', requestPlayLink: '/request/socrates' },
        { online: true, username: 'aristotle', requestPlayLink: '/request/aristotle' },
        { online: false, username: 'plato', requestPlayLink: '/request/plato' },
      ], // TODO: Replace with empty array.
      hasSearchResult: false,
      serachUserResult: [
        { online: true, username: 'zarathustra', requestPlayLink: '/request/zarathustra' },
      ], // static result, because api is not ready. TODO: Replace with empty array.
      isLoading: false,
      loaderMessage: 'Finding your buddy.',
    };
    // binding class methods
    this.onKeyPress = this.onKeyPress.bind(this);
    this.getPlayersForRendering = this.getPlayersForRendering.bind(this);
    this.getCurrentView = this.getCurrentView.bind(this);
    this.searchFriend = this.searchFriend.bind(this);
  }

  onKeyPress(event) {
    const serachString = event.target.value;
    if (serachString.length !== 0) {
      this.setState({ serachString });
    }
  }

  getPlayersForRendering() {
    const { hasSearchResult } = this.state;
    let playerListItems;
    if (hasSearchResult) {
      const { serachUserResult } = this.state;
      playerListItems = this.convertUsersIntoDivItems(serachUserResult);
    } else {
      const { recentPlayerList } = this.state;
      playerListItems = this.convertUsersIntoDivItems(recentPlayerList);
    }
    return playerListItems;
  }

  getCurrentView() {
    const { isLoading, loaderMessage } = this.state;
    if (isLoading) {
      return (<LoaderComponent width="200" height="200" message={loaderMessage} />);
    }
    const playerListItems = this.getPlayersForRendering();
    return (
      <div className="Player-container">
        {playerListItems}
      </div>
    );
  }


  searchFriend() {
    const { serachString } = this.state;
    if (serachString.length !== 0) {
      this.setState({ isLoading: true });
      // TODO: make a api call on the backend to get players according to this search string
      // Use Fuse.Js for a fuzzy search
      // for testing
      setTimeout(() => {
        this.setState({ isLoading: false, hasSearchResult: true });
      }, 3000);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  convertUsersIntoDivItems(PlayerList) {
    return PlayerList.reduce((friendList, player) => {
      const onlineStatusClass = player.online ? 'Online' : 'Offline';
      const isPlayerOnline = player.online ? '' : 'Disable-link';
      friendList.push(
        <div className="Player" key={player.username}>
          <span>
            <div className={`Player-status ${onlineStatusClass}`} />
          </span>
          <span className="Player-name">{player.username}</span>
          <a href={player.requestPlayLink} className={isPlayerOnline}><span className="Player__request">PLAY</span></a>
        </div>,
      );
      return friendList;
    }, []);
  }

  render() {
    return (
      <div className="Container">
        <input className="Search" placeholder="find a friend by username. ex:zarathustra" onKeyUp={this.onKeyPress} />
        <button type="button" onClick={this.searchFriend} className="Find-button">Find</button>
        {this.getCurrentView()}
      </div>
    );
  }
}

export default FriendList;
