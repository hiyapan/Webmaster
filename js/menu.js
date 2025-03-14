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
    const mealSelect = document.getElementById("meal");
    const optionsContainer = document.getElementById("options-container");
    const totalPriceSpan = document.getElementById("total-price");

    const mealOptions = {
        "hummus": {
            title: "Choose Your Bread",
            options: [
                { name: "Pita", price: 2 },
                { name: "Lavash", price: 2.5 },
                { name: "Gluten-Free Crackers", price: 3 }
            ]
        },
        "rice-paper-rolls": {
            title: "Choose Your Fillings",
            options: [
                { name: "Mango & Avocado", price: 2 },
                { name: "Tofu & Vermicelli", price: 2.5 },
                { name: "Spicy Jackfruit", price: 3 }
            ]
        },
        "thai-salad": {
            title: "Choose Your Mix-Ins",
            options: [
                { name: "Peanuts", price: 1 },
                { name: "Sesame Seeds", price: 1 },
                { name: "Chili Flakes", price: 0.5 }
            ]
        },
        "earth-bowl": {
            title: "Choose Your Toppings",
            options: [
                { name: "Roasted Chickpeas", price: 1.5 },
                { name: "Grilled Halloumi", price: 3 },
                { name: "Pickled Beets", price: 2 }
            ]
        }
    };

    function updateOptions() {
        const selectedMeal = mealSelect.value;
        optionsContainer.innerHTML = ""; // Clear previous options

        if (mealOptions[selectedMeal]) {
            const mealData = mealOptions[selectedMeal];

            const heading = document.createElement("h3");
            heading.textContent = mealData.title;
            optionsContainer.appendChild(heading);

            mealData.options.forEach(option => {
                const label = document.createElement("label");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = option.name;
                checkbox.dataset.price = option.price;

                label.appendChild(checkbox);
                label.append(` ${option.name} (+$${option.price.toFixed(2)})`);
                optionsContainer.appendChild(label);
                optionsContainer.appendChild(document.createElement("br"));
            });
        }
        updateTotal();
    }

    function updateTotal() {
        let total = parseFloat(mealSelect.options[mealSelect.selectedIndex].getAttribute("data-price")) || 0;

        document.querySelectorAll("#options-container input:checked").forEach(checkbox => {
            total += parseFloat(checkbox.dataset.price) || 0;
        });

        totalPriceSpan.textContent = `$${total.toFixed(2)}`;
    }

    mealSelect.addEventListener("change", updateOptions);
    optionsContainer.addEventListener("change", updateTotal);
});