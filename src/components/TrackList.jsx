const TrackList = (props) => {
    const tracks = props.trackList.map((track) => (
      <li key={track._id} className="track-list-item">
        <span onClick={() => props.setCurrentlyPlaying(track)}>
          {track.title} - {track.artist}
        </span>
        <div>
          <button onClick={() => props.handleEditTrack(track)}>Edit</button>
          <button onClick={() => props.handleDeleteTrack(track._id)}>Delete</button>
        </div>
      </li>
    ))
  
    return (
      <div>
        <h2>Track List</h2>
        {!props.trackList.length ? <h3>No tracks yet!</h3> : <ul>{tracks}</ul>}
      </div>
    )
  }
  
  export default TrackList