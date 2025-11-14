document.addEventListener('DOMContentLoaded', function() {
    // Load footer content
    const loadFooter = () => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;

        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load footer');
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
                initFooterComponents();
            })
            .catch(error => {
                console.error('Footer loading error:', error);
                footerPlaceholder.innerHTML = `
                    <footer style="padding: 20px; text-align: center; background: #2c3e50; color: white;">
                        <p>© ${new Date().getFullYear()} Shree Modern Academy</p>
                    </footer>
                `;
            });
    };

    // Initialize footer components
    const initFooterComponents = () => {
        // Update current year
        document.querySelectorAll('.current-year').forEach(el => {
            el.textContent = new Date().getFullYear();
        });

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                if (email) alert('Thank you for subscribing!');
                this.reset();
            });
        }
    };

    // Start the process
    loadFooter();
});