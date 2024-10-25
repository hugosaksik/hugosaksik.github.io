// Feed the topbar at the top of the body

var topbar = document.createElement('div');
topbar.className = 'top-bar';
topbar.innerHTML = `
<input type="checkbox" id="menu-toggle">
        <a id="name" class="top-bar-item noselect" href="./index.html">hugo saksik</a>
        <a id="about" class="top-bar-item noselect" href="./about.html">about</a>
        <label for="menu-toggle" class="top-bar-item menu-button noselect" id="projects">projects</label>
        <label for="menu-toggle" class="top-bar-item menu-button noselect" id="more">more</label>
        <label for="menu-toggle" class="top-bar-item menu-button noselect" id="more-arrow">↘</label> 
        <!-- <a id="projects">projects</a> -->
        <div id="dropdown" class="dropdown-menu">

        
        <a class="project-entry" href="./links-repo/index.html" data-image="./data/preview/pre-linkrepo.jpg"> <svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><circle r="5" cx="10" cy="12" fill="#fe3b01"/></svg>  
        <span class="project-name">Links repo</span><span class="description">tools - typography - inspiration</span><span class="year">ongoing</span></a>
        <a class="project-entry" href="./graphicjam.html" data-image="./data/preview/pre-graphicjam.jpg"><span class="project-name">Graphic Jam</span><span class="description">creative coding - graphic design</span><span class="year">2022</span></a>
        <a class="project-entry" href="./leparc.html" data-image="./data/preview/pre-leparc.jpg"><span class="project-name">Systématiser - Julio Leparc</span><span class="description">immersive installation</span><span class="year">2021</span></a>
        <a class="project-entry" href="./molnar.html" data-image="./data/preview/pre-molnar.jpg"><span class="project-name">Systématiser - Vera Molnár</span><span class="description">creative coding - pen plotting</span><span class="year">2021</span></a>
        <a class="project-entry" href="./memoire.html" data-image="./data/preview/pre-simplicite.jpg"><span class="project-name">La simplicité et l'écran</span><span class="description">writings - graphic design - web2print</span><span class="year">2021</span></a>
        
        <a href="./about.html" class="top-bar-item" id="mobile-about">↘ about</a>
                <div class="getintouch-container">
                <a href="mailto:hi@saksik.net">get in touch <span style="font-family:Syne";>↙</span><br>
                hi@saksik.net
                </a>
                </div>
                <img id="preview-image" src="" alt="" />
        </div>
        `;
document.body.insertBefore(topbar, document.body.firstChild);

