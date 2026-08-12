// Initialize Icons
lucide.createIcons();

// Mouse Tracking for JetBrains Cursor Spotlight
document.addEventListener("mousemove", (e) => {
  const card = e.target.closest(".card, .project-card, .dashboard-section");
  if (card) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }
});

// Modal Module Data Strategy
const moduleData = {
  "experience": {
    title: "4 Years DevOps & Platform Engineering Experience",
    description: "Multi-cloud experience managing infrastructure, provisioning automated pipelines, and administering production clusters in Banking and Fintech domains.",
    tabs: [
      {
        name: "Overview",
        filename: "experience_summary.txt",
        code: `Role: Senior Analyst / Platform Engineer
Domain Focus: Fintech & Banking Client Operations
Core Focus: Multi-Cloud Automation (AWS, Azure, GCP)
IaC & Orchestration: Terraform, OpenShift, Kubernetes, Docker, Helm
Pipeline Tooling: GitHub Actions, Jenkins, Azure DevOps
Observability: Prometheus, Grafana, CloudWatch`
      }
    ]
  },
  "multicloud": {
    title: "Multi-Cloud Ecosystem (AWS, Azure, GCP)",
    description: "Automated cloud resource provisioning, IAM policy governance, and cost optimization across AWS, Azure, and GCP.",
    tabs: [
      {
        name: "Terraform IaC",
        filename: "provider_setup.tf",
        code: `terraform {
  required_providers {
    aws    = { source = "hashicorp/aws", version = "~> 5.0" }
    google = { source = "hashicorp/google", version = "~> 4.0" }
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.0" }
  }
}

# Unified Cloud Resource Management via Terraform`
      }
    ]
  },
  "domains": {
    title: "Fintech & Banking Infrastructure",
    description: "Managing secure hybrid-cloud environments with zero downtime deployments and strict regulatory compliance.",
    tabs: [
      {
        name: "Security & Monitoring",
        filename: "cluster_policy.yaml",
        code: `apiVersion: policy/v1
kind: PodSecurityPolicy
metadata:
  name: banking-restricted-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  runAsUser:
    rule: 'MustRunAsNonRoot'`
      }
    ]
  },
  "github": {
    title: "Business Management System Repository",
    description: "Primary repository showcasing end-to-end DevOps tooling integration.",
    tabs: [
      {
        name: "Repo Quick Link",
        filename: "repo_info.md",
        code: "URL: https://github.com/jpprajapati529/Business-Management-System\nStatus: Active\nDescription: Complete Docker, Kubernetes, Terraform, and CI/CD demonstration repository."
      }
    ]
  },
  "business-mgmt": {
    title: "Business Management System — DevOps Architecture",
    description: "All-in-one repository integrating Docker Compose, Kubernetes manifests, Terraform IaC, and GitHub Actions CI/CD automation.",
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
      POSTGRES_USER: devops_admin`
      },
      {
        name: "Kubernetes Manifest",
        filename: "deployment.yaml",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: business-mgmt-app
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
        - containerPort: 8080`
      },
      {
        name: "Terraform IaC",
        filename: "main.tf",
        code: `module "gcp_gke_cluster" {
  source       = "terraform-google-modules/kubernetes-engine/google"
  project_id   = "fintech-platform-prod"
  name         = "business-mgmt-cluster"
  region       = "asia-south1"
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
    - name: Build Docker Image
      run: docker build -t jpprajapati529/business-mgmt:latest .`
      }
    ]
  }
};

// Modal Control Functions
function openMetricModal(key) {
  if (key === 'github') {
    window.open("https://github.com/jpprajapati529/Business-Management-System", "_blank");
    return;
  }
  openModuleModal(key);
}

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

  selectModalTab(data, 0, tabsContainer.children[0]);

  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("active");
  lucide.createIcons();
}

function selectModalTab(data, index, targetBtn) {
  document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
  if (targetBtn) targetBtn.classList.add("active");

  const tab = data.tabs[index];
  document.getElementById("code-filename").innerText = tab.filename;
  document.getElementById("code-block").innerText = tab.code;
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
}

function closeModalOnOuterClick(e) {
  if (e.target.id === "modal-overlay") closeModal();
}

function copyCodeSnippet() {
  const code = document.getElementById("code-block").innerText;
  navigator.clipboard.writeText(code);
  alert("Snippet copied to clipboard!");
}

// Fixed Pipeline Simulation Engine
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

  appendLog("Triggering workflow for repository: jpprajapati529/Business-Management-System...", "text-cyan");
  
  // Step 1: Lint
  document.getElementById("step-lint").className = "step running";
  appendLog("Running BASH script & SonarQube linting...", "text-muted");
  await new Promise(r => setTimeout(r, 1000));
  document.getElementById("step-lint").className = "step passed";
  appendLog("✓ Code linting & security scans passed successfully.", "text-green");

  // Step 2: Build
  document.getElementById("step-build").className = "step running";
  appendLog("Executing 'docker build' for Business Management System...", "text-muted");
  await new Promise(r => setTimeout(r, 1200));
  document.getElementById("step-build").className = "step passed";
  appendLog("✓ Docker image jpprajapati529/business-mgmt:latest built and pushed.", "text-green");

  // Step 3: Terraform
  document.getElementById("step-tf").className = "step running";
  appendLog("Executing 'terraform plan' against multi-cloud target...", "text-muted");
  await new Promise(r => setTimeout(r, 1200));
  document.getElementById("step-tf").className = "step passed";
  appendLog("✓ Terraform Plan: 2 resources to create, 0 to destroy.", "text-green");

  // Step 4: Deploy
  document.getElementById("step-deploy").className = "step running";
  appendLog("Applying Kubernetes manifests via kubectl...", "text-muted");
  await new Promise(r => setTimeout(r, 1400));
  document.getElementById("step-deploy").className = "step passed";
  appendLog("🚀 Deployment Successful! App running on production cluster.", "text-green");

  isPipelineRunning = false;
}

// BASH Terminal Engine with GitHub Workflow Command Binding
const cliInput = document.getElementById("cli-input");
const terminalBody = document.getElementById("terminal-body");

if (cliInput) {
  cliInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const input = cliInput.value.trim();
      cliInput.value = "";
      
      const line = document.createElement("p");
      line.innerHTML = `<span class="prompt">jaiprakash@k8s-node1:~$</span> ${input}`;
      terminalBody.appendChild(line);

      let response = "";
      const cmd = input.toLowerCase();

      if (cmd === "bash deploy.sh" || cmd === "bash" || cmd === "sh trigger.sh" || cmd === "gh workflow run") {
        response = "Executing GitHub Actions trigger for jpprajapati529/Business-Management-System...";
        triggerPipelineRun();
      } else if (cmd === "help") {
        response = "Available CLI commands: <br>• <span class='highlight'>bash deploy.sh</span> (triggers pipeline)<br>• <span class='highlight'>certs</span><br>• <span class='highlight'>kubectl get pods</span><br>• <span class='highlight'>terraform plan</span><br>• <span class='highlight'>clear</span>";
      } else if (cmd === "certs") {
        response = "Certifications: AWS Cloud Practitioner, AWS DevOps Professional, Azure Developer Associate, Azure DevOps Expert, GCP Associate, GCP DevOps Professional, KCNA, Terraform Associate.";
      } else if (cmd === "kubectl get pods") {
        response = "NAME                                    READY   STATUS    RESTARTS   AGE<br>business-mgmt-api-8f921a-x2k            1/1     Running   0          2d<br>postgres-db-0                           1/1     Running   0          5d";
      } else if (cmd === "terraform plan") {
        response = "<span style='color:#2ea44f;'>+ google_container_cluster.primary will be created</span><br><span style='color:#58a6ff;'>Plan: 1 to add, 0 to change, 0 to destroy.</span>";
      } else if (cmd === "clear") {
        terminalBody.innerHTML = "";
        return;
      } else {
        response = `Command not recognized: '${input}'. Try <span class='highlight'>'bash deploy.sh'</span> or <span class='highlight'>'help'</span>.`;
      }

      const respLine = document.createElement("p");
      respLine.className = "term-output";
      respLine.innerHTML = response;
      terminalBody.appendChild(respLine);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
}