document.querySelectorAll('.sidebar a').forEach(anchor => {
  anchor.addEventListener('click', function(event) {
      event.preventDefault();

      const sectionId = this.getAttribute('href').substring(1);
      const header = document.querySelector(`#${sectionId} h2`);

      if (header) {
          const headerOffset = 65; // Adjust based on layout
          const sectionPosition = header.offsetTop - headerOffset;

          smoothScrollTo(sectionPosition, 1000); // 1000ms = 1 second
      }
  });
});

// Custom smooth scroll function with controlled speed
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();

  function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Clamp progress between 0 and 1

      window.scrollTo(0, startY + difference * easeInOutQuad(progress));

      if (elapsed < duration) {
          requestAnimationFrame(step);
      }
  }

  function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(step);
}



const sections = document.querySelectorAll('section');
const sidebarLinks = document.querySelectorAll('.sidebar a');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      const sectionId = entry.target.id;
      const link = document.querySelector(`.sidebar a[href="#${sectionId}"]`);

      console.log(`Checking section: ${sectionId}, isIntersecting: ${entry.isIntersecting}`);

      if (entry.isIntersecting) {
          console.log(`Adding active class to: ${link}`);
          link.classList.add('active');
      } else {
          console.log(`Removing active class from: ${link}`);
          link.classList.remove('active');
      }
  });
}, {
  root: null,
  threshold: 0.5
});


sections.forEach(section => observer.observe(section));

//Build Your Own Meal
document.addEventListener("DOMContentLoaded", function () {
  const baseSelect = document.getElementById("base");
  const toppingCheckboxes = document.querySelectorAll(".checkbox-group input");
  const totalPriceDisplay = document.getElementById("total-price");
  
  function calculateTotal() {
      let total = 0;

      // Get base price
      total += parseFloat(baseSelect.options[baseSelect.selectedIndex].dataset.price);

      // Get toppings price
      toppingCheckboxes.forEach(topping => {
          if (topping.checked) {
              total += parseFloat(topping.dataset.price);
          }
      });

      // Update total price display
      totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
  }

  // Listen for changes
  baseSelect.addEventListener("change", calculateTotal);
  toppingCheckboxes.forEach(topping => topping.addEventListener("change", calculateTotal));

  // Initialize total price
  calculateTotal();
});
