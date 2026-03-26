let originalIntro = "";

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('#mainContent');
    originalIntro = wrapper.innerHTML;
});

function showMenu() {
    const wrapper = document.querySelector('#mainContent');

    // Use a standard container and centered row
    wrapper.innerHTML = `
        <div class="container py-3">
            <div class="row g-4 justify-content-center align-items-stretch">

                <div class="col-12 col-lg-8 d-flex">
                    <div class="arcade-screen h-100 p-4 w-100 d-flex flex-column justify-content-center align-items-center" id="contentPanel" style="min-height: 400px;">
                        <h1 class="arcade-title text-center">WELCOME</h1>
                        <p class="arcade-text text-center">Select a menu.</p>
                    </div>
                </div>

                <div class="col-12 col-lg-2 d-flex flex-column">
                    <div class="d-grid gap-2 flex-grow-1">
                        <button class="arcade-btn" onclick="showSection('profile')">PROFILE</button>
                        <button class="arcade-btn" onclick="showSection('tech')">TECH STACK</button>
                        <button class="arcade-btn" onclick="showSection('projects')">PROJECTS</button>
                        <button class="arcade-btn" onclick="showSection('webinars')">WEBINARS</button>
                        <button class="arcade-btn" onclick="showSection('orgs')">ORGS</button>
                        <button class="arcade-btn" onclick="showSection('hire')">HIRE ME</button>
                        
                        <button class="arcade-btn back-style mt-auto" id="backBtn">BACK</button>
                    </div>
                </div>

            </div>
        </div>
    `;
}

document.addEventListener("click", function (e) {

    if (e.target && e.target.id === "startBtn") {
        showMenu();
    }

    if (e.target && e.target.id === "backBtn") {
        goBack();
    }

});

function goBack() {
    const wrapper = document.querySelector('#mainContent');
    wrapper.innerHTML = originalIntro;
}

function showSection(section) {
    const panel = document.getElementById("contentPanel");
    let content = "";

    if (section === "profile") {
        content = `
            <h1 class="arcade-title text-center">PROFILE</h1>
            <img src="img/mypic.jpg" class="img-fluid rounded border border-warning my-3" style="max-height: 180px;">
            <p class="arcade-text text-center">NAME: MARK RYAN MARTINEZ<br>ROLE: GAME DEVELOPER<br>LEVEL: 28<br>TOWN: MALOLOS, BULACAN</p>
        `;
    } 
    else if (section === "tech") {
        content = `
            <h1 class="arcade-title text-center">tech stack</h1>
            <div class="arcade-text text-center mt-3">
                <p>FRONTEND: HTML, CSS, JS, BOOTSTRAP</p>
                <p>BACKEND: JAVA, C#, PYTHON</p>
                <p>TOOLS: NETBEANS, VS CODE, ANDROID STUDIO, VISUAL STUDIO</p>
            </div>
        `;
    } 
    else if (section === "projects") {
        content = `
            <h1 class="arcade-title text-center">projects</h1>
            <ul class="arcade-text list-unstyled text-center mt-3">
                <li>[1] CENTCIBLES</li>
                <li>[2] BLISS AND BLESSING</li>
            </ul>
        `;
    } 
    else if (section === "webinars") {
        content = `
            <h1 class="arcade-title text-center">webinars</h1>
            <p class="arcade-text text-center mt-3">ERROR 404: PAGE NOT FOUND</p>
        `;
    } 
    else if (section === "orgs") {
        content = `
            <h1 class="arcade-title text-center">orgs</h1>
            <p class="arcade-text text-center mt-3">SINIGENGGENG</p>
        `;
    } 
    else if (section === "hire") {
        content = `
            <h1 class="arcade-title text-center">available for quests</h1>
            <p class="arcade-text text-center mt-3">CONTACT: marcopolo@gmail.com</p>
        `;
    }

    panel.innerHTML = `
        <div class="d-flex flex-column align-items-center justify-content-center h-100 w-100 p-2">
            ${content}
        </div>
    `;
}
