import { useState, useEffect } from 'react'
import * as trackService from './services/trackService'

import TrackList from './components/TrackList'
import TrackDetail from './components/TrackDetail'
import TrackForm from './components/TrackForm'


const App = () => {
  const [trackList, setTrackList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await trackService.index()
        if (tracks.error) {
          throw new Error(tracks.error)
        }
        setTrackList(tracks)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTracks()
  }, [])

  const updateSelected = (track) => {
    setSelected(track)
    setIsFormOpen(true)
  }

  const handleFormView = (track) => {
    setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData)
      if (newTrack.error) {
        throw new Error(newTrack.error)
      }
      setTrackList([newTrack, ...trackList ])
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);
  
      
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }
  
      const updatedTrackList = trackList.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      )
      
      setTrackList(updatedTrackList)
      setSelected(null)
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Currently Playing</h1>
      {currentlyPlaying ? (
        <p>{currentlyPlaying.title} by {currentlyPlaying.artist}</p>
      ) : (
        <p>No track is currently playing.</p>
      )}
      <TrackList 
        trackList={trackList} 
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
        setCurrentlyPlaying={setCurrentlyPlaying} 
      />
      {isFormOpen && (
        <TrackForm 
          handleAddTrack={handleAddTrack} 
          handleUpdateTrack={handleUpdateTrack}
          selected={selected}
        />
      )}

      {!isFormOpen && selected && (
        <TrackDetail 
          selected={selected} 
          handleFormView={handleFormView} 
        />
      )}
    </>
  )
}

export default App