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
    description: "Multi-cloud experience managing infrastructure, provisioning automated pipelines, and administering production clusters.",
    tabs: [
      {
        name: "Role Overview",
        type: "html", // Tells the engine to use rich UI formatting
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Current Impact</h4>
              <p class="rich-text"><strong>Senior Analyst / Platform Engineer</strong> at Capgemini, transitioning from core DevOps to specialized Platform Engineering.</p>
              <ul class="rich-list">
                <li>Architecting and provisioning robust multi-cloud resources across <strong>AWS and GCP</strong> using modular Terraform architectures.</li>
                <li>Managing enterprise-scale cloud IAM roles, security policies, and optimizing project billing structures.</li>
                <li>Executing zero-downtime application rollouts across hybrid banking environments using OpenShift and Docker.</li>
              </ul>
            </div>
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="layers"></i> Core Stack</h4>
              <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom: 20px;">
                <span class="tag-badge">AWS & GCP</span>
                <span class="tag-badge">Terraform</span>
                <span class="tag-badge">Kubernetes</span>
                <span class="tag-badge">Jenkins</span>
                <span class="tag-badge">GitHub Actions</span>
              </div>
              <h4 class="rich-heading"><i data-lucide="graduation-cap"></i> Education</h4>
              <p class="rich-text">BIST, Bhopal<br><span style="color: var(--text-muted); font-size: 0.85rem;">Class of 2022</span></p>
            </div>
          </div>
        `
      }
    ]
  },
  "multicloud": {
    title: "Multi-Cloud Ecosystem (AWS, Azure, GCP)",
    description: "Automated cloud resource provisioning, IAM policy governance, and cost optimization.",
    tabs: [
      {
        name: "Terraform IaC",
        type: "code", // Tells the engine to use the terminal code viewer
        filename: "provider_setup.tf",
        content: `terraform {
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
    title: "Business Management System — DevOps Stack",
    description: "End-to-end DevOps architecture demonstrating CI/CD automation, Terraform IaC, and Kubernetes orchestration across multi-cloud environments.",
    tabs: [
      {
        name: "Project Overview & Repo",
        filename: "README.md",
        code: `# Business Management System
GitHub: https://github.com/jpprajapati529/Business-Management-System

Architecture Highlights:
- Cloud Providers: AWS, Azure, GCP
- Container Orchestration: Kubernetes, OpenShift, Helm
- IaC & Automation: Terraform, Docker
- CI/CD Pipelines: GitHub Actions, Jenkins, Azure DevOps
- Monitoring: Prometheus & Grafana
- Scripting: BASH, Python`
      },
      {
        name: "Terraform IaC",
        filename: "infrastructure/main.tf",
        code: `# Multi-Cloud Infrastructure Provisioning
module "gcp_gke_cluster" {
  source     = "terraform-google-modules/kubernetes-engine/google"
  project_id = "business-mgmt-prod"
  name       = "gke-production-cluster"
  region     = "asia-south1"
}`
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
  const richContainer = document.getElementById("modal-rich-content");
  const codeContainer = document.getElementById("modal-code-container");

  // Hybrid Rendering Engine
  if (tab.type === "html") {
    // Show Recruiter UI
    codeContainer.style.display = "none";
    richContainer.style.display = "block";
    richContainer.innerHTML = tab.content;
    lucide.createIcons(); // Re-render icons inside the injected HTML
  } else {
    // Show Developer Code UI
    richContainer.style.display = "none";
    codeContainer.style.display = "block";
    document.getElementById("code-filename").innerText = tab.filename || "snippet.txt";
    document.getElementById("code-block").innerText = tab.content;
  }
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

// Pipeline Simulation Engine
let isPipelineRunning = false;

async function triggerPipelineRun() {
  if (isPipelineRunning) return;
  isPipelineRunning = true;

  const logsConsole = document.getElementById("pipeline-logs");
  if (!logsConsole) return;
  
  logsConsole.innerHTML = "";
  
  const steps = ["step-lint", "step-build", "step-tf", "step-deploy"];
  steps.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.className = "step";
  });

  const appendLog = (msg, colorClass = "text-muted") => {
    const p = document.createElement("div");
    p.className = `log-line ${colorClass}`;
    p.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logsConsole.appendChild(p);
    logsConsole.scrollTop = logsConsole.scrollHeight;
  };

  appendLog("Triggering workflow for repository: jpprajapati529/Business-Management-System...", "text-cyan");
  
  document.getElementById("step-lint").className = "step running";
  await new Promise(r => setTimeout(r, 1000));
  document.getElementById("step-lint").className = "step passed";
  appendLog("✓ Code linting & security scans passed.", "text-green");

  document.getElementById("step-build").className = "step running";
  await new Promise(r => setTimeout(r, 1200));
  document.getElementById("step-build").className = "step passed";
  appendLog("✓ Docker image built and pushed.", "text-green");

  document.getElementById("step-tf").className = "step running";
  await new Promise(r => setTimeout(r, 1200));
  document.getElementById("step-tf").className = "step passed";
  appendLog("✓ Terraform Plan executed successfully.", "text-green");

  document.getElementById("step-deploy").className = "step running";
  await new Promise(r => setTimeout(r, 1400));
  document.getElementById("step-deploy").className = "step passed";
  appendLog("🚀 Deployment Successful!", "text-green");

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