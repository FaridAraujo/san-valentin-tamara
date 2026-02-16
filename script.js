let typed = false;

/* 🖥 Pantallas con partículas mejoradas */
function showScreen(id) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(id);

  if (!next || current === next) return;

  // Crear efecto de transición con partículas
  createScreenTransitionEffect();

  current.classList.remove('active');

  setTimeout(() => {
    next.classList.add('active');

    /* 🔥 RESET LIBRO SI ENTRA */
    if (id === 'letter') {
      resetBookState();
    }

    /* 🔥 RESET LIBRO VINTAGE SI ENTRA */
    if (id === 'oldLetter') {
      setTimeout(() => {
        resetVintageBook();
      }, 100);
    }
  }, 400);
}

// Efecto de partículas en transición de pantallas
function createScreenTransitionEffect() {
  const particles = ['✨', '💕', '💫', '⭐', '💖', '🌟'];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'transition-particle';
    particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

/* 💌 Sobres */
function openEnvelope(el, screenId) {
  if (el.classList.contains("open")) return;
  el.classList.add("open");

  setTimeout(() => {
    showScreen(screenId);
    setTimeout(() => {
      el.classList.remove("open");
    }, 300);
  }, 700);
}

function openEnvelopeNew(element, screenId, envelopeNum) {
  if (element.classList.contains('opening')) return;
  element.classList.add('opening');
  element.style.transform = 'scale(1.1)';
  element.style.opacity = '0.8';
  createOpenEffect(element);

  setTimeout(() => {
    element.style.transform = '';
    element.style.opacity = '';
    showScreen(screenId);
    setTimeout(() => {
      element.classList.remove('opening');
    }, 500);
  }, 600);
}

function createOpenEffect(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.innerHTML = '💕';
    particle.style.position = 'fixed';
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.fontSize = '1.5rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '99999';
    particle.style.transition = 'all 0.8s ease-out';

    document.body.appendChild(particle);

    setTimeout(() => {
      const angle = (Math.PI * 2 * i) / 8;
      const distance = 100;
      particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
      particle.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      particle.remove();
    }, 900);
  }
}

/* ⏳ Contador */
const startDate = new Date('2023-06-20T19:15:00');

function updateEpicCounter() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diff = Math.floor((now - startDate) / 1000);

  const hours = Math.floor((diff / 3600) % 24);
  const minutes = Math.floor((diff / 60) % 60);
  const seconds = diff % 60;

  setText("years", years);
  setText("months", months);
  setText("days", days);
  setText("hours", hours);
  setText("minutes", minutes);
  setText("seconds", seconds);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value;
}

setInterval(updateEpicCounter, 1000);
updateEpicCounter();

/* ✨ Partículas */
function createParticles() {
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    document.body.appendChild(p);
  }
}

createParticles();

/* 🎵 Música */
function toggleMusic() {
  const music = document.getElementById('music');
  if (music.paused) music.play();
  else music.pause();
}

function downloadLetter() {
  const text = `
Mi amor ❤️

Gracias por estar conmigo.
Gracias por ser mi vida entera.

Te amo 3 millones.

-Farid
`;

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "CartaParaTi.txt";
  link.click();
}

window.addEventListener("load", () => {
  if (localStorage.getItem("letterFinished") === "true") {
    const btn = document.getElementById("oldLetterButton");
    if (btn) btn.classList.remove("hidden");
  }
});

// 🎁 CUPÓN FUNCIONES
function copyCouponCode() {
  const code = "AMOR-2025";
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('.copy-code-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span style="font-size: 1rem;">✓</span>';
    btn.style.background = 'rgba(0, 255, 0, 0.3)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 2000);
  }).catch(err => {
    alert('Código: AMOR-2025');
  });
}

function redeemCoupon() {
  createConfetti();
  setTimeout(() => {
    alert('¡Cupón canjeado! 💕\n\nPrepárate para tu Pink Burrito y masaje 😘');
  }, 500);
}

