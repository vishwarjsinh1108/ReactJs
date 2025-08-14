import React, { useEffect, useState } from "react";
import "./DataSearch.css"; // Import external CSS

function UsersList({ searchId = '', searchName = '', searchCity = '', sortOrder = '' ,filterGender = ''}) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const localMatch = searchTerm
      ? fullName.includes(searchTerm.toLowerCase().trim())
      : true;
    const idMatch = searchId
      ? String(user.id).toLowerCase().includes(searchId.toLowerCase().trim())
      : true;
    const nameMatch = searchName
      ? fullName.includes(searchName.toLowerCase().trim())
      : true;
    const cityMatch = searchCity
      ? (user.address?.city || '').toLowerCase().includes(searchCity.toLowerCase().trim())
      : true;
    return localMatch && idMatch && nameMatch && cityMatch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
    if (!sortOrder) return 0; // No sorting if sortOrder is not set
    if (sortOrder === 'asc') {
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
    } 
    else if (sortOrder === 'id') {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
    }
    
    else {
      if (nameA > nameB) return -1
      if (nameA < nameB) return 1
    }
    return 0
  })
  const filteredGender = filterGender && filterGender.length > 0
    ? sortedUsers.filter((user) => (user.gender || '').toLowerCase() === String(filterGender).toLowerCase())
    : sortedUsers

  return (
    <div className="app">
      <div className="header">
        <h2>Users List</h2>
        <input type="text" placeholder="Search Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
 <div className="tabledata">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Gender</th>

          </tr>
        </thead>
        <tbody>
          {filteredGender.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredGender.length === 0 && (
        <div className="status status-empty">No matching users.</div>
      )}
      
    </div>
    </div>
  );
}

export default UsersList;
