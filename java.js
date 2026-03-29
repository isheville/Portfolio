let originalIntro = "";
let techSlideIndex = 0;
let orgSlideIndex = 0;
let orgInterval = null;
let techInterval = null;
let currentScreenshots = [];
let ssIndex = 0;
let isMuted = false;

document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById("bgMusic");
    const muteBtn = document.getElementById("muteBtn");

    const startMusic = () => {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(err => console.log("Autoplay blocked, waiting for interaction."));
        document.removeEventListener("click", startMusic);
    };
    document.addEventListener("click", startMusic);

    // 2. Mute Toggle Logic
    muteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        isMuted = !isMuted;
        bgMusic.muted = isMuted;
        muteBtn.innerText = isMuted ? "MUSIC: OFF" : "MUSIC: ON";
        muteBtn.style.borderColor = isMuted ? "#ff0000" : "#00ff00";
    });
    
    const nimElement = document.querySelector('#nim');
    const neonColors = ['#FF0000', '#00FF00', '#00FFFF', '#FF00FF', '#FFFF00', '#FF8800', '#00FF88', '#8800FF'];

    const createGlowingSpan = (char, index, colorOffset) => {
        if (char === " ") return " ";
        const color = neonColors[(index + colorOffset) % neonColors.length];
        return `<span style="color: ${color}; display: inline-block; animation: letterGlow 2s infinite ${(index + colorOffset) * 0.15}s">${char}</span>`;
    };

    const firstLine = "mark ryan";
    const secondLine = "martinez";

    nimElement.innerHTML = `
        <span class="keep-together">
            ${firstLine.split('').map((c, i) => createGlowingSpan(c, i, 0)).join('')}
        </span>
        <br>
        <span class="keep-together">
            ${secondLine.split('').map((c, i) => createGlowingSpan(c, i, firstLine.length)).join('')}
        </span>
    `;

    const wrapper = document.querySelector('#mainContent');
    originalIntro = wrapper.innerHTML;
});

function showMenu() {
    const wrapper = document.querySelector('#mainContent');

    const arcadeGifs = [
        "gifs/spaceship.gif",
        "gifs/sonic.gif",
        "gifs/pacman.gif",
        "gifs/mario.gif",
        "gifs/nyancat.gif",
        "gifs/thisisfine.gif",
    ];

    const randomGif = arcadeGifs[Math.floor(Math.random() * arcadeGifs.length)];

    const colors = {
        profile: "#FFB8FF",
        tech: "#00FF00",
        projects: "#FFFF00",
        webinars: "#0000FF",
        orgs: "#FF0000",
        hire: "#FF8800",
        back: "#00f2ff" 
    };

    wrapper.innerHTML = `
        <div class="container-fluid py-3">
            <div class="row g-4 justify-content-center">
                <div class="col-12 col-lg-9 order-1">
                    <div class="arcade-screen h-100 p-4 w-100 d-flex flex-column justify-content-center align-items-center" 
                         id="contentPanel" 
                         style="min-height: 450px; border-color: ${colors.back}; color: ${colors.back};">
                        
                        <h1 class="arcade-title text-center" style="color: ${colors.back}; margin-bottom: 20px;">SELECT A CATEGORY</h1>
                        
                        <img src="${randomGif}" alt="Arcade Animation" 
                             style="max-width: 90%; max-height: 280px; image-rendering: pixelated; border: 3px solid ${colors.back}; box-shadow: 0 0 15px ${colors.back};">
                    </div>
                </div>

                <div class="col-12 col-lg-3 order-2">
                    <div class="d-flex flex-row flex-lg-column flex-wrap gap-2 justify-content-center arcade-menu-container">
                        <button class="arcade-btn nav-item" style="border-color: ${colors.profile}; color: ${colors.profile};" onclick="showSection('profile', '${colors.profile}')">PROFILE</button>
                        <button class="arcade-btn nav-item" style="border-color: ${colors.tech}; color: ${colors.tech};" onclick="showSection('tech', '${colors.tech}')">TECH STACK</button>
                        <button class="arcade-btn nav-item" style="border-color: ${colors.projects}; color: ${colors.projects};" onclick="showSection('projects', '${colors.projects}')">PROJECTS</button>
                        <button class="arcade-btn nav-item" style="border-color: ${colors.webinars}; color: ${colors.webinars};" onclick="showSection('webinars', '${colors.webinars}')">WEBINARS</button>
                        <button class="arcade-btn nav-item" style="border-color: ${colors.orgs}; color: ${colors.orgs};" onclick="showSection('orgs', '${colors.orgs}')">ORGS</button>
                        <button class="arcade-btn nav-item" style="border-color: ${colors.hire}; color: ${colors.hire};" onclick="showSection('hire', '${colors.hire}')">HIRE ME</button>
                        
                        <button class="arcade-btn back-style nav-item mt-lg-4" 
                                id="backBtn" 
                                style="border-color: ${colors.back}; color: ${colors.back};">BACK</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showSection(section, themeColor) {
    if (orgInterval) { clearInterval(orgInterval); orgInterval = null; }
    if (techInterval) { clearInterval(techInterval); techInterval = null; }

    const allBtns = document.querySelectorAll('.nav-item');
    allBtns.forEach(btn => btn.classList.remove('active'));

    const clickedBtn = Array.from(allBtns).find(btn => 
        btn.innerText.toLowerCase() === section.toLowerCase()
    );
    
    if (clickedBtn) clickedBtn.classList.add('active');

    const panel = document.getElementById("contentPanel");
    
    panel.style.borderColor = themeColor;
    panel.style.color = themeColor;

    const modalContent = document.querySelector('.modal-content-neon');
    const modalCloseBtn = document.querySelector('.modal-close');
    if (modalContent && modalCloseBtn) {
        modalContent.style.borderColor = themeColor;
        modalContent.style.boxShadow = `0 0 50px ${themeColor}`;
        modalCloseBtn.style.color = themeColor;
        modalCloseBtn.style.borderColor = themeColor;
    }

    if (section === "tech") {
        techSlideIndex = 0;
        renderTechSlide(themeColor);

        techInterval = setInterval(() => {
            techSlideIndex = (techSlideIndex + 1) % 4;
            renderTechSlide(themeColor);
        }, 3000);
        return;
    }

    if (section === "orgs") {
        orgSlideIndex = 0;
        renderOrgLoop(themeColor);
        orgInterval = setInterval(() => {
            orgSlideIndex = (orgSlideIndex + 1) % 2;
            renderOrgLoop(themeColor);
        }, 3000);
        return;
    }

    const title = `<h1 class="arcade-title text-center" style="color: ${themeColor}; text-shadow: 2px 2px 0px #000;">${section.toUpperCase()}</h1>`;
    let content = "";

    if (section === "profile") {
        const customTitle = `<h1 class="arcade-title text-center" style="color: ${themeColor}; text-shadow: 2px 2px 0px #000;">ABOUT ME</h1>`;
        
        content = `
            ${customTitle}
            <div class="d-flex justify-content-center w-100 mb-3">
                <div class="profile-neon-container" 
                     style="border: 3px solid ${themeColor}; box-shadow: 0 0 15px ${themeColor}; cursor: pointer;" 
                     onclick="openModalWithImage('img/klasmeyt/mypic.jpg')">
                    <img src="img/klasmeyt/mypic.jpg" class="profile-picture" alt="Mark Ryan Martinez">
                </div>
            </div>
            
            <div style="max-height: 200px; overflow-y: auto; padding-right: 10px; width: 100%;">
                <p class="arcade-text text-center" style="font-size: 1.5rem; line-height: 1.6;">
                    Im currently a BSIT student at STI College Malolos, aspiring to become a game developer. 
                    I enjoy learning new things about programming and exploring how games are built, 
                    from the technical side to the creative side.<br><br>
                    As a student, Im continuously improving my skills by working on different projects 
                    and experimenting with new ideas. This portfolio is a collection of my progress, 
                    where I share the projects Ive worked on, the skills Im developing, 
                    and the things Ive achieved along the way.
                </p>
            </div>`;
            
    } else if (section === "projects") {
        const projectData = [
            {
                title: "CENTSIBLE",
                desc: "A digital financial management system that enables users to securely manage accounts, track transactions, send money, pay bills, and monitor savings in real time.",
                mainImg: "img/projects/cwhite.jpg", 
                screenshots: ["img/projects/csignin.jpg", "img/projects/ccreateacc.jpg", "img/projects/cmain.jpg", "img/projects/cbank.jpg", "img/projects/cbills.jpg", 
                    "img/projects/csavings.jpg", "img/projects/csendmoney.jpg", "img/projects/caudit.jpg", "img/projects/ctrails.jpg", "img/projects/cacc.jpg"],
                stack: [
                    { name: "JAVA", icon: "img/tech/java.png" },
                    { name: "NetBeans", icon: "img/tech/netbeans.png" }
                ],
                github: "https://github.com/TCxDesu/Centsible"
            },
            {
                title: "BLISS AND BLESSING",
                desc: "A clothing inventory management system developed using C# and Visual Studio, powered by a Microsoft SQL Server local database. Supports multiple users and real-time inventory updates.",
                mainImg: "img/projects/bb.png", 
                screenshots: ["img/projects/bbsignin.png", "img/projects/bbmain.png", "img/projects/bbproduct.png"],
                stack: [
                    { name: "C# Sharp", icon: "img/tech/csharp.png" },
                    { name: "Visual Studio", icon: "img/tech/visualstudio.png" },
                    { name: "MS SQL Server", icon: "img/tech/mssql.png" }
                ],
                github: "https://github.com/ProfSavage/BlissAndBlessing"
            }
        ];

        let projectsHtml = projectData.map(proj => `
            <div class="neon-box p-4 mb-4" style="border-color: ${themeColor}; background: rgba(0,0,0,0.6); box-shadow: inset 0 0 15px ${themeColor};">
                <div class="row g-4 align-items-center" style="text-align: left;">
                    <div class="col-12 col-md-5">
                        <div class="profile-neon-container" 
                             style="border: 4px solid ${themeColor}; box-shadow: 0 0 15px ${themeColor}; cursor: pointer; position: relative;" 
                             onclick="openProjectScreenshots(${JSON.stringify(proj.screenshots).replace(/"/g, '&quot;')})">
                            <img src="${proj.mainImg}" class="w-100" style="object-fit: cover; display: block;">
                            <div style="position: absolute; bottom: 0; background: rgba(0,0,0,0.8); width: 100%; text-align: center; font-size: 0.6rem; padding: 5px; font-family: 'vcr'; color: #fff;">[ CLICK TO VIEW SCREENSHOTS ]</div>
                        </div>
                    </div>
                    
                    <div class="col-12 col-md-7">
                        <h2 class="arcade-title" style="color: ${themeColor}; font-size: 1.6rem; margin-bottom: 10px;">${proj.title}</h2>
                        <p class="arcade-text" style="font-size: 0.95rem; text-align: left; line-height: 1.4; margin-bottom: 15px; color: #fff;">${proj.desc}</p>
                        
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            ${proj.stack.map(s => `
                                <div class="tag-pill d-flex align-items-center gap-2" style="border: 2px solid ${themeColor}; padding: 5px 10px;">
                                    <img src="${s.icon}" style="width: 16px; height: 16px; image-rendering: pixelated;">
                                    <span class="tag-text" style="font-size: 0.7rem;">${s.name}</span>
                                </div>
                            `).join('')}
                        </div>

                        <a href="${proj.github}" target="_blank" class="neon-box project-git-btn px-3 py-2" 
                           style="border-color: ${themeColor}; color: white; text-decoration: none; font-family: 'vcr'; font-size: 0.8rem; gap: 8px; display: inline-flex; align-items: center;">
                            <img src="img/tech/github.png" style="width: 18px; height: 18px;"> 
                            <span>CODE</span>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        content = `
            <div class="w-100 px-2" style="max-height: 450px; overflow-y: auto; overflow-x: hidden; padding-top: 10px;">
                <h1 class="arcade-title text-center mb-4" style="color: ${themeColor}; font-size: 2.2rem;">${section.toUpperCase()}</h1>
                <div class="container-fluid">
                    ${projectsHtml}
                </div>
            </div>`;
        
    } else if (section === "webinars") {
        const webinarData = [
                    {
                        title: "SYNTAX Endgame: Second IT Congress",
                        date: "APR 2024",
                        desc: "Gathering of major PH IT communities discussing leadership and excellence in the gaming industry.",
                        tags: ["IT Leadership", "Web3", "The Syntax Org"],
                        attendees: "400+"
                    },
                    {
                        title: "Bridging Knowledge",
                        date: "DEC 2024",
                        desc: "Exploring Digital Divide, Cybersecurity and OS Trends, Professionalism in the IT Industry, and Programming.",
                        tags: ["OS Trends", "Cybersecurity", "Programming", "Professionalism"],
                        attendees: "???"
                    }
                ];

                let timelineHtml = webinarData.map(web => `
                <div class="timeline-item d-flex mb-5"> <div class="timeline-marker d-flex flex-column align-items-center me-3">
                        <div class="timeline-node" style="border-color: ${themeColor}; box-shadow: 0 0 10px ${themeColor}; width: 20px; height: 20px;"></div>
                        <div class="timeline-line" style="background-color: ${themeColor}; width: 3px;"></div>
                    </div>
                    <div class="timeline-content p-4 neon-box w-100" style="border-color: ${themeColor}; text-align: left; align-items: flex-start; flex-direction: column;">
                        <span class="arcade-text" style="font-size: 1rem; color: ${themeColor}; opacity: 0.9; margin-bottom: 5px;">${web.date}</span>
                        <h4 class="arcade-text mb-3" style="font-size: clamp(1.2rem, 2.5vw, 1.8rem); color: white; text-align: left; -webkit-text-stroke: 0.5px ${themeColor};">${web.title}</h4>
                        <p class="arcade-text mb-3" style="font-size: 1.1rem; text-align: left; line-height: 1.4; color: #ffffff;">${web.desc}</p>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            ${web.tags.map(tag => `<span class="tag-pill" style="border: 2px solid ${themeColor}; color: white; background: ${themeColor}33; font-size: 0.8rem; padding: 5px 12px;">${tag}</span>`).join('')}
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <img src="img/icons/people.png" class="attendee-icon" style="width: 20px; height: 20px;" alt="icon">
                            <span class="arcade-text" style="font-size: 0.9rem; opacity: 1; color: white;">${web.attendees} Attendees</span>
                        </div>
                    </div>
                </div>
            `).join('');

            content = `
                <div class="w-100 px-3 py-2" style="max-height: 450px; overflow-y: auto; overflow-x: hidden;">
                    <h1 class="arcade-title text-center mb-5" style="color: ${themeColor}; font-size: 2.5rem;">${section.toUpperCase()}</h1>
                    <div class="timeline-container position-relative">
                        ${timelineHtml}
                    </div>
                </div>`;
        
    } else if (section === "hire") {
        const customTitle = `<h1 class="arcade-title text-center" style="color: ${themeColor}; text-shadow: 2px 2px 0px #000;">Im ready to accept some QUEST!!!!</h1>`;
        content = `${customTitle}
        <div class="d-flex flex-wrap justify-content-center align-items-center gap-4 my-4 py-3" style="width: 100%;">
            <a href="https://facebook.com/xsheville" target="_blank" class="neon-box" style="border-color: ${themeColor}; color: ${themeColor}; box-shadow: 0 0 10px ${themeColor}, inset 0 0 10px ${themeColor};" onmouseover="showContact('FACEBOOK: xsheville')">
                <img src="img/icons/fbneon.png" class="pixel-icon">
            </a>
            <a href="https://instagram.com/mrkrynmrtnz" target="_blank" class="neon-box" style="border-color: ${themeColor}; color: ${themeColor}; box-shadow: 0 0 10px ${themeColor}, inset 0 0 10px ${themeColor};" onmouseover="showContact('INSTAGRAM: @mrkrynmrtnz')">
                <img src="img/icons/igneon.png" class="pixel-icon">
            </a>
            <a href="https://www.linkedin.com/in/mark-ryan-martinez-1ab1203bb/" target="_blank" class="neon-box" style="border-color: ${themeColor}; color: ${themeColor}; box-shadow: 0 0 10px ${themeColor}, inset 0 0 10px ${themeColor};" onmouseover="showContact('LINKEDIN: Mark Ryan Martinez')">
                <img src="img/icons/linkedinneon.png" class="pixel-icon">
            </a>
            <a href="https://github.com/isheville" target="_blank" class="neon-box" style="border-color: ${themeColor}; color: ${themeColor}; box-shadow: 0 0 10px ${themeColor}, inset 0 0 10px ${themeColor};" onmouseover="showContact('GITHUB: isheville')">
                <img src="img/icons/githubneon.png" class="pixel-icon">
            </a>
            <a href="mailto:mrm09011997@gmail.com" class="neon-box" style="border-color: ${themeColor}; color: ${themeColor}; box-shadow: 0 0 10px ${themeColor}, inset 0 0 10px ${themeColor};" onmouseover="showContact('EMAIL: mrm09011997@gmail.com')">
                <img src="img/icons/gmailneon.png" class="pixel-icon">
            </a>
        </div>
        <p id="contactInfo" class="arcade-text text-center mt-3" style="min-height: 1.5em; color: ${themeColor};">SELECT AN ICON TO VISIT</p>`;
    }

    panel.innerHTML = `<div class="d-flex flex-column align-items-center justify-content-center h-100 w-100 p-2">${content}</div>`;
}

function renderTechSlide(themeColor) {
    const panel = document.getElementById("contentPanel");
    const techData = [
        { category: "Programming Languages", items: [{ name: "Java", icon: "img/tech/java.png" }, { name: "C#", icon: "img/tech/csharp.png" }, { name: "Python", icon: "img/tech/python.png" }] },
        { category: "Web Development", items: [{ name: "HTML", icon: "img/tech/html.png" }, { name: "CSS", icon: "img/tech/css.png" }, { name: "JS", icon: "img/tech/javascript.png" }, { name: "Bootstrap", icon: "img/tech/bootstrap.png" }] },
        { category: "Database", items: [{ name: "MS SQL Server", icon: "img/tech/mssql.png" }, { name: "MongoDB", icon: "img/tech/mongodb.png" }] },
        { category: "Development Tools", items: [{ name: "NETBEANS", icon: "img/tech/netbeans.png" }, { name: "Visual Studio", icon: "img/tech/visualstudio.png" }, { name: "VS Code", icon: "img/tech/vscode.png" }] }
    ];

    const current = techData[techSlideIndex];
    const pillsHtml = current.items.map(item => `
        <div class="neon-box tech-pill-large" style="border-color: ${themeColor}; box-shadow: 0 0 10px ${themeColor};">
            <img src="${item.icon}" class="pixel-icon-medium">
            <span class="tech-label-large">${item.name}</span>
        </div>
    `).join('');

    panel.innerHTML = `
        <div class="d-flex flex-column align-items-center justify-content-center h-100 w-100 p-2 animate-flicker">
            <h1 class="arcade-title text-center mb-3" style="color: ${themeColor};">
                TECH STACK 
                <div class="auto-indicator-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </h1>
            <div class="neon-box section-container p-4" style="border-color: ${themeColor};">
                <h2 class="arcade-text mb-4" style="color: ${themeColor}; font-size: 1.4rem;">[ ${current.category} ]</h2>
                <div class="d-flex flex-wrap justify-content-center gap-3">${pillsHtml}</div>
            </div>
        </div>
    `;
}

function renderOrgLoop(themeColor) {
    const panel = document.getElementById("contentPanel");
    const orgData = [
        { 
            name: "SYNTAX", 
            img: "img/orgs/syntaxblack.jpg", 
            role: "MEMBER",
            desc: "Society of Youth for the Next Technological Advancement and Excellence" 
        },
        { 
            name: "BLAZE ORG", 
            img: "img/orgs/blaze.jpg", 
            role: "ACTIVE MEMBER",
            desc: "#ONEFLAME #ONEALLIANCE #ONEBLAZE" 
        }
    ];

    const current = orgData[orgSlideIndex];

    panel.innerHTML = `
        <div class="d-flex flex-column align-items-center justify-content-center h-100 w-100 p-2">
            <h1 class="arcade-title text-center mb-3" style="color: ${themeColor};">${current.name}</h1>
            <div class="profile-neon-container mb-3" 
                 style="border: 3px solid ${themeColor}; box-shadow: 0 0 15px ${themeColor}; cursor: pointer;" 
                 onclick="openModalWithImage('${current.img}')">
                <img src="${current.img}" class="profile-picture" alt="${current.name}">
            </div>
            <p class="arcade-text text-center" style="color: ${themeColor}; font-weight: bold; letter-spacing: 2px;">
                [ ${current.role} ]
            </p>
            <p class="arcade-text text-center" style="font-size: 1.5rem;">${current.desc}</p>
        </div>
    `;
}

document.addEventListener("click", function (e) {

    if (e.target && e.target.classList.contains("arcade-btn") && e.target.id !== "backBtn") {
        
        const soundIds = ["sfx1", "sfx2", "sfx3", "sfx4", "sfx5"];
        const randomIndex = Math.floor(Math.random() * soundIds.length);
        const randomAudio = document.getElementById(soundIds[randomIndex]);

        if (randomAudio) {
            randomAudio.currentTime = 0; 
            randomAudio.volume = 0.4;
            randomAudio.play().catch(err => console.log("SFX blocked:", err));
        }

        const chance = Math.random(); 
        const spawnRate = 0.001;

        if (chance < spawnRate) {
            const surpriseImages = [
                "img/klasmeyt/raven.jpg",
                "img/klasmeyt/myke.jpg",
                "img/klasmeyt/luke.png",
                "img/klasmeyt/angelo.jpg",
                "img/klasmeyt/arren.jpg",
                "img/klasmeyt/marco.jpg",
                "img/klasmeyt/miguel.jpg",
                "img/klasmeyt/justin.jpg"
            ];
            
            const secretSoundIds = ["easteregg", "easteregg2", "easteregg3"]; 
            
            const randomImg = surpriseImages[Math.floor(Math.random() * surpriseImages.length)];
            const randomSecretSound = secretSoundIds[Math.floor(Math.random() * secretSoundIds.length)];
            
            const secretAudio = document.getElementById(randomSecretSound);
            if (secretAudio) {
                secretAudio.currentTime = 0;
                secretAudio.volume = 0.6;
                secretAudio.play();
            }

            showSurpriseImage(randomImg); 
        }
    }
    
    if (e.target && e.target.id === "startBtn") {
        const audio = document.getElementById("startSound");
        if (audio) {
            audio.play().catch(error => console.log("Playback error:", error));
        }
        
        e.target.style.pointerEvents = "none";
        e.target.style.animation = "arcadeFlicker 0.2s infinite"; 

        setTimeout(() => {
            showMenu();
        }, 2850); 
    }
    
    if (e.target && e.target.id === "backBtn") {
        const backAudio = document.getElementById("gameOverSound");
        
        if (backAudio) {
            backAudio.play().catch(error => console.log("Playback error:", error));
        }

        e.target.style.pointerEvents = "none";

        const panel = document.getElementById("contentPanel");
        if (panel) {
            panel.style.transition = "opacity 0.8s ease";
            panel.style.opacity = "0";
        }

        setTimeout(() => {
            goBack();
        }, 1400); 
    }
});

function openProjectScreenshots(imgs) {
    if (!imgs || imgs.length === 0) return;
    currentScreenshots = imgs;
    ssIndex = 0;
    
    const modal = document.getElementById('profileModal');
    const modalImg = modal.querySelector('img');
    
    modalImg.src = currentScreenshots[ssIndex];
    modal.style.display = 'flex';

    if (currentScreenshots.length > 1) {
        modalImg.style.cursor = "pointer";
        modalImg.onclick = function() {
            ssIndex = (ssIndex + 1) % currentScreenshots.length;
            modalImg.src = currentScreenshots[ssIndex];
        };
    } else {
        modalImg.onclick = null;
        modalImg.style.cursor = "default";
    }
}

function playVoice(audioId) {
    const bgMusic = document.getElementById("bgMusic");
    const voice = document.getElementById(audioId);

    if (bgMusic) bgMusic.volume = 0.1;
    
    voice.play();
    
    voice.onended = () => {
        if (bgMusic) bgMusic.volume = 0.3;
    };
}

function showSurpriseImage(imgSrc) {
    const modal = document.getElementById('profileModal');
    const modalImg = modal.querySelector('img');
    
    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.style.display = 'flex';
        modal.style.opacity = "1";

        setTimeout(() => {
            modal.style.display = 'none';
        }, 1000);
    }
}

function goBack() {
    if (orgInterval) { clearInterval(orgInterval); orgInterval = null; }
    if (techInterval) { clearInterval(techInterval); techInterval = null; }
    document.querySelector('#mainContent').innerHTML = originalIntro;
}

function openModalWithImage(imgSrc) {
    const modal = document.getElementById('profileModal');
    const modalImg = modal.querySelector('img');
    modalImg.src = imgSrc;
    modal.style.display = 'flex';
}

function closeProfileModal() { 
    document.getElementById('profileModal').style.display = 'none'; 
}

function showContact(info) { 
    document.getElementById("contactInfo").innerText = info; 
}