function createConfetti() {
  const colors = ['#ff6b9d', '#ffd700', '#ff69b4', '#ffed4e'];
  const emojis = ['💕', '🌯', '💖', '✨', '💝', '⭐'];

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    const isEmoji = Math.random() > 0.5;

    if (isEmoji) {
      confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.fontSize = '1.5rem';
    } else {
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
    }

    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '99999';
    confetti.style.transition = 'all 3s ease-out';

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = '120vh';
      confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
      confetti.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

function saveLoveCoupon() {
  createLoveConfetti();
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100, 50, 200]);
  }
  setTimeout(() => {
    alert('💝 Cupón guardado en tu corazón 💝\n\nEste amor es para siempre, mi vida. Te amo 3 millones ❤️');
  }, 600);
}

function createLoveConfetti() {
  const emojis = ['💕', '💖', '💗', '💝', '💘', '❤️', '💞', '💓', '✨', '🌟'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '99999';
    confetti.style.transition = 'all 3.5s ease-out';

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = '120vh';
      confetti.style.transform = `rotate(${Math.random() * 1080}deg)`;
      confetti.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      confetti.remove();
    }, 3500);
  }
}

// 📖 LIBRO PRINCIPAL (Sistema Nuevo)
let currentPage = 0;
let bookOpen = false;
let letterTypedInBook = false;

const fullLetterText = `Mi amor,

Han pasado casi 3 años desde aquella primera carta, y cada día te amo más que el anterior.

¿Te acordás cuando te dije que eras la primera persona por la que realmente sentía algo? Bueno, hoy puedo decir que sos la única persona con la que quiero estar para siempre.

Gracias por estos casi 3 años de risas, aventuras y amor. Gracias por ser mi compañera en todo, por hacer que cada día sea especial solo con estar a mi lado.

Me encanta ver cómo te iluminás cuando algo te hace feliz. Me encanta la paz que siento cuando estamos juntos. Me encanta todo de vos, desde tu risa hasta la forma en que me mirás.

Gracias por seguir confiando en mí, por seguir abriéndote conmigo, por seguir siendo vos. Gracias por casi 3 años de momentos que jamás voy a olvidar.

Sos demasiado preciosa, tanto por dentro como por fuera. Y aunque ya te lo he dicho millones de veces, jamás me voy a cansar de decirte:

Te amo 3 millones.

Si pudiera elegir otra vez, te elegiría siempre.

Para siempre,
-Farid.`;

function resetBookState() {
  currentPage = 0;
  bookOpen = false;
  letterTypedInBook = false;

  const cover = document.querySelector('#book3d .book-cover.front');
  const book = document.getElementById('book3d');
  const pages = document.querySelectorAll('#book3d .book-page');

  if (cover) cover.classList.remove('open');
  if (book) book.classList.remove('opened');
  pages.forEach(page => page.classList.remove('flipped'));

  const typedText = document.getElementById('typedText');
  if (typedText) typedText.innerHTML = '';

  updatePageIndicator();
  updateNavButtons();

  // Mantener botón desbloqueado si ya se terminó antes
  if (localStorage.getItem("letterFinished") === "true") {
    const btn = document.getElementById("oldLetterButton");
    if (btn) btn.classList.remove("hidden");
  }
}

function openBook() {
  if (bookOpen) return;

  const cover = document.querySelector('#book3d .book-cover.front');
  const book = document.getElementById('book3d');

  cover.classList.add('open');
  book.classList.add('opened');
  bookOpen = true;

  setTimeout(() => {
    typeLetterInBook();
  }, 1000);

  updatePageIndicator();
  updateNavButtons();
}

