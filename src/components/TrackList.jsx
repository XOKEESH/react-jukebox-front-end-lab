const TrackList = (props) => {
  const tracks = props.trackList.map((track) => (
    <li key={track._id}>
      <span>{track.title} by {track.artist}</span>
      <div className="button-group">
        <button onClick={() => props.handlePlayTrack(track)}>Play</button>
        <button onClick={() => props.handleEditTrack(track)}>Edit</button>
        <button onClick={() => props.handleDeleteTrack(track._id)}>Delete</button>
      </div>
    </li>
  ))

  return (
    <div className="jukebox">
      <h1>Jukebox Joint</h1>
      {!props.trackList.length ? (
        <h3>No tracks yet!</h3>
      ) : (
        <ul>{tracks}</ul>
      )}
      <button className="addtrkbtn" onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Track'}
      </button>
    </div>
  )
}

export default TrackList