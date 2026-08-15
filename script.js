// Initialize Icons
lucide.createIcons();

// =========================================================
// LIGHT/DARK MODE TOGGLE (FIXED LUCIDE ICON SWAP)
// =========================================================
// function toggleTheme() {
//   const body = document.body;
//   const themeContainer = document.querySelector(".theme-switch");
  
//   if (body.getAttribute("data-theme") === "light") {
//     // Switch to Dark Mode
//     body.removeAttribute("data-theme");
//     // Inject fresh sun icon
//     themeContainer.innerHTML = '<i id="theme-icon" data-lucide="sun"></i>';
//   } else {
//     // Switch to Light Mode
//     body.setAttribute("data-theme", "light");
//     // Inject fresh moon icon
//     themeContainer.innerHTML = '<i id="theme-icon" data-lucide="moon"></i>';
//   }
  
//   // Force Lucide to render the newly injected icon
//   lucide.createIcons();
// }

// Mouse Tracking for JetBrains Cursor Spotlight
document.addEventListener("mousemove", (e) => {
  const card = e.target.closest(".card, .project-card, .dashboard-section, .rich-content-container, .ide-window, .hero-cta-btn, .summary-card, .jb-skill-card, .jb-skill-card");
  if (card) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }
});

// Modal Module Data Strategy
const moduleData = {
  // ----------------------------------------------------
  // CLOUD PROVIDERS
  // ----------------------------------------------------
  "aws": {
    title: "Amazon Web Services (AWS)",
    description: "AWS is a comprehensive cloud platform offering compute, storage, database, and networking services.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Built and maintained resilient multi-tenant environments to enable reliable operations and effortless scaling of applications.</p>
              <ul class="rich-list">
                <li>Managed EC2, S3, RDS, DynamoDB, Lambda, and EKS deployments across the cloud infrastructure.</li>
                <li>Migrated on-premises applications to AWS, ensuring minimal downtime and seamless integration.</li>
                <li>Established IAM roles, policies, and security groups to mitigate breaches and exceed compliance audit requirements.</li>
                <li>Implemented comprehensive monitoring and alerting using AWS CloudWatch, CloudTrail, and Prometheus.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "IaC Example",
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
    title: "Microsoft Azure",
    description: "Azure is a public cloud computing platform providing scalable computing, analytics, storage, and IAM networking.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Engineered automated deployments and maintained infrastructure across hybrid environments, including Azure resources and on-premises OpenShift clusters.</p>
              <ul class="rich-list">
                <li>Provisioned and managed Azure Compute, Blob, Cosmos DB, and Azure Kubernetes Service (AKS).</li>
                <li>Configured Azure Entra ID, RBAC policies, and security groups to strictly control access to critical services.</li>
                <li>Migrated legacy applications to the Azure cloud, improving application responsiveness and reliability.</li>
                <li>Utilized Azure Monitor and Prometheus to analyze performance bottlenecks and usage trends for cost optimization.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "IaC Example",
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
    title: "Google Cloud Platform (GCP)",
    description: "GCP is a suite of cloud services that runs on the same infrastructure Google uses internally, offering high-performance compute and data analytics.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Managed containerized microservices and automated cloud deployments while strictly enforcing Site Reliability Engineering (SRE) practices.</p>
              <ul class="rich-list">
                <li>Provisioned multi-tenant GCP environments including GCS, Compute Engine, Cloud SQL, and GKE.</li>
                <li>Implemented SRE practices by defining SLIs/SLOs and error budgets to maintain system reliability.</li>
                <li>Established GCP Projects, Service Accounts, and IAM roles to exceed industry security compliance standards.</li>
                <li>Unified observability and incident response using GCP Stackdriver and Prometheus.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "SRE Config",
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

  // ----------------------------------------------------
  // ORCHESTRATION & CONTAINERS
  // ----------------------------------------------------
  "docker": {
    title: "Docker",
    description: "Docker is a software platform that allows developers to package applications into lightweight, standardized executable components called containers.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Leveraged Docker to decouple applications from underlying infrastructure, ensuring consistency across development and production.</p>
              <ul class="rich-list">
                <li>Deployed and managed containerized microservices across diverse cloud environments.</li>
                <li>Reduced infrastructure costs through highly efficient resource utilization and optimized container footprints.</li>
                <li>Integrated Docker builds seamlessly into enterprise CI/CD pipelines.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Dockerfile",
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
    title: "Kubernetes (K8s)",
    description: "Kubernetes is an open-source container orchestration system for automating application deployment, scaling, and operational management.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Administered large-scale, high-availability Kubernetes clusters (AKS, EKS, GKE) to ensure reliable microservice operations.</p>
              <ul class="rich-list">
                <li>Enhanced system reliability through self-healing configurations and automated scaling.</li>
                <li>Implemented stringent K8s security best practices, utilizing IAM, HashiCorp Vault, and Secrets Manager.</li>
                <li>Successfully reduced security incidents by 60% through rigorous policy enforcement.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Security Manifest",
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
  "helm": {
    title: "Helm",
    description: "Helm is the package manager for Kubernetes, used to define, install, and upgrade complex Kubernetes applications using Charts.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Utilized Helm and Kustomize to standardize microservice deployments and simplify cluster configuration management.</p>
              <ul class="rich-list">
                <li>Packaged microservices into reusable Helm Charts for rapid, repeatable deployments across multiple environments.</li>
                <li>Managed complex YAML templating to ensure environment-specific configurations were securely injected at runtime.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Values YAML",
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
    memory: 512Mi`
      }
    ]
  },
  "openshift": {
    title: "Red Hat OpenShift",
    description: "OpenShift is an enterprise-grade Kubernetes platform built for a hybrid cloud strategy, offering enhanced security and developer tools.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Administered enterprise on-premises container platforms, ensuring seamless interoperability with public cloud resources.</p>
              <ul class="rich-list">
                <li>Managed the commissioning and decommissioning of on-premises OpenShift clusters within hybrid-cloud ecosystems.</li>
                <li>Ensured optimal resource utilization and strict cost control across physical and cloud hardware.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Route Config",
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

  // ----------------------------------------------------
  // IAC, CI/CD & SCRIPTING
  // ----------------------------------------------------
  "terraform": {
    title: "Terraform",
    description: "Terraform is an Infrastructure as Code (IaC) tool by HashiCorp used to provision and manage cloud resources safely and predictably.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Acted as the primary IaC architect to enforce infrastructure consistency and prevent manual configuration drift.</p>
              <ul class="rich-list">
                <li>Built and maintained resilient multi-tenant environments across AWS, Azure, and GCP using modular Terraform code.</li>
                <li>Automated the provisioning of networking (VPCs), computing, databases, and IAM access controls.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Terraform Module",
        type: "code",
        filename: "modules.tf",
        content: `module "multi_tenant_cluster" {
  source              = "./modules/k8s-engine"
  cluster_name        = "prod-hybrid-cluster"
  kubernetes_version  = "1.27"
  enable_auto_scaling = true
  min_count           = 3
  max_count           = 10
}`
      }
    ]
  },
  "github": {
    title: "GitHub Actions",
    description: "GitHub Actions is a CI/CD platform that automates software workflows, allowing for build, test, and deployment pipelines directly within GitHub.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Engineered automated, event-driven workflows to standardize the software delivery process.</p>
              <ul class="rich-list">
                <li>Built and optimized CI/CD pipelines to drastically improve deployment speed, frequency, and overall reliability.</li>
                <li>Automated security scans, linting, and container builds triggered by repository pull requests.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Workflow YAML",
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
    - name: Run SonarQube Analysis
      run: bash scripts/sonar-scan.sh`
      }
    ]
  },
  "jenkins": {
    title: "Jenkins",
    description: "Jenkins is a widely used open-source automation server that enables developers to reliably build, test, and deploy their software.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Designed and maintained enterprise-grade automation pipelines to support agile development cycles.</p>
              <ul class="rich-list">
                <li>Optimized legacy CI/CD pipelines using Jenkins to improve deployment speed and release reliability.</li>
                <li>Integrated Jenkins with diverse toolchains including Docker, SonarQube, and Kubernetes deployment scripts.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Jenkinsfile",
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
  "gitlab": {
    title: "GitLab",
    description: "GitLab is a comprehensive DevSecOps platform delivered as a single application, providing source code management and CI/CD.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Facilitated secure version control and integrated pipeline automation for development teams.</p>
              <ul class="rich-list">
                <li>Managed source code repositories and enforced version control best practices across agile sprints.</li>
                <li>Utilized integrated pipelines to automate testing and code-quality enforcement prior to cloud deployments.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "GitLab CI",
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
  "python": {
    title: "Python & Shell Scripting",
    description: "Python and BASH are versatile scripting languages essential for system administration, automation, and infrastructure operations.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Developed robust operational scripts to eliminate manual toil and streamline complex processes.</p>
              <ul class="rich-list">
                <li>Engineered advanced Python, Shell, and Bash scripts to automate cloud deployments.</li>
                <li>Enabled quicker release cycles and a more responsive development process by scripting repetitive administrative tasks.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Automation Script",
        type: "code",
        filename: "cleanup.py",
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
  "java": {
    title: "Java Ecosystem",
    description: "Java is a widely-used object-oriented programming language popular for building robust, enterprise-grade backend services.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Supported developers by standardizing the build and deployment processes for enterprise Java applications.</p>
              <ul class="rich-list">
                <li>Optimized build systems using Maven/Gradle to integrate seamlessly into CI/CD pipelines.</li>
                <li>Securely containerized Java backend microservices (e.g., Spring Boot) to ensure reliable, scalable operations on Kubernetes.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Java Dockerfile",
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

// Function to move the slider behind the active text
function updateSliderPosition() {
  const activePill = document.querySelector('.nav-pill.active');
  if (activePill && navSlider) {
    navSlider.style.width = `${activePill.offsetWidth}px`;
    navSlider.style.height = `${activePill.offsetHeight}px`;
    navSlider.style.left = `${activePill.offsetLeft}px`;
    navSlider.style.top = `${activePill.offsetTop}px`;
  }
}

if (navPills.length > 0 && scrollSections.length > 0 && stickyNav) {
  
  updateSliderPosition(); 
  window.addEventListener('resize', updateSliderPosition);

  window.addEventListener('scroll', () => {
    let currentId = '';
    const firstSectionTop = scrollSections[0].offsetTop;
    
    if (window.scrollY >= (firstSectionTop - 150)) { 
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
}

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

// Calculates the exact color blend between two points
function lerpColor(start, end, t) {
  return Math.round(start + (end - start) * t);
}

function colorLoop() {
  const current = jbColors[colorIndex];
  const next = jbColors[nextColorIndex];

  // Calculate the current frame's mixed RGB value
  const r = lerpColor(current.r, next.r, colorProgress);
  const g = lerpColor(current.g, next.g, colorProgress);
  const b = lerpColor(current.b, next.b, colorProgress);

  // Push the color to the website
  document.documentElement.style.setProperty('--theme-rgb', `${r}, ${g}, ${b}`);

  colorProgress += 0.003; 

  // When a color transition finishes, queue up the next one
  if (colorProgress >= 1) {
    colorProgress = 0;
    colorIndex = nextColorIndex;
    nextColorIndex = (colorIndex + 1) % jbColors.length;
  }
  
  // Keep the loop running
  colorAnimFrame = requestAnimationFrame(colorLoop);
}

function toggleColorCycle() {
  isColorCycling = !isColorCycling;
  const icon = document.getElementById('color-cycle-icon');
  
  if (isColorCycling) {
    // TURN ON: Start spinning and resume color loop where it left off
    icon.classList.add('color-spinning'); 
    if (!colorAnimFrame) {
      colorLoop();
    }
  } else {
    // TURN OFF: Stop spinning and instantly FREEZE the color right where it is
    icon.classList.remove('color-spinning');
    if (colorAnimFrame) {
      cancelAnimationFrame(colorAnimFrame);
      colorAnimFrame = null;
    }
  }
}

// Immediately stops any animation and snaps the site back to Base Purple
function resetColorTheme() {
  // 1. Stop the animation engine if it's currently running
  if (colorAnimFrame) {
    cancelAnimationFrame(colorAnimFrame);
    colorAnimFrame = null;
  }
  
  // 2. Turn off the spinning state
  isColorCycling = false;
  document.getElementById('color-cycle-icon').classList.remove('color-spinning');
  
  // 3. Reset the engine's internal memory back to the start
  colorIndex = 0;
  nextColorIndex = 1;
  colorProgress = 0;
  
  // 4. Instantly push the Base Purple (Index 0) to the entire website
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

// Adjust volumes to mix perfectly (Hover should be quietest, Select loudest)
hoverSound.volume = 0.3; 
selectSound.volume = 0.5; 
closeSound.volume = 0.4;

let isSoundUnlocked = false;

// 2. Unlock all audio on the user's first click
document.addEventListener('click', () => {
  isSoundUnlocked = true;
}, { once: true });

// 3. Universal play function (with the overlapping cloning trick)
function playAudio(audioElement) {
  if (!isSoundUnlocked) return;
  const soundClone = audioElement.cloneNode();
  soundClone.volume = audioElement.volume;
  soundClone.play().catch(err => { /* Fails silently if browser blocks */ });
}

// 4. Attach Hover and Select sounds
const interactiveElements = document.querySelectorAll(
  'a, button, .card, .tech-item, .ide-window, .nav-pill, .logo, .theme-switch, .jb-skill-card, .clickable-card'
);

interactiveElements.forEach(el => {
  // Play HOVER sound when mouse enters
  el.addEventListener('mouseenter', () => playAudio(hoverSound));
  
  // Play SELECT sound on click... EXCEPT if it's the close button!
  if (!el.classList.contains('modal-close-btn')) {
    el.addEventListener('click', () => playAudio(selectSound));
  }
});

// 5. Attach CLOSE sound specifically to dismiss actions
const closeBtn = document.querySelector('.modal-close-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => playAudio(closeSound));
}

const modalOverlay = document.getElementById('modal-overlay');
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    // Only play the close sound if they clicked the dark background, not the modal box itself
    if (e.target.id === 'modal-overlay') {
      playAudio(closeSound);
    }
  });
}