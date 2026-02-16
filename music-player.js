// 🎵 REPRODUCTOR DE MÚSICA CON ECUALIZADOR

const playlist = [
    {
        title: "I See the Light",
        artist: "Mandy Moore & Zachary Levi - Tangled",
        file: "music/veoentiluz.mp3"
    },
    {
        title: "Mujer Maravilla",
        artist: "Paulo Londra",
        file: "music/mujermaravilla.mp3"
    },
    {
        title: "Nena Maldición",
        artist: "Paulo Londra (feat. Lenny Tavárez)",
        file: "music/nenamaldicion.mp3"
    },
    {
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        file: "music/happiertanever.mp3"
    },
    {
        title: "idontwannabeyouanymore",
        artist: "Billie Eilish",
        file: "music/idontwannabe.mp3"
    },
    {
        title: "Lovely (feat. Khalid)",
        artist: "Billie Eilish",
        file: "music/lovely.mp3"
    },
    {
        title: "Ocean Eyes",
        artist: "Billie Eilish",
        file: "music/oceaneyes.mp3"
    },
    {
        title: "When the Party's Over",
        artist: "Billie Eilish",
        file: "music/whenthepartys.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById('music');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const currentSongEl = document.getElementById('currentSong');
const currentArtistEl = document.getElementById('currentArtist');
const playlistSongsEl = document.getElementById('playlistSongs');

// 🎨 Variables para el ecualizador
let audioContext;
let analyser;
let dataArray;
let bufferLength;
let source;
let miniCanvas;
let miniCtx;
let mainCanvas;
let mainCtx;

// 🎬 Inicializar reproductor
function initPlayer() {
    loadPlaylist();
    loadSong(0);
    audio.volume = 0.7;

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('loadedmetadata', updateDuration);

    progressBar.addEventListener('input', seekSong);
    volumeBar.addEventListener('input', changeVolume);

    // 🎨 Inicializar ecualizador
    initEqualizer();

    // 🎵 Reproducir automáticamente después de 1 segundo
    setTimeout(() => {
        audio.play().then(() => {
            isPlaying = true;
            playBtn.textContent = '⏸';

            const miniPlayBtn = document.getElementById('miniPlayBtn');
            if (miniPlayBtn) {
                miniPlayBtn.textContent = '⏸';
            }

            showMiniPlayer();

            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }).catch(err => {
            console.log('Autoplay bloqueado por el navegador:', err);
            showMiniPlayer();
        });
    }, 1000);
}

// 🎨 Inicializar ecualizador
function initEqualizer() {
    miniCanvas = document.getElementById('equalizerCanvas');
    if (miniCanvas) {
        miniCtx = miniCanvas.getContext('2d');
    }

    mainCanvas = document.getElementById('mainEqualizerCanvas');
    if (mainCanvas) {
        const container = mainCanvas.parentElement;
        mainCanvas.width = container.offsetWidth;
        mainCanvas.height = container.offsetHeight;
        mainCtx = mainCanvas.getContext('2d');
    }

    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        drawEqualizer();
    } catch (err) {
        console.log('Error al inicializar Audio Context:', err);
    }
}

// 🎨 Dibujar ecualizador
function drawEqualizer() {
    requestAnimationFrame(drawEqualizer);

    if (!analyser) return;

    analyser.getByteFrequencyData(dataArray);

    if (miniCtx && isPlaying) {
        drawMiniEqualizer();
    }

    if (mainCtx && isPlaying) {
        drawMainEqualizer();
    }
}

// 🎨 Dibujar mini ecualizador
function drawMiniEqualizer() {
    const width = miniCanvas.width;
    const height = miniCanvas.height;

    miniCtx.clearRect(0, 0, width, height);

    const barCount = 8;
    const barWidth = width / barCount - 2;

    for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor(i * bufferLength / barCount);
        const barHeight = (dataArray[dataIndex] / 255) * height;

        const gradient = miniCtx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, '#ff6b9d');
        gradient.addColorStop(0.5, '#4fc3f7');
        gradient.addColorStop(1, '#03a9f4');

        miniCtx.fillStyle = gradient;
        miniCtx.fillRect(
            i * (barWidth + 2),
            height - barHeight,
            barWidth,
            barHeight
        );
    }
}

