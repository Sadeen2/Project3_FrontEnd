fetch('./data/aboutMeData.json')
  .then(response => response.json())
  .then(data => {
    const aboutMeContainer = document.getElementById('aboutMe');

    // Bio
    const bioParagraph = document.createElement('p');
    bioParagraph.textContent = data.aboutMe;
    aboutMeContainer.appendChild(bioParagraph);
    aboutMeContainer.classList.add('fade-in');

    // Headshot
    const headshotDiv = document.createElement('div');
    headshotDiv.classList.add('headshotContainer');

    const img = document.createElement('img');
    img.src = data.headshot;
    img.alt = 'Headshot';

    headshotDiv.appendChild(img);
    aboutMeContainer.appendChild(headshotDiv);
  })
  .catch(error => console.error('Error loading About Me data:', error));

// Load Projects Data
fetch('./data/projectsData.json')
  .then(response => response.json())
  .then(data => {
    const projectList = document.getElementById('projectList');
    const projectSpotlight = document.getElementById('projectSpotlight');
    const spotlightTitles = document.getElementById('spotlightTitles');

    data.forEach((project, index) => {
      // Create project card
      const card = document.createElement('div');
      card.className = 'projectCard';
      card.id = project.project_id;
      card.style.backgroundImage = `url(${project.card_image})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';

      const name = document.createElement('h3');
      name.textContent = project.project_name;

      const shortDesc = document.createElement('p');
      shortDesc.textContent = project.short_description;

      card.appendChild(name);
      card.appendChild(shortDesc);
      projectList.appendChild(card);

      // Set default spotlight (first project)
      if (index === 0) {
        projectSpotlight.style.backgroundImage = `url(${project.spotlight_image || project.card_image})`;
        spotlightTitles.innerHTML = `
          <h3>${project.project_name}</h3>
          <p>${project.long_description || project.short_description}</p>
          <a href="${project.url}" target="_blank">View Project</a>
        `;
      }

      // Add event listener for spotlight update
      card.addEventListener('click', () => {
        projectSpotlight.style.backgroundImage = `url(${project.spotlight_image || project.card_image})`;
        spotlightTitles.innerHTML = `
          <h3>${project.project_name}</h3>
          <p>${project.long_description || project.short_description}</p>
          <a href="${project.url}" target="_blank">View Project</a>
        `;
      });
    });
  })
  .catch(error => {
    console.error('Error loading project data:', error);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('projectList');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
  
    // Detect screen width for mobile vs desktop behavior
    const isMobile = window.innerWidth < 768;
  
    leftArrow.addEventListener('click', () => {
      if (isMobile) {
        projectList.scrollBy({ left: -200, behavior: 'smooth' });
      } else {
        projectList.scrollBy({ top: -200, behavior: 'smooth' });
      }
    });
  
    rightArrow.addEventListener('click', () => {
      if (isMobile) {
        projectList.scrollBy({ left: 200, behavior: 'smooth' });
      } else {
        projectList.scrollBy({ top: 200, behavior: 'smooth' });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formSection');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const charactersLeft = document.getElementById('charactersLeft');
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidCharRegex = /[^a-zA-Z0-9@._-]/;
  
    // Update character count while typing
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charactersLeft.textContent = `Characters: ${length}/300`;
  
      if (length > 300) {
        messageError.textContent = 'Message must not exceed 300 characters.';
      } else {
        messageError.textContent = '';
      }
    });
  
    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent page reload
  
      let isValid = true;
      emailError.textContent = '';
      messageError.textContent = '';
  
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
  
      // Validate email format
      if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }
  
      // Check for invalid characters
      if (invalidCharRegex.test(email)) {
        emailError.textContent += ' Email contains invalid characters.';
        isValid = false;
      }
  
      if (message.length === 0) {
        messageError.textContent = 'Message cannot be empty.';
        isValid = false;
      } else if (message.length > 300) {
        messageError.textContent = 'Message must be less than 300 characters.';
        isValid = false;
      }
  
      if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
        charactersLeft.textContent = 'Characters: 0/300';
      }
    });
  });
  
  
