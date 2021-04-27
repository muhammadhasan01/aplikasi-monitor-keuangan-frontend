function ConfirmActionPopup(props){
    return (
      <div id="popup-form">
        <h3>{props.title}</h3>
        <button onClick={() => props.acceptAction()}>Yes</button>
        <button onClick={() => props.cancelAction()}>No</button>
      </div>
    )
  }

  export default ConfirmActionPopup;