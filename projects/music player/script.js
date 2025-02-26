document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const upload = document.getElementById('upload');
    const search = document.getElementById('search');
    const playlist = document.getElementById('playlist');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let songs = [];
    let currentSongIndex = 0;

    // Handle file upload
    upload.addEventListener('change', (event) => {
        const files = event.target.files;
        songs = Array.from(files).map(file => URL.createObjectURL(file));
        updatePlaylist();
    });

    // Update playlist UI
    function updatePlaylist() {
        playlist.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `Song ${index + 1}`;
            li.addEventListener('click', () => playSong(index));
            playlist.appendChild(li);
        });
    }

    // Play selected song
    function playSong(index) {
        currentSongIndex = index;
        audio.src = songs[index];
        audio.play();
        playButton.textContent = 'Pause';
    }

    // Play/pause button functionality
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.textContent = 'Pause';
        } else {
            audio.pause();
            playButton.textContent = 'Play';
        }
    });

    // Previous song functionality
    prevButton.addEventListener('click', () => {
        if (songs.length > 0) {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            playSong(currentSongIndex);
        }
    });

    // Next song functionality
    nextButton.addEventListener('click', () => {
        if (songs.length > 0) {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            playSong(currentSongIndex);
        }
    });

    // Search functionality
    search.addEventListener('input', () => {
        const query = search.value.toLowerCase();
        Array.from(playlist.children).forEach((li, index) => {
            if (`Song ${index + 1}`.toLowerCase().includes(query)) {
                li.style.display = 'block';
            } else {
                li.style.display = 'none';
            }
        });
    });
});
