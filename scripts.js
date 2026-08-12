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

  // =========================================================
// JETBRAINS SPOTLIGHT CURSOR TRACKING (EVENT DELEGATION)
// =========================================================

document.addEventListener("mousemove", (e) => {
  // Find the closest card container under the cursor
  const card = e.target.closest(".card, .project-card, .dashboard-section");
  
  if (card) {
    const rect = card.getBoundingClientRect();
    // Calculate precise mouse X and Y coordinates inside the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Pass coordinates to CSS custom variables
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  }
});

// =========================================================
// DRILL-DOWN MODAL & DEV-TOOLS ENGINE
// =========================================================

const moduleData = {
  "business-mgmt": {
    title: "Business Management System — DevOps Stack",
    icon: "folder-git-2",
    description: "An all-in-one DevOps architecture showcasing automated containerization, Kubernetes orchestration, Terraform cloud provisioning, and Prometheus monitoring for enterprise services.",
    tabs: [
      {
        name: "Docker Compose",
        filename: "docker-compose.yml",
        code: `version: '3.8'
services:
  app-backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_HOST=postgres-db
    depends_on:
      - postgres-db

  postgres-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: business_db
      POSTGRES_USER: devops_admin
      POSTGRES_PASSWORD: \${DB_PASSWORD}`
      },
      {
        name: "Kubernetes Manifest",
        filename: "deployment.yaml",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: business-mgmt-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: business-mgmt
  template:
    metadata:
      labels:
        app: business-mgmt
    spec:
      containers:
      - name: app
        image: jpprajapati529/business-mgmt:latest
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"`
      },
      {
        name: "Terraform IaC",
        filename: "main.tf",
        code: `module "gcp_gke_cluster" {
  source       = "terraform-google-modules/kubernetes-engine/google"
  project_id   = "fintech-platform-prod"
  name         = "business-mgmt-cluster"
  region       = "asia-south1"
  network      = "custom-vpc"
  subnetwork   = "gke-subnet"
  ip_range_pods     = "pod-range"
  ip_range_services = "service-range"

  node_pools = [
    {
      name         = "default-node-pool"
      machine_type = "e2-standard-4"
      min_count    = 2
      max_count    = 5
      auto_repair  = true
    }
  ]
}`
      },
      {
        name: "CI/CD Pipeline",
        filename: ".github/workflows/deploy.yml",
        code: `name: Build & Deploy Business Management System

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    - name: Build Docker Image
      run: docker build -t jpprajapati529/business-mgmt:\${{ github.sha }} .
    - name: Deploy to Kubernetes
      run: kubectl apply -f k8s/`
      }
    ]
  }
};

let currentTabCode = "";

function openModuleModal(moduleId) {
  const data = moduleData[moduleId];
  if (!data) return;

  document.getElementById("modal-title").innerText = data.title;
  document.getElementById("modal-description").innerText = data.description;

  const tabsContainer = document.getElementById("modal-tabs");
  tabsContainer.innerHTML = "";

  data.tabs.forEach((tab, index) => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
    btn.innerText = tab.name;
    btn.onclick = () => selectModalTab(data, index, btn);
    tabsContainer.appendChild(btn);
  });

  // Select first tab by default
  selectModalTab(data, 0, tabsContainer.children[0]);

  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("active");
  lucide.createIcons();
}

function selectModalTab(data, index, targetBtn) {
  const allTabs = document.querySelectorAll(".tab-btn");
  allTabs.forEach(t => t.classList.remove("active"));
  if (targetBtn) targetBtn.classList.add("active");

  const tab = data.tabs[index];
  document.getElementById("code-filename").innerText = tab.filename;
  document.getElementById("code-block").innerText = tab.code;
  currentTabCode = tab.code;
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
}

function closeModalOnOuterClick(e) {
  if (e.target.id === "modal-overlay") {
    closeModal();
  }
}

function copyCodeSnippet() {
  if (currentTabCode) {
    navigator.clipboard.writeText(currentTabCode);
    alert("Snippet copied to clipboard!");
  }
}