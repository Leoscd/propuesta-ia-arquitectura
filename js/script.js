// Modal functions
function openResearchModal() {
    document.getElementById('researchModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeResearchModal() {
    document.getElementById('researchModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('researchModal');
    if (event.target === modal) {
        closeResearchModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeResearchModal();
    }
});

// Toggle offer details
function toggleDetails(offerId) {
    const details = document.getElementById(offerId);
    const button = details.previousElementSibling;
    const icon = button.querySelector('i');
    
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        icon.style.transform = 'rotate(0deg)';
        button.innerHTML = 'Ver detalles <i class="fas fa-chevron-down"></i>';
    } else {
        // Hide all other details first
        document.querySelectorAll('.offer-details').forEach(detail => {
            detail.classList.remove('show');
        });
        document.querySelectorAll('.toggle-details i').forEach(i => {
            i.style.transform = 'rotate(0deg)';
        });
        document.querySelectorAll('.toggle-details').forEach(btn => {
            btn.innerHTML = 'Ver detalles <i class="fas fa-chevron-down"></i>';
        });
        
        // Show selected details
        details.classList.add('show');
        icon.style.transform = 'rotate(180deg)';
        button.innerHTML = 'Ocultar detalles <i class="fas fa-chevron-up"></i>';
    }
}

// ROI Calculator (DEPRECATED - replaced with Benefits section)
// Keeping for compatibility, but no longer used in the interface

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Header section should be visible immediately
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    if (header) {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.offer-card, .problem-card, .stat');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });
});

// Contact form simulation (for future enhancement)
function simulateContact(method) {
    const messages = {
        email: 'Abriendo cliente de email...',
        linkedin: 'Redirigiendo a LinkedIn...',
        instagram: 'Abriendo Instagram...'
    };
    
    // You could add analytics tracking here
    console.log(`Contact method: ${method}`);
    
    // Show a brief notification (optional)
    if (messages[method]) {
        const notification = document.createElement('div');
        notification.textContent = messages[method];
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

// Add analytics tracking for offer interactions
function trackOfferInteraction(offerType, action) {
    // This would connect to your analytics service
    console.log(`Offer interaction: ${offerType} - ${action}`);
    
    // Example: Google Analytics event
    // gtag('event', action, {
    //     event_category: 'Offer Interaction',
    //     event_label: offerType
    // });
}

// Enhanced calculator with more detailed breakdown
function showDetailedBreakdown() {
    const employees = parseFloat(document.getElementById('employees').value) || 8;
    const savedHours = parseFloat(document.getElementById('saved-hours').value) || 1;
    const hourlyCost = parseFloat(document.getElementById('hourly-cost').value) || 4.5;
    
    const breakdown = {
        perEmployee: savedHours * hourlyCost,
        perDay: employees * savedHours * hourlyCost,
        perWeek: employees * savedHours * hourlyCost * 5,
        perMonth: employees * savedHours * hourlyCost * 5 * 4,
        perYear: employees * savedHours * hourlyCost * 5 * 4 * 12
    };
    
    console.log('Detailed ROI Breakdown:', breakdown);
    return breakdown;
}

// Export calculator results (for future enhancement)
function exportCalculatorResults() {
    const results = showDetailedBreakdown();
    const employees = document.getElementById('employees').value;
    const savedHours = document.getElementById('saved-hours').value;
    const hourlyCost = document.getElementById('hourly-cost').value;
    
    const exportData = {
        inputs: {
            employees: employees,
            savedHours: savedHours,
            hourlyCost: hourlyCost
        },
        results: results,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roi-calculation-fermoselle-cuenya.json';
    a.click();
    
    URL.revokeObjectURL(url);
}