import React, {Component} from 'react'
import Modal from "../shared/Modal"
import history from "../../history"
import {connect} from "react-redux"
import {deleteStream, fetchStream} from "../../actions"
import {Link} from "react-router-dom";
class StreamDelete extends Component {

  componentDidMount() {
    // get the streamId
    if (!this.props.stream) {
      console.log(`looking up stream `, this.props.match.params.id);
      this.props.fetchStream(this.props.match.params.id);
    } else {
      console.log(`already have stream `, this.props.stream.id);
    }
  }

  renderActions() {
    const deleteGoHome = (id) => {
      this.props.deleteStream(id)
      history.push("/")
    }
    const {id} = this.props.match.params
    return (
      <div>
        <button onClick={() => deleteGoHome(id)}
                className={"ui button negative"}>
          Delete
        </button>
        <Link to={"/"}
              className={"ui button"}>
          Cancel</Link>
      </div>
    )
  }

  renderContent() {
    if (!this.props.stream) {
      return "..."
    } else {
      return `Are you sure you want to delete the ${this.props.stream.title} stream?`
    }
  }

  render() {
    return (
      <React.Fragment>
        StreamDelete
        <Modal title={'Delete Stream'}
               content={this.renderContent()}
               actions={this.renderActions()}
               onDismiss={() => history.push('/')}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(
  mapStateToProps,
  {fetchStream, deleteStream}
)(StreamDelete)