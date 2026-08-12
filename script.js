// Initialize Icons
lucide.createIcons();

// Mouse Tracking for JetBrains Cursor Spotlight (Now includes modal contents)
document.addEventListener("mousemove", (e) => {
  const card = e.target.closest(".card, .project-card, .dashboard-section, .rich-content-container");
  if (card) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }
});

// Modal Module Data Strategy - Dual Modes for ALL Cards
const moduleData = {
  // Paste these INSIDE your existing const moduleData = { ... }; object

  "aws": {
    title: "AWS Cloud Engineering",
    description: "Architecting scalable environments and enforcing IAM security controls across AWS services.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="cloud"></i> Infrastructure & Migration</h4>
              <p class="rich-text">Built and maintained resilient multi-tenant AWS environments using Terraform for effortless application scaling. Executed seamless on-premises to AWS migrations with minimal downtime.</p>
              <h4 class="rich-heading"><i data-lucide="shield"></i> Security & Governance</h4>
              <ul class="rich-list">
                <li>Established IAM roles, policies, and security groups to exceed compliance requirements.</li>
                <li>Audited IAM access controls for S3, EC2, RDS, and CloudWatch.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "aws_iam_policy.tf",
        content: `resource "aws_iam_policy" "strict_s3_access" {
  name        = "RestrictedS3Access"
  description = "Enforces least privilege based on audit requirements"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action   = ["s3:GetObject", "s3:ListBucket"]
      Effect   = "Allow"
      Resource = ["arn:aws:s3:::prod-app-data", "arn:aws:s3:::prod-app-data/*"]
    }]
  })
}`
      }
    ]
  },
  "azure": {
    title: "Azure Cloud Engineering",
    description: "Managing hybrid infrastructures, AKS containerization, and strict Entra ID RBAC policies.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="cloud"></i> Infrastructure & CI/CD</h4>
              <p class="rich-text">Managed commissioning and decommissioning of resources across a hybrid Azure and OpenShift ecosystem. Optimized deployments using Azure Pipelines.</p>
              <h4 class="rich-heading"><i data-lucide="shield"></i> Security & Governance</h4>
              <ul class="rich-list">
                <li>Established Azure Entra ID & RBAC policies, mitigating security breaches.</li>
                <li>Configured access controls for Blob storage, VMs, SQL, and Azure Monitor.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "azure_rbac.tf",
        content: `resource "azurerm_role_assignment" "aks_monitoring" {
  scope                = azurerm_kubernetes_cluster.aks_prod.id
  role_definition_name = "Monitoring Metrics Publisher"
  principal_id         = azuread_service_principal.monitor_sp.object_id
}`
      }
    ]
  },
  "gcp": {
    title: "GCP & SRE Engineering",
    description: "Deploying GKE microservices and establishing SRE practices with Stackdriver.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="activity"></i> Site Reliability Engineering</h4>
              <p class="rich-text">Implemented SRE practices by defining SLIs/SLOs and error budgets. Unified observability across the cluster using GCP Stackdriver and Prometheus.</p>
              <h4 class="rich-heading"><i data-lucide="shield"></i> Security & Operations</h4>
              <ul class="rich-list">
                <li>Maintained GCP Projects, Service Accounts, and IAM roles to exceed industry audit standards.</li>
                <li>Audited custom roles for GCS, Compute Engine, Cloud SQL, and Stackdriver.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "gcp_slo.yaml",
        content: `apiVersion: monitoring.googleapis.com/v3
kind: ServiceLevelObjective
metadata:
  name: gke-api-latency-slo
spec:
  goal: 0.99
  rollingPeriod: 2592000s # 30 days
  serviceLevelIndicator:
    requestBased:
      distributionCut:
        distributionFilter: metric.type="loadbalancing.googleapis.com/https/request_latencies"
        range:
          max: 250 # 99% of requests under 250ms`
      }
    ]
  },
  "terraform": {
    title: "Infrastructure as Code",
    description: "Architecting modular, multi-tenant cloud environments.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="boxes"></i> Multi-Cloud Provisioning</h4>
              <p class="rich-text">Built and maintained resilient multi-tenant environments across AWS, Azure, and GCP using Terraform, ensuring effortless scaling of applications and optimal resource utilization.</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "modules.tf",
        content: `module "multi_tenant_aks" {
  source              = "./modules/aks"
  cluster_name        = "prod-hybrid-cluster"
  kubernetes_version  = "1.27"
  enable_auto_scaling = true
  min_count           = 3
  max_count           = 10
}`
      }
    ]
  },
  "docker": {
    title: "Docker Containerization",
    description: "Packaging microservices for reliable and efficient deployments.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="box"></i> Containerization</h4>
              <p class="rich-text">Deployed and managed containerized microservices using Docker, enhancing system reliability and drastically reducing infrastructure costs through efficient resource utilization.</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "Dockerfile",
        content: `FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Running securely as non-root
USER 1001 
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:main"]`
      }
    ]
  },
  "kubernetes": {
    title: "Kubernetes Orchestration",
    description: "Administering high-availability clusters and implementing strict security policies.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="server"></i> Cluster Administration</h4>
              <p class="rich-text">Managed microservices across EKS, AKS, and GKE. Enhanced reliability while optimizing resource usage.</p>
              <h4 class="rich-heading"><i data-lucide="lock"></i> Kubernetes Security</h4>
              <ul class="rich-list">
                <li>Implemented security best practices leveraging HashiCorp Vault and Secrets Manager.</li>
                <li>Reduced security incidents by 60% through rigorous IAM and RBAC enforcement.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "k8s_security.yaml",
        content: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: prod-namespace
  name: secrets-reader
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "watch", "list"]`
      }
    ]
  },
  "openshift": {
    title: "Red Hat OpenShift",
    description: "Managing enterprise on-premises container platforms.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="layers"></i> Hybrid Cloud Integrations</h4>
              <p class="rich-text">Managed the commissioning and decommissioning of on-premises OpenShift clusters within complex hybrid-cloud ecosystems, ensuring seamless interoperability with public cloud resources.</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "route.yaml",
        content: `apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: internal-banking-api
spec:
  host: api.internal.banking.local
  to:
    kind: Service
    name: banking-core-service
  tls:
    termination: edge`
      }
    ]
  },
  "jenkins": {
    title: "Jenkins CI/CD",
    description: "Building robust, automated deployment pipelines.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="git-merge"></i> Automation Engineering</h4>
              <p class="rich-text">Built and optimized CI/CD pipelines using Jenkins to drastically improve deployment speed, frequency, and reliability across development, staging, and production environments.</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "Jenkinsfile",
        content: `pipeline {
    agent any
    stages {
        stage('Security Scan') {
            steps {
                sh 'trivy fs --severity HIGH,CRITICAL .'
            }
        }
        stage('Build & Push') {
            steps {
                sh 'docker build -t app:v1 .'
                sh 'docker push myregistry/app:v1'
            }
        }
    }
}`
      }
    ]
  },
  "github": {
    title: "GitHub Actions",
    description: "Event-driven CI/CD and repository automation.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="github"></i> Pipeline Optimization</h4>
              <p class="rich-text">Engineered automated workflows utilizing GitHub Actions to standardize testing, container builds, and deployment rollouts, establishing a highly responsive development process.</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "deploy.yml",
        content: `name: Production Rollout
on:
  push:
    branches: [ "main" ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Authenticate to Cloud
      uses: google-github-actions/auth@v1
      with:
        credentials_json: '\${{ secrets.GCP_CREDENTIALS }}'`
      }
    ]
  },
  "python": {
    title: "Python Scripting",
    description: "Developing robust automation and operational scripts.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="terminal"></i> Operations Automation</h4>
              <p class="rich-text">Engineered advanced Python and Bash scripts to automate complex cloud deployments, enabling quicker releases, reducing manual toil, and ensuring repeatable infrastructure provisioning.</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "cleanup_automation.py",
        content: `import boto3
from datetime import datetime, timezone

def cleanup_stale_snapshots():
    ec2 = boto3.client('ec2')
    snapshots = ec2.describe_snapshots(OwnerIds=['self'])['Snapshots']
    
    for snap in snapshots:
        age_days = (datetime.now(timezone.utc) - snap['StartTime']).days
        if age_days > 30:
            ec2.delete_snapshot(SnapshotId=snap['SnapshotId'])
            print(f"Deleted stale snapshot: {snap['SnapshotId']}")`
      }
    ]
  },
  "helm": {
    title: "Helm Package Management",
    description: "Templating and deploying complex Kubernetes applications.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="package"></i> Microservices Templating</h4>
              <p class="rich-text">Leveraged Helm and Kustomize to package, configure, and seamlessly deploy multi-tier applications across diverse Kubernetes environments (AKS, EKS, GKE).</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "values.yaml",
        content: `replicaCount: 3
image:
  repository: my-enterprise-repo/core-api
  pullPolicy: IfNotPresent
  tag: "v2.4.1"

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi`
      }
    ]
  },
  "java": {
    title: "Java Application Support",
    description: "Building pipelines and containerizing Java-based enterprise software.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="coffee"></i> Software Engineering</h4>
              <p class="rich-text">Supported the software engineering lifecycle by optimizing build processes (Maven/Gradle) and securely containerizing Java backend services for reliable cloud deployments.</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: "Dockerfile",
        content: `FROM maven:3.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/api-service.jar .
ENTRYPOINT ["java", "-jar", "api-service.jar"]`
      }
    ]
  },
  "gitlab": {
    title: "GitLab Source & CI",
    description: "Managing code repositories and integrated pipelines.",
    tabs: [
      {
        name: "Visual UI",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="git-commit"></i> Source Control & CI</h4>
              <p class="rich-text">Managed source code repositories and utilized integrated CI/CD toolchains to enforce code quality, run security scans, and automate releases across agile sprints.</p>
            </div>
          </div>
        `
      },
      {
        name: "Raw Code",
        type: "code",
        filename: ".gitlab-ci.yml",
        content: `stages:
  - test
  - deploy

run_unit_tests:
  stage: test
  image: python:3.9
  script:
    - pip install pytest
    - pytest tests/

deploy_production:
  stage: deploy
  script:
    - bash scripts/deploy_to_k8s.sh
  only:
    - main`
      }
    ]
  },

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
    lucide.createIcons(); // Re-render injected icons
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
        
        // 1. Trigger the Visual UI Stepper above
        triggerPipelineRun(); 
        
        // 2. Smooth scroll the user slightly so they see both the terminal and the pipeline
        document.getElementById("pipeline-sim").scrollIntoView({ behavior: "smooth", block: "center" });

        // 3. Print the simulated logs directly into the terminal with realistic delays!
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

      // Print initial response immediately
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
  // Intersection Observer setup
  const observerOptions = {
    root: null,
    // Triggers when the block hits the middle 40% of the screen
    rootMargin: '-30% 0px -30% 0px', 
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 1. Highlight the active text block
        scrollBlocks.forEach(b => b.classList.remove('active'));
        entry.target.classList.add('active');

        // 2. Crossfade to the corresponding IDE window
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

  // Observe all scroll blocks
  scrollBlocks.forEach(block => observer.observe(block));
}