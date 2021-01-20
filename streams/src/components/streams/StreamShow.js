import React, {Component} from 'react'
import flv from 'flv.js'

import {connect} from 'react-redux'
import {fetchStream} from "../../actions";


class StreamShow extends Component{
  constructor(props) {
    super(props);
    this.videoRef = React.createRef()
  }

  componentDidMount() {
    // this.props.fetchStream(this.props.match.params.id)
    const {id} = this.props.match.params
    if (!this.props.stream) {
      console.log(`looking up stream `, id);
      this.props.fetchStream(id)
    } else {
      console.log(`already have stream `, this.props.stream.id);
    }
    this.playerSetup()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.playerSetup()
  }

  playerSetup() {
    if (this.player || !this.props.stream) {
      if (this.player) {
        console.log(`already have a player `, )
      }
      if (this.props.stream) {
        console.log(`no stream yet`, )
      }
      return
    }
    const {id} = this.props.match.params
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    })
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load()
    // this.player.play()  // Note: Many browsers prevent this from being called automatically
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy()
    }
  }

  render() {

    if (!this.props.stream) {
      return (
        <div>Stream Show</div>
      )
    }
    const {title, description, id} = this.props.stream

    return (
      <React.Fragment>
        <video ref={this.videoRef}
               style={{width: '100%'}}
               controls={true}
        />
        <div className="header">StreamShow</div>
        {title}
        <br/>
        {description}
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]}
}
export default connect(
  mapStateToProps,
  {fetchStream}
)(StreamShow)