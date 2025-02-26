document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        message: formData.get('message'),
        times: parseInt(formData.get('times'))
    };

    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        const responseElement = document.getElementById('response');
        responseElement.textContent = result.message;
        if (result.status === 'success') {
            responseElement.className = 'success';
        } else {
            responseElement.className = 'error';
        }
        responseElement.classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
        const responseElement = document.getElementById('response');
        responseElement.textContent = 'An error occurred.';
        responseElement.className = 'error';
        responseElement.classList.remove('hidden');
    });
});
