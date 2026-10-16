const repositoryList = document.querySelector("#repository-list");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  if (!Array.isArray(repositories) || repositories.length === 0) {
    const message = document.createElement("li");
    message.className = "list-message";
    message.textContent = "No starred repositories yet.";
    repositoryList.append(message);
    return;
  }

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository";

    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const description = document.createElement("p");
    description.textContent = repository.description;

    const date = document.createElement("time");
    date.dateTime = repository.starredAt;
    date.textContent = `Starred ${new Date(`${repository.starredAt}T00:00:00`).toLocaleDateString()}`;

    item.append(link, description, date);
    repositoryList.append(item);
  }
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    const message = document.createElement("li");
    message.className = "list-message";
    message.textContent = "Repositories couldn't be loaded. Please try again later.";
    repositoryList.replaceChildren(message);
    console.error("Failed to load starred repositories:", error);
  }
}

loadRepositories();
