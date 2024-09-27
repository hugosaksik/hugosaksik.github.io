// Image on hover of projects
const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

if (!isMobile) {

    document.addEventListener('DOMContentLoaded', () => {
        console.log("dom content loaded)");
        const hoverLinks = document.querySelectorAll('.project-entry');
        const previewImage = document.getElementById('preview-image');

        hoverLinks.forEach(div => {
            div.addEventListener('mouseenter', () => {
                const imageUrl = div.getAttribute('data-image');
                previewImage.src = imageUrl; // Set the image source based on the hovered div
                previewImage.style.display = 'block'; // Show the image when mouse enters the div
            });

            div.addEventListener('mouseleave', () => {
                previewImage.style.display = 'none'; // Hide the image when mouse leaves the div
            });

            div.addEventListener('mousemove', (e) => {
                // based on the size of the preview-image : 150x150px
                previewImage.style.left = `${e.clientX - 75}px`;
                previewImage.style.top = `${e.clientY - 75}px`;

            });
        });
    });
}