// Initialize AOS Animation Library
AOS.init({
    duration: 1000,
    once: true,
});

// Navigation Menu Toggle (Mobile)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle hamburger icon
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Product Filtering System
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Re-trigger animation for filtered items
                card.setAttribute('data-aos', 'flip-left'); 
            } else {
                card.style.display = 'none';
                card.removeAttribute('data-aos');
            }
        });
        // Refresh AOS to handle layout changes
        AOS.refresh();
    });
});


// --- SIMULATED AI CHATBOT LOGIC ---
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWidget = document.getElementById('chatWidget');
const closeChatBtn = document.getElementById('closeChat');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBody = document.getElementById('chatBody');

// Toggle Chat Window
chatToggleBtn.addEventListener('click', () => chatWidget.classList.add('active'));
closeChatBtn.addEventListener('click', () => chatWidget.classList.remove('active'));

// Predefined Responses (The "AI" Brain)
const botResponses = {
    "hello": "Hi there! Welcome to SAAR Electrical. How can I help?",
    "hi": "Hello! How can I assist you today?",
    "timing": "Our shop is open Monday to Saturday, from 10:00 AM to 8:00 PM. We are closed on Sundays.",
    "open": "We are open Mon-Sat, 10AM - 8PM.",
    "address": "We are located at Station Road, Nawada, Bihar (805110). Look for the SAAR signboard!",
    "location": "You can find us on Station Road in Nawada. Check the map above for exact directions.",
    "product": "We sell a wide range of LED bulbs, ceiling lights, panels, switches, and wires. You can see them in our Products section.",
    "led": "We have high-quality LED bulbs and panels suitable for home and commercial use.",
    "price": "Prices vary greatly depending on the product. Please visit our shop or WhatsApp us for specific pricing.",
    "contact": "You can call us at +91 98765 43210 or click the WhatsApp button below.",
    "whatsapp": "Click the green WhatsApp button at the bottom right to chat with us directly!",
    "default": "I'm not sure about that. Please click the WhatsApp button to chat with a human agent or call us directly!"
};

// Send Message Function
function sendMessage() {
    const userText = userInput.value.trim().toLowerCase();
    if (userText === "") return;

    // Add User Message to Chat
    appendMessage(userInput.value, 'user-message');
    userInput.value = '';

    // Simulate Bot Thinking Delay
    setTimeout(() => {
        let botReply = botResponses["default"];

        // Simple keyword matching logic
        for (const key in botResponses) {
            if (userText.includes(key)) {
                botReply = botResponses[key];
                break;
            }
        }
        appendMessage(botReply, 'bot-message');
    }, 500);
}

// Helper function to add messages to the chat body
function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Event listeners for sending
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});