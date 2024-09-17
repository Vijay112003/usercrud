// script.js

document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('userList');
  const addUserForm = document.getElementById('addUserForm');
  const updateUserForm = document.getElementById('updateUserForm');
  const updateSection = document.getElementById('updateSection');
  const cancelUpdateBtn = document.getElementById('cancelUpdate');

  // Fetch and display users
  function fetchUsers() {
    fetch('/api/users')
      .then(response => response.json())
      .then(users => {
        displayUsers(users);
      })
      .catch(error => console.error('Error fetching users:', error));
  }

  // Display users in the list
  function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${user.name} (${user.email})</span>
        <div class="user-actions">
          <button class="update-btn" onclick="populateUpdateForm(${user.id}, '${user.name}', '${user.email}')">Update</button>
          <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
        </div>
      `;
      userList.appendChild(li);
    });
  }

  // Add a new user
  addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name && email) {
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })
        .then(response => response.json())
        .then(data => {
          fetchUsers();
          addUserForm.reset();
        })
        .catch(error => console.error('Error adding user:', error));
    }
  });

  // Populate the update form with existing user data
  window.populateUpdateForm = function(id, name, email) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateEmail').value = email;
    updateSection.style.display = 'block';
  };

  // Update a user
  updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value.trim();
    const email = document.getElementById('updateEmail').value.trim();

    if (name && email) {
      fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })
        .then(response => response.json())
        .then(data => {
          fetchUsers();
          updateUserForm.reset();
          updateSection.style.display = 'none';
        })
        .catch(error => console.error('Error updating user:', error));
    }
  });

  // Cancel update
  cancelUpdateBtn.addEventListener('click', () => {
    updateUserForm.reset();
    updateSection.style.display = 'none';
  });

  // Delete a user
  window.deleteUser = function(id) {
    if (confirm('Are you sure you want to delete this user?')) {
      fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          fetchUsers();
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  // Initial fetch of users
  fetchUsers();
});
