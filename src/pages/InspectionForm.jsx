import ".../styles/inspectionForm.css"

const InspectionForm = () => {

  return (
    <div className="inspection-page">

      <div className="inspection-container">

        <div className="inspection-header">
          <p className="inspection-label">
            PROPERTY RECORD
          </p>

          <h1>Add Inspection</h1>

          <p>
            Record the condition of the property with
            photos, notes and inspection details.
          </p>
        </div>


        <form
          className="inspection-form"
          onSubmit={handleSubmit}
        >

          {/* Inspection Type */}

          <div className="inspection-field">

            <label htmlFor="inspectionType">
              Inspection Type
            </label>

            <select
              id="inspectionType"
              name="inspectionType"
              value={formData.inspectionType}
              onChange={handleChange}
              required
            >
              <option value="">
                Select type
              </option>

              <option value="before">
                Before move-in
              </option>

              <option value="after">
                After move-out
              </option>

            </select>

          </div>


          {/* Images */}

          <div className="inspection-field">

            <label>
              Property Images
            </label>

            <div className="inspection-upload">

              <div className="inspection-upload-icon">
                +
              </div>

              <div>
                <h3>
                  Add property photos
                </h3>

                <p>
                  Upload photos showing the condition
                  of the property.
                </p>
              </div>

              {/* 
                            If you're using Cloudinary,
                            put your UploadWidget here.
                        */}

            </div>

          </div>


          {/* Notes */}

          <div className="inspection-field">

            <label htmlFor="notes">
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Describe the condition of the property..."
            />

          </div>


          {/* Date */}

          <div className="inspection-field">

            <label htmlFor="date">
              Inspection Date
            </label>

            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

          </div>


          {/* Submit */}

          <button
            className="inspection-submit"
            type="submit"
          >
            Add Inspection
          </button>

        </form>


        {message && (
          <p className="inspection-message">
            {message}
          </p>
        )}

      </div>

    </div>
  )
}

export default InspectionForm