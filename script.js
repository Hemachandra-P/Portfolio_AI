// This code was created by HEMACHANDRA.
// Unauthorized copying, distribution, or modification of this code, in whole or in part, is strictly prohibited without prior written permission.
// Please do not remove or alter the credit to the original creator. If you wish to use this code for personal or commercial purposes, kindly contact the creator for permissions.
// Thank you for respecting the work and effort that went into creating this code.

const floatingElements = document.getElementById('floatingElements');
for (let i = 0; i < 15; i++) {
    const element = document.createElement('div');
    element.classList.add('floating-element');
    const size = Math.random() * 200 + 50;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 20;

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${x}%`;
    element.style.top = `${y}%`;
    element.style.animation = `float ${duration}s infinite ease-in-out`;

    floatingElements.appendChild(element);
}

const style = document.createElement('style');
style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(20px, -20px) rotate(5deg); }
            50% { transform: translate(-15px, 10px) rotate(-5deg); }
            75% { transform: translate(10px, 15px) rotate(3deg); }
        }
    `;
document.head.appendChild(style);
/* ==========================================
        FLOATING PARTICLES
========================================== */

const particleContainer = document.getElementById("floatingParticles");

if (particleContainer) {

    const colors = [
        "#7c5cff",
        "#00e5ff",
        "#ffffff"
    ];

    for (let i = 0; i < 25; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        const size = Math.random() * 4 + 2;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        particle.style.animationDuration =
            (15 + Math.random() * 10) + "s";

        particle.style.animationDelay =
            (-Math.random() * 20) + "s";

        particleContainer.appendChild(particle);

    }

}

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const scrollDownArrow = document.querySelector('.scroll-down');
function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}
function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
fadeElements.forEach(element => {
    observer.observe(element);
});
const nav = document.getElementById('mainNav');
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    if (scrollTop > 100) {
        scrollDownArrow.style.opacity = '0';
        scrollDownArrow.style.visibility = 'hidden';
        scrollDownArrow.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        scrollDownArrow.style.opacity = '1';
        scrollDownArrow.style.visibility = 'visible';
        scrollDownArrow.style.transform = 'translateX(-50%) translateY(0)';
    }

    lastScrollTop = scrollTop;
});
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            closeMobileMenu();
            const headerHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
function highlightNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navHeight = nav.offsetHeight;
        if (window.scrollY >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);
const styleActive = document.createElement('style');
styleActive.textContent = `
        .nav-links a.active,
        .mobile-nav a.active {
            color: var(--primary) !important;
        }
        
        .nav-links a.active::after {
            width: 100% !important;
        }
        
        .mobile-nav a.active {
            background: rgba(99, 102, 241, 0.15) !important;
        }
    `;
document.head.appendChild(styleActive);

