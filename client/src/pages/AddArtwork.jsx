import React from 'react'

function AddArtwork() {
  return (
    <form className="container">
        <div className="row">
          <div className="six columns">
            <h4>Upload Artwork</h4>
            <label htmlFor="imageSel" className="btn">Select Image</label>
            <input type="file" name="imageSel" id="imageSel" />
            <br />
            <input className="u-full-width" type="text" name="title" id="title" placeholder="Artwork Title" />
            <br />
            <textarea name="desc" className="u-full-width" id="desc" cols={30} rows={10} placeholder="Description of your masterpiece" defaultValue={""} />
            <button type="submit">Upload</button>
          </div>
        </div>
    </form>
  )
}

export default AddArtwork