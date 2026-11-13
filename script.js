const pages = {
  rules: {
    title: "Правила хауса", count: "01 / 05",
    description: "Чтобы всем было комфортно работать и общаться, важно соблюдать общие договорённости.",
    cards: [
      ["01","Уважение","Относитесь к участникам с уважением. Обсуждайте разногласия спокойно и без личных оскорблений."],
      ["02","Командная работа","Предупреждайте команду, если не можете выполнить договорённость или прийти на общую активность."],
      ["03","Безопасность","Не передавайте доступы к аккаунтам и не публикуйте личную информацию других участников."]
    ]
  },
  apply: {
    title: "Анкета и бот", count: "02 / 05",
    description: "Здесь будет собрана информация о вступлении, заполнении анкеты и использовании Telegram-бота.",
    cards: [
      ["01","Заполнение анкеты","Добавим актуальную ссылку на анкету и инструкцию по заполнению."],
      ["02","Telegram-бот","Здесь появится описание команд бота и способов связи с командой."],
      ["03","После отправки","Укажем, что делать после заполнения анкеты и где следить за ответом."]
    ]
  },
  clean: {
    title: "Чистка и норма", count: "03 / 05",
    description: "Правила активности и порядок проведения чисток будут размещены в этом разделе.",
    cards: [
      ["01","Норма активности","Добавим требования к активности участников и сроки выполнения."],
      ["02","Проведение чистки","Опишем порядок проверки активности и уведомления участников."],
      ["03","Важные исключения","Укажем, как заранее сообщить о временном отсутствии."]
    ]
  },
  videos: {
    title: "Правила и расписание съёмок", count: "04 / 05",
    description: "Всё, что нужно знать перед съёмками: подготовка, расписание и командные договорённости.",
    cards: [
      ["01","Расписание","Здесь будет календарь ближайших съёмок и время сбора."],
      ["02","Подготовка","Добавим требования к образам, скинам, оборудованию и готовности участников."],
      ["03","Во время съёмки","Опишем правила поведения, опозданий и связи с организатором."]
    ]
  },
  server: {
    title: "Информация о сервере и инициалы", count: "05 / 05",
    description: "Основные сведения о Minecraft-сервере CloverTeam и принятые обозначения.",
    cards: [
      ["01","Подключение","Добавим адрес сервера и инструкцию по подключению, когда будут подтверждены данные."],
      ["02","Инициалы","Разместим правила оформления и использования инициалов."],
      ["03","Полезная информация","Соберём версии, режимы и другие важные сведения о сервере."]
    ]
  }
};
const nav = [...document.querySelectorAll(".nav-link")];
const cards = document.getElementById("info-cards");
function showPage(key) {
  const p = pages[key] || pages.rules;
  nav.forEach(b => b.classList.toggle("active", b.dataset.page === key));
  document.getElementById("section-title").textContent = p.title;
  document.getElementById("section-count").textContent = p.count;
  document.getElementById("section-description").textContent = p.description;
  cards.innerHTML = p.cards.map(c => `<article class="info-card"><span class="card-number">${c[0]}</span><div><h3>${c[1]}</h3><p>${c[2]}</p></div><span class="card-arrow">↗</span></article>`).join("");
  document.getElementById("content").scrollIntoView({behavior:"smooth",block:"start"});
  document.querySelector(".desktop-nav").classList.remove("show");
}
nav.forEach(b => b.addEventListener("click", () => showPage(b.dataset.page)));
document.getElementById("hero-rules").addEventListener("click", () => showPage("rules"));
document.getElementById("hero-apply").addEventListener("click", () => showPage("apply"));
document.getElementById("mobile-menu").addEventListener("click", () => document.querySelector(".desktop-nav").classList.toggle("show"));

const modal = document.getElementById("modal");
const form = document.getElementById("auth-form");
let mode = "login";
function setMode(next) {
  mode = next;
  document.querySelectorAll(".modal-tab").forEach(t => t.classList.toggle("active", t.dataset.mode === mode));
  document.querySelectorAll(".register-field").forEach(f => f.classList.toggle("hidden", mode !== "register"));
  document.getElementById("modal-title").textContent = mode === "login" ? "Вход в кабинет" : "Регистрация администрации";
  document.getElementById("modal-subtitle").textContent = mode === "login" ? "Доступ только для подтверждённой администрации." : "Укажите данные, которые должны совпасть с записью в списке администрации.";
  document.getElementById("submit-auth").innerHTML = mode === "login" ? 'Войти в кабинет <span>↗</span>' : 'Проверить и зарегистрироваться <span>↗</span>';
  document.getElementById("password").autocomplete = mode === "login" ? "current-password" : "new-password";
  document.getElementById("form-message").textContent = mode === "login" ? "При каждом входе сервер будет повторно проверять ваш ранг." : "Регистрация доступна только администраторам с разрешённым рангом.";
}
function openModal(next) { modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); setMode(next); document.body.style.overflow="hidden"; }
function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; }
document.getElementById("open-login").addEventListener("click", () => openModal("login"));
document.getElementById("banner-login").addEventListener("click", () => openModal("login"));
document.getElementById("open-register").addEventListener("click", () => openModal("register"));
document.getElementById("close-modal").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.querySelectorAll(".modal-tab").forEach(t => t.addEventListener("click", () => setMode(t.dataset.mode)));
form.addEventListener("submit", e => {
  e.preventDefault();
  const message = document.getElementById("form-message");
  message.textContent = "Интерфейс готов. Серверную проверку admins.json и создание аккаунта подключим на следующем этапе.";
  message.style.color = "#c2f49d";
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });