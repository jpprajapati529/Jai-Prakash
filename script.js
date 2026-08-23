// Initialize Icons
lucide.createIcons();

// =========================================================
// LIGHT/DARK MODE TOGGLE (FIXED LUCIDE ICON SWAP)
// =========================================================
function toggleTheme() {
  const body = document.body;
  const isLightMode = body.getAttribute("data-theme") === "light";
  
  // Grab BOTH theme toggle buttons (Main Nav and Sticky Nav)
  const themeBtns = document.querySelectorAll('[title="Toggle Light/Dark Theme"]');

  if (isLightMode) {
    // Switch back to Dark Mode
    body.removeAttribute("data-theme");
    themeBtns.forEach(btn => btn.innerHTML = '<i data-lucide="sun"></i>');
  } else {
    // Switch to Light Mode
    body.setAttribute("data-theme", "light");
    themeBtns.forEach(btn => btn.innerHTML = '<i data-lucide="moon"></i>');
  }
  
  // Force Lucide to re-render the newly injected icons on both nav bars
  lucide.createIcons();
}

// Mouse Tracking for JetBrains Cursor Spotlight
document.addEventListener("mousemove", (e) => {
  const card = e.target.closest(".card, .project-card, .dashboard-section, .rich-content-container, .ide-window, .summary-card, .jb-skill-card, .hero-btn-primary, .hero-btn-outline, .lifecycle-btn");
  if (card) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }
});

