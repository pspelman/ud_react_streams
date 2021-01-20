import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'

const Modal = props => {
  const onDismiss = () => {
    props.onDismiss()
    // document.querySelector('#modal').childNodes.forEach(node => node.remove())
  }
  const handleKeypress = ev => {
    if (ev.key === 'Escape') {
      console.log(`Escape pressed! close the modal`, )
      onDismiss()
    }
  }
  useEffect(() => {
    console.log(`adding event listener`, )

    window.addEventListener('keydown', handleKeypress)
    // return () => document.removeEventListener('keydown', keyListener)
    return () => window.removeEventListener('keydown', handleKeypress)
  })

  return ReactDOM.createPortal(
    <div onClick={onDismiss}
         className={"ui dimmer modals visible active"}
    >
      <div onClick={e => e.stopPropagation()}
           className="ui standard modal visible active">
        <i className="close icon" onClick={props.onDismiss}/>
        <div className="header">
          {props.title}
        </div>
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default Modal