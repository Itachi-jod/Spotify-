const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");

let tracks = [];
let currentTrack = 0;

// Fetch tracks based on search query
async function fetchTracks(query) {
  try {
    // Log the query to make sure it's being passed correctly
    console.log("Fetching tracks for query:", query);

    const response = await fetch(`https://spotify-play-iota.vercel.app/spotify?query=${encodeURIComponent(query)}`);
    
    // Check if the response is successful (status 200)
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // Log the raw data to inspect its structure
    console.log("API response:", data);

    // Check if the data contains the expected structure
    if (data && data.tracks) {
      tracks = data.tracks.map(track => ({
        title: track.name || "Unknown Title",
        artist: track.artist || "Unknown Artist",
        src: track.preview_url || "",
      }));

      // Load the first track if available
      if (tracks.length > 0) {
        loadTrack(0);
      } else {
        trackTitle.textContent = "No tracks found";
        trackArtist.textContent = "";
      }
    } else {
      throw new Error("Invalid data structure");
    }
  } catch (error) {
    console.error("Error fetching tracks:", error);
    trackTitle.textContent = "Error fetching tracks";
    trackArtist.textContent = "Try again later";
  }
}

// Update track details
function loadTrack(index) {
  const track = tracks[index];
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  audioPlayer.src = track.src || "";
}

function playPauseTrack() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = "⏸";
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶";
  }
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audioPlayer.play();
  playBtn.textContent = "⏸";
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audioPlayer.play();
  playBtn.textContent = "⏸";
}

// Event listeners
playBtn.addEventListener("click", playPauseTrack);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);

// Search button click handler
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchTracks(query);
  }
});

// Load a default track on page load
fetchTracks("default");
