

document.addEventListener('DOMContentLoaded', function() {
    // Grade Levels Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to switch tabs
    function switchTab(tabId) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Show selected tab content
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons/         
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get tab id from data attribute
            const tabId = this.getAttribute('data-tab');
                  
            // Switch to selected tab
            switchTab(tabId);
        });
    });

    // Calendar Download Functionality
    const calendarDownloadBtn = document.querySelector('.download-calendar .btn');
    
    if (calendarDownloadBtn) {
        calendarDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary anchor element for download
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'Shree_Modern_Academy_Academic_Calendar_2025.pdf';
            
            // Trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show download confirmation
            alert('Academic Calendar 2025 download has started!');
        });
    }
    
    // Application Form Download Functionality
    const appFormDownloadBtn = document.querySelector('.admission-buttons .btn-secondary');
    
    if (appFormDownloadBtn) {
        appFormDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary anchor element for download
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'Shree_Modern_Academy_Application_Form.pdf';
            
            // Trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show download confirmation
            alert('Application form download has started!');
        });
    }
});