function typeLetterInBook() {
  if (letterTypedInBook) return;
  letterTypedInBook = true;

  const el = document.getElementById('typedText');
  if (!el) return;

  let i = 0;
  el.innerHTML = "";

  const interval = setInterval(() => {
    if (i < fullLetterText.length) {
      el.innerHTML += fullLetterText[i] === "\n" ? "<br>" : fullLetterText[i];
      i++;
    } else {
      clearInterval(interval);
      unlockOldLetterButton();
    }
  }, 30);
}

function unlockOldLetterButton() {
  if (localStorage.getItem("letterFinished") === "true") return;

  const btn = document.getElementById("oldLetterButton");
  if (btn) {
    btn.classList.remove("hidden");
    localStorage.setItem("letterFinished", "true");
  }
}

function nextPage() {
  if (!bookOpen) {
    openBook();
    return;
  }

  const pages = document.querySelectorAll('#book3d .book-page');

  if (currentPage < pages.length) {
    pages[currentPage].classList.add('flipped');
    currentPage++;
    updatePageIndicator();
    updateNavButtons();
  }
}

function previousPage() {
  const pages = document.querySelectorAll('#book3d .book-page');

  if (currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove('flipped');
    updatePageIndicator();
    updateNavButtons();
  } else if (currentPage === 0 && bookOpen) {
    const cover = document.querySelector('#book3d .book-cover.front');
    const book = document.getElementById('book3d');

    cover.classList.remove('open');
    book.classList.remove('opened');
    bookOpen = false;

    updatePageIndicator();
    updateNavButtons();
  }
}

function updatePageIndicator() {
  const indicator = document.getElementById('pageIndicator');
  if (!indicator) return;

  const totalPages = document.querySelectorAll('#book3d .book-page').length;

  if (!bookOpen) {
    indicator.textContent = "Toca el libro para abrir";
  } else if (currentPage === 0) {
    indicator.textContent = "Carta - Página 1 de " + totalPages;
  } else if (currentPage === 1) {
    indicator.textContent = "Fotos - Página 2 de " + totalPages;
  } else if (currentPage === 2) {
    indicator.textContent = "Razones - Página 3 de " + totalPages;
  } else if (currentPage === 3) {
    indicator.textContent = "Promesas - Página 4 de " + totalPages;
  } else if (currentPage === 4) {
    indicator.textContent = "Epílogo - Página 5 de " + totalPages;
  } else if (currentPage === totalPages) {
    indicator.textContent = "Fin del libro ❤️";
  }
}

function updateNavButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!prevBtn || !nextBtn) return;

  const totalPages = document.querySelectorAll('#book3d .book-page').length;

  prevBtn.disabled = !bookOpen && currentPage === 0;

  if (!bookOpen) {
    prevBtn.textContent = "⬅ Anterior";
  } else if (currentPage === 0) {
    prevBtn.textContent = "⬅ Cerrar Libro";
  } else {
    prevBtn.textContent = "⬅ Anterior";
  }

  nextBtn.disabled = currentPage >= totalPages;

  if (currentPage >= totalPages) {
    nextBtn.textContent = "Finalizado ✓";
  } else if (!bookOpen) {
    nextBtn.textContent = "Abrir Libro 📖";
  } else {
    nextBtn.textContent = "Siguiente ➡";
  }
}

// Click en la tapa del libro principal
document.addEventListener('DOMContentLoaded', function () {
  const cover = document.querySelector('#book3d .book-cover.front');
  if (cover) {
    cover.addEventListener('click', openBook);
  }

  // También el vintage
  const vintageCover = document.querySelector('#vintageBook .book-cover.front');
  if (vintageCover) {
    vintageCover.addEventListener('click', openVintageBook);
  }
});

// 📖 LIBRO VINTAGE (Primera Carta)
let vintageCurrentPage = 0;
let vintageBookOpen = false;
let vintageLetterTyped = false;

