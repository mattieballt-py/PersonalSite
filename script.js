// Smooth scroll animation for sections
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

// Observe all sections except outside-work
document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('outside-work')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    }
});

// Email button - copy to clipboard
const emailButton = document.getElementById('email-button');
if (emailButton) {
    emailButton.addEventListener('click', async function() {
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

// LinkedIn button - open in new tab
const linkedinButton = document.getElementById('linkedin-button');
if (linkedinButton) {
    linkedinButton.addEventListener('click', function() {
        window.open('https://linkedin.com/in/mattieballt', '_blank');
    });
}

// Work button - navigate to work page
const workButton = document.getElementById('work-button');
if (workButton) {
    workButton.addEventListener('click', function() {
        window.location.href = 'work.html';
    });
}

// Toast notification function
function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = 'toast' + (isError ? ' toast-error' : '');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

// Video hover play/pause
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

if (videoContainer && video) {
    videoContainer.addEventListener('mouseenter', function() {
        video.play();
    });

    videoContainer.addEventListener('mouseleave', function() {
        video.pause();
    });
}

// Fibonacci HQ button
const fibhqButton = document.getElementById('fibhq-button');
if (fibhqButton) {
    fibhqButton.addEventListener('click', function() {
        window.open('https://www.fibonaccihq.com/insights', '_blank');
    });
}

