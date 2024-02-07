document.addEventListener('DOMContentLoaded', function () {
    // Fetch and append the list of songs
    fetch('/songs')
        .then(response => response.json())
        .then(songs => {
            // Save the original list of songs for later reference
            const originalSongs = songs;

            const songList = document.getElementById('song-list');
            const searchInput = document.getElementById('searchbar');
            const searchButton = document.getElementById('searchButton');

            // Function to update the songs list based on the search term
            function updateSongsList(searchTerm) {
                const filteredSongs = originalSongs.filter(song =>
                    matchStructuredSearch(song.name, searchTerm)
                );
                updateSongList(filteredSongs);
            }

            // Function to check if the song matches the structured search
            function matchStructuredSearch(songName, searchTerm) {
                // Check if the first character matches and then search for a specific format
                return (
                    songName.charAt(0).toLowerCase() === searchTerm.charAt(0).toLowerCase() &&
                    songName.toLowerCase().includes(searchTerm.toLowerCase())
                    // You can modify the condition based on your specific format requirements
                );
            }

            // Function to update the displayed songs
            function updateSongList(songs) {
                songList.innerHTML = '';

                songs.forEach(song => {
                    const listItem = document.createElement('li');
                    listItem.setAttribute('data-song-name', song.name);
                    const anchor = document.createElement('a');
                    anchor.textContent = song.name;
                    listItem.appendChild(anchor);
                    listItem.addEventListener('click', () => fetchAndDisplayLyrics(song.name));
                    songList.appendChild(listItem);
                });
            }

            // Initial display of all songs
            updateSongList(originalSongs);

            // Add an event listener for the search input
            searchButton.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default behavior (following the link)
                const searchTerm = searchInput.value;
                updateSongsList(searchTerm);
            });

            // Optionally, you can add an event listener for the 'Enter' key
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent the default behavior (form submission)
                    const searchTerm = searchInput.value;
                    updateSongsList(searchTerm);
                }
            });
        })
        .catch(error => console.error('Error fetching songs:', error));
});

function fetchAndDisplayLyrics(songName) {
    // Fetch lyrics for the selected song
    fetch(`/lyrics/${encodeURIComponent(songName)}`)
        .then(response => response.text())
        .then(lyrics => {
            const formattedLyrics = lyrics.replace(/\\n/g, '<br>');
            const songList = document.getElementById('song-list');
            songList.innerHTML = '';
            // Display the formatted lyrics in the lyrics container
            const lyricsContainer = document.getElementById('lyrics-container');
            lyricsContainer.innerHTML = `<div class="lyrics">${formattedLyrics}</div>`;
        })
        .catch(error => console.error('Error fetching lyrics:', error));
}