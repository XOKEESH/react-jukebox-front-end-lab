import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`

const index = async () => {
    try {
        const res = await axios.get(BASE_URL)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const create = async (formData) => {
    try {
        const res = await axios.post(BASE_URL, formData)
        return res.data
    } catch (err) {
        console.log (err)
    }
}

const updateTrack = async (formData, trackId) => {
    try {
        const res = await axios.put(`${BASE_URL}/${trackId}`, formData)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const deleteTrack = async (trackId) => {
    try {
      const deletedTrack = await axios.delete(`${BASE_URL}/${trackId}`)
      console.log(deletedTrack.data)
      return deletedTrack.data
    } catch (err) {
      console.log(err)
    }
  }

export {
    index, 
    create, 
    updateTrack,
    deleteTrack
}