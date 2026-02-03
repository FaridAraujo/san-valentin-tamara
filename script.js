const card = document.getElementById("card");
const music = document.getElementById("music");

music.volume = 0;
music.currentTime = 12; // Ocean Eyes entra suave 🌊

document.getElementById("nextBtn").addEventListener("click", screenTwo);

function screenTwo() {
    card.innerHTML = `
        <h1>💙 Hermosa mía 💙</h1>
        <p>
            Tercer San Valentín con mi chiquita melón <br><br>
            Con vos aprendí que amar<br>
            también es cuidar,<br>
            esperar y elegir.<br><br>
            Tú eres mi persona favorita 💙<br>
        </p>

        <button id="nextBtn">Seguir 💫</button>
    `;

    document.getElementById("nextBtn").addEventListener("click", questionScreen);
}

function questionScreen() {
    card.className = "card question";

    card.innerHTML = `
        <h1>💙 Y ahora sí… 💙</h1>
        <p>
            No porque sea tradición,<br>
            ni por costumbre,<br>
            sino porque quiero.<br><br>
            ¿Te gustaría ser<br>
            mi San Valentín? 💕
        </p>

        <div class="buttons">
            <button id="yesBtn">Sí 💙</button>
            <button id="noBtn">No(????)</button>
        </div>
    `;

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    noBtn.addEventListener("mouseover", () => {
        const x = Math.random() * 220 - 110;
        const y = Math.random() * 220 - 110;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    });

    yesBtn.addEventListener("click", finalScreen);
}

function finalScreen() {
    card.className = "card final";

    music.play();
    fadeInMusic();

    card.innerHTML = `
        <div class="letter">
            <h1>Tami</h1>

            <p>
                Desde el primer momento en que pensé en esto,
                supe que quería hacerlo especial,
                porque vos lo sos.
            </p>

            <p>
                Gracias por cada sonrisa,
                por cada conversación,
                y por hacer que incluso los días simples
                se sientan distintos cuando estás.
            </p>

            <p>
                Esta no es solo una pregunta de San Valentín,
                es una forma de decirte
                que me importas mucho,
                que me encanta elegirte,
                y que planeo seguir haciendolo.
            </p>

            <p>
                Ojalá te guste la petición 😁.
            </p>

            <div class="signature">
                Con cariño,<br>
                <strong>Tu Picioso 💙</strong>
            </div>
        </div>
    `;

    createHearts();
}


function fadeInMusic() {
    let volume = 0;
    const interval = setInterval(() => {
        if (volume < 0.6) {
            volume += 0.02;
            music.volume = volume;
        } else {
            clearInterval(interval);
        }
    }, 200);
}

function createHearts() {
    const emojis = ["💙", "✨", "💫"];

    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-20px";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }, 300);
}
