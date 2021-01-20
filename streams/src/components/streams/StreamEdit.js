import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editStream, fetchStream} from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {

  componentDidMount() {
    // this.props.fetchStream(this.props.match.params.id)
    if (!this.props.stream) {
      console.log(`looking up stream `, this.props.match.params.id);
      this.props.fetchStream(this.props.match.params.id)
    } else {
      console.log(`already have stream `, this.props.stream.id);
    }

  }

  onSubmit = formValues => {
    console.log(`trying to edit the stream! `, formValues)
    // this.props.editStream(this.props.stream.id, {...this.props.stream, ...formValues})
    this.props.editStream(this.props.stream.id, formValues)
  }

  renderForm = () => {
    const {title, description} = this.props.stream? this.props.stream : {title: null, description: null}
    return <StreamForm onSubmit={this.onSubmit} initialValues={{title, description}}/>
  }

  render () {
    let streamId = this.props.match.params.id
    console.log(`RENDERING StreamEdit() for ID: `, streamId)
    console.log(`Stream: `, this.props.stream)


    // ensure the current user is logged in and is the owner of this stream
    return (
      <React.Fragment>
        StreamEdit Component
        {this.props.stream && this.props.stream.description}
        {this.renderForm()}
      </React.Fragment>
    )

  }
}


const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(
  mapStateToProps,
  {fetchStream, editStream}
)(StreamEdit)