// Modal Module Data Strategy
const moduleData = {
  // ----------------------------------------------------
  // SKILLS SECTION MODALS
  // ----------------------------------------------------
  "skill-cloud": {
    title: "Multi-Cloud Architectures",
    description: "Multi-tier cloud deployment utilizing Kubernetes, VPC Peering, and high-availability managed databases.",
    tabs: [
      {
        name: "AWS (Terraform)",
        type: "code",
        filename: "aws-eks-cluster.tf",
        content: `provider "aws" {\n  region = "ap-south-1"\n}\n\nmodule "eks" {\n  source          = "terraform-aws-modules/eks/aws"\n  cluster_name    = "prod-fintech-cluster"\n  cluster_version = "1.27"\n  vpc_id          = module.vpc.vpc_id\n  subnet_ids      = module.vpc.private_subnets\n\n  eks_managed_node_groups = {\n    default = {\n      min_size     = 2\n      max_size     = 10\n      desired_size = 3\n      instance_types = ["t3.large"]\n    }\n  }\n}`
      },
      {
        name: "Azure (Terraform)",
        type: "code",
        filename: "azure-aks-cluster.tf",
        content: `provider "azurerm" {\n  features {}\n}\n\nresource "azurerm_kubernetes_cluster" "aks" {\n  name                = "prod-banking-aks"\n  location            = azurerm_resource_group.rg.location\n  resource_group_name = azurerm_resource_group.rg.name\n  dns_prefix          = "prodaks"\n\n  default_node_pool {\n    name       = "system"\n    node_count = 3\n    vm_size    = "Standard_DS2_v2"\n  }\n\n  identity {\n    type = "SystemAssigned"\n  }\n}`
      },
      {
        name: "GCP (Terraform)",
        type: "code",
        filename: "gcp-gke-cluster.tf",
        content: `provider "google" {\n  project = "capgemini-fintech-prod"\n  region  = "asia-south1"\n}\n\nresource "google_container_cluster" "primary" {\n  name     = "prod-gke-cluster"\n  location = "asia-south1"\n\n  remove_default_node_pool = true\n  initial_node_count       = 1\n\n  private_cluster_config {\n    enable_private_nodes    = true\n    enable_private_endpoint = false\n  }\n}`
      }
    ]
  },
  "skill-cicd": {
    title: "CI/CD Pipeline Automation",
    description: "Event-driven pipelines enforcing strict quality gates, security scanning, and automated artifact promotion.",
    tabs: [
      {
        name: "GitHub Actions",
        type: "code",
        filename: "deploy-workflow.yml",
        content: `name: Prod Release\non:\n  push:\n    branches: [ "main" ]\n\njobs:\n  security-scan:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Run Trivy vulnerability scanner\n        uses: aquasecurity/trivy-action@master\n        with:\n          image-ref: 'my-app:latest'\n          format: 'table'\n          exit-code: '1'\n          severity: 'CRITICAL,HIGH'`
      },
      {
        name: "Jenkins Pipeline",
        type: "code",
        filename: "Jenkinsfile",
        content: `pipeline {\n    agent any\n    environment {\n        DOCKER_CREDS = credentials('dockerhub-id')\n    }\n    stages {\n        stage('Build & Test') {\n            steps {\n                sh 'mvn clean package'\n                sh 'docker build -t my-app:\${env.BUILD_ID} .'\n            }\n        }\n        stage('Deploy to K8s') {\n            steps {\n                sh 'kubectl apply -f k8s/deployment.yaml'\n            }\n        }\n    }\n}`
      }
    ]
  },
  "skill-container": {
    title: "Containerization & Orchestration",
    description: "Packaging microservices for immutability and managing them at scale across distributed nodes.",
    tabs: [
      {
        name: "Kubernetes",
        type: "code",
        filename: "deployment.yaml",
        content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: core-api\n  namespace: production\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: core-api\n  template:\n    metadata:\n      labels:\n        app: core-api\n    spec:\n      containers:\n      - name: api\n        image: registry.internal/core-api:v2.1.0\n        resources:\n          limits:\n            cpu: "500m"\n            memory: "512Mi"\n        readinessProbe:\n          httpGet:\n            path: /health\n            port: 8080`
      },
      {
        name: "Docker",
        type: "code",
        filename: "Dockerfile",
        content: `FROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`
      }
    ]
  },
  "skill-iac": {
    title: "Infrastructure as Code (IaC)",
    description: "Managing stateful infrastructure safely using declarative code, preventing drift, and scaling rapidly.",
    tabs: [
      {
        name: "Architecture",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="layers"></i> IaC Strategy</h4>
              <p class="rich-text">Treating infrastructure entirely as software to achieve rapid disaster recovery and identical staging environments.</p>
              <ul class="rich-list">
                <li>Modular Terraform design keeping state files remote (S3/GCS) with DynamoDB state locking.</li>
                <li>Executing \`terraform plan\` via CI/CD for peer review before any cloud modifications.</li>
                <li>Utilizing Terragrunt to keep configurations DRY across multiple environments.</li>
              </ul>
            </div>
          </div>
        `
      }
    ]
  },
  "skill-prog": {
    title: "Programming",
    description: "Developing robust automation frameworks and understanding developer workflows to build better platforms.",
    tabs: [
      {
        name: "Python API",
        type: "code",
        filename: "metrics_collector.py",
        content: `import requests\nfrom prometheus_client import Gauge, start_http_server\nimport time\n\nAPI_STATUS = Gauge('api_status', 'Status of external API (1=Up, 0=Down)')\n\ndef check_api():\n    try:\n        response = requests.get('https://api.internal/health', timeout=5)\n        if response.status_code == 200:\n            API_STATUS.set(1)\n        else:\n            API_STATUS.set(0)\n    except:\n        API_STATUS.set(0)\n\nif __name__ == '__main__':\n    start_http_server(8000)\n    while True:\n        check_api()\n        time.sleep(60)`
      }
    ]
  },
  "skill-script": {
    title: "Systems Scripting",
    description: "Eliminating manual toil through automated BASH and Python scripts for cluster maintenance and log parsing.",
    tabs: [
      {
        name: "Bash Automation",
        type: "code",
        filename: "cluster-backup.sh",
        content: `#!/bin/bash\nset -e\n\nBACKUP_DIR="/var/backups/etcd"\nDATE=$(date +%Y-%m-%d-%H-%M)\n\necho "[INFO] Starting etcd snapshot..."\nETCDCTL_API=3 etcdctl snapshot save \${BACKUP_DIR}/snapshot-\${DATE}.db \\
  --endpoints=https://127.0.0.1:2379 \\
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\
  --cert=/etc/kubernetes/pki/etcd/server.crt \\
  --key=/etc/kubernetes/pki/etcd/server.key\n\necho "[INFO] Snapshot successful. Syncing to S3..."\naws s3 cp \${BACKUP_DIR}/snapshot-\${DATE}.db s3://company-k8s-backups/etcd/`
      }
    ]
  },

  // ----------------------------------------------------
  // METRIC CARD MODULES
  // ----------------------------------------------------
  "experience": {
    title: "4 Years DevOps & Platform Engineering",
    description: "Multi-cloud experience managing infrastructure, provisioning automated pipelines, and administering production clusters.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
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
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "experience_profile.yaml",
        content: `role: "Senior Analyst / Platform Engineer"
company: "Capgemini"
experience_years: 4
domain_focus:
  - "Fintech"
  - "Banking Operations"
cloud_providers: ["AWS", "Azure", "GCP"]
orchestration: ["Kubernetes", "OpenShift", "Docker", "Helm"]
education:
  institute: "BIST, Bhopal"
  graduation_year: 2022`
      }
    ]
  },
  "multicloud": {
    title: "Multi-Cloud Ecosystem",
    description: "Automated cloud resource provisioning and IAM policy governance.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="cloud"></i> Provider Strategy</h4>
              <p class="rich-text">Unified management of multi-cloud environments to prevent vendor lock-in and ensure high availability.</p>
              <ul class="rich-list">
                <li><strong>AWS:</strong> EC2, EKS, RDS, S3, CloudWatch, IAM.</li>
                <li><strong>Azure:</strong> Azure DevOps, AKS, Resource Manager.</li>
                <li><strong>GCP:</strong> GKE, Compute Engine, Cloud Storage.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "provider_setup.tf",
        content: `terraform {
  required_providers {
    aws     = { source = "hashicorp/aws", version = "~> 5.0" }
    google  = { source = "hashicorp/google", version = "~> 4.0" }
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.0" }
  }
}

# Unified Cloud Resource Management via Terraform`
      }
    ]
  },
  "domains": {
    title: "Fintech & Banking Infrastructure",
    description: "Managing secure hybrid-cloud environments with zero downtime deployments.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="shield-check"></i> Compliance & Security</h4>
              <p class="rich-text">Maintaining strict regulatory compliance for banking clients through infrastructure-as-code and GitOps.</p>
              <ul class="rich-list">
                <li>Enforcing strict Pod Security Policies (PSP) in Kubernetes clusters.</li>
                <li>Managing IAM roles with Principle of Least Privilege (PoLP).</li>
                <li>Implementing end-to-end monitoring using Prometheus & Grafana.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "cluster_policy.yaml",
        content: `apiVersion: policy/v1
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
  "business-mgmt": {
    title: "Business Management System Stack",
    description: "End-to-end DevOps architecture demonstrating CI/CD automation and Kubernetes orchestration.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="folder-git-2"></i> Architecture Overview</h4>
              <p class="rich-text">A comprehensive repository showcasing a production-ready DevOps pipeline.</p>
              <ul class="rich-list">
                <li>Automated testing and linting via <strong>GitHub Actions</strong>.</li>
                <li>Containerization strategies using <strong>Docker Compose</strong>.</li>
                <li>Infrastructure provisioning using <strong>Terraform</strong>.</li>
                <li>Deployment orchestration via <strong>Kubernetes Manifests</strong>.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "main.tf",
        content: `# Multi-Cloud Infrastructure Provisioning
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

// Hybrid Code/UI Renderer
function selectModalTab(data, index, targetBtn) {
  document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
  if (targetBtn) targetBtn.classList.add("active");

  const tab = data.tabs[index];
  const richContainer = document.getElementById("modal-rich-content");
  const codeContainer = document.getElementById("modal-code-container");

  if (tab.type === "html") {
    codeContainer.style.display = "none";
    richContainer.style.display = "block";
    richContainer.innerHTML = tab.content;
    lucide.createIcons();
  } else {
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

// BASH Terminal Engine
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
        document.getElementById("pipeline-sim").scrollIntoView({ behavior: "smooth", block: "center" });

        const termLogs = [
          { msg: "Connecting to GitHub Actions API...", color: "text-cyan", delay: 800 },
          { msg: "✓ Code linting & security scans passed.", color: "text-green", delay: 1800 },
          { msg: "✓ Docker image built and pushed to registry.", color: "text-green", delay: 3000 },
          { msg: "✓ Terraform Plan executed successfully.", color: "text-green", delay: 4200 },
          { msg: "🚀 Deployment to K8s Successful!", color: "text-green", delay: 5600 }
        ];

        termLogs.forEach(log => {
          setTimeout(() => {
            const p = document.createElement("p");
            p.className = `term-output ${log.color}`;
            p.innerText = `[${new Date().toLocaleTimeString()}] ${log.msg}`;
            terminalBody.appendChild(p);
            terminalBody.scrollTop = terminalBody.scrollHeight;
          }, log.delay);
        });

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

// =========================================================
// JETBRAINS-STYLE STICKY SCROLL OBSERVER
// =========================================================
const scrollBlocks = document.querySelectorAll('.scroll-block');
const ideWindows = document.querySelectorAll('.ide-window');

if (scrollBlocks.length > 0 && ideWindows.length > 0) {
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -30% 0px', 
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollBlocks.forEach(b => b.classList.remove('active'));
        entry.target.classList.add('active');

        const targetId = entry.target.getAttribute('data-target');
        ideWindows.forEach(window => {
          if (window.id === targetId) {
            window.classList.add('active');
          } else {
            window.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  scrollBlocks.forEach(block => observer.observe(block));
}


// =========================================================
// STICKY NAV SCROLLSPY & SLIDE-IN LOGIC
// =========================================================
const navPills = document.querySelectorAll('.nav-pill');
const scrollSections = document.querySelectorAll('.scroll-section');
const stickyNav = document.querySelector('.sticky-section-nav'); 
const navSlider = document.querySelector('.nav-slider'); 

// Slider replaced by bordered active pill style
function updateSliderPosition() {
  // No-op
}

window.addEventListener('load', updateSliderPosition);
window.addEventListener('resize', updateSliderPosition);

// RESTORED: Triggers the sticky bar on scroll and syncs active pills
window.addEventListener('scroll', () => {
  let currentId = '';
  
  if (window.scrollY > 100) { 
    stickyNav.classList.add('is-visible');
  } else {
    stickyNav.classList.remove('is-visible');
  }

  scrollSections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= (sectionTop - 250)) { 
      currentId = section.getAttribute('id');
    }
  });

  let changed = false;
  navPills.forEach(pill => {
    if (pill.getAttribute('href') === `#${currentId}`) {
      if (!pill.classList.contains('active')) {
        pill.classList.add('active');
        changed = true; 
      }
    } else {
      pill.classList.remove('active');
    }
  });

  if (changed) {
    updateSliderPosition();
  }
});


// =========================================================
// JETBRAINS AUTO-COLOR CYCLING ENGINE (PAUSE & KEEP COLOR)
// =========================================================
const jbColors = [
  { r: 168, g: 85, b: 247 },  // 0. Primary Purple (Base)
  { r: 8,   g: 124, b: 250 }, // 1. IntelliJ Blue
  { r: 33,  g: 215, b: 137 }, // 2. PyCharm Green
  { r: 255, g: 115, b: 0 },   // 3. Fleet Orange
  { r: 225, g: 31, b: 113 },  // 4. Rider Magenta
  { r: 0,   g: 204, b: 205 }  // 5. WebStorm Cyan
];

let colorIndex = 0;
let nextColorIndex = 1;
let colorProgress = 0;
let isColorCycling = false;
let colorAnimFrame;

function lerpColor(start, end, t) {
  return Math.round(start + (end - start) * t);
}

function colorLoop() {
  const current = jbColors[colorIndex];
  const next = jbColors[nextColorIndex];

  const r = lerpColor(current.r, next.r, colorProgress);
  const g = lerpColor(current.g, next.g, colorProgress);
  const b = lerpColor(current.b, next.b, colorProgress);

  document.documentElement.style.setProperty('--theme-rgb', `${r}, ${g}, ${b}`);

  colorProgress += 0.003; 

  if (colorProgress >= 1) {
    colorProgress = 0;
    colorIndex = nextColorIndex;
    nextColorIndex = (colorIndex + 1) % jbColors.length;
  }
  
  colorAnimFrame = requestAnimationFrame(colorLoop);
}

function toggleColorCycle() {
  isColorCycling = !isColorCycling;
  const icon = document.getElementById('color-cycle-icon');
  
  if (isColorCycling) {
    icon.classList.add('color-spinning'); 
    if (!colorAnimFrame) {
      colorLoop();
    }
  } else {
    icon.classList.remove('color-spinning');
    if (colorAnimFrame) {
      cancelAnimationFrame(colorAnimFrame);
      colorAnimFrame = null;
    }
  }
}

function resetColorTheme() {
  if (colorAnimFrame) {
    cancelAnimationFrame(colorAnimFrame);
    colorAnimFrame = null;
  }
  
  isColorCycling = false;
  document.getElementById('color-cycle-icon').classList.remove('color-spinning');
  
  colorIndex = 0;
  nextColorIndex = 1;
  colorProgress = 0;
  
  const primary = jbColors[0];
  document.documentElement.style.setProperty('--theme-rgb', `${primary.r}, ${primary.g}, ${primary.b}`);
}


// =========================================================
// CUSTOM UI SOUND ENGINE (Hover, Select, Close)
// =========================================================

// 1. Define your three audio files
const hoverSound = new Audio('hover.mp3'); 
const selectSound = new Audio('select.mp3'); 
const closeSound = new Audio('close.mp3'); 

hoverSound.volume = 0.3; 
selectSound.volume = 0.5; 
closeSound.volume = 0.4;

let isSoundUnlocked = false;

document.addEventListener('click', () => {
  isSoundUnlocked = true;
}, { once: true });

function playAudio(audioElement) {
  if (!isSoundUnlocked) return;
  const soundClone = audioElement.cloneNode();
  soundClone.volume = audioElement.volume;
  soundClone.play().catch(err => { /* Fails silently */ });
}

const interactiveElements = document.querySelectorAll(
  'a, button, .card, .tech-item, .ide-window, .nav-pill, .logo, .theme-switch, .jb-skill-card, .clickable-card'
);

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => playAudio(hoverSound));
  
  if (!el.classList.contains('modal-close-btn')) {
    el.addEventListener('click', () => playAudio(selectSound));
  }
});

