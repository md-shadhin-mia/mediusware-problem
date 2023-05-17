import React, { useState, useEffect } from 'react';

const ModalB = (props) => {
  const [usContacts, setUSContacts] = useState([]);
  const [filteredUSContacts, setFilteredUSContacts] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [next, setNext] = useState();
  const [url, setUrl] = useState('https://contact.mediusware.com/api/country-contacts/United%20States/');
  // Fetch US contacts from API
  useEffect(() => {
    // Make API request to retrieve US contacts data and update the 'usContacts' state
    // Example:
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUSContacts(data.results);
        setNext(data.next)
      })
      .catch((error) => {
        console.error('Error fetching US contacts:', error);
      });
  }, [url]);

  // Filter US contacts based on search query and checkbox state
  useEffect(() => {
    const filtered = usContacts.filter((contact) => {
      // Filter based on search query
      const name = contact.phone.toLowerCase();
      const query = searchQuery.toLowerCase();
      if (name.includes(query)) {
        // Filter based on checkbox state
        if (onlyEvenChecked) {
          return contact.id % 2 === 0;
        }
        return true;
      }
      return false;
    });
    setFilteredUSContacts(filtered);
  }, [searchQuery, onlyEvenChecked, usContacts]);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setOnlyEvenChecked(checked);
  };

  return (
    <div className="modal fade show" id="modalB" style={{display:"block"}} >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalBLabel">Modal B</h5>
            <button type="button" className="btn-close" onClick={props.onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <label className="input-group-text">
                <input
                  type="checkbox"
                  checked={onlyEvenChecked}
                  onChange={handleCheckboxChange}
                />
                Only even
              </label>
            </div>
            {filteredUSContacts?<table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUSContacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.country.name}</td>
                    </tr>
                    ))}
                </tbody>
            </table>:<h3>Loading</h3>}
            {next&& <button type="button" className="btn btn-sm" onClick={()=>{setUrl(next)}}>
              next
            </button>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" style={{ backgroundColor: '#46139f' }} onClick={props.onOpenModalA}>
              All Contacts
            </button>
            <button type="button" className="btn btn-primary"  style={{ backgroundColor: '#ff7f50' }} disabled>
              US Contacts
            </button>
            <button type="button" className="btn btn-secondary" onClick={props.onClose} style={{ backgroundColor: '#46139f', border: '1px solid #46139f' }} >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalB;
