// Simple script to smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hides and displays information when clicked
function showDetails(id) {
    var details = document.getElementById(id);
    // Determines whether to hide or display when block is clicked
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

