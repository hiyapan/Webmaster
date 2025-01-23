//disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            event.preventDefault();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting){
        entry.target.classList.add('show');
      } else{
        entry.target.classList.remove('show');
      }
    })
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

 //Review JS

//Runs when page is loaded
document.addEventListener('DOMContentLoaded', () => {
    let typeRating = [];
    //Responding to rating checkboxes changing
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const rating = parseInt(event.target.value);
            if (event.target.checked) {
                if (!typeRating.includes(rating)) {
                    typeRating.push(rating);
                }
            } else {
                typeRating = typeRating.filter(item => item !== rating);
            }
            renderReviews();
        });
    });

    //Responding to data filter being selected
    let selectedDateOrder = 'all';
    document.getElementById('dateFilters').addEventListener('change', (event) => {
        selectedDateOrder = event.target.value;
        renderReviews();
    });
    //Initial reviews from Amazon
    const reviews = [
        {
            name: "Savannah Hadley",
            username: "@savvyhads",
            profileImg: "images/profileImage.jpg",
            rating: 5,
            date: "Reviewed in the United States on August 4, 2024",
            restaurant: "New York City",
            comment: "I celebrated my birthday with my girls here, and it was such a great experience! The atmosphere was stylish and cozy, and the menu had so many delicious options to choose from. We ended up sharing a few dishes, and everything was packed with flavor. The cocktails were on point too—definitely a highlight of the night. 🍸 <br> <br> Our server was friendly and made sure we had everything we needed, which made the whole evening feel extra special. The dessert (the chocolate cake, especially!) was the perfect way to end the meal. If you're looking for a great spot to celebrate with friends, I highly recommend this place!"
        },
        {
            name: "	Yolanda R",
            username: "@yol_r",
            profileImg: "images/profileImage.jpg",
            rating: 5,
            date: "Reviewed in the United States on August 12, 2024",
            restaurant: "Las Vegas",
            comment: "My boyfriend and I visited for a special date night, and we were so impressed! From the moment we walked in, the ambiance was so like calm and jazzy. The food was incredible—each dish was so gorgeous and I just went vegan and this food made me genuinely happy about it. We both had a buddha bowl, and it was honestly one of the best buddha bowls I’ve ever had."
        },
        {
            name: "satisfied customer",
            username: "@...",
            profileImg: "images/profileImage.jpg",
            rating: 5,
            date: "Reviewed in the United States on August 21, 2024",
            restaurant: "Seattle",
            comment: "Had an incredible dinner with friends! The food was fantastic, the service was excellent, and the vibe was perfect for a fun night out. Highly recommend!"
        },
        {
            name: "Lacie K",
            username: "@loopsandlaces",
            profileImg: "images/profileImage.jpg",
            rating: 3,
            date: "Reviewed in the United States on September 12, 2024",
            restaurant: "San Francisco",
            comment: "I’ve heard a lot of hype about Mosaic, so I had high expectations. The food was good, but it didn’t blow me away like I was hoping. I had the parfait, and while it was decent, it wasn’t as flavorful as I expected. The service was fine, but it felt like we had to wait a little longer than usual for our drinks. Overall, not a bad experience. Would give it another try."
        }
    ];

    //Amount of Ratings Submitted
    function calculateTotalRatingCount() {
        const ratings = countRatings();
        let totalRatings = 0;
        for (let rating in ratings) {
            totalRatings += ratings[rating];
        }
        return totalRatings;
    }

    //Average Rating across all submitted ratings
    function calculateAverageRating() {
        const totalRatings = calculateTotalRatingCount();
        const totalRatingSum = reviews.reduce((sum, review) => {
            return review.rating !== 0 ? sum + review.rating : sum;
        }, 0);
        const averageRating = totalRatings > 0 ? (totalRatingSum / totalRatings).toFixed(1) : 0;
        return averageRating;
    }
    //Dictionary of total ratings per rating type (1-5)
    function countRatings() {
        const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(review => {
            if (review.rating !== 0) {
                ratingCount[review.rating]++;
            }
        });
        return ratingCount;
    }
    //Calculates Percentage of Each rating type submitted
    function calculatePercentage() {
        const percentages = {};
        const total = calculateTotalRatingCount();
        const ratings = countRatings();
        for (let i = 1; i <= 5; i++) {
            if (ratings[i] > 0 && total > 0) {
                percentages[i] = parseFloat((100 * (ratings[i] / total)).toFixed(0));
            } else {
                percentages[i] = 0;
            }
        }
        return percentages;
    }
    //Updating webpage with average rating
    function updateAverageRating() {
        const averageRating = calculateAverageRating();
        const averageRatingElement = document.getElementById('average-rating');
        averageRatingElement.textContent = `${averageRating} out of 5!`;
    }

    //Updating webpage with percentages
    function updatePercentageSummary() {
        const percentageCounts = calculatePercentage();
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`count-${i}`).textContent = percentageCounts[i] + "%";
        }
    }

    /** 
     * Function is called green bars because 
     * the rating bars were initially created to 
     * be green for the percentage of rating type 
     * and red for the remaining portion of the bar. 
     * **/
    //Updates the bar to be yellow as corresponding to rating type currency
    function updateGreenBars() {
        const percentages = calculatePercentage();
        for (let i = 1; i <= 5; i++) {
            const percentBar = document.getElementById(`PercentBar${i}`);
            const percent = percentages[i];
            const redPercent = 100 - percent;

            if (percentBar) {
                percentBar.style.width = '100%';
                percentBar.innerHTML = `<div class="green-bar" style="width: ${percent}%;"></div><div class="red-bar" style="width: ${redPercent}%;"></div>`;
            }
        }
    }
    //renders reviews: chooses reviews that correspond to chosen checkboxes, filters reviews for the filter chosen, calls the update functions to update values on the webpage
    function renderReviews() {
        const reviewContainer = document.getElementById('review-box-container');
        reviewContainer.innerHTML = '';
        const reversedReviews = [...reviews].reverse();
        let filteredReviews = reversedReviews.filter(review => {
            return typeRating.length == 0 || typeRating.includes(review.rating);
        });
        let sortedReviews = [...filteredReviews];
        if (selectedDateOrder !== 'all') {
            sortedReviews = sortedReviews.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (selectedDateOrder === "Oldest to Newest") {
                    return dateA - dateB;
                } else if (selectedDateOrder === "Newest to Oldest") {
                    return dateB - dateA;
                }
                return 0;
            });
        }

        sortedReviews.forEach(review => {
            reviewContainer.innerHTML += createReviewHTML(review);
        });

        updateAverageRating();
        updatePercentageSummary();
        updateGreenBars();
    }
    //Function that creates a new review
    function createReviewHTML(review) {
        return `
            <div class="review-box">
                <div class="box-top">
                    <div class="profile">
                        <div class="profile-img">
                            <img src="${review.profileImg}" alt="${review.name}">
                        </div>
                        <div class="name-user">
                            <strong>${review.name}</strong>
                            <span>${review.username}</span>
                        </div>
                        <div class="review">
                            ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
                        </div>
                    </div>
                </div>
                <div class="bottom-box">
                    <div class="client-details">
                        <span>${review.date}</span>
                        <span>Restaurant: ${review.restaurant}</span>
                    </div>
                    <div>
                        <p>${review.comment}</p>
                    </div>
                </div>
            </div>
        `;
    }

    //Re rendering reviews 
    renderReviews();

    //Drawing the stars in each review as it corresponds to userRating
    const stars = document.querySelectorAll("#star-rating .star");
    stars.forEach(star => {
        //makes each star in form clickable and calculates userRating from whether the user clicked the star or not
        star.addEventListener('click', function () {
            userRating = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => s.innerHTML = "&#9734;");
            for (let i = 0; i < userRating; i++) {
                stars[i].innerHTML = "&#9733;";
            }
        });
    });

    //when the user submits a review
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (userRating === 0) {
            //Prevents an incomplete review from being submitted
            return;
        }
        //creating a new review and pushing it
        const userFullName = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const rating = userRating;
        const restaurant = document.getElementById('restaurant').value;
        const comment = document.getElementById('comment').value;
        const date = `Reviewed in the United States on ${new Date().toLocaleDateString()}`;

        const newReview = {
            name: userFullName,
            username: "@" + username,
            profileImg: "images/profileImage.jpg",
            rating,
            date,
            restaurant,
            comment
        };

        reviews.push(newReview);
        //Rerender and reset
        renderReviews();
        reviewForm.reset();
        stars.forEach(s => s.innerHTML = '&#9734;');
        userRating = 0;
    });
});

