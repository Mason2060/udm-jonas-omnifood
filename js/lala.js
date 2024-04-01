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
    // every 'click' will send an event to the function as an argument

    // Step-1 : Shutdown the default behaviour
    //          Now, when you click nothing happens.
    myEvent.preventDefault();

    // Step-2 : Get the value of the hyper link the curent
    //          element is pointing to as the scroll target.
    const hlink = link.getAttribute("href");

    // Step-3A : Special case where we want to scroll to
    //           the top of the page.
    if (hlink === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Step-3B : Taking care of scrolling for all other
    // non "#" links.

    if (hlink !== "#" && hlink.startsWith("#")) {
      const scrollToSectionEl = document.querySelector(hlink);
      scrollToSectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Step-4 : Closing the mobile-phone menu when scrolling
    //          In case the link we found is "nav-item" then we
    //          close the mobile-phone-menu (remove the nav-open)
    //          class from <header class="shared-header nav-open">
    if (link.classList.contains("nav-item")) {
      headerEl.classList.remove("nav-open");
    }
  }); // End of :  link.addEventListener

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
}); // End of allLinks.forEach
