import React from 'react';
import './App.css';

// Profile component displays user info and tracks time since mount
class Profile extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state with mount time and elapsed seconds
    this.state = {
      mountTime: new Date(),
      timeSinceMount: 0
    };
  }

  componentDidMount() {
    // Start interval to update timeSinceMount every second
    this.interval = setInterval(() => {
      const currentTime = new Date();
      const timeDiff = Math.floor((currentTime - this.state.mountTime) / 1000);
      this.setState({ timeSinceMount: timeDiff });
    }, 1000);
  }

  componentWillUnmount() {
    // Clear interval when component unmounts to prevent memory leaks
    clearInterval(this.interval);
  }

  render() {
    const { person } = this.props;
    const { timeSinceMount } = this.state;

    return (
      <div className="profile-card">
        <div className="time-display">
          {/* Display seconds since component was mounted */}
          Time since last component mounted: {timeSinceMount} seconds
        </div>
        <img src={person.imgSrc} alt={person.fullName} className="profile-img" />
        <div className="profile-info">
          <h2>{person.fullName}</h2>
          <p className="profession"> {person.profession}</p>
          <p><strong>About Me</strong></p>
          <p>{person.bio}</p>
        </div>
      </div>
    );
  }
}

// Main App Component
class App extends React.Component {
  constructor(props) {
    super(props);
    // App state holds person info and whether to show the profile
    this.state = {
      person: {
        fullName: "Elizabeth Njoroge",
        bio: "A passionate software developer learning React and Node.js.",
        imgSrc: "https://avatars.githubusercontent.com/u/188909981?v=4",
        profession: "Software Engineer"
      },
      shows: false // Controls visibility of Profile component
    };
  }

  // Toggle the visibility of the Profile component
  toggleShow = () => {
    this.setState(prevState => ({
      shows: !prevState.shows
    }));
  };

  render() {
    const { person, shows } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Person Profile App</h1>
          
          {/* Button to show/hide the Profile component */}
          <button onClick={this.toggleShow} className="toggle-btn">
            {shows ? 'Hide Profile' : 'Show Profile'}
          </button>

          {/* Conditionally render the Profile component */}
          {shows && <Profile person={person} />}
        </header>
      </div>
    );
  }
}

export default App;