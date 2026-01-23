const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // remove o observer para não ficar reaparecendo
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => observer.observe(el));

(function () {
  const carrossel = document.querySelector(".img-carrossel");
  const images = document.querySelectorAll(".img-carrossel img");
  const dotsContainer = document.querySelector(".dots");
  const btnNext = document.querySelector(".arrow.right");
  const btnPrev = document.querySelector(".arrow.left");

  const totalSlides = images.length;
  let index = 0;

  // Criar bolinhas dinamicamente
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Ir para slide " + (i + 1));
    dot.addEventListener("click", () => goToSlide(i));
    if (i === 0) dot.setAttribute("aria-current", "true");
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll("button");

  function updateCarousel() {
    carrossel.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, i) => {
      if (i === index) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  }

  function nextSlide() {
    index = (index + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(i) {
    index = i;
    updateCarousel();
  }

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);

  // Navegação por teclado (setas esquerda/direita)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  // Se quiser autoplay, descomente abaixo:
  // let autoplay = setInterval(nextSlide, 4000);
  // container-carrossel mouseover/mouseout para pausar autoplay (opcional)
})();
//game laed
const questions = [
  {
    text: "Qual é o nível atual da presença digital da sua empresa?",
    options: [
      { label: "Estou começando do zero", value: 10 },
      { label: "Tenho algo básico", value: 20 },
      { label: "Presença sólida, mas pode melhorar", value: 25 },
    ],
  },
  {
    text: "Com que frequência você cria conteúdo para sua marca?",
    options: [
      { label: "Quase nunca", value: 5 },
      { label: "1–2 vezes por semana", value: 15 },
      { label: "Consistentemente toda semana", value: 25 },
    ],
  },
  {
    text: "Como você define a IDENTIDADE VISUAL da sua marca?",
    options: [
      { label: "Ainda não tenho", value: 10 },
      { label: "Tenho, mas pode melhorar", value: 20 },
      { label: "Bem definida", value: 20 },
    ],
  },
  {
    text: "Você utiliza anúncios pagos?",
    options: [
      { label: "Não uso", value: 5 },
      { label: "Uso raramente/nunca usei", value: 15 },
      { label: "Uso estrategicamente", value: 25 },
    ],
  },
  {
    text: "Seu processo de atendimento é automatizado?",
    options: [
      { label: "Não", value: 5 },
      { label: "Parcialmente", value: 15 },
      { label: "Totalmente automatizado", value: 25 },
    ],
  },
  {
    text: "Quanto você está disposto a investir em marketing hoje?",
    options: [
      { label: "Até R$ 300 por mês", value: 5 },
      { label: "Entre R$ 300 e R$ 800", value: 10 },
      { label: "Entre R$ 800 e R$ 1.500", value: 15 },
      { label: "Acima de R$ 1.500", value: 20 },
    ],
  },
];

let current = 0;
let totalScore = 0;

const qContainer = document.getElementById("sim-question-container");
const scoreContainer = document.getElementById("sim-score-container");
const scoreValue = document.getElementById("sim-score-value");
const scoreText = document.getElementById("sim-score-text");

function loadQuestion() {
  const q = questions[current];

  qContainer.innerHTML = `
        <div class="sim-question">${q.text}</div>

        <div class="sim-options">
            ${q.options
              .map(
                (op) => `
                <div class="sim-opt-btn" onclick="selectOption(${op.value})">
                    ${op.label}
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

function selectOption(value) {
  totalScore += value;
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  qContainer.classList.add("sim-hidden");
  scoreContainer.classList.remove("sim-hidden");

  let finalScore = Math.min(95, totalScore);

  let display = 0;
  const interval = setInterval(() => {
    if (display < finalScore) {
      display++;
      scoreValue.textContent = display + "/100";
    } else {
      clearInterval(interval);
      scoreText.textContent =
        finalScore < 40
          ? "Seu potencial é iniciante, mas com o parceiro certo você pode evoluir rápido."
          : finalScore < 70
          ? "Você já tem uma boa base! Com ajustes estratégicos pode escalar muito mais."
          : "Ótimo potencial! Falta pouco para dominar seu mercado.";
    }
  }, 20);
}

loadQuestion();

//menu-hamburger
(function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  // cria backdrop para escurecer e fechar ao clicar fora
  let backdrop = document.createElement("div");
  backdrop.className = "mobile-backdrop";
  document.body.appendChild(backdrop);

  function openMenu() {
    hamburger.classList.add("active");
    mobileMenu.classList.add("active");
    backdrop.classList.add("active");
    // evitar scroll do body quando menu aberto (UX melhor)
    document.documentElement.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    backdrop.classList.remove("active");
    document.documentElement.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) closeMenu();
    else openMenu();
  });

  // fecha ao clicar em um link do menu
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  // fecha ao clicar fora (backdrop)
  backdrop.addEventListener("click", closeMenu);

  // fecha com Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
