// Simple script to smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hides and displays information when hovered over
function showDetails(id) {
    var details = document.getElementById(id);
    // Close all details
    var allDetails = document.querySelectorAll('.timeline-details');
    allDetails.forEach(function(detail) {
        if (detail !== details) {
            detail.style.display = 'none';
        }
    });
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

const toggleBtn = document.getElementById('themeToggle');

// load saved theme on refresh
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  if (toggleBtn) toggleBtn.textContent = '☀️';
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  });
}


