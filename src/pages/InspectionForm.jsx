const InspectionForm = () => {

    return (
    <div>
      <h1>Add Inspection</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Inspection Type:
          <select
            name="inspectionType"
            value={formData.inspectionType}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="before">Before move-in</option>
            <option value="after">After move-out</option>
          </select>
        </label>

        <br />

        <label>
          Image URL:
          <input
            type="url"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/property-image.jpg"
            required
          />
        </label>

        <br />

        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Describe the condition of the property"
          />
        </label>

        <br />

        <label>
          Inspection Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <button type="submit">Add Inspection</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default InspectionForm