// 🎨 Dibujar ecualizador principal
function drawMainEqualizer() {
    const width = mainCanvas.width;
    const height = mainCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    mainCtx.clearRect(0, 0, width, height);

    const barCount = 64;
    const radius = Math.min(width, height) / 3;

    for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor(i * bufferLength / barCount);
        const barHeight = (dataArray[dataIndex] / 255) * radius;

        const angle = (i / barCount) * Math.PI * 2;

        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        const hue = (i / barCount) * 360;
        const gradient = mainCtx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${hue}, 80%, 70%, 1)`);

        mainCtx.strokeStyle = gradient;
        mainCtx.lineWidth = 3;
        mainCtx.lineCap = 'round';

        mainCtx.beginPath();
        mainCtx.moveTo(x1, y1);
        mainCtx.lineTo(x2, y2);
        mainCtx.stroke();
    }

    mainCtx.beginPath();
    mainCtx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
    mainCtx.fillStyle = 'rgba(255, 107, 157, 0.2)';
    mainCtx.fill();
}

// 🎵 Mostrar mini reproductor
function showMiniPlayer() {
    const miniPlayer = document.getElementById('miniPlayer');
    if (miniPlayer) {
        miniPlayer.classList.add('visible');
    }
}

// 🎵 Ocultar mini reproductor
function hideMiniPlayer() {
    const miniPlayer = document.getElementById('miniPlayer');
    if (miniPlayer) {
        miniPlayer.classList.remove('visible');
    }
}

// 📋 Cargar lista de canciones
function loadPlaylist() {
    playlistSongsEl.innerHTML = '';

    playlist.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'playlist-item';
        songItem.innerHTML = `
            <span class="song-number">${index + 1}</span>
            <div class="song-details">
                <p class="song-name">${song.title}</p>
                <p class="artist-name">${song.artist}</p>
            </div>
        `;

        songItem.addEventListener('click', () => {
            loadSong(index);
            playSong();
        });

        playlistSongsEl.appendChild(songItem);
    });
}

// 🎵 Cargar canción
function loadSong(index) {
    currentSongIndex = index;
    const song = playlist[index];

    audio.src = song.file;
    currentSongEl.textContent = song.title;
    currentArtistEl.textContent = song.artist;

    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ▶️ Reproducir/Pausar
function toggleMusic() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.textContent = '⏸';

    const miniPlayBtn = document.getElementById('miniPlayBtn');
    if (miniPlayBtn) {
        miniPlayBtn.textContent = '⏸';
    }

    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = '▶️';

    const miniPlayBtn = document.getElementById('miniPlayBtn');
    if (miniPlayBtn) {
        miniPlayBtn.textContent = '▶️';
    }
}

// ⏭ Siguiente canción
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

// ⏮ Canción anterior
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

// 🕐 Actualizar barra de progreso
function updateProgress() {
    const { currentTime, duration } = audio;

    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;

        currentTimeEl.textContent = formatTime(currentTime);

        const miniSongTitle = document.getElementById('miniSongTitle');
        const miniSongTime = document.getElementById('miniSongTime');
        if (miniSongTitle && miniSongTime) {
            miniSongTitle.textContent = playlist[currentSongIndex].title;
            miniSongTime.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        }
    }
}

// 🕐 Actualizar duración
function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
}

// 🔍 Buscar en la canción
function seekSong(e) {
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

// 🔊 Cambiar volumen
function changeVolume(e) {
    audio.volume = e.target.value / 100;
}

// 🕐 Formatear tiempo
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// 🎭 Mostrar/ocultar panel del reproductor
function togglePlayer() {
    const panel = document.getElementById('playerPanel');
    panel.classList.toggle('open');
}

// 🎬 Iniciar cuando cargue la página
window.addEventListener('load', initPlayer);

// Ajustar tamaño del canvas al cambiar ventana
window.addEventListener('resize', () => {
    if (mainCanvas) {
        const container = mainCanvas.parentElement;
        mainCanvas.width = container.offsetWidth;
        mainCanvas.height = container.offsetHeight;
    }
});
