import React, { useState } from 'react';

function DynamicInputFields() {
  const [records, setRecords] = useState([
    { degree: '', college: '', year: '' } // Initial record
  ]);

  const addRecord = () => {
    setRecords([...records, { degree: '', college: '', year: '' }]);
  };

  const deleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  const handleInputChange = (index, field, value) => {
    let updatedRecords = [...records];
    updatedRecords[index][field] = value; 
    setRecords(updatedRecords);
  };

  return (
    <div>
      {records.map((record, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Degree"
            value={record.degree}
            onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
          /> 
          <input
            type="text"
            placeholder="College"
            value={record.college}
            onChange={(e) => handleInputChange(index, 'college', e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            value={record.year}
            onChange={(e) => handleInputChange(index, 'year', e.target.value)}
          />
          <button onClick={() => deleteRecord(index)}>Delete</button>
        </div>
      ))}
      <button onClick={addRecord}>Add Record</button>
    </div>
  );
}

export default DynamicInputFields;