function showSecurityPopup(message) {
    const existingPopup = document.getElementById('securityPopup');
    const existingOverlay = document.getElementById('securityPopupOverlay');
    if (existingPopup) existingPopup.remove();
    if (existingOverlay) existingOverlay.remove();
    const overlay = document.createElement('div');
    overlay.id = 'securityPopupOverlay';
    document.body.appendChild(overlay);
    const popup = document.createElement('div');
    popup.id = 'securityPopup';
    popup.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <div style="width: 60px; height: 60px; background: var(--gradient-1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                        <i class="fas fa-shield-alt" style="font-size: 24px; color: white;"></i>
                    </div>
                    <h3 style="color: white; margin-bottom: 10px;">Security Notice</h3>
                    <p style="color: var(--gray); line-height: 1.5;">${message}</p>
                </div>
                <button id="closePopup" style="
                    background: var(--gradient-1);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                ">Understood</button>
            `;
    document.body.appendChild(popup);
    document.getElementById('closePopup').addEventListener('click', function () {
        popup.remove();
        overlay.remove();
    });
    overlay.addEventListener('click', function () {
        popup.remove();
        overlay.remove();
    });
    setTimeout(() => {
        if (document.body.contains(popup)) {
            popup.remove();
            overlay.remove();
        }
    }, 5000);
}
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showSecurityPopup('Right-click is disabled on this page.');
    return false;
});

document.addEventListener('keydown', function (e) {

    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        showSecurityPopup('Developer tools are disabled.');
        return false;
    }

    if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.metaKey && e.altKey && e.key === 'i')) {
        e.preventDefault();
        showSecurityPopup('Developer tools are disabled.');
        return false;
    }

    if ((e.ctrlKey && e.shiftKey && e.key === 'J') || (e.metaKey && e.altKey && e.key === 'j')) {
        e.preventDefault();
        showSecurityPopup('Developer tools are disabled.');
        return false;
    }

    if ((e.ctrlKey && e.key === 'u') || (e.metaKey && e.key === 'u')) {
        e.preventDefault();
        showSecurityPopup('Viewing page source is disabled.');
        return false;
    }

    if ((e.ctrlKey && e.shiftKey && e.key === 'C') || (e.metaKey && e.altKey && e.key === 'c')) {
        e.preventDefault();
        showSecurityPopup('Inspect element is disabled.');
        return false;
    }
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
});

document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

let devtoolsOpen = false;
setInterval(() => {
    const start = performance.now();
    console.debug('DevTools Check');
    const end = performance.now();

    if (end - start > 100) {
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            showSecurityPopup('Developer tools detected. Please close them.');
        }
    } else {
        devtoolsOpen = false;
    }
    // Clear console to prevent spam
    console.clear();

}, 1000);

const roles = [
    "AI Engineer",
    "AI Governance",
    "Machine Learning",
    "Information Systems",
    "Technology & Innovation"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingElement.textContent = currentRole.substring(0, charIndex++);
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex--);
    }

    let speed = deleting ? 50 : 100;

    if (!deleting && charIndex === currentRole.length + 1) {
        speed = 1500;
        deleting = true;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();
/* ================= AI Boot Screen ================= */

document.addEventListener("DOMContentLoaded", () => {

    const bootScreen = document.getElementById("bootScreen");
    const progressBar = document.getElementById("progressBar");
    const loadingPercent = document.getElementById("loadingPercent");
    const mobileProgressBar = document.getElementById("mobileProgressBar");
    const mobilePercent = document.getElementById("mobilePercent");
    const lines = window.innerWidth <= 768
        ? document.querySelectorAll(".mobile-line")
        : document.querySelectorAll("#terminal .line");

    let progress = 0;
    let lineIndex = 0;

    /* Terminal Lines */

    const lineTimer = setInterval(() => {

        if (lineIndex < lines.length) {

            lines[lineIndex].style.opacity = "1";
            lineIndex++;

        } else {

            clearInterval(lineTimer);

        }

    }, 450);

    /* Progress */

    /* Progress */

    const progressTimer = setInterval(() => {

        progress++;

        if (progressBar)
            progressBar.style.width = progress + "%";

        if (loadingPercent)
            loadingPercent.textContent = progress + "%";

        if (mobileProgressBar)
            mobileProgressBar.style.width = progress + "%";

        if (mobilePercent)
            mobilePercent.textContent = progress + "%";

        if (progress >= 100) {

            clearInterval(progressTimer);

            document.body.classList.add("loader-finished");

            bootScreen.style.transition = "opacity .6s ease";
            bootScreen.style.opacity = "0";

            setTimeout(() => {
                bootScreen.remove();
            }, 600);

        }

    }, 25);
});
/* ==========================================
   CURSOR GLOW
========================================== */

const glow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

const projects = {

    malware: {

        title: "Android Malware Detection Using Static & Dynamic Analysis",

        overview: "A research-based Android malware detection system that combines Machine Learning and Deep Learning techniques to identify malicious Android applications using both static and dynamic analysis.",

        problem: "Traditional signature-based malware detection struggles to identify newly emerging malware variants, making Android devices vulnerable to modern threats.",

        solution: "Designed a hybrid malware detection pipeline that extracts application features, preprocesses the dataset, trains multiple machine learning models, and compares their performance for effective malware classification.",

        features: [
            "Static & Dynamic Analysis",
            "Feature Extraction",
            "Machine Learning Models",
            "1D-CNN Deep Learning Model",
            "Research Publication"
        ],

        technologies: [
            "Python",
            "Scikit-learn",
            "TensorFlow",
            "Pandas",
            "NumPy",
            "1D-CNN"
        ],

        workflow: [
            "Dataset Collection",
            "Feature Extraction",
            "Data Preprocessing",
            "Model Training",
            "Prediction & Classification"
        ],

        outcome: "Successfully developed an Android malware detection system demonstrating how Machine Learning and Deep Learning techniques can improve malware identification.",

        learnings: [
            "Cyber Security",
            "Machine Learning",
            "Deep Learning",
            "Feature Engineering",
            "Research Methodology"
        ],

        github: "https://github.com/Hemachandra-P/Android-malware-Detection-using-Static-and-Dynamic-Analysis"

    },
    fakeNews: {

        title: "Fake News Detection Using Machine Learning",

        overview: "A machine learning-based fake news detection system designed to classify news articles as genuine or fake by analyzing textual content through Natural Language Processing (NLP) techniques.",

        problem: "The rapid spread of misinformation across digital platforms makes it difficult for users to distinguish credible news from fake content, leading to misinformation and public confusion.",

        solution: "Developed an end-to-end text classification pipeline involving data preprocessing, TF-IDF vectorization, model training, and comparative evaluation of multiple machine learning algorithms to identify fake news articles.",

        features: [
            "Text Preprocessing",
            "TF-IDF Feature Extraction",
            "Multiple ML Model Comparison",
            "Real-time News Classification",
            "NLP-based Text Analysis"
        ],

        technologies: [
            "Python",
            "Scikit-learn",
            "Pandas",
            "NumPy",
            "NLTK",
            "TF-IDF Vectorizer",
            "XGBoost"
        ],

        workflow: [
            "Dataset Collection",
            "Text Cleaning & Preprocessing",
            "TF-IDF Vectorization",
            "Model Training",
            "Prediction & Classification"
        ],

        outcome: "Successfully developed a fake news detection system capable of analyzing textual information and distinguishing between genuine and fake news articles using multiple machine learning models.",

        learnings: [
            "Natural Language Processing",
            "Text Feature Engineering",
            "Machine Learning Model Comparison",
            "Model Evaluation",
            "Data Preprocessing"
        ],

        github: "YOUR_FAKE_NEWS_GITHUB_LINK"

    },
    waterQuality: {

        title: "Water Quality Prediction Using Machine Learning",

        overview: "A machine learning project that predicts water quality by analyzing environmental and chemical parameters, helping identify whether water is suitable for use based on historical data.",

        problem: "Assessing water quality manually is time-consuming and requires extensive laboratory testing, making continuous monitoring difficult.",

        solution: "Built a machine learning pipeline that preprocesses water quality datasets, analyzes multiple environmental parameters, and predicts overall water quality using supervised learning techniques.",

        features: [
            "Water Quality Prediction",
            "Environmental Data Analysis",
            "Data Visualization",
            "Machine Learning Classification",
            "Feature Analysis"
        ],

        technologies: [
            "Python",
            "Scikit-learn",
            "Pandas",
            "NumPy",
            "Matplotlib",
            "Jupyter Notebook"
        ],

        workflow: [
            "Dataset Collection",
            "Data Cleaning",
            "Exploratory Data Analysis",
            "Feature Engineering",
            "Model Training",
            "Prediction"
        ],

        outcome: "Successfully developed a predictive model capable of analyzing multiple water quality parameters and assisting in water quality assessment through machine learning techniques.",

        learnings: [
            "Environmental Data Analysis",
            "Machine Learning Pipeline",
            "Feature Engineering",
            "Data Visualization",
            "Predictive Modeling"
        ],

        github: "YOUR_WATER_QUALITY_GITHUB_LINK"

    },
    waterQuality: {

        title: "Water Quality Prediction Using Machine Learning",

        overview: "A machine learning project that predicts water quality by analyzing environmental and chemical parameters, helping identify whether water is suitable for use based on historical data.",

        problem: "Assessing water quality manually is time-consuming and requires extensive laboratory testing, making continuous monitoring difficult.",

        solution: "Built a machine learning pipeline that preprocesses water quality datasets, analyzes multiple environmental parameters, and predicts overall water quality using supervised learning techniques.",

        features: [
            "Water Quality Prediction",
            "Environmental Data Analysis",
            "Data Visualization",
            "Machine Learning Classification",
            "Feature Analysis"
        ],

        technologies: [
            "Python",
            "Scikit-learn",
            "Pandas",
            "NumPy",
            "Matplotlib",
            "Jupyter Notebook"
        ],

        workflow: [
            "Dataset Collection",
            "Data Cleaning",
            "Exploratory Data Analysis",
            "Feature Engineering",
            "Model Training",
            "Prediction"
        ],

        outcome: "Successfully developed a predictive model capable of analyzing multiple water quality parameters and assisting in water quality assessment through machine learning techniques.",

        learnings: [
            "Environmental Data Analysis",
            "Machine Learning Pipeline",
            "Feature Engineering",
            "Data Visualization",
            "Predictive Modeling"
        ],

        github: "YOUR_WATER_QUALITY_GITHUB_LINK"

    },
    photography: {

        title: "Photography Portfolio Website",

        overview: "A modern photography portfolio website developed to showcase photographs through a responsive, visually appealing gallery with category-based organization and smooth user interactions.",

        problem: "Traditional photo galleries often lack responsiveness, organization, and an engaging user experience for showcasing photography collections.",

        solution: "Designed and developed a responsive portfolio website featuring categorized galleries, dynamic image management, and an optimized viewing experience across multiple devices.",

        features: [
            "Responsive Gallery",
            "Category Filtering",
            "Lightbox Image Viewer",
            "Dynamic Photo Management",
            "Mobile-Friendly Design"
        ],

        technologies: [
            "Django",
            "Python",
            "HTML",
            "CSS",
            "JavaScript",
            "SQLite"
        ],

        workflow: [
            "Photo Upload",
            "Category Management",
            "Gallery Rendering",
            "User Interaction",
            "Responsive Display"
        ],

        outcome: "Successfully built a fully functional photography portfolio that provides an engaging browsing experience while efficiently managing and presenting photographic collections.",

        learnings: [
            "Django Development",
            "Responsive Design",
            "Frontend Optimization",
            "Media Management",
            "UI/UX Design"
        ],

        github: "YOUR_PHOTOGRAPHY_GITHUB_LINK"

    },
    passwordValidator: {

        title: "Password Strength Validator",

        overview: "A security-focused web application that evaluates password strength based on multiple security criteria and provides instant feedback to encourage stronger password creation.",

        problem: "Weak passwords remain one of the leading causes of unauthorized account access and cybersecurity breaches.",

        solution: "Developed an interactive password validation tool that analyzes password characteristics such as length, complexity, and character diversity while providing real-time strength feedback.",

        features: [
            "Real-Time Password Analysis",
            "Strength Indicator",
            "Security Rule Validation",
            "Instant Feedback",
            "Interactive User Interface"
        ],

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        workflow: [
            "Password Input",
            "Rule Validation",
            "Strength Analysis",
            "Feedback Generation",
            "Result Display"
        ],

        outcome: "Successfully developed a password validation tool that promotes secure password creation by providing immediate strength analysis and actionable feedback.",

        learnings: [
            "Frontend Development",
            "JavaScript Logic",
            "Cybersecurity Fundamentals",
            "Form Validation",
            "User Experience Design"
        ],

        github: "YOUR_PASSWORD_VALIDATOR_GITHUB_LINK"

    },

};

function openProject(project) {

    const p = projects[project];

    document.getElementById("modalContent").innerHTML = `

        <h2>${p.title}</h2>

        <div class="modal-section">
            <h3>📖 Overview</h3>
            <p>${p.overview}</p>
        </div>

        <div class="modal-section">
            <h3>🎯 Problem Statement</h3>
            <p>${p.problem}</p>
        </div>

        <div class="modal-section">
            <h3>💡 Solution</h3>
            <p>${p.solution}</p>
        </div>

        <div class="modal-section">
            <h3>✨ Key Features</h3>
            <ul>
                ${p.features.map(feature => `<li>${feature}</li>`).join("")}
            </ul>
        </div>

        <div class="modal-section">
            <h3>🛠 Technologies Used</h3>
            <p>${p.technologies.join(" • ")}</p>
        </div>

        <div class="modal-section">
            <h3>⚙ Workflow</h3>
            <ul>
                ${p.workflow.map(step => `<li>${step}</li>`).join("")}
            </ul>
        </div>

        <div class="modal-section">
            <h3>🎯 Project Outcome</h3>
            <p>${p.outcome}</p>
        </div>

        <div class="modal-section">
            <h3>📚 Key Learnings</h3>
            <ul>
                ${p.learnings.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>

        <div class="modal-section">
            <a class="project-link"
               href="${p.github}"
               target="_blank">

                <i class="fab fa-github"></i>
                Project Link

            </a>
        </div>

    `;

    document
        .getElementById("projectModal")
        .classList
        .add("active");

}

function closeProject() {

    document
        .getElementById("projectModal")
        .classList
        .remove("active");

}

window.onclick = function (e) {

    const modal = document.getElementById("projectModal");

    if (e.target === modal) {

        closeProject();

    }

}

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeProject();

    }

});
