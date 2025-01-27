const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const albumArt = document.getElementById("album-art");

let tracks = [];
let currentTrack = 0;

// Fetch tracks from APIs
async function fetchTracks() {
  try {
    // Replace placeholders with your queries/IDs
    const track1 = await fetch(`https://spotify-play-iota.vercel.app/spotify?query=${encodeURIComponent("song1")}`).then(res => res.json());
    const track2 = await fetch(`https://sp-dl-bice.vercel.app/spotify?id=${encodeURIComponent("song2")}`).then(res => res.json());
    const track3 = await fetch(`https://audio-recon-ahcw.onrender.com/kshitiz?url=${encodeURIComponent("song3")}`).then(res => res.json());

    // Populate the tracks array
    tracks = [
      {
        title: track1.name || "Unknown Track 1",
        artist: track1.artist || "Unknown Artist 1",
        src: track1.url || "",
        art: track1.image || "https://via.placeholder.com/200/1db954",
      },
      {
        title: track2.name || "Unknown Track 2",
        artist: track2.artist || "Unknown Artist 2",
        src: track2.url || "",
        art: track2.image || "https://via.placeholder.com/200/ff0000",
      },
      {
        title: track3.name || "Unknown Track 3",
        artist: track3.artist || "Unknown Artist 3",
        src: track3.url || "",
        art: track3.image || "https://via.placeholder.com/200/0000ff",
      },
    ];

    // Load the first track
    loadTrack(currentTrack);
  } catch (error) {
    console.error("Error fetching tracks:", error);
  }
}

// Update track details
function loadTrack(index) {
  const track = tracks[index];
  trackTitle.textContent = track.title || "Unknown Title";
  trackArtist.textContent = track.artist || "Unknown Artist";
  audioPlayer.src = track.src || "";
  albumArt.src = track.art || "https://via.placeholder.com/200";
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

// Fetch tracks and load the first one
fetchTracks();
