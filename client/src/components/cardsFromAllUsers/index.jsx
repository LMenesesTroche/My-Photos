import React from 'react';
import { Link } from 'react-router-dom';

const AllUsersCards = ({ allUsers }) => {
  // Ordenar los usuarios por nombre
  const sortedUsers = allUsers?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      {sortedUsers?.map((user) => (
        <div key={user.auth0Id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', textAlign: 'center' }}>
          <Link to={`/profile/${user.auth0Id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <img 
              src={user.picture} 
              alt={`${user.name}'s profile`} 
              style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
            />
            <h2>{user.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllUsersCards;