const closeBtn = document.querySelector('.modal-close-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => playAudio(closeSound));
}

const modalOverlay = document.getElementById('modal-overlay');
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') {
      playAudio(closeSound);
    }
  });
}


// =========================================================
// DEVOPS LIFECYCLE WIDGET ENGINE
// =========================================================

// The data structure holding the info for each DevOps stage
const lifecycleData = {
  plan: {
    title: "Stage: PLAN (Agile)",
    metric: "Lead Time: 2.1d",
    desc: "Sprint Architecture, Jira Backlog & Git Branching Strategy",
    tools: ["Jira", "Confluence", "Miro", "Lucidchart"],
    color: "#2563eb" /* Word Blue */
  },
  code: {
    title: "Stage: CODE (Source)",
    metric: "PR Velocity: 3.4h",
    desc: "Trunk-Based Development, Conventional Commits & Peer Review",
    tools: ["Git", "GitHub", "VS Code", "IntelliJ"],
    color: "#7c3aed" /* Teams Purple */
  },
  build: {
    title: "Stage: BUILD (Artifacts)",
    metric: "Build Avg: 42s",
    desc: "Multi-Arch Container Builds, Dependency Management & Caching",
    tools: ["Docker", "Maven", "Gradle", "GitHub Actions"],
    color: "#ea580c" /* PowerPoint Orange */
  },
  test: {
    title: "Stage: TEST (QA & Sec)",
    metric: "Coverage: 91.4%",
    desc: "Automated Unit/Integration Testing, SonarQube & Trivy Scans",
    tools: ["JUnit", "SonarQube", "Trivy", "Selenium"],
    color: "#16a34a" /* Excel Green */
  },
  release: {
    title: "Stage: RELEASE (Registry)",
    metric: "Zero-CVE Signed",
    desc: "Semantic Versioning, Image Tagging & Immutable Artifact Signing",
    tools: ["Harbor", "Docker Hub", "AWS ECR", "GCP Artifact Registry"],
    color: "#9333ea" /* OneNote Violet */
  },
  deploy: {
    title: "Stage: DEPLOY (GitOps)",
    metric: "Sync: Instant",
    desc: "ArgoCD Sync, Blue/Green Rollouts & Helm Chart Orchestration",
    tools: ["Kubernetes", "Helm", "ArgoCD", "Terraform"],
    color: "#0284c7" /* OneDrive Sky */
  },
  operate: {
    title: "Stage: OPERATE (Cloud)",
    metric: "Uptime: 99.99%",
    desc: "AWS EKS, GCP GKE, Azure AKS Multi-Cloud Cluster Management",
    tools: ["AWS", "GCP", "Azure", "OpenShift"],
    color: "#0d9488" /* SharePoint Teal */
  },
  monitor: {
    title: "Stage: MONITOR (SRE)",
    metric: "MTTR: < 4 min",
    desc: "Prometheus Metrics, Grafana Dashboards & PagerDuty Alerts",
    tools: ["Prometheus", "Grafana", "Datadog", "ELK Stack"],
    color: "#059669" /* Forms Emerald */
  }
};

// Shows the floating pane directly over the infinity loop image on hover
function showLifecycleSpec(stageKey) {
  const data = lifecycleData[stageKey];
  const overlay = document.getElementById('lifecycle-overlay');
  
  const footer = document.querySelector('.cicd-footer');
  const footerText = document.getElementById('cicd-footer-text');
  const footerStatus = document.querySelector('.cicd-footer-status');
  
  if (!overlay || !data) return;

  const toolsHTML = data.tools.map(tool => `<span class="tool-pill">${tool}</span>`).join('');

  overlay.innerHTML = `
    <div class="lifecycle-title">${data.title}</div>
    <div class="lifecycle-metric" style="color: ${data.color} !important;">${data.metric}</div>
    <p class="lifecycle-desc">${data.desc}</p>
    <div class="lifecycle-tools">${toolsHTML}</div>
  `;
  
  overlay.classList.add('active');

  if (footer) footer.classList.add('active-box');
  if (footerText) {
    footerText.innerText = `Stage: ${stageKey.toUpperCase()}`;
    footerText.style.color = "#fff";
  }
  if (footerStatus) {
    footerStatus.innerText = data.tools.join(", "); 
  }
}

function hideLifecycleSpec() {
  const overlay = document.getElementById('lifecycle-overlay');
  const footer = document.querySelector('.cicd-footer');
  const footerText = document.getElementById('cicd-footer-text');
  const footerStatus = document.querySelector('.cicd-footer-status');
  
  if (overlay) overlay.classList.remove('active');
  
  if (footer) footer.classList.remove('active-box');
  if (footerText) {
    footerText.innerText = "Hover stage for specs";
    footerText.style.color = "var(--text-muted)";
  }
  if (footerStatus) {
    footerStatus.innerText = "Continuous Loop Active";
  }
}