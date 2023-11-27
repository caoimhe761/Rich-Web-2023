document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userInfoSection = document.getElementById('user-info');
    const reposList = document.getElementById('repos-list');

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const login = document.getElementById('username').value;
        
        // Clear previous user info

        if (login.trim() === '') {
            userInfoSection.textContent = 'Please enter a valid GitHub username.';
            return;
        }

        try {
            const response = await fetch(`https://api.github.com/users/${login}`);
            if (response.ok) {
                const userData = await response.json();
                displayUserInfo(userData);
                getRepos(userData.login);
                
            } else {
                userInfoSection.textContent = 'User not found';
                reposList.innerHTML = '';
            }
            
    } catch (error) {
        userInfoSection.textContent = 'An error occurred while fetching data.';
    }
    });
    function getRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(data => {
                reposList.innerHTML = '';
                data.forEach(repo => { 
                    const li = document.createElement('li');
                    li.innerHTML = `
                    <label>Name: ${repo.name}</label>
                    <br>
                    <label>Repo: </label><a href="${repo.html_url}" target="_blank">${repo.html_url}</a>`;
                    reposList.appendChild(li);
                });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function displayUserInfo(user) {
        const userInfoHTML = `
            <li><img src=${user.avatar_url} alt="User's Profile Picture"></li>
            <li>Name: ${user.name}</li>
            <li>UserName: ${user.login}</li>
            <li>Email: ${user.email}</li>
            <li>Location: ${user.location}</li>
            <li>Number of Gists: ${user.public_gists}</li>
        `;
        userInfoSection.innerHTML = userInfoHTML;
    }

});
