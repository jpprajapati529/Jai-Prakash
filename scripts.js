// Initialize Icons
lucide.createIcons();

// 1. Fetch GitHub Live Stats via API
const GITHUB_USERNAME = "your-github-username"; // Replace with your actual username

async function fetchGitHubStats() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    const repos = await res.json();

    document.getElementById("repo-count").innerText = `${repos.length}+ Public`;
    
    let totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    document.getElementById("star-count").innerText = `Total Stars: ${totalStars}`;

    const repoContainer = document.getElementById("repos-container");
    repoContainer.innerHTML = "";

    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h4><a href="${repo.html_url}" target="_blank" style="color:#58a6ff;">${repo.name}</a></h4>
        <p style="font-size:0.85rem; color:#8b949e;">${repo.description || "DevOps automation repository."}</p>
        <span style="font-size:0.75rem; background:#21262d; padding:2px 8px; border-radius:12px;">⚡ ${repo.language || 'CI/CD'}</span>
        <span style="font-size:0.75rem; margin-left:10px;">⭐ ${repo.stargazers_count}</span>
      `;
      repoContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
  }
}

fetchGitHubStats();

// 2. Skill Radar Chart (Chart.js)
const ctx = document.getElementById('skillRadarCanvas').getContext('2d');
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Kubernetes', 'Terraform', 'AWS / GCP', 'CI/CD Pipelines', 'Docker', 'Prometheus & Grafana'],
    datasets: [{
      label: 'Proficiency Level (%)',
      data: [90, 88, 92, 95, 90, 85],
      backgroundColor: 'rgba(88, 166, 255, 0.2)',
      borderColor: '#58a6ff',
      pointBackgroundColor: '#2ea44f'
    }]
  },
  options: {
    scales: {
      r: {
        angleLines: { color: '#30363d' },
        grid: { color: '#30363d' },
        pointLabels: { color: '#c9d1d9' },
        ticks: { display: false, max: 100 }
      }
    },
    plugins: { legend: { display: false } }
  }
});

// 3. Interactive Terminal CLI
const cliInput = document.getElementById("cli-input");
const terminalBody = document.getElementById("terminal-body");

cliInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = cliInput.value.trim().toLowerCase();
    cliInput.value = "";
    
    // Echo user command
    const line = document.createElement("p");
    line.innerHTML = `<span class="prompt">devops@k8s-node1:~$</span> ${input}`;
    terminalBody.appendChild(line);

    // Process commands
    let response = "";
    switch (input) {
      case "help":
        response = "Available commands: <span class='highlight'>projects</span>, <span class='highlight'>skills</span>, <span class='highlight'>contact</span>, <span class='highlight'>clear</span>";
        break;
      case "projects":
        response = "Deployed Infrastructure: Terraform AWS Stack, GCP Kubernetes Engine, Jenkins Multi-Branch Pipeline.";
        break;
      case "skills":
        response = "Core Stack: Kubernetes, Docker, Terraform, GitHub Actions, Jenkins, GCP, AWS, Prometheus, Grafana.";
        break;
      case "contact":
        response = "Email: contact@yourdomain.com | LinkedIn: linkedin.com/in/yourprofile";
        break;
      case "clear":
        terminalBody.innerHTML = "";
        return;
      default:
        response = `Command not found: '${input}'. Type <span class='highlight'>'help'</span> for list of commands.`;
    }

    const respLine = document.createElement("p");
    respLine.className = "term-output";
    respLine.innerHTML = response;
    terminalBody.appendChild(respLine);

    // Auto scroll
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});