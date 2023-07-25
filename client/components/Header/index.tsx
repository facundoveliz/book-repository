import React from 'react';

const Header = () => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <p className="cursor-pointer whitespace-nowrap text-xl font-bold">
          Book Repository
        </p>
        <div className="flex items-center space-x-4">
          <p className="cursor-pointer">Profile</p>
          <button className="btn btn-primary">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
