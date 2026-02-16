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
        const email = 'mattie@fibonaccihq.com';
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

// Draggable background images
const draggableImages = document.querySelectorAll('.grid-image.draggable');
let activeImage = null;
let initialX = 0;
let initialY = 0;
let currentX = 0;
let currentY = 0;
let maxZIndex = 3;

draggableImages.forEach(image => {
    // Mouse events
    image.addEventListener('mousedown', dragStart);

    // Touch events for mobile
    image.addEventListener('touchstart', dragStart);

    // Store initial position
    const rect = image.getBoundingClientRect();
    const container = image.parentElement.getBoundingClientRect();
    image.dataset.initialLeft = image.offsetLeft;
    image.dataset.initialTop = image.offsetTop;
});

function dragStart(e) {
    // Prevent default link behavior when dragging
    e.preventDefault();

    activeImage = this;

    // Bring to front
    maxZIndex++;
    activeImage.style.zIndex = maxZIndex;

    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - currentX;
        initialY = e.touches[0].clientY - currentY;
    } else {
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
    }

    // Get current transform values
    const transform = window.getComputedStyle(activeImage).transform;
    if (transform !== 'none') {
        const matrix = new DOMMatrix(transform);
        currentX = matrix.m41;
        currentY = matrix.m42;
        initialX = (e.type === 'touchstart' ? e.touches[0].clientX : e.clientX) - currentX;
        initialY = (e.type === 'touchstart' ? e.touches[0].clientY : e.clientY) - currentY;
    }

    // Add event listeners
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    // Add dragging class
    activeImage.classList.add('dragging');
}

function drag(e) {
    if (activeImage) {
        e.preventDefault();

        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        // Get the current rotation
        const rotation = activeImage.style.transform.match(/rotate\(([^)]+)\)/);
        const rotateValue = rotation ? rotation[0] : 'rotate(0deg)';

        // Apply transform
        activeImage.style.transform = `translate(${currentX}px, ${currentY}px) ${rotateValue}`;
    }
}

function dragEnd() {
    if (activeImage) {
        activeImage.classList.remove('dragging');
    }

    // Remove event listeners
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', dragEnd);

    activeImage = null;
}

// Disable link navigation when dragging
draggableImages.forEach(image => {
    const link = image.querySelector('a');
    if (link) {
        let isDragging = false;

        image.addEventListener('mousedown', () => {
            isDragging = false;
        });

        image.addEventListener('mousemove', () => {
            isDragging = true;
        });

        link.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });
    }
});

