document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-button");
    const menuButton2 = document.querySelector(".fixed-menu .menu-button");
    const navOverlay = document.querySelector(".nav-overlay");
    const fixedMenu = document.querySelector('.fixed-menu');

    menuButton.addEventListener("click", () => {
        toggleMenu(menuButton);
    });

    menuButton2.addEventListener("click", (event) => {
        // Prevent the default behavior of the button
        event.preventDefault();
        toggleMenu(menuButton2);
        extendNavOverlay();
    });

    function toggleMenu(button) {
        const isOpen = navOverlay.classList.toggle("open");
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        menuButton.classList.toggle("menu-button--open", isOpen);
        menuButton2.classList.toggle("menu-button--open", isOpen);
        if (button === menuButton) {
            resetNavOverlay();
        } else if (button === menuButton2) {
            extendNavOverlay();
        }
    }

    function extendNavOverlay() {
        navOverlay.style.top = 0;
        navOverlay.style.height = "100vh"; // Extend nav-overlay to full screen height
    }

    function resetNavOverlay() {
        navOverlay.style.top = "120px"; // Reset top position to 120px
        navOverlay.style.height = ""; // Reset nav-overlay height
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 769) {
            if (navOverlay.classList.contains("open")) {
                toggleMenu();
                resetNavOverlay();
            }
        }
    });

    window.addEventListener("scroll", () => {
        const scrollThreshold = 200;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        fixedMenu.style.display = scrollTop > scrollThreshold ? 'block' : 'none';
        
        if (scrollTop < 200 && navOverlay.classList.contains("open")) {
            resetNavOverlay();
        }
    });
});

document.getElementById('form-submit').addEventListener('click', function(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        fname: document.getElementById('first-name-field').value.trim(),
        lname: document.getElementById('last-name-field').value.trim(),
        email: document.getElementById('email-field-input').value.trim(),
        phone: document.getElementById('phone-field-input').value.trim(),
        event_date: document.getElementById('event-date-field-input').value,
        event_location: document.getElementById('company-field-input').value.trim(),
        event_time: document.getElementById('budget-field-input').value.trim(),
        attendees: document.getElementById('subject-field-input').value.trim(),
        multi_truck: document.getElementById('multi-truck-field-input').value,
        payment_option: document.getElementById('payment-option-field-input').value,
        additional_details: document.getElementById('message-field-input').value.trim()
    };

    // Define the endpoint URL
    const endpointUrl = 'https://your-api-endpoint.com/submit-form'; // Replace with your actual endpoint URL

    // Make the POST request
    fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success response
        console.log('Form submitted successfully:', data);
        alert('Form submitted successfully!');
    })
    .catch(error => {
        // Handle error response
        console.error('There was a problem with the form submission:', error);
        alert('There was a problem with the form submission. Please try again.');
    });
});

