document.addEventListener("DOMContentLoaded", () => {
    fetch('entries.md')
        .then(response => response.text())
        .then(text => {
            const entryContainer = document.getElementById('entry-container');
            const filterContainer = document.getElementById('filter-container');
            const markdownContent = text.split('\n');
            let currentCategory = '';
            let entryHTML = '';
            let entryLink = '';
            let tags = [];
            let allTags = new Set();

            markdownContent.forEach(line => {
                if (line.startsWith('# ')) {
                    if (entryHTML) {
                        entryHTML += '</div></a>'; // Close the last entry div and link
                        entryContainer.innerHTML += entryHTML;
                        entryHTML = '';
                    }
                    currentCategory = line.substring(2);
                    entryContainer.innerHTML += `<div class="category"><h3>${currentCategory}</h3>`;
                } else if (line.startsWith('- Name:')) {
                    if (entryHTML) {
                        entryHTML += '</div></a>'; // Close the last entry div and link
                        entryContainer.innerHTML += entryHTML;
                        entryHTML = '';
                    }
                    entryLink = ''; // Reset the link for the new entry
                    tags = []; // Reset tags for the new entry
                    entryHTML += `<a class="entry-link" href="#" target="_blank"><div class="entry">`;
                    entryHTML += `<span class="name">${line.substring(7).trim()}</span>`;
                } else if (line.startsWith('- Description:')) {
                    entryHTML += `<span class="description">${line.substring(14).trim()}</span>`;
                } else if (line.startsWith('- Tags:')) {
                    tags = line.substring(7).trim().split(',').map(tag => tag.trim());
                    entryHTML += `<div class="tags">`;
                    tags.forEach(tag => {
                        entryHTML += `<span class="tag">${tag}</span>`;
                        allTags.add(tag);
                    });
                    entryHTML += `</div>`;
                } else if (line.startsWith('- Link:')) {
                    entryLink = line.substring(7).trim();
                    entryHTML = entryHTML.replace('href="#"', `href="${entryLink}"`);
                }
            });

            if (entryHTML) {
                entryHTML += '</div></a>'; // Close the last entry div and link
                entryContainer.innerHTML += entryHTML;
            }

            // Create filter checkboxes for all unique tags
            allTags.forEach(tag => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = tag;
                checkbox.name = tag;
                checkbox.value = tag;
                checkbox.className = 'custom-checkbox';

                const label = document.createElement('label');
                label.htmlFor = tag;
                label.className = 'custom-label';
                label.appendChild(document.createTextNode(tag));

                filterContainer.appendChild(checkbox);
                filterContainer.appendChild(label);

                // Add event listener to filter entries on checkbox change
                checkbox.addEventListener('change', () => {
                    filterEntries();
                });
            });

            function filterEntries() {
                const checkedTags = Array.from(filterContainer.querySelectorAll('.custom-checkbox:checked')).map(cb => cb.value);
                const entries = entryContainer.querySelectorAll('.entry');

                entries.forEach(entry => {
                    const entryTags = Array.from(entry.querySelectorAll('.tag')).map(tag => tag.textContent);
                    if (checkedTags.every(tag => entryTags.includes(tag))) {
                        entry.parentElement.style.display = '';
                    } else {
                        entry.parentElement.style.display = 'none';
                    }
                });

                updateCategoryVisibility();
            }

            function updateCategoryVisibility() {
                const categories = document.querySelectorAll('.category');

                categories.forEach(category => {
                    // Get the next sibling element
                    let nextElement = category.nextElementSibling;
                    let hasVisibleLinks = false;

                    // Loop through the siblings until we reach the next category or end of siblings
                    while (nextElement && !nextElement.classList.contains('category')) {
                        if (nextElement.classList.contains('entry-link') && nextElement.style.display !== 'none') {
                            hasVisibleLinks = true;
                            break;
                        }
                        nextElement = nextElement.nextElementSibling;
                    }

                    // Set the display of the category based on visibility of links
                    category.style.display = hasVisibleLinks ? 'block' : 'none';
                });
            }
        });
});



// mouse cursor animation:

// const isDesktop = !/Mobi|Android/i.test(navigator.userAgent) && window.matchMedia("(min-width: 1024px)").matches;

// if (isDesktop) {

//     document.addEventListener('DOMContentLoaded', function () {
//         const textInput = "FONTS-TOOLS-LINKS-"; // Configurable text
//         const container = document.createElement('div');
//         container.id = 'circle-container';
//         document.body.appendChild(container);

//         // Create span elements for each character
//         for (let i = 0; i < textInput.length; i++) {
//             const span = document.createElement('span');
//             span.className = 'circle-text';
//             span.innerText = textInput[i];
//             container.appendChild(span);
//         }

//         const spans = document.querySelectorAll('.circle-text');
//         const radius = 100; // Radius of the circle
//         const angleStep = (2 * Math.PI) / textInput.length;

//         function positionSpans() {
//             spans.forEach((span, index) => {
//                 const angle = angleStep * index;
//                 const x = radius * Math.cos(angle);
//                 const y = radius * Math.sin(angle);
//                 span.style.transform = `rotate(${angle}rad) translate(0, -${radius}px)`;
//             });
//         }

//         positionSpans();

//         let angle = 0;

//         function animate() {
//             angle += 0.5; // Smaller increment for smoother rotation
//             container.style.transform = `rotate(${angle}deg)`;
//             requestAnimationFrame(animate); // Request the next frame for the animation
//         }


//         document.addEventListener('mousemove', function (event) {
//             const mouseX = event.pageX;
//             const mouseY = event.pageY;

//             // Update the position of the circle container to follow the mouse
//             container.style.left = `${mouseX}px`;
//             container.style.top = `${mouseY}px`;
//         });

//         document.addEventListener('wheel', function (event) {
//             const mouseX = event.pageX;
//             const mouseY = event.pageY;

//             // Update the position of the circle container to follow the mouse
//             container.style.left = `${mouseX}px`;
//             container.style.top = `${mouseY}px`;
//         });

//         animate(); // Start the animation
//     });

// }