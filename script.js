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
        // Perform authentication here (not implemented in this example)
        // For simplicity, let's assume authentication is successful
        characterData = characterData[characterName] || { spellSlots: {} };
        renderSpellSlots();
    });

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
