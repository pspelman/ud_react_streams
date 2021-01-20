import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStreams} from "../../actions";
import {Link} from "react-router-dom";

class StreamList extends Component {
  componentDidMount() {
    console.log(`[StreamList.js] componentDidMount() - calling FETCH STREAMS!`,)
    this.props.fetchStreams()
  }

  renderAdmin(stream) {
    // edit and delete buttons for user who owns the stream
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className={"right floated content"}>
          <Link to={`/streams/edit/${stream.id}`}
                className="ui button primary">
            Edit
          </Link>
          <Link to={`streams/delete/${stream.id}`}
                className={"ui button negative"}>
            Delete
          </Link>
        </div>
      )
    }

  }

  renderStreamsList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera"/>
          <div className="content">
            <Link to={`/streams/${stream.id}`}
                  className={"header"}
            >
              {stream.title}
            </Link>
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      )
    })
  }

  renderCreateStreamButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: "right"}}>
          <Link to={'/streams/new'} className={"ui button primary"}>
            Create Stream
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.props.streams && this.renderStreamsList()}
          {this.renderCreateStreamButton()}
        </div>
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(
  mapStateToProps,
  {fetchStreams})
(StreamList)