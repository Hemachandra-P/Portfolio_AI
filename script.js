// This code was created by HEMACHANDRA.
// Unauthorized copying, distribution, or modification of this code, in whole or in part, is strictly prohibited without prior written permission.
// Please do not remove or alter the credit to the original creator. If you wish to use this code for personal or commercial purposes, kindly contact the creator for permissions.
// Thank you for respecting the work and effort that went into creating this code.

/* ==========================================================
   SOLAR SYSTEM BACKGROUND
   Stars + orbiting planets from the supplied demo.
   ========================================================== */
const canvas = document.getElementById('starCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let stars = [];
const STAR_COUNT = 220;

function resizeSolarBackground() {
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.55 + 0.25,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.05,
        driftY: (Math.random() - 0.5) * 0.05
    }));
}

function drawSolarStars() {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
        star.phase += star.twinkleSpeed;

        // Faster twinkling while keeping the clean, non-glowing star style.
        const twinkle = (Math.sin(star.phase) + 1) / 2;
        const alpha = star.baseAlpha + Math.sin(star.phase) * 0.38;

        star.x += star.driftX;
        star.y += star.driftY;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * (0.85 + twinkle * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.06, Math.min(1, alpha))})`;
        ctx.fill();
    }

    requestAnimationFrame(drawSolarStars);
}

const solarSystem = document.getElementById('solarSystem');

const planetsConfig = [
    // radius, size, duration, visual class
    [96,  16, 10, 'planet-mercury'],
    [150, 20, 17, 'planet-earth'],
    [210, 19, 25, 'planet-mars'],
    [275, 31, 36, 'planet-jupiter'],
    [350, 27, 49, 'planet-saturn']
];

if (solarSystem) {
    planetsConfig.forEach(([radius, size, duration, visualClass]) => {
        const orbit = document.createElement('div');
        orbit.className = 'solar-orbit';
        orbit.style.width = radius * 2 + 'px';
        orbit.style.height = radius * 2 + 'px';
        orbit.style.animationDuration = duration + 's';

        const delay = -Math.random() * duration;
        orbit.style.animationDelay = delay + 's';

        // Saturn gets a separate ring element so the ring is truly behind the planet.
        // Keeping it outside the planet's own stacking context prevents the ring from
        // appearing painted on top of the sphere.
        if (visualClass === 'planet-saturn') {
            const ring = document.createElement('div');
            ring.className = 'saturn-ring';
            ring.setAttribute('aria-hidden', 'true');
            orbit.appendChild(ring);
        }

        const planet = document.createElement('div');
        planet.className = `solar-planet ${visualClass}`;
        planet.style.width = size + 'px';
        planet.style.height = size + 'px';
        planet.style.animationDuration = duration + 's';
        planet.style.animationDelay = delay + 's';

        orbit.appendChild(planet);
        solarSystem.appendChild(orbit);
    });
}

window.addEventListener('resize', resizeSolarBackground);
resizeSolarBackground();
if (canvas && ctx) requestAnimationFrame(drawSolarStars);

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
    orvenChatbot: {

        title: "ORVEN AI Chatbot",

        overview: "A full-stack AI workspace built for intelligent conversations, research, coding, image generation, web exploration, memory, and everyday productivity.",

        problem: "AI tools are often fragmented across separate interfaces for chat, research, coding, image generation, and productivity. ORVEN brings these workflows together in one interactive workspace.",

        solution: "Developed a modern Next.js AI workspace powered by Cloudflare Workers AI, with tool-based workflows, web research, image generation, memory, usage tracking, voice input, and an interactive 3D robot experience.",

        features: [
            "General AI Conversations",
            "Web Search & Page Browsing",
            "AI Image Generation",
            "Image Understanding",
            "Code Generation & Review",
            "AI Memory",
            "Voice Input",
            "Interactive 3D Robot"
        ],

        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Cloudflare Workers AI",
            "Cloudflare KV",
            "Three.js",
            "OpenNext"
        ],

        workflow: [
            "User Prompt",
            "Intent & Tool Selection",
            "AI Model Processing",
            "Tool Execution",
            "Response Generation",
            "Memory & Usage Tracking"
        ],

        outcome: "Successfully built and deployed ORVEN AI as a full-stack AI workspace on Cloudflare Workers, integrating AI inference, tools, memory, usage limits, and an interactive user experience.",

        learnings: [
            "Full-Stack AI Development",
            "AI Agent Workflows",
            "Cloudflare Workers AI",
            "Next.js API Architecture",
            "Three.js Interaction",
            "Cloud Deployment"
        ],

        github: "https://github.com/Hemachandra-P/ORVEN-AI-CHATBOT",
        demo: "https://orven-ai.hemachandrajoy176.workers.dev"

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

        title: "AI-Powered Ganga Water Quality Assessment System",

        description: "An academic research project applying Machine Learning techniques to analyze Ganga River water quality parameters and support intelligent environmental monitoring through predictive analytics.",

        overview: "An academic research project focused on developing an AI-powered system for assessing Ganga River water quality using historical environmental datasets. The project investigates how machine learning can assist environmental monitoring by analyzing multiple water quality parameters and generating predictive insights.",

        problem: "Traditional water quality assessment relies on laboratory testing and manual analysis, making continuous environmental monitoring time-consuming and resource-intensive. This research explores how machine learning can assist in predicting water quality using historical environmental data.",

        solution: "Designed and developed a machine learning pipeline that preprocesses environmental datasets, performs feature engineering, trains predictive models, and generates water quality assessments to support environmental research and decision-making.",

        features: [
            "Academic Research Project",
            "Ganga River Water Quality Assessment",
            "Machine Learning Prediction",
            "Environmental Data Analysis",
            "Feature Engineering",
            "Predictive Analytics"
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
            "Historical Dataset Collection",
            "Data Preprocessing",
            "Exploratory Data Analysis",
            "Feature Engineering",
            "Model Training",
            "Model Evaluation",
            "Water Quality Prediction"
        ],

        outcome: "Successfully developed a machine learning-based environmental assessment system capable of analyzing historical Ganga River water quality data and generating predictive insights for academic research and environmental monitoring.",

        learnings: [
            "Environmental AI",
            "Machine Learning",
            "Predictive Analytics",
            "Feature Engineering",
            "Environmental Data Science",
            "Research Methodology"
        ],

        github: "YOUR_WATER_QUALITY_GITHUB_LINK"

    },
    healthDiagnosis: {

        title: "Web-Based Health Diagnosis System",

        description: "An academic research project investigating the application of Convolutional Neural Networks (CNN) and Machine Learning techniques for intelligent healthcare diagnosis through a web-based decision support system.",

        overview: "An academic research project exploring the application of Convolutional Neural Networks (CNN) and Machine Learning algorithms for intelligent healthcare diagnosis. The system integrates deep learning with a web-based platform to support preliminary disease prediction and demonstrate the potential of AI in healthcare decision support.",

        problem: "Early disease diagnosis is critical for effective treatment, but timely medical assessment is not always accessible. This research investigates how CNN-based deep learning models can assist in preliminary disease prediction using medical data within an intelligent web application.",

        solution: "Designed and developed a CNN-based healthcare diagnosis system by training deep learning and machine learning models on medical datasets and integrating them into a Django-based web application that provides preliminary diagnostic predictions through an intuitive user interface.",

        features: [
            "Academic Research Project",
            "CNN-Based Disease Prediction",
            "Machine Learning Classification",
            "Healthcare Decision Support",
            "Interactive Web Application",
            "Responsive User Interface"
        ],

        technologies: [
            "Python",
            "TensorFlow",
            "Keras",
            "CNN",
            "Scikit-learn",
            "Django",
            "HTML",
            "CSS",
            "JavaScript"
        ],

        workflow: [
            "Medical Dataset Collection",
            "Data Preprocessing",
            "Feature Engineering",
            "CNN Model Training",
            "Model Evaluation",
            "Disease Prediction",
            "Web Application Integration"
        ],

        outcome: "Successfully demonstrated how Convolutional Neural Networks (CNN) and Machine Learning techniques can be applied within an academic research project to support preliminary healthcare diagnosis through an integrated web-based application.",

        learnings: [
            "Deep Learning",
            "Convolutional Neural Networks",
            "Healthcare AI",
            "Machine Learning",
            "Model Training & Evaluation",
            "Research Methodology"
        ],

        github: "YOUR_HEALTHCARE_GITHUB_LINK"

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
    geniAIQA: {

        title: "ORVEN Geni AI QA System",

        overview: "An enterprise AI Quality Assurance platform designed to streamline AI governance, model evaluation, Retrieval-Augmented Generation (RAG), and intelligent document interactions through a secure and scalable architecture.",

        problem: "Organizations require a centralized platform to govern AI systems, evaluate model performance, manage AI assets, and securely interact with enterprise knowledge while ensuring responsible AI practices.",

        solution: "Developed a full-stack AI QA platform that integrates AI governance, document-based RAG, semantic search, AI model evaluation, analytics dashboards, and secure authentication into a unified enterprise solution.",

        features: [
            "AI Governance Dashboard",
            "AI Asset Management",
            "Document Upload & Knowledge Base",
            "RAG-Powered AI Chat",
            "AI Model Evaluation",
            "Analytics Dashboard",
            "JWT Authentication",
            "Semantic Search with pgvector",
            "RESTful API Integration"
        ],

        technologies: [
            "React",
            "Tailwind CSS",
            "FastAPI",
            "Python",
            "PostgreSQL",
            "pgvector",
            "OpenAI API",
            "Large Language Models (LLMs)",
            "Retrieval-Augmented Generation (RAG)",
            "SQLAlchemy",
            "JWT Authentication",
            "Render",
            "Vercel"
        ],

        workflow: [
            "User Authentication",
            "Document Upload",
            "Embedding Generation",
            "Vector Storage (pgvector)",
            "Semantic Retrieval",
            "AI Response Generation",
            "Model Evaluation",
            "Analytics & Governance"
        ],

        outcome: "Successfully built and deployed an enterprise AI Quality Assurance platform that combines AI governance, Retrieval-Augmented Generation (RAG), model evaluation, and analytics into a scalable cloud-based application.",

        learnings: [
            "Enterprise AI Architecture",
            "Retrieval-Augmented Generation (RAG)",
            "Vector Databases (pgvector)",
            "FastAPI Backend Development",
            "React & Tailwind CSS",
            "JWT Authentication",
            "Cloud Deployment",
            "AI Governance & Evaluation"
        ],

        github: "https://github.com/Hemachandra-P/ORVEN-platform"
    }

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
function openCertificate(file, title) {

    const viewer = document.getElementById("certificateViewer");

    document.getElementById("certificateTitle").textContent = title;

    viewer.innerHTML = "";

    if (file.toLowerCase().endsWith(".pdf")) {

        const iframe = document.createElement("iframe");

        iframe.src = file;
        iframe.title = title;

        iframe.style.width = "100%";
        iframe.style.height = "75vh";
        iframe.style.border = "none";
        iframe.style.borderRadius = "10px";
        iframe.style.background = "#ffffff";

        viewer.appendChild(iframe);

    } else {

        const img = document.createElement("img");

        img.src = file;
        img.alt = title;

        img.style.maxWidth = "100%";
        img.style.maxHeight = "75vh";
        img.style.width = "auto";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.margin = "0 auto";
        img.style.borderRadius = "10px";

        viewer.appendChild(img);
    }

    document.getElementById("certificateModal")
        .classList.add("active");
}

function closeCertificate() {

    document.getElementById("certificateModal")
        .classList.remove("active");

}

window.addEventListener("click", function (e) {

    const modal = document.getElementById("certificateModal");

    if (e.target === modal) {

        closeCertificate();

    }

});
/*==========================================
      PROJECT CARD SPOTLIGHT EFFECT
==========================================*/

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

    card.addEventListener("mouseleave", () => {

        card.style.setProperty("--x", "50%");
        card.style.setProperty("--y", "50%");

    });

});
