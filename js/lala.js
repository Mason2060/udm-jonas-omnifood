console.log("Hello");

const myName = "Booga Booga";
// console.log(myName);

const h1 = document.querySelector(".heading-primary");
// console.log(h1);

h1.addEventListener("click", restyleH1);

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.color = "yellow";
//   h1.style.backgroundColor = "lightgreen";
//   h1.style.padding = "6.4rem";
// });

function restyleH1() {
  h1.textContent = myName;
  h1.style.color = "yellow";
  h1.style.backgroundColor = "lightgreen";
  h1.style.padding = "6.4rem";
}

//////////////////////////////////////////////////
// Set currnt year in footer copyright
const myEL = document.querySelector(".logo-year");
const currentYear = new Date().getFullYear();
myEL.textContent = currentYear;

//////////////////////////////////////////////////
// Toggle mobile navigation menu

const btnNavMenuEl = document.querySelector(".btn-mobile-nav__menu");
const btnNavCloseEl = document.querySelector(".btn-mobile-nav__close");
const headerEl = document.querySelector(".shared-header");

btnNavMenuEl.addEventListener("click", function () {
  headerEl.classList.add("nav-open");
});

btnNavCloseEl.addEventListener("click", function () {
  headerEl.classList.remove("nav-open");
});

//////////////////////////////////////////////////
// Smooth scroll using JS
// The html { scroll-behavior: smooth; } works on all
// browsers from 2023 onwards.
// But older versions of Safari dont support it
// Also nice to see how JS controls scrolling

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (myEvent) {
    const hlink = link.getAttribute("href");

    // Only prevent default and scroll IF it's an internal link (starts with #)
    if (hlink && hlink.startsWith("#")) {
      // Step-1 : Shutdown the default behaviour FOR INTERNAL LINKS ONLY
      myEvent.preventDefault();

      // Step-3A : Scroll to top
      if (hlink === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      // Step-3B : Scroll to other sections
      else {
        // hlink starts with # but isn't just #
        const scrollToSectionEl = document.querySelector(hlink);
        // Check if the element exists before trying to scroll to it
        if (scrollToSectionEl) {
          scrollToSectionEl.scrollIntoView({ behavior: "smooth" });
        } else {
          console.warn("Smooth scroll target not found:", hlink);
        }
      }
    } // END of: if (hlink && hlink.startsWith("#"))

    // Step-4 : Closing the mobile-phone menu (runs regardless of link type)
    // This can stay outside the 'if' because we want the menu to close
    // even if we navigate away or click an external link from the menu.
    if (
      link.classList.contains("nav-item") &&
      headerEl.classList.contains("nav-open")
    ) {
      headerEl.classList.remove("nav-open");
    }
  }); // End of :  link.addEventListener
}); // End of allLinks.forEach

//////////////////////////////////////////////////////////////////////
// Listening to scroll condition to trigger adding a class to element
// In this case we add a class "sticky-nav" that displays the nav bar
// only after the hero section is scrolled out of the viewport.

const bodyEl = document.querySelector("body");
const heroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0]; //We use the 1st entry of the entries array
    // console.log(ent);
    if (ent.isIntersecting) {
      bodyEl.classList.remove("sticky-nav");
    } else {
      bodyEl.classList.add("sticky-nav");
    }
  },
  // Ths is the options object
  {
    root: null, //The root reference element, wgen null then defaults to viewport
    rootMargin: "-80px", // A bias/buffer from the root location (needed to fine tune trigger)
    threshold: 0, // The condition we wait for is 0% of the observed element is displayed in viewport
  }
);
obs.observe(heroEl); //Now using the obs object we observe the hero section element
