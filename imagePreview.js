// Image on hover of projects
const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

if (!isMobile) {

    document.addEventListener('DOMContentLoaded', () => {
        console.log("dom content loaded)");
        const hoverLinks = document.querySelectorAll('.project-entry');
        const previewImage = document.getElementById('preview-image');
        const previewImageContainer = document.getElementById('preview-image-container');

        hoverLinks.forEach(div => {
            div.addEventListener('mouseenter', () => {
                const imageUrl = div.getAttribute('data-image');
                previewImage.src = imageUrl; // Set the image source based on the hovered div
                previewImage.style.width = '150px'; // Show the image when mouse enters the div
                previewImage.style.height = '150px'; // Show the image when mouse enters the div
                previewImage.style.borderWidth= '1px';
            });

            div.addEventListener('mouseleave', () => {
                // previewImage.style.display = 'none'; // Hide the image when mouse leaves the div
                previewImage.style.width = '0px'; // Show the image when mouse enters the div
                previewImage.style.height = '0px'; // Show the image when mouse enters the div
                previewImage.style.borderWidth= '0px';
            });

            div.addEventListener('mousemove', (e) => {
                // based on the size of the preview-image : 150x150px
                previewImageContainer.style.left = `${e.clientX}px`;
                previewImageContainer.style.top = `${e.clientY - 75}px`;

            });
        });
    });
}