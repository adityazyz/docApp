import React, { useState } from 'react';

const DropdownInput = () => {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left">
      <input
        className="border px-4 py-2 rounded focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Select an option"
        value={inputValue}
        onChange={handleInputChange}
      />
      {showDropdown && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
