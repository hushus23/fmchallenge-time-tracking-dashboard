const buttons = document.querySelectorAll('#categoryButtons li');
  let activityData = [];

  // Map titles to lowercase IDs
  const activityMap = {
    "Work": "work",
    "Play": "play",
    "Study": "study",
    "Exercise": "exercise",
    "Social": "social",
    "Self Care": "self-care"
  };

  // Fetch data once
  async function loadData() {
    try {
      const response = await fetch('data.json');
      activityData = await response.json();
      updateUI('weekly'); // Default view
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  // Update UI based on selected timeframe
  function updateUI(timeframe) {
    activityData.forEach(activity => {
      const id = activityMap[activity.title];
      const currentEl = document.getElementById(`${id}-current`);
      const previousEl = document.getElementById(`${id}-previous`);

      if (currentEl && previousEl) {
        currentEl.textContent = `${activity.timeframes[timeframe].current}hrs`;
        previousEl.textContent = `Last Week - ${activity.timeframes[timeframe].previous}hrs`;
      }
    });
  }

  // Handle button clicks
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const timeframe = button.dataset.category;

      // Highlight active button
      buttons.forEach(btn => btn.classList.remove('font-bold'));
      button.classList.add('font-bold');

      updateUI(timeframe);
    });
  });

  // Load data on page load
  window.addEventListener('DOMContentLoaded', loadData);