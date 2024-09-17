document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const createForm = document.getElementById('create-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const updateSection = document.getElementById('update-section');
    const updateForm = document.getElementById('update-form');
    const updateIdInput = document.getElementById('update-id');
    const updateNameInput = document.getElementById('update-name');
    const updateEmailInput = document.getElementById('update-email');
  
    function fetchUsers() {
      fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then(users => {
          userList.innerHTML = '';
          users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (${user.email})`;
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.onclick = () => {
              updateIdInput.value = user.id;
              updateNameInput.value = user.name;
              updateEmailInput.value = user.email;
              updateSection.style.display = 'block';
            };
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
              fetch(`http://localhost:5000/api/users/${user.id}`, {
                method: 'DELETE'
              })
              .then(response => response.json())
              .then(() => {
                fetchUsers();
              });
            };
            li.appendChild(updateButton);
            li.appendChild(deleteButton);
            li.classList.add('user-actions');
            userList.appendChild(li);
          });
        });
    }
  
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value;
      const email = emailInput.value;
  
      fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })
      .then(response => response.json())
      .then(() => {
        nameInput.value = '';
        emailInput.value = '';
        fetchUsers();
      });
    });
  
    updateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = updateIdInput.value;
      const name = updateNameInput.value;
      const email = updateEmailInput.value;
  
      fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })
      .then(response => response.json())
      .then(() => {
        updateIdInput.value = '';
        updateNameInput.value = '';
        updateEmailInput.value = '';
        updateSection.style.display = 'none';
        fetchUsers();
      });
    });
  
    fetchUsers();
  });
  