// PASSBOT SCRIPT

const passbotSidebar = document.getElementById('passbotSidebar');
const passbotBtn = document.getElementById('passbotBtn');
const passbotClose = document.getElementById('passbotClose');
const passbotInput = document.getElementById('passbotInput');
const passbotMessages = document.getElementById('passbotMessages');

// Open sidebar
passbotBtn.addEventListener('click', () => {
    passbotSidebar.style.right = '0';
    passbotInput.focus();
});

// Close sidebar
passbotClose.addEventListener('click', () => {
    passbotSidebar.style.right = '-300px';
});

// Predefined Q&A for PassBot
const passbotQA = [
    {q: /strong password/i, a: "Use at least 12 characters, mix letters, numbers, and symbols."},
    {q: /password manager/i, a: "Password managers store unique passwords securely. Examples: LastPass, Bitwarden, 1Password."},
    {q: /vpn/i, a: "A VPN hides your IP and encrypts your connection. Learn more here: <a href='https://xyunoai.github.io/PasswordGen.Lite/top-vpns.html' target='_blank'>Top VPNs</a>"},
    {q: /reusing passwords/i, a: "Never reuse passwords. Each account should have a unique password."},
    {q: /2fa/i, a: "Two-factor authentication adds extra security. Enable it wherever possible."},
    {q: /safe password/i, a: "Create passwords using random words or phrases. Avoid predictable patterns."},
];

// Handle user input
passbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && passbotInput.value.trim() !== '') {
        const userMsg = passbotInput.value;
        addMessage(userMsg, 'userMsg');
        passbotInput.value = '';
        setTimeout(() => {
            respondTo(userMsg);
        }, 500);
    }
});

// Add message to sidebar
function addMessage(msg, className){
    const msgDiv = document.createElement('div');
    msgDiv.className = className;
    msgDiv.innerHTML = msg; // allows links
    passbotMessages.appendChild(msgDiv);
    passbotMessages.scrollTop = passbotMessages.scrollHeight;
}

// Respond function
function respondTo(msg){
    let answer = "Sorry, I don't know the answer to that. Try asking about password safety, VPNs, or security tips.";
    for(const item of passbotQA){
        if(item.q.test(msg)){
            answer = item.a;
            break;
        }
    }
    addMessage(answer, 'botMsg');
}