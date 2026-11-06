const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      mobileMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}

// Keep the copyright year current.
document.querySelector("#year").textContent = new Date().getFullYear();

// Simple testimonial carousel.
const testimonials = [
  {
    quote: "“Working with Hamed was an absolute pleasure. He delivered a stunning website ahead of schedule and exceeded all expectations.”",
    name: "Sarah Johnson",
    role: "CEO, NovaTech",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "“Hamed understood our goals quickly and turned them into a clear, polished experience for our customers.”",
    name: "Alex Morgan",
    role: "Founder, BuildPro",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "“The final result feels thoughtful, fast and easy to use. Communication throughout the project was excellent.”",
    name: "Emily Carter",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
  }
];

let testimonialIndex = 0;
function showTestimonial(index) {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  const item = testimonials[testimonialIndex];
  document.querySelector("#testimonial-text").textContent = item.quote;
  document.querySelector("#testimonial-name").textContent = item.name;
  document.querySelector("#testimonial-role").textContent = item.role;
  document.querySelector("#testimonial-avatar").src = item.avatar;
}
document.querySelector("#testimonial-prev").addEventListener("click", () => showTestimonial(testimonialIndex - 1));
document.querySelector("#testimonial-next").addEventListener("click", () => showTestimonial(testimonialIndex + 1));
