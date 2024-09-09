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
    if (details.style.display === 'block') {
        details.style.display = 'none';
    } else {
        // Close all other details
        var allDetails = document.querySelectorAll('.timeline-details');
        allDetails.forEach(function(detail) {
            detail.style.display = 'none';
        });
        // Open the clicked detail
        details.style.display = 'block';
    }
}

