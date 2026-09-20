const list = document.querySelector('#repository-list');
const count = document.querySelector('#repository-count');

const formatStars = (stars) => new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
}).format(stars);

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  dateStyle: 'medium'
}).format(new Date(date));

const renderRepositories = (repositories) => {
  count.textContent = `${repositories.length} ${repositories.length === 1 ? 'repository' : 'repositories'}`;
  list.replaceChildren();

  repositories.forEach((repository) => {
    const article = document.createElement('article');
    article.className = 'repository';
    article.innerHTML = `
      <div>
        <h3><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.name}</a></h3>
        <p>${repository.description}</p>
        <div class="meta">
          <span>${repository.language}</span>
          <span>Updated ${formatDate(repository.updated)}</span>
        </div>
      </div>
      <span class="star-count" aria-label="${repository.stars} stars">★ ${formatStars(repository.stars)}</span>
    `;
    list.append(article);
  });
};

const showError = () => {
  list.innerHTML = '<p class="status">Could not load starred repositories. Please try again later.</p>';
};

fetch('events.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  })
  .then(renderRepositories)
  .catch(showError);
