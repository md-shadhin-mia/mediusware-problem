import React, { useState, useEffect } from 'react';

const ModalA = (props) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [next, setNext] = useState();
  const [url, setUrl] = useState("https://contact.mediusware.com/api/contacts/");

  // Fetch contacts from API
  useEffect(() => {
    // Make API request to retrieve contacts data and update the 'contacts' state
    // Example:
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setContacts(data.results);
        setNext(data.next)
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
      });
  }, [url]);

  // Filter contacts based on search query and checkbox state
  useEffect(() => {
    const filtered = contacts.filter((contact) => {
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
    setFilteredContacts(filtered);
  }, [searchQuery, onlyEvenChecked, contacts]);

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
    <div className="modal fade show" id="modalA" style={{display:"block"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalALabel">Modal A</h5>
            <button type="button" className="btn-close" onClick={props.onClose}></button>
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
            {filteredContacts?<table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact) => (
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
            <button type="button" className="btn btn-primary" style={{ backgroundColor: '#46139f' }} disabled >
              All Contacts
            </button>
            <button type="button" className="btn btn-primary"  style={{ backgroundColor: '#ff7f50' }} onClick={props.onOpenModalB}>
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

export default ModalA;