const vintageLetter = {
  page1: `Hola guapaaa, antes q nada decirte que tamo, esta es una parte del regalo que te quiero hacer por el primer mes que llevamos siendo novios, perdón por hacerlo por acá, soy consciente de que las cartas a mano son mil veces mejores, más sin embargo te terminaría dando un cuaderno entero si te dijese todo lo que quiero decir, y no le veo mucho sentido a darte 45 hojas jajaj, aunque de momento esto no es demasiado, no quería llegar a día 20 sin haberte dado nada, pero bueno, quiero aprovechar esta cartita para expresarte todo lo que siento por vos, y te adelanto que es un montón

Porque tami, bien sabes que sos la primera persona por la que realmente siento algo, lo cual es algo que significa muchísimo para mí, y siendo completamente sincero antes de conocerte ni tan siquiera contemplaba la posibilidad de que eso pase, pero vos me has demostrado todo lo contrario,`,

  page2: `ya que ha sido demasiado lindo todo lo que he sentido por tu persona a lo largo de estos meses que llevamos hablando, como te dije sos la primera persona, y estoy muy feliz de que así sea y espero que sea así durante muchísimo rato, creo que no sos consciente de la tranquilidad que me genera cuando estoy contigo, ni de los feliz que me hace el verte a ti tan genuinamente contenta, de vdd aprecio muchísimo los momentos en los que se te escapay demuestras la felicidad que sentís y aunque te he dicho muchas veces lo mucho que me encanta (y que me encantas) jamás me voy a cansar de hacerlo porque soy muy consciente de que no te es nada fácil, pero conmigo realmente te has esforzado y conseguido sacar ese lado (que aprovecho y digo, si es demasiado tierno)

Por eso y muchas cosas más no puedo hacer mas que agradecerte, porque te has abierto conmigo y porque has confiado en mi a pesar de que en algunos`,

  page3: `momentos no fuese fácil sobre todo en el inicio, vos casi que ciegamente lo hiciste, porque me has dado momentos y recuerdos muy lindos que me van a quedar marcados, como cuando te dije te amo por primera vez, lo contenta que te veías sin duda es de las cosas más lindas que me han pasado

Y amor, admiro mucho el hecho de que estés saliendo adelante, de que realmente lo intentes, quiero que sepas que estoy acá para ti, y que nada que puedas decirme va a cambiar eso porque te amoo

Tami, sos demasiado preciosa, y lo digo tanto por lo increíble que sos como persona como por lo perfecta que sos por fuera. Muchísimas gracias por estos meses que llevamos hablando y por este mes que llevamos juntos, espero que sean muchos más`
};

function openFirstLetter() {
  showScreen('oldLetter');
  setTimeout(() => {
    resetVintageBook();
  }, 500);
}

function resetVintageBook() {
  vintageCurrentPage = 0;
  vintageBookOpen = false;
  vintageLetterTyped = false;

  const cover = document.querySelector('#vintageBook .book-cover.front');
  const book = document.getElementById('vintageBook');
  const pages = document.querySelectorAll('#vintageBook .book-page');

  if (cover) cover.classList.remove('open');
  if (book) book.classList.remove('opened');
  pages.forEach(page => page.classList.remove('flipped'));

  const el1 = document.getElementById('vintageLetter1');
  const el2 = document.getElementById('vintageLetter2');
  const el3 = document.getElementById('vintageLetter3');

  if (el1) el1.innerHTML = '';
  if (el2) el2.innerHTML = '';
  if (el3) el3.innerHTML = '';

  updateVintagePageIndicator();
  updateVintageNavButtons();
}

function openVintageBook() {
  if (vintageBookOpen) return;

  const cover = document.querySelector('#vintageBook .book-cover.front');
  const book = document.getElementById('vintageBook');

  cover.classList.add('open');
  book.classList.add('opened');
  vintageBookOpen = true;

  setTimeout(() => {
    typeVintageLetter();
  }, 1000);

  updateVintagePageIndicator();
  updateVintageNavButtons();
}

