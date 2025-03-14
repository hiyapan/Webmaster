// About us page
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting){
        entry.target.classList.add('show');
        entry.target.classList.add('show-img');
        entry.target.classList.add('show-abtimg');
      } else{
        entry.target.classList.remove('show');
        entry.target.classList.remove('show-img');
        entry.target.classList.remove('show-abtimg');
      }
    })
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  const hiddenElementsImg = document.querySelectorAll('.hidden-img');
  const hiddenElementsAbtImg = document.querySelectorAll('.hidden-abtimg');
  hiddenElements.forEach((el) => observer.observe(el));
  hiddenElementsImg.forEach((el) => observer.observe(el));
  hiddenElementsAbtImg.forEach((el) => observer.observe(el));


//FAQ JS
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const toggleSign = this.querySelector('.toggle-sign');

      // If the clicked answer is already open, close it.
      if (answer.classList.contains('open')) {
        answer.classList.remove('open');
        toggleSign.textContent = '+';
      } else {
        // Close any open answers from other FAQ items.
        faqQuestions.forEach(function(otherQuestion) {
          if (otherQuestion !== question) {
            const otherAnswer = otherQuestion.nextElementSibling;
            if (otherAnswer.classList.contains('open')) {
              otherAnswer.classList.remove('open');
              const otherToggleSign = otherQuestion.querySelector('.toggle-sign');
              otherToggleSign.textContent = '+';
            }
          }
        });
        // Open the clicked answer.
        answer.classList.add('open');
        toggleSign.textContent = '−';
      }
    });
  });
});