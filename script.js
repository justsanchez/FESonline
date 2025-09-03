//for loading spinner
window.addEventListener("load", () => {
  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.display = "none";
});

//
// pop up window
// const openModalButtons= document.querySelectorAll('[data-modal-target]');
// const closeModalButtons= document.querySelectorAll('[data-close-button]');
// const overlay= document.getElementById('overlay');
//
// openModalButtons.forEach(button =>{
//   button.addEventListener('click', () => {
//     const modal = document.querySelector(button.dataset.modalTarget)
//     openModal(modal)
//   })
// })
//
// overlay.addEventListener('click', () => {
//   const modals= document.querySelectorAll('.modal.active')
//   modals.forEach(modal =>{
//     closeModal(modal)
//   })
// })
//
//
// closeModalButtons.forEach(button =>{
//   button.addEventListener('click', () => {
//     const modal = button.closest('.modal')
//     closeModal(modal)
//   })
// })
//
// function openModal(modal){
//   if (modal==null) return
//   modal.classList.add('active')
//   overlay.classList.add('active')
// }
//
// function closeModal(modal){
//   if (modal==null) return
//   modal.classList.remove('active')
//   overlay.classList.remove('active')
// }

// //popup window attempt two
//
// $('#edit').on('click', function(){
//   $('body').addClass('active-modal');
//   $('.box-modal').addClass('modal-show');
// });
//
// $('.overlay').on('click', function(){
//   $('body').removeClass('active-modal');
//   $('.box-modal').removeClass('modal-show');
// })
//
//

// Select all elements with class 'eventBox'
const eventBoxes = document.querySelectorAll(".eventBox");


// checking if all events passed

allEventsCounter = 0;
eventsPassedCounter = 0;
eventsPage = false;


// Helper function to format components with leading zeros
function formatToTwoDigits(number) {
  return number.toString().padStart(2, '0');
}

// Iterate through each eventBox
eventBoxes.forEach((eventBox) => {
  allEventsCounter++;
  const dateOfEvent = eventBox.querySelector(".date");
  let dateString = dateOfEvent.textContent.trim();


  // Assuming dateString is given in the format 'YYYY-M-D' or similar
  // Use regex to capture the components and reformat them as 'YYYY-MM-DD'

  // this is in case the developer forgets to add a leading zero in the 'YYYY-M-D' format. ex. 2024-9-2 ->  2024-09-02
  dateString = dateString.replace(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/, (_, year, month, day) => {
    return `${year}-${formatToTwoDigits(month)}-${formatToTwoDigits(day)}`;
  });

  // Get the ID of the eventBox
  const eventId = eventBox.id;


  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = String(todaysDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so we add 1
  const day = String(todaysDate.getDate()).padStart(2, "0");



  const todaysFormattedDate = `${year}-${month}-${day}`;
  


  if (dateString > todaysFormattedDate) {
    
  } else if (dateString < todaysFormattedDate) {
 
  
    const eventBoxContainer = document.getElementById(eventId);
    eventsPassedCounter++;
    eventBoxContainer.style.display="none";
  } else {

  }

  



 



});
eventPage = document.querySelector(".eventPage");


// checking if we were on the event page
if (eventPage!=null) {
  eventPageBool = eventPage.textContent.trim();
}




// 
if (allEventsCounter == eventsPassedCounter){
  const message = document.createElement("p");
  message.textContent = "All events have passed";
  message.style.padding = "200px";
  message.style.margin = "0 auto";
  // append it to the container class
  const container = document.querySelector(".container");

  
  // just make seperate file for events in the future (jovani task)
  if (eventPage!=null){
  if (eventPageBool=true){
    container.appendChild(message);
  }
}

}


//popup window attempt three
// Get all modal links
// Get all modal links
const modalLinks = document.querySelectorAll(".button");


const headerTag = document.querySelector('header');

modalLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = this.getAttribute("href").substring(1); // Remove the #
    const modal = document.getElementById(target);

    // calculate the width of the scrollbar by subtracting the client width from the inner width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // add padding to the body equal to the scrollbar width to prevent layout shift when scroll is disabled
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    // also apply the same padding to the header to keep it aligned with the rest of the page, as it'll shift if left alone 
    headerTag.style.paddingRight= `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden"; // Prevent scrolling
    
    modal.style.display = "block"; // Show modal
    
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
        
        // reset padding
        document.body.style.paddingRight = ""; 
        headerTag.style.paddingRight= ""; 
      }
    });

    const closeButton = modal.querySelector(".closemodal");
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Restore scrolling
      document.body.style.paddingRight = ""; 
      headerTag.style.paddingRight= ""; 
    });
  });
});


// Function to close the modal
function closeModal(modal) {
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    document.body.style.paddingRight = ""; 
    headerTag.style.paddingRight= ""; 
  };
};

// Keydown Event Listener
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modaloverlay[style*="display: block"]'); // Find open modal
    closeModal(openModal); // Close the found modal
  };
});

const navToggleCheckbox = document.querySelector(".nav-toggle");
const bodyElement = document.body;
let counter = 0
navToggleCheckbox.checked=false;

// Add event listener for clicks anywhere on the document
// handles when the menu is not being closed when clicked twice
document.addEventListener("click", function (event) {
  if (event.target === navToggleCheckbox) {
    counter++;
    if (counter > 1 ) {
      counter=0; // reseting the counter :|
      navToggleCheckbox.checked=false;
  }
}
})

// Add event listener for clicks anywhere on the document
document.addEventListener("click", function (event) {
  // Check if the clicked element is not the checkbox itself
  if (event.target !== navToggleCheckbox) {
    // Check if the clicked element is not within the body element (to handle potential modals/overlays)
    if (!event.target.isSameNode(bodyElement)) {
      // Uncheck the checkbox if it's checked
      if (!(navToggleCheckbox.checked)) {
        navToggleCheckbox.checked = false;
        counter = 0;
      }
      else{
        navToggleCheckbox.checked = false;
      }
    }
  }
});

// add a function that counts how many elements have the date class






// leave last, its prone to mess up some code

//scroll reveal
ScrollReveal().reveal(".card", { easing: "ease-in", duration: 500 }); // default was 1000ms