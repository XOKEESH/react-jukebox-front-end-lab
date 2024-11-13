import { useState, useEffect } from 'react'
import * as trackService from './services/trackService'

import TrackList from './components/TrackList'
import TrackDetail from './components/TrackDetail'
import TrackForm from './components/TrackForm'


const App = () => {
  const [trackList, setTrackList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

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
  }

  const handleFormView = (track) => {
    if (!track.title) setSelected(null)
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
      setSelected(updatedTrack)
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <TrackList 
      trackList={trackList} 
      updateSelected={updateSelected}
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm 
        handleAddTrack={handleAddTrack} 
        handleUpdateTrack={handleUpdateTrack}
        selected={selected}
        />
      ) : (
        <TrackDetail 
        selected={selected} 
        handleFormView={handleFormView} 
        />
      )}
    </>
  )

}

export default App