    document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const spellSlots = document.getElementById('spell-slots');
    const saveButton = document.getElementById('save');
    const resetButton = document.getElementById('reset');
    let characterData = {};

    // Check if character data exists in local storage
    if (localStorage.getItem('characterData')) {
        characterData = JSON.parse(localStorage.getItem('characterData'));
        renderSpellSlots();
    }

    // Event listener for login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const characterName = document.getElementById('character-name').value;
        const password = document.getElementById('password').value;
        // Authenticate user
        if (authenticate(characterName, password)) {
            characterData = characterData[characterName] || { spellSlots: {} };
            renderSpellSlots();
        } else {
            alert('Invalid character name or password.');
        }
    });
    // Function to authenticate user
        function authenticate(characterName, password) {
            console.log('Authenticating user:', characterName);
            // Fetch user data from JSON file
            return fetch('./userdata.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    return response.json();
                })
                .then(userData => {
                    console.log('User data loaded:', userData);
                    // Check if user exists and password matches
                    if (userData[characterName] && userData[characterName].password === password) {
                        console.log('Authentication successful for:', characterName);
                        characterData = userData[characterName]; // Set character data
                        renderSpellSlots(); // Render spell slots for the authenticated character
                        return true;
                    } else {
                        console.log('Authentication failed for:', characterName);
                        return false;
                    }
                })
                .catch(error => {
                    console.error('Error loading user data:', error);
                    return false;
                });
        }
   

    // Function to render spell slots
    function renderSpellSlots() {
        spellSlots.innerHTML = '';
        for (const level in characterData.spellSlots) {
            spellSlots.insertAdjacentHTML('beforeend', `
                <div>
                    <strong>Level ${level}:</strong> ${characterData.spellSlots[level]}
                </div>
            `);
        }
    }

    // Event listener for save button
    saveButton.addEventListener('click', function() {
        // Save character data to local storage
        localStorage.setItem('characterData', JSON.stringify(characterData));
    });

    // Event listener for reset button
    resetButton.addEventListener('click', function() {
        // Reset character data
        characterData = {};
        localStorage.removeItem('characterData');
        spellSlots.innerHTML = '';
    });
});