function typeVintageLetter() {
  if (vintageLetterTyped) return;
  vintageLetterTyped = true;

  const el1 = document.getElementById('vintageLetter1');
  const el2 = document.getElementById('vintageLetter2');
  const el3 = document.getElementById('vintageLetter3');

  if (!el1 || !el2 || !el3) return;

  // Escribir página 1
  let i = 0;
  const text1 = vintageLetter.page1;
  const interval1 = setInterval(() => {
    if (i < text1.length) {
      el1.innerHTML += text1[i] === "\n" ? "<br>" : text1[i];
      i++;
    } else {
      clearInterval(interval1);
    }
  }, 20);

  // Pre-cargar páginas 2 y 3
  el2.innerHTML = vintageLetter.page2.replace(/\n/g, "<br>");
  el3.innerHTML = vintageLetter.page3.replace(/\n/g, "<br>");
}

function nextVintagePage() {
  if (!vintageBookOpen) {
    openVintageBook();
    return;
  }

  const pages = document.querySelectorAll('#vintageBook .book-page');

  if (vintageCurrentPage < pages.length) {
    pages[vintageCurrentPage].classList.add('flipped');
    vintageCurrentPage++;
    updateVintagePageIndicator();
    updateVintageNavButtons();
  }
}

function previousVintagePage() {
  const pages = document.querySelectorAll('#vintageBook .book-page');

  if (vintageCurrentPage > 0) {
    vintageCurrentPage--;
    pages[vintageCurrentPage].classList.remove('flipped');
    updateVintagePageIndicator();
    updateVintageNavButtons();
  } else if (vintageCurrentPage === 0 && vintageBookOpen) {
    const cover = document.querySelector('#vintageBook .book-cover.front');
    const book = document.getElementById('vintageBook');

    cover.classList.remove('open');
    book.classList.remove('opened');
    vintageBookOpen = false;

    updateVintagePageIndicator();
    updateVintageNavButtons();
  }
}

function updateVintagePageIndicator() {
  const indicator = document.getElementById('vintagePageIndicator');
  if (!indicator) return;

  const totalPages = 3;

  if (!vintageBookOpen) {
    indicator.textContent = "Toca el libro para abrir";
  } else if (vintageCurrentPage === 0) {
    indicator.textContent = "Página 1 de " + totalPages;
  } else if (vintageCurrentPage === 1) {
    indicator.textContent = "Página 2 de " + totalPages;
  } else if (vintageCurrentPage === 2) {
    indicator.textContent = "Página 3 de " + totalPages;
  } else if (vintageCurrentPage === totalPages) {
    indicator.textContent = "Fin de la carta 💕";
  }
}

function updateVintageNavButtons() {
  const prevBtn = document.getElementById('vintagePrevBtn');
  const nextBtn = document.getElementById('vintageNextBtn');
  if (!prevBtn || !nextBtn) return;

  const totalPages = 3;

  prevBtn.disabled = !vintageBookOpen && vintageCurrentPage === 0;

  if (!vintageBookOpen) {
    prevBtn.textContent = "⬅ Anterior";
  } else if (vintageCurrentPage === 0) {
    prevBtn.textContent = "⬅ Cerrar Libro";
  } else {
    prevBtn.textContent = "⬅ Anterior";
  }

  nextBtn.disabled = vintageCurrentPage >= totalPages;

  if (vintageCurrentPage >= totalPages) {
    nextBtn.textContent = "Finalizado ✓";
  } else if (!vintageBookOpen) {
    nextBtn.textContent = "Abrir Libro 📖";
  } else {
    nextBtn.textContent = "Siguiente ➡";
  }
}


// 📜 MODAL DEL PDF
function openPdfModal() {
  const modal = document.getElementById('pdfModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
  }
}

// Cerrar modal con ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closePdfModal();
  }
});

// 💙 PETICIÓN DE SAN VALENTÍN
let petitionMusic = null;