//Opening and Closing the popup when certain things are pressed
const reviewPopUp = document.getElementById('reviewPopUp');
const closePopup = document.getElementById('x-out');
const submitReview = document.getElementById("submitButton");
const openThePopup = document.getElementById("openForm");

function openReviewPopup() {
    reviewPopUp.style.display = 'block';

}

function closeReviewPopUp() {
    reviewPopUp.style.display = 'none';
}

closeReviewPopUp();
openThePopup.addEventListener('click', openReviewPopup);
closePopup.addEventListener('click', closeReviewPopUp);
submitReview.addEventListener('click', closeReviewPopUp);

/** Reservations JavaScript**/
const form = document.getElementById("form-text");
const bookBtn = document.getElementById("book-btn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");

bookBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    
    let isValid = true;

    // Check if all required fields are filled out
    const requiredFields = form.querySelectorAll("[required]");
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.border = "2px solid red"; // Highlight invalid fields
        } else {
            field.style.border = ""; // Reset the border if valid
        }
    });

    // Check if email is valid
    const emailField = form.querySelector("#inputEmail4");
    if (emailField && !emailField.value.includes('@')) {
        isValid = false;
        emailField.style.border = "2px solid red";
    }

    // Check if party size is within valid range
    const partySizeField = form.querySelector("#inputParty");
    const partySizeValue = parseInt(partySizeField.value);
    if (partySizeField && (partySizeValue < 1 || partySizeValue > 10)) {
        isValid = false;
        partySizeField.style.border = "2px solid red";
    }

    // If form is valid, show pop-up and reset form
    if (isValid) {
        popup.style.display = "block";
        form.reset(); // Reset the form fields
    } else {
        // Optionally, show an alert or feedback for invalid fields
        alert("Please fill out all required fields correctly.");
    }
});

// Close the pop-up when the "X" button is clicked
closeBtn.addEventListener("click", function() {
    popup.style.display = "none"; // Hide the pop-up
});


