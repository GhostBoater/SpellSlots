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
            const slotsUsed = characterData.spellSlots[level];
            spellSlots.insertAdjacentHTML('beforeend', `
                <div>
                    <strong>Level ${level}:</strong> 
                    <span id="slots-${level}">${slotsUsed}</span> /
                    ${getMaxSlotsForLevel(level)} <!-- Add max spell slots for this level -->
                    <button class="increment" data-level="${level}">+</button>
                    <button class="decrement" data-level="${level}">-</button>
                </div>
            `);
        }
        // Add event listeners for increment and decrement buttons
        document.querySelectorAll('.increment').forEach(button => {
            button.addEventListener('click', function() {
                const level = this.getAttribute('data-level');
                incrementSpellSlots(level);
            });
        });
        document.querySelectorAll('.decrement').forEach(button => {
            button.addEventListener('click', function() {
                const level = this.getAttribute('data-level');
                decrementSpellSlots(level);
            });
        });
    }

    // Function to increment spell slots for a specific level
    function incrementSpellSlots(level) {
        characterData.spellSlots[level]++;
        renderSpellSlots(); // Update the display
    }

    // Function to decrement spell slots for a specific level
    function decrementSpellSlots(level) {
        if (characterData.spellSlots[level] > 0) {
            characterData.spellSlots[level]--;
            renderSpellSlots(); // Update the display
        }
    }

    // Function to get maximum spell slots for a given level (customize this based on your D&D rules)
    function getMaxSlotsForLevel(level) {
        // max level slots per spell level
        switch (level) {
            case '1':
                return 4;
            case '2':
                return 3;
            case '3':
                return 3;
            case '4':
                return 3;
            case '5':
                return 3;
            case '6':
                return 2;
            case '7':
                return 2;
            case '8':
                return 1;
            case '9':
                return 1;
            default:
                return 0;
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