function initPetition() {
  const nextBtn = document.getElementById("petitionNextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", petitionScreenTwo);
  }
}

function petitionScreenTwo() {
  const card = document.getElementById("petitionCard");
  card.className = "petition-card petition-intro";

  card.innerHTML = `
        <h1>💙 Hermosa mía 💙</h1>
        <p>
            Tercer San Valentín con mi chiquita melón <br><br>
            Con vos aprendí que amar<br>
            también es cuidar,<br>
            esperar y elegir.<br><br>
            Tú eres mi persona favorita 💙<br>
        </p>

        <button class="petition-btn" id="petitionNextBtn2">Seguir 💫</button>
    `;

  document.getElementById("petitionNextBtn2").addEventListener("click", petitionQuestionScreen);
}

function petitionQuestionScreen() {
  const card = document.getElementById("petitionCard");
  card.className = "petition-card petition-question";

  card.innerHTML = `
        <h1>💙 Y ahora sí… 💙</h1>
        <p>
            No porque sea tradición,<br>
            ni por costumbre,<br>
            sino porque quiero.<br><br>
            ¿Te gustaría ser<br>
            mi San Valentín? 💕
        </p>

        <div class="petition-buttons">
            <button class="petition-btn" id="petitionYesBtn">Sí 💙</button>
            <button class="petition-btn petition-no-btn" id="petitionNoBtn">No(????)</button>
        </div>
    `;

  const yesBtn = document.getElementById("petitionYesBtn");
  const noBtn = document.getElementById("petitionNoBtn");

  noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 220 - 110;
    const y = Math.random() * 220 - 110;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

  yesBtn.addEventListener("click", petitionFinalScreen);
}

function petitionFinalScreen() {
  const card = document.getElementById("petitionCard");
  card.className = "petition-card petition-final";

  // Reproducir música si existe
  if (audio) {
    const currentTime = audio.currentTime;
    const wasPlaying = !audio.paused;

    // Fade out música actual
    let volume = audio.volume;
    const fadeOut = setInterval(() => {
      if (volume > 0.1) {
        volume -= 0.1;
        audio.volume = volume;
      } else {
        clearInterval(fadeOut);
        if (wasPlaying) {
          audio.pause();
        }
      }
    }, 100);
  }

  card.innerHTML = `
        <div class="petition-letter">
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

            <div class="petition-signature">
                Con cariño,<br>
                <strong>Tu Picioso 💙</strong>
            </div>
            
            <button onclick="showScreen('menu')" class="back-btn-petition">
                Volver al Menú 💙
            </button>
        </div>
    `;

  createPetitionHearts();
}

function createPetitionHearts() {
  const container = document.getElementById("petitionHearts");
  const emojis = ["💙", "✨", "💫"];

  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "petition-heart";
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + "vw";
    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }, 300);

  // Guardar el intervalo para poder detenerlo si se cambia de pantalla
  window.petitionHeartsInterval = interval;
}

// Inicializar cuando se carga la pantalla de petición
document.addEventListener('DOMContentLoaded', function () {
  // El init se llamará cuando se abra la pantalla
});

