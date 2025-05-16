// Load About Me Data
async function loadAboutMe() {
  try {
    const response = await fetch('./data/aboutMeData.json');
    const data = await response.json();

    const aboutMeContainer = document.getElementById('aboutMe');
    const fragment = document.createDocumentFragment();

    // Bio
    const bioParagraph = document.createElement('p');
    bioParagraph.textContent = data.aboutMe || "No biography available";
    fragment.appendChild(bioParagraph);

    // Headshot
    const headshotDiv = document.createElement('div');
    headshotDiv.classList.add('headshotContainer');

    const img = document.createElement('img');
    img.src = data.headshot || './images/default-headshot.jpg';  // fallback image
    img.alt = 'Headshot';
    headshotDiv.appendChild(img);

    fragment.appendChild(headshotDiv);
    aboutMeContainer.appendChild(fragment);
    aboutMeContainer.classList.add('fade-in');
  } catch (error) {
    console.error('Error loading About Me data:', error);
  }
}

// Load Projects Data
async function loadProjects() {
  try {
    const response = await fetch('./data/projectsData.json');
    const data = await response.json();

    const projectList = document.getElementById('projectList');
    const projectSpotlight = document.getElementById('projectSpotlight');
    const spotlightTitles = document.getElementById('spotlightTitles');
    const fragment = document.createDocumentFragment();

    data.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'projectCard';
      card.id = project.project_id;
      card.style.backgroundImage = `url(${project.card_image || './images/default-card.jpg'})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';

      const name = document.createElement('h3');
      name.textContent = project.project_name || 'Untitled Project';

      const shortDesc = document.createElement('p');
      shortDesc.textContent = project.short_description || 'No description available.';

      card.appendChild(name);
      card.appendChild(shortDesc);
      fragment.appendChild(card);

      // Default spotlight
      if (index === 0) {
        updateSpotlight(project);
      }

      // Click to update spotlight
      card.addEventListener('click', () => updateSpotlight(project));
    });

    projectList.appendChild(fragment);
  } catch (error) {
    console.error('Error loading project data:', error);
  }
}

// Spotlight update function using DOM methods (no innerHTML)
function updateSpotlight(project) {
  const projectSpotlight = document.getElementById('projectSpotlight');
  const spotlightTitles = document.getElementById('spotlightTitles');

  projectSpotlight.style.backgroundImage = `url(${project.spotlight_image || project.card_image || './images/default-card.jpg'})`;

  // Clear and rebuild content
  while (spotlightTitles.firstChild) {
    spotlightTitles.removeChild(spotlightTitles.firstChild);
  }

  const title = document.createElement('h3');
  title.textContent = project.project_name || 'Untitled Project';

  const description = document.createElement('p');
  description.textContent = project.long_description || project.short_description || 'No details available.';

  const link = document.createElement('a');
  link.href = project.url || '#';
  link.textContent = 'View Project';
  link.target = '_blank';

  spotlightTitles.appendChild(title);
  spotlightTitles.appendChild(description);
  spotlightTitles.appendChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
  loadAboutMe();
  loadProjects().then(() => {
    const projectList = document.getElementById('projectList');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');

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
});
