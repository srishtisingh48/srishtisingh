// Simple script to smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function showDetails(id) {
    var details = document.getElementById(id);
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

