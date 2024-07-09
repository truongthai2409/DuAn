import React, { useState, ReactNode } from 'react';

type DropdownProps = {
  label: ReactNode;
  children: ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <p
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-800 focus:outline-none"
      >
        {label}
      </p>
      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 duration-300 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
