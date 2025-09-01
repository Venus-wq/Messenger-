// Auth flow
const authContainer = document.getElementById("authContainer");
const loginBox = document.querySelector(".login-box");
const signupBox = document.querySelector(".signup-box");
const loginUsername = document.getElementById("loginUsername");
const signupUsername = document.getElementById("signupUsername");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const USERS_KEY = "messenger_clone_users";
let currentUser = null;

showSignup.onclick = () => {
  loginBox.classList.remove("active");
  signupBox.classList.add("active");
};
showLogin.onclick = () => {
  signupBox.classList.remove("active");
  loginBox.classList.add("active");
};

signupBtn.onclick = () => {
  const name = signupUsername.value.trim();
  if (!name) return alert("Enter username");
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  if (users[name]) return alert("Username taken");
  users[name] = { name };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  alert("Signed up! Please log in.");
  signupUsername.value = "";
  showLogin.click();
};

loginBtn.onclick = () => {
  const name = loginUsername.value.trim();
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  if (!users[name]) return alert("User not found");
  currentUser = { name };
  authContainer.classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("displayUsername").textContent = name;
};

// Chat flow
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const inviteBtn = document.getElementById("inviteBtn");

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage("user", text);
  userInput.value = "";
  setTimeout(() => {
    appendMessage("bot", `Hi ${currentUser.name}, you said: "${text}"`);
  }, 600);
});
function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = `message ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  msg.appendChild(bubble);
  const tm = document.createElement("div");
  tm.className = "time";
  tm.textContent = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  msg.appendChild(tm);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Settings & theme overlay
const openSettings = document.getElementById("openSettings");
const closeSettings = document.getElementById("closeSettings");
const settingsPanel = document.getElementById("settingsPanel");
const overlay = document.getElementById("overlay");
const toggleTheme = document.getElementById("toggleTheme");
const logoutBtn = document.getElementById("logoutBtn");

openSettings.onclick = () => {
  settingsPanel.classList.add("open");
  overlay.classList.add("visible");
};
closeSettings.onclick = overlay.onclick = () => {
  settingsPanel.classList.remove("open");
  overlay.classList.remove("visible");
};
toggleTheme.onclick = () => document.body.classList.toggle("light-mode");
logoutBtn.onclick = () => location.reload();

// Invite
inviteBtn.onclick = () => {
  const link = `https://example.com/invite/${Math.random().toString(36).slice(2)}`;
  prompt("Share this invite link:", link);
};
