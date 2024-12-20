import { useState, useEffect } from 'react'
import * as trackService from './services/trackService'

import TrackList from './components/TrackList'
import TrackDetail from './components/TrackDetail'
import TrackForm from './components/TrackForm'
import './App.css'

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
    setIsFormOpen(false)
  }

  const handleFormView = () => {
    setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData)

      if (newTrack.error) {
        throw new Error(newTrack.error)
      }

      setTrackList([newTrack, ...trackList])
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId)

      if (updatedTrack.error) {
        throw new Error(updatedTrack.error)
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

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId)

      if (deletedTrack.error) {
        throw new Error(deletedTrack.error)
      }

      const updatedTrackList = trackList.filter((track) => track._id !== trackId)
      setTrackList(updatedTrackList)
      setSelected(null)
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePlayTrack = (track) => {
    setCurrentlyPlaying(track)
  }

  return (
    <div className="app">
      <div className="currently-playing">
        {currentlyPlaying ? (
          <p>
            Currently Playing: <strong>{currentlyPlaying.title}</strong> by {currentlyPlaying.artist}
          </p>
        ) : (
          <p>Nothing is currently playing.</p>
        )}
      </div>

      <div id="jukebox">
        <TrackList
          trackList={trackList}
          updateSelected={updateSelected}
          handleFormView={handleFormView}
          isFormOpen={isFormOpen}
          handlePlayTrack={handlePlayTrack}
          setCurrentlyPlaying={setCurrentlyPlaying}
          handleEditTrack={(track) => {
            setSelected(track)
            setIsFormOpen(true)
          }}
          handleDeleteTrack={handleDeleteTrack}
        />

        {isFormOpen ? (
          <TrackForm
            handleAddTrack={handleAddTrack}
            handleUpdateTrack={handleUpdateTrack}
            selected={selected}
          />
        ) : (
          selected && (
            <TrackDetail
              selected={selected}
              handleFormView={handleFormView}
              handleEditTrack={() => {
                setIsFormOpen(true)
              }}
            />
          )
        )}
      </div>
    </div>
  )
}

export default App
