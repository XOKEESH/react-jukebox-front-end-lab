const TrackDetail = (props) => {
    if (!props.selected)
    return (
      <div>
        <h2>There are no track details.</h2>
      </div>
    )

  return (
    <div>
      <h2>Track Details</h2>  
      <h3>{props.selected.title}</h3>
      <h3>By: {props.selected.artist}</h3>
      <p>{props.selected.title} performed by {props.selected.artist}.</p>
    
      <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
    </div>
  )
}

export default TrackDetail