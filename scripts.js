// Initialize Lucide Icons
lucide.createIcons();

// 1. Fetch Real GitHub Data
const GITHUB_USERNAME = "jpprajapati529";

async function fetchGitHubStats() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    const repos = await res.json();

    if (Array.isArray(repos)) {
      document.getElementById("repo-count").innerText = `${repos.length}+ Public`;
      
      let totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      document.getElementById("star-count").innerText = `Total Stars: ${totalStars}`;

      const repoContainer = document.getElementById("repos-container");
      repoContainer.innerHTML = "";

      repos.forEach(repo => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <h4><a href="${repo.html_url}" target="_blank" style="color:#58a6ff; text-decoration:none;">${repo.name}</a></h4>
          <p style="font-size:0.85rem; color:#8b949e;">${repo.description || "DevOps automation repository."}</p>
          <div style="margin-top:10px;">
            <span style="font-size:0.75rem; background:#21262d; padding:2px 8px; border-radius:12px;">⚡ ${repo.language || 'YAML'}</span>
            <span style="font-size:0.75rem; margin-left:10px; color:#8b949e;">⭐ ${repo.stargazers_count}</span>
          </div>
        `;
        repoContainer.appendChild(card);
      });
    }
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
    document.getElementById("repo-count").innerText = "4+ Repos";
  }
}

fetchGitHubStats();

// 2. Interactive CI/CD Pipeline Engine Simulator
let isPipelineRunning = false;

async function triggerPipelineRun() {
  if (isPipelineRunning) return;
  isPipelineRunning = true;

  const logsConsole = document.getElementById("pipeline-logs");
  logsConsole.innerHTML = "";
  
  const steps = ["step-lint", "step-build", "step-tf", "step-deploy"];
  steps.forEach(id => {
    document.getElementById(id).className = "step";
  });

  const appendLog = (msg, colorClass = "text-muted") => {
    const p = document.createElement("div");
    p.className = `log-line ${colorClass}`;
    p.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logsConsole.appendChild(p);
    logsConsole.scrollTop = logsConsole.scrollHeight;
  };

  // Step 1: Lint
  document.getElementById("step-lint").classList.add("running");
  appendLog("Starting workflow execution...", "text-cyan");
  appendLog("Running SonarQube linting & security scan...", "text-muted");
  await new Promise(r => setTimeout(r, 1200));
  document.getElementById("step-lint").className = "step passed";
  appendLog("✓ Code linting & vulnerability scan passed.", "text-green");

  // Step 2: Build
  document.getElementById("step-build").classList.add("running");
  appendLog("Building Docker container image [v1.0.4]...", "text-muted");
  await new Promise(r => setTimeout(r, 1400));
  document.getElementById("step-build").className = "step passed";
  appendLog("✓ Image pushed to Container Registry.", "text-green");

  // Step 3: Terraform
  document.getElementById("step-tf").classList.add("running");
  appendLog("Executing 'terraform plan' on Cloud Provider...", "text-muted");
  await new Promise(r => setTimeout(r, 1300));
  document.getElementById("step-tf").className = "step passed";
  appendLog("✓ Plan: 0 to add, 1 to change, 0 to destroy.", "text-green");

  // Step 4: Deploy
  document.getElementById("step-deploy").classList.add("running");
  appendLog("Deploying manifest to Kubernetes cluster...", "text-muted");
  await new Promise(r => setTimeout(r, 1500));
  document.getElementById("step-deploy").className = "step passed";
  appendLog("🚀 Deployment Successful! App live on production cluster.", "text-green");

  isPipelineRunning = false;
}

// 3. Skill Radar Chart (Chart.js)
const ctx = document.getElementById('skillRadarCanvas').getContext('2d');
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Kubernetes', 'Terraform', 'AWS & GCP', 'CI/CD Pipelines', 'Docker', 'Prometheus & Grafana'],
    datasets: [{
      label: 'Proficiency (%)',
      data: [92, 90, 88, 95, 92, 85],
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

// 4. Interactive Terminal CLI
const cliInput = document.getElementById("cli-input");
const terminalBody = document.getElementById("terminal-body");

cliInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = cliInput.value.trim();
    cliInput.value = "";
    
    // Echo user input
    const line = document.createElement("p");
    line.innerHTML = `<span class="prompt">jaiprakash@k8s-node1:~$</span> ${input}`;
    terminalBody.appendChild(line);

    let response = "";
    const cmd = input.toLowerCase();

    if (cmd === "help") {
      response = "Available CLI commands: <br>• <span class='highlight'>kubectl get pods</span><br>• <span class='highlight'>terraform plan</span><br>• <span class='highlight'>skills</span><br>• <span class='highlight'>clear</span>";
    } else if (cmd === "kubectl get pods") {
      response = "NAME                            READY   STATUS    RESTARTS   AGE<br>api-gateway-79f9d86b9-x2k4l    1/1     Running   0          4d<br>auth-service-588487b4f-8pql9   1/1     Running   0          4d<br>metrics-exporter-0             1/1     Running   0          12d";
    } else if (cmd === "terraform plan") {
      response = "Terraform used the selected providers to generate the following execution plan:<br><span style='color:#2ea44f;'>+ aws_eks_cluster.prod (will be created)</span><br><span style='color:#58a6ff;'>Plan: 1 to add, 0 to change, 0 to destroy.</span>";
    } else if (cmd === "skills") {
      response = "Core Competencies: Kubernetes, Terraform, AWS, GCP, Jenkins, GitHub Actions, Docker, Prometheus, Grafana, OpenShift.";
    } else if (cmd === "clear") {
      terminalBody.innerHTML = "";
      return;
    } else {
      response = `Command not recognized: '${input}'. Type <span class='highlight'>'help'</span> for available options.`;
    }

    const respLine = document.createElement("p");
    respLine.className = "term-output";
    respLine.innerHTML = response;
    terminalBody.appendChild(respLine);

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});