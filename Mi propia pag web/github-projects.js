(() => {
  const USER = "valchuminodevop-cloud";
  const grid = document.getElementById("github-projects");
  if (!grid) return;

  // Repos que no querés mostrar (por nombre exacto)
  const HIDDEN = [];
  const HIDE_FORKS = true;
  const MAX_REPOS = 9;
  const MAX_TECHS = 6;

  const CACHE_KEY = "gh-repos-cache-v2";
  const CACHE_MINUTES = 10;

  const HEADERS = { Accept: "application/vnd.github+json" };

  // Colores que usa GitHub para cada lenguaje
  const LANG_COLORS = {
    HTML: "#e34c26",
    CSS: "#7b5cff",
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572a5",
    SQL: "#e38c00",
    Shell: "#89e051",
    PowerShell: "#3b93d6",
    Batchfile: "#c1f12e",
    Java: "#b07219",
    "C#": "#178600",
    PHP: "#4f5d95",
  };

  const esc = (text) =>
    String(text ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const prettyName = (name) => name.replace(/[-_]+/g, " ");

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("es-AR", {
      month: "short",
      year: "numeric",
    });

  // Lista de tecnologías: lenguajes detectados + topics del repo
  function getTechs(repo) {
    const languages = repo._languages && repo._languages.length
      ? repo._languages
      : repo.language ? [repo.language] : [];

    const fromLanguages = languages.map((name) => ({
      name,
      color: LANG_COLORS[name] || "#8b9bff",
    }));

    const fromTopics = (repo.topics || [])
      .filter((topic) =>
        !languages.some((l) => l.toLowerCase() === topic.toLowerCase())
      )
      .map((topic) => ({
        name: topic.replace(/-/g, " "),
        color: "#8b9bff",
      }));

    return [...fromLanguages, ...fromTopics].slice(0, MAX_TECHS);
  }

  function cardHTML(repo, index) {
    const number = String(index + 1).padStart(2, "0");

    const preview =
      `https://opengraph.githubassets.com/1/${USER}/${repo.name}`;

    const techs = getTechs(repo);

    const chips = techs
      .map((tech) =>
        `<span><i style="--dot:${tech.color}"></i>${esc(tech.name)}</span>`
      )
      .join("");

    const demo = repo.homepage
      ? `<a href="${esc(repo.homepage)}" target="_blank"
            rel="noopener noreferrer" class="project-link">
           Ver demo <span>↗</span></a>`
      : "";

    return `
      <article class="project-card glass-card">

        <div class="project-preview has-image">

          <img src="${preview}"
               alt="Vista previa del repositorio ${esc(repo.name)}"
               loading="lazy"
               onerror="this.style.display='none'">

          <span class="project-number">${number}</span>

          ${chips
            ? `<div class="preview-tech" aria-label="Tecnologías utilizadas">${chips}</div>`
            : ""}

        </div>

        <div class="project-content">

          <div class="project-meta">
            <span>${esc((repo.language || "PROYECTO").toUpperCase())}</span>
            <span>${esc(formatDate(repo.pushed_at))}</span>
          </div>

          <h3>${esc(prettyName(repo.name))}</h3>

          <p>${esc(repo.description || "Proyecto de mi GitHub.")}</p>

          <div class="project-actions">
            <a href="${esc(repo.html_url)}" target="_blank"
               rel="noopener noreferrer" class="project-link">
              Ver código <span>↗</span></a>
            ${demo}
          </div>

        </div>

      </article>`;
  }

  // Lenguajes de un repo, del que más usás al que menos
  async function getLanguages(repo) {
    try {
      const response = await fetch(repo.languages_url, { headers: HEADERS });
      if (!response.ok) return [];

      const bytes = await response.json();
      const total = Object.values(bytes).reduce((a, b) => a + b, 0);

      return Object.entries(bytes)
        .sort((a, b) => b[1] - a[1])
        .filter(([, size]) => size / total >= 0.03)
        .map(([name]) => name);

    } catch (error) {
      return [];
    }
  }

  async function getRepos() {
    // Cache para no superar el límite de pedidos de GitHub
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
      if (cached && Date.now() - cached.time < CACHE_MINUTES * 60000) {
        return cached.repos;
      }
    } catch (e) {}

    const response = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
      { headers: HEADERS }
    );

    if (!response.ok) throw new Error(`GitHub respondió ${response.status}`);

    const repos = (await response.json())
      .filter((r) => !HIDDEN.includes(r.name))
      .filter((r) => !(HIDE_FORKS && r.fork))
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, MAX_REPOS);

    await Promise.all(
      repos.map(async (repo) => {
        repo._languages = await getLanguages(repo);
      })
    );

    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ time: Date.now(), repos })
      );
    } catch (e) {}

    return repos;
  }

  async function init() {
    try {
      const repos = await getRepos();

      if (!repos.length) return;

      grid.innerHTML = repos.map(cardHTML).join("");

    } catch (error) {
      // Si falla, quedan las tarjetas estáticas del HTML
      console.warn("[GitHub] No se pudieron cargar los repos:", error);
    }
  }

  init();
})();