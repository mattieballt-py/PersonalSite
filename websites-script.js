// Smooth scroll animation for sections (like main page)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Also observe individual fade-in elements
document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3').forEach(element => {
    observer.observe(element);
});

// Portfolio cards scroll-up animation
const cardObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a slight delay for staggered animation
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, cardObserverOptions);

// Observe all portfolio cards
document.querySelectorAll('.portfolio-card').forEach(card => {
    cardObserver.observe(card);
});

// Email copy functionality - Primary CTA
const emailCopyBtn = document.getElementById('email-copy-btn');
if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', async function() {
        const email = 'mb1223@ic.ac.uk';
        try {
            await navigator.clipboard.writeText(email);
            showToast('Email copied to clipboard');
        } catch (err) {
            console.error('Failed to copy email:', err);
            showToast('Failed to copy email', true);
        }
    });
}

// Email copy functionality - Secondary CTA
const emailSecondary = document.getElementById('email-secondary');
if (emailSecondary) {
    emailSecondary.addEventListener('click', async function() {
        const email = 'mb1223@ic.ac.uk';
        try {
            await navigator.clipboard.writeText(email);
            showToast('Email copied to clipboard');
        } catch (err) {
            console.error('Failed to copy email:', err);
            showToast('Failed to copy email', true);
        }
    });
}

// Email CTA button (hero section)
const emailCta = document.getElementById('email-cta');
if (emailCta) {
    emailCta.addEventListener('click', async function() {
        const email = 'mb1223@ic.ac.uk';
        try {
            await navigator.clipboard.writeText(email);
            showToast('Email copied to clipboard - Let\'s build something incredible!');
        } catch (err) {
            console.error('Failed to copy email:', err);
            showToast('Failed to copy email', true);
        }
    });
}

// Toast notification function
function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${isError ? '#dc2626' : '#0D1B47'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-family: 'Instrument Sans', sans-serif;
        font-size: 0.9375rem;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // Remove toast after 2.5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

// Smooth scroll for anchor links
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

// Fibonacci HQ button
const fibhqButton = document.getElementById('fibhq-button');
if (fibhqButton) {
    fibhqButton.addEventListener('click', function() {
        window.open('https://www.fibonaccihq.com/insights', '_blank');
    });
}

// Portfolio card video hover play/pause
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
    const video = card.querySelector('video');

    if (video) {
        // Ensure video starts paused
        video.pause();

        card.addEventListener('mouseenter', function() {
            video.play();
        });

        card.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0; // Reset to start
        });
    }
});

// Track CTA clicks for analytics
function trackCTAClick(ctaName) {
    // Optional: Add Google Analytics or other tracking
    console.log('CTA clicked:', ctaName);

    // If Google Analytics is available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': ctaName
        });
    }
}

// Add tracking to all CTA buttons
if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', () => trackCTAClick('Book Discovery Call'));
}
if (emailSecondary) {
    emailSecondary.addEventListener('click', () => trackCTAClick('Copy Email Address'));
}

console.log('Websites page loaded successfully');
