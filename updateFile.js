// Function to update the JSON file on GitHub
function updateFileOnGitHub(newData, path, sha) {
    const owner = 'GhostBoater';
    const repo = 'SpellSlots';
    const token = 'your_personal_access_token';

    const content = btoa(JSON.stringify(newData)); // Convert data to base64

    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Update file via API',
            content: content,
            sha: sha // Provide SHA of existing file to perform safe update
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('File updated successfully');
        } else {
            console.error('Failed to update file:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error updating file:', error);
    });
}

// Example usage
const newData = { /* Your updated data */ };
const path = 'userdata.json';
const sha = 'SHA_of_existing_file'; // Provide SHA of existing file to perform safe update
updateFileOnGitHub(newData, path, sha);
