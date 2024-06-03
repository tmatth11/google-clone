const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const luckyBtn = document.getElementById('lucky-btn');

let luckySearch = false;

// Search function
const search = (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    if (luckySearch) {
        window.location.href = `https://www.google.com/search?btnI=1&q=${encodeURIComponent(query)}`;
    } else if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
    luckySearch = false;
}

// Update date and time and display on page
const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    document.getElementById('date').textContent = dateString;
    document.getElementById('time').textContent = timeString;
}

// Event listeners for search form, Google Search button, and I'm Feeling Lucky button
searchForm.addEventListener('submit', (event) => search(event));
searchBtn.addEventListener('click', (event) => search(event));
luckyBtn.addEventListener('click', (event) => {
    luckySearch = true;
    search(event);
});

// Update date and time every minute
document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    setInterval(updateDateTime, 60000);
});

// Toggle between light and dark mode
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function () {
    // Toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');
    
    // If set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
        else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    }
    
    // If NOT set via local storage previously
    else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
        else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});