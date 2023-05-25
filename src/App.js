import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setbtnText] = useState('Get Users');

  const getUsers = async () => {
    if (btnText === 'Get Users') {
    setIsLoading(true);
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setIsLoading(false);
      setbtnText('Reset');
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
    }
    else {
      setUsers([]);
      setbtnText('Get Users');
    }
  };

  return (
    <div className="App">
      <nav>
        <div className="brand">xBrand</div>
        <button onClick={getUsers}
        className='btn'>{btnText}</button>
      </nav>
      <div className="user-card-grid">
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          users.map(user => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.first_name} />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