// Modificar showScreen para inicializar la petición
// Modificar showScreen para inicializar la petición
const originalShowScreen = showScreen;
showScreen = function (id) {
  // Limpiar corazones si salimos de la petición
  if (window.petitionHeartsInterval) {
    clearInterval(window.petitionHeartsInterval);
    const container = document.getElementById("petitionHearts");
    if (container) container.innerHTML = '';
  }

  // Restaurar música original si salimos de petición
  if (window.currentScreenId === 'petition' && audio) {
    // Detener Ocean Eyes si estaba sonando
    if (window.oceanEyesPlaying) {
      window.oceanEyesPlaying = false;
      // Restaurar la canción original
      loadSong(currentSongIndex);
      if (isPlaying) {
        audio.play();
      }
    }
  }

  window.currentScreenId = id;
  originalShowScreen(id);

  // Inicializar petición si entramos
  if (id === 'petition') {
    setTimeout(() => {
      initPetition();

      // Reproducir Ocean Eyes automáticamente
      if (audio && playlist) {
        // Buscar Ocean Eyes en la playlist
        const oceanEyesIndex = playlist.findIndex(song =>
          song.title.toLowerCase().includes('ocean eyes')
        );

        if (oceanEyesIndex !== -1) {
          // Guardar estado anterior
          window.previousSongIndex = currentSongIndex;

          // Cargar y reproducir Ocean Eyes
          loadSong(oceanEyesIndex);
          audio.play().then(() => {
            isPlaying = true;
            playBtn.textContent = '⏸';
            const miniPlayBtn = document.getElementById('miniPlayBtn');
            if (miniPlayBtn) {
              miniPlayBtn.textContent = '⏸';
            }
            window.oceanEyesPlaying = true;
          });
        }
      }
    }, 500);
  }
};

// Abrir ticket de recuerdo
function openTicket(element) {
  if (element.classList.contains('opening')) return;

  element.classList.add('opening');

  // Efecto de validación del ticket
  createTicketEffect(element);

  setTimeout(() => {
    showScreen('petition');
    setTimeout(() => {
      element.classList.remove('opening');
    }, 500);
  }, 800);
}

function createTicketEffect(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Crear efecto de "validación" del ticket
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.innerHTML = ['💙', '✨', '💫', '⭐'][Math.floor(Math.random() * 4)];
    particle.style.position = 'fixed';
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.fontSize = '1.5rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '99999';
    particle.style.transition = 'all 1s ease-out';

    document.body.appendChild(particle);

    setTimeout(() => {
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 120;
      particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
      particle.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      particle.remove();
    }, 1100);
  }
}

// Efecto parallax en el fondo
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

  const background = document.querySelector('.background');
  if (background) {
    background.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
});

// 🎨 Sistema de temas
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');

  body.classList.toggle('light-theme');

  if (body.classList.contains('light-theme')) {
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }

  // Efecto de transición
  createThemeTransition();
}

function createThemeTransition() {
  const particles = ['✨', '🌟', '💫'];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'theme-particle';
    particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}

// Cargar tema guardado
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.querySelector('.theme-icon');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
  }
});

// 🌌 EFECTOS PARALLAX MEJORADOS
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Seguimiento suave del mouse
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
});

// Animación suave con requestAnimationFrame
function animateParallax() {
    // Suavizar el movimiento
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    // Aplicar a diferentes elementos con diferentes intensidades
    const background = document.querySelector('.background');
    if (background) {
        background.style.transform = `translate(${currentX * 20}px, ${currentY * 20}px)`;
    }
    
    // Partículas flotantes
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 15;
        particle.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
    });
    
    // Corazones flotantes del menú
    const floatingHearts = document.querySelectorAll('.float-heart');
    floatingHearts.forEach((heart, index) => {
        const speed = (index % 4 + 1) * 10;
        heart.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
    });
    
    // Polaroids de la petición
    const polaroids = document.querySelectorAll('.floating-polaroid');
    polaroids.forEach((polaroid, index) => {
        const speed = (index % 3 + 1) * 12;
        polaroid.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px) rotate(${currentX * 5}deg)`;
    });
    
    requestAnimationFrame(animateParallax);
}

// Iniciar animación parallax
animateParallax();

// Parallax en scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    const background = document.querySelector('.background');
    if (background) {
        background.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// 🎟️ Efecto 3D en el ticket
document.addEventListener('DOMContentLoaded', () => {
    const ticket = document.querySelector('.ticket-memory');
    
    if (ticket) {
        ticket.addEventListener('mousemove', (e) => {
            const rect = ticket.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            ticket.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        ticket.addEventListener('mouseleave', () => {
            ticket.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
});

