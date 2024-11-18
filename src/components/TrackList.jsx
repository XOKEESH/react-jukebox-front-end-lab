const TrackList = (props) => {
    const tracks = props.trackList.map((track) => (
        <li key={track._id}>
        <span>{track.title} by {track.artist}</span>
        <button onClick={() => props.setCurrentlyPlaying(track)}>Play</button>
        <button onClick={() => props.updateSelected(track)}>Edit</button>
      </li>
    ))

    return (
        <div>
            <h1>Track List</h1>
            {!props.trackList.length ? <h2>No tracks yet!</h2> : <ul>{ tracks }</ul>}

            <button onClick={props.handleFormView}>
                { props.isFormOpen ? 'Close Form' : 'New Track' }
            </button>
        </div>
    )
}

export default TrackList