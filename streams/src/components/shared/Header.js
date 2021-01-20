import {Link} from "react-router-dom";
import React from "react";
import GoogleAuth from "../GoogleAuth";

const createLink = (currentView, linkView, path, displayText) => {
  return (
    <React.Fragment>
      {
        currentView !== linkView &&
        <Link to={path}
              className="item">
          {displayText}
        </Link>
      }
    </React.Fragment>
  )
}

const Header = ({view}) => {
  return (
    <div className="ui secondary pointing menu">
      {createLink(view, 'StreamList', '/', 'Streams')}
      {createLink(view, 'StreamCreate', '/streams/new', 'Create a stream')}
      {createLink(view, 'StreamCreate', '/streams/edit', 'Edit stream')}
      {createLink(view, 'StreamDelete', '/streams/delete', 'Delete stream')}
      {createLink(view, 'StreamShow', '/streams/show', 'Show a stream')}
      <GoogleAuth />
    </div>
  )
}

export default Header