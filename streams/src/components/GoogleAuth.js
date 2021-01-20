import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn, signOut} from "../actions";

class GoogleAuth extends Component {
  // state = {isSignedIn: null}  // we don't know if they are or aren't signed in

  onAuthChange = (isSignedIn) => {
    console.log(`updating auth State to isSignedIn: `, isSignedIn)
    if (isSignedIn) {
      // note: add the current userID

      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut()
    }
    // this.setState({isSignedIn: isSignedIn});
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: "374113369025-lh1kf8gdbj7rl4g178ikq6o1tuh5sa66.apps.googleusercontent.com",
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        // this.setState({isSignedIn: this.auth.isSignedIn.get()})
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }

  componentWillUnmount() {
    this.auth.isSignedIn.removeEventListener(this.onAuthChange)
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return '... loading gapi'
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick}
                className="ui red google button"
        >Sign Out</button>
      )
    } else {
      return (<button onClick={this.onSignInClick}
                      className="ui red google button"
        >Sign in via Google</button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(
  mapStateToProps,
  {signIn, signOut}
)(GoogleAuth)