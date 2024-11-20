import { useState } from 'react'

const TrackForm = (props) => {

    const initialState = {
        title: '',
        artist: '',
    }

    const [formData, setFormData] = useState(props.selected ? props.selected : initialState)

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmitForm = (evt) => {
        evt.preventDefault()
        if (props.selected) {
            props.handleUpdateTrack(formData, props.selected._id)
        } else {
            props.handleAddTrack(formData)
        }

        setFormData({track: '', artist: '' })
    }

    return (
        <div>
            <form onSubmit={handleSubmitForm} >
                <label htmlFor="title"> Title </label>
                <input
                    id="title"
                    name="title"
                    value={formData.track}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="artist"> Artist </label>
                <input
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="addtrkbtn">{ props.selected ? 'Update Track' : 'Add New Track' }</button>
            </form>
      </div>
    )
}

export default TrackForm