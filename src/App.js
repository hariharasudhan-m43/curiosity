import { useEffect } from "react";
import "./App.css";
import mobilescreen from "./assets/mobilescreen.png";
import logo3 from "./assets/logo3.png";
import { gsap } from "gsap";
import { useState } from "react"; 

function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
  


    function initScrollAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // GSAP fade & slide effect
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        });

        // Add "animate" class for CSS-based animations
        entry.target.classList.add("animate");

        // Stagger animation for feature cards
        if (entry.target.classList.contains("features-grid")) {
          const cards = entry.target.querySelectorAll(".feature-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate");
            }, index * 200);
          });
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Prepare elements for GSAP animation
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    gsap.set(el, { opacity: 0, y: 50 });
    observer.observe(el);
  });

  // Observe section titles and feature grid
  document.querySelectorAll(".section-title").forEach((title) => observer.observe(title));

  const featuresGrid = document.querySelector(".features-grid");
  if (featuresGrid) observer.observe(featuresGrid);

  // Remove AOS attributes (if present)
  document.querySelectorAll(".features [data-aos]").forEach((el) => el.removeAttribute("data-aos"));
  gsap.killTweensOf(".features .feature-card");
}


    function initParallax() {
      window.addEventListener("scroll", () => {
        // const scrolled = window.pageYOffset;
       // const hero = document.querySelector(".hero");
        //if (hero) hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      });
    }

    function initHeaderEffects() {
      let lastScrollTop = 0;
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
          header.style.background = "rgba(15, 15, 35, 0.98)";
          header.style.backdropFilter = "blur(20px)";
          header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
        } else {
          header.style.background = "rgba(15, 15, 35, 0.9)";
          header.style.backdropFilter = "blur(10px)";
          header.style.boxShadow = "none";
        }

        if (scrollTop > lastScrollTop && scrollTop > 300) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }
        lastScrollTop = scrollTop;
      });
    }

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
      navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
      if (navLinks.style.display === "flex") {
        navLinks.style.position = "absolute";
        navLinks.style.top = "100%";
        navLinks.style.right = "0";
        navLinks.style.backgroundColor = "rgba(15, 15, 35, 0.95)";
        navLinks.style.padding = "1rem";
        navLinks.style.borderRadius = "8px";
        navLinks.style.flexDirection = "column";
        navLinks.style.gap = "1rem";
        navLinks.style.minWidth = "150px";
        navLinks.style.backdropFilter = "blur(10px)";
        navLinks.style.border = "1px solid rgba(64, 224, 208, 0.3)";
        navLinks.style.animation = "slideUpFromBottom 0.3s ease-out";
      }
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    initScrollAnimations();
    initParallax();
    initHeaderEffects();

    return () => {
      window.removeEventListener("scroll", initParallax);
      window.removeEventListener("scroll", initHeaderEffects);
    };
  }, []);

  return (


    
    <div className="App">
      {/* HEADER */}
      <header>
        <nav className="container">
          <div className="logo">
            <img src={logo3} alt="logo" className="logo-img" />
          </div>
             <ul
            className="nav-links"
            style={{
              display: menuOpen ? "flex" : "",
              flexDirection: menuOpen ? "column" : "",
            }}>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#download">Download</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

  

              <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          ><span></span><span></span><span></span></div>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Master Engineering with Curiosity</h1>
              <p>Your ultimate companion for engineering study materials and important questions. Access comprehensive resources, practice papers, and exam preparation tools all in one place.</p>
              <div className="cta-buttons">
                <a href="#download" className="btn btn-primary">Download Now</a>
                <a href="#features" className="btn btn-secondary">Learn More</a>
              </div>
            </div>
            <div className="hero-image">
              <img src={mobilescreen} alt="CuriosityApp" className="hero-phone-img" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Powerful Features for Engineering Success</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-book" style={{ color: "#fff" }}></i></div>
              <h3>Comprehensive Study Materials</h3>
              <p>Access extensive notes, textbooks, and reference materials for all engineering branches. Curated content from top universities and expert faculty.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-file-circle-question" style={{ color: "#fff" }}></i></div>
              <h3>Important Questions Bank</h3>
              <p>Practice with carefully selected important questions from previous years' papers, university exams, and competitive tests to boost your preparation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-chart-line" style={{ color: "#fff" }}></i></div>
              <h3>Subject-wise Organization</h3>
              <p>Materials organized by engineering branches and subjects for easy navigation. Find exactly what you need when you need it.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-mobile-screen" style={{ color: "#fff" }}></i></div>
              <h3>Offline Access</h3>
              <p>Download materials for offline study. Access your resources anytime, anywhere, without internet connectivity constraints.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-magnifying-glass" style={{ color: "#fff" }}></i></div>
              <h3>Smart Search</h3>
              <p>Quickly find specific topics, questions, or concepts with our intelligent search feature. Save time and study more efficiently.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-file-arrow-down" style={{ color: "#fff" }}></i></div>
              <h3>Regular Updates</h3>
              <p>Stay current with the latest syllabus changes and exam patterns. New content and questions added regularly by our expert team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="download" id="download">
        <div className="container" >
          <h2 className="section-title">Get Curiosity Today</h2>
          <p style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "2rem" }}>
            Join thousands of students already using Curiosity.
          </p>
          <div className="download-buttons">
            <a href="https://play.google.com/store/apps/details?id=com.schrodingerlab.curiosity" className="store-btn">
              <i className="fa-brands fa-google-play" style={{ color: "#fff", fontSize: "1.5rem" }}></i>
              <div>Google Play</div>
            </a>
            <a href=" " className="store-btn">
              <i className="fa-brands fa-app-store" style={{ color: "#fff", fontSize: "1.5rem" }}></i>
              <div>App Store</div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Curiosity</h4>
              <p>Empowering engineering students with comprehensive study materials and resources for academic excellence.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#features">Features</a><br/>
              <a href="#download">Download</a><br/>
              <a href="https://sites.google.com/view/curiosity-privacy-policy/home">Privacy Policy</a>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
             <a href=" ">Help Center</a><br/>
            <a href="mailto:schrodingerlab1@gmail.com">Contact Us</a><br/>
            <a href=" ">Feedback</a>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <a href=" "><i className="fa-solid fa-envelope"  style={{ color: "#fff" }}></i> schrodingerlab1@gmail.com</a><br/>
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter" style={{ color: "#fff" }}></i>Twitter</a><br/>
              <a href="https://www.instagram.com/edu.curiocity?igsh=NTgyOGlibnEydTAz"><i class="fa-brands fa-instagram" style={{ color: "#fff" }}></i>Instagram</a>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(64,224,208,0.2)", paddingTop: "2rem", opacity: 0.8 }}>
            <p>&copy; 2025 Curiosity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
