const DocumentForm = () => {

    return (
        <div>
        <h1>Add Document</h1>

        <form>
            <label>
          Document Title:
          <input
            type="text"
            name="title"
            placeholder="e.g. iPhone receipt"
            required
          />
        </label>

        <br />

        <label>
          Document Type:
          <select name = "documentType">
            <option value="contract">Contract</option>
            <option value="receipt">Receipt</option>
            <option value="warranty">Warranty</option>
            <option value="insurance">Insurance</option>
            <option value="other">Other</option>
          </select>
        </label>

        <br />

        <label>
          Document URL:
          <input
            type="url"
            name="url"
            placeholder="https://example.com/document.pdf"
            required
          />
        </label>

        <br />

        <button type="submit">Add Document</button>
        </form>
        </div>
    )

}

export default DocumentForm