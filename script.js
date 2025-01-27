// script.js
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const albumArt = document.getElementById("album-art");

// Track list
const tracks = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "song1.mp3",
    art: "https://via.placeholder.com/200/1db954",
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "song2.mp3",
    art: "https://via.placeholder.com/200/ff0000",
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "song3.mp3",
    art: "https://via.placeholder.com/200/0000ff",
  },
];

let currentTrack = 0;

// Update track details
function loadTrack(index) {
  const track = tracks[index];
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  audioPlayer.src = track.src;
  albumArt.src = track.art;
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

// Load the first track on page load
loadTrack(currentTrack);
