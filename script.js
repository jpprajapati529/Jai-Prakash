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
// Mouse Tracking for JetBrains Cursor Spotlight
document.addEventListener("mousemove", (e) => {
  // THE FIX: Removed '.summary-card' from the selector list so it doesn't steal the hover coordinates from '.dashboard-section'
  const card = e.target.closest(".card, .project-card, .dashboard-section, .rich-content-container, .ide-window, .jb-skill-card, .hero-btn-primary, .hero-btn-outline, .lifecycle-btn");
  
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

  "azure-devops": {
    title: "Microsoft Azure DevOps",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <svg style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));" viewBox="0 0 128 128">
            <path fill="#0078D4" d="M120.89 28.445v69.262l-28.445 23.324-44.09-16.07v15.93L23.395 88.25l72.746 5.688V31.574ZM96.64 31.93 55.82 7.11v16.285L18.348 34.418 7.109 48.852v32.785l16.075 7.11V46.718Zm0 0"/>
          </svg>
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          Azure DevOps is an end-to-end software delivery platform providing agile planning, source control, automated multi-stage CI/CD pipelines, and package management.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "Core Services",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="layers"></i> Azure DevOps Suite</h4>
            <table class="notes-table">
              <thead><tr><th>Service</th><th>DevOps Role</th></tr></thead>
              <tbody>
                <tr><td>Azure Pipelines</td><td>Cloud-hosted CI/CD engine supporting multi-stage YAML pipelines across Linux, macOS, and Windows.</td></tr>
                <tr><td>Azure Repos</td><td>Unlimited cloud-hosted private Git repositories with pull request policies and branch protections.</td></tr>
                <tr><td>Azure Boards</td><td>Agile project management tools (Kanban, Scrum, Sprint tracking, backlog grooming).</td></tr>
                <tr><td>Azure Artifacts</td><td>Integrated package management for Maven, npm, NuGet, and Python package feeds.</td></tr>
                <tr><td>Azure Test Plans</td><td>Manual and exploratory testing toolkit for enterprise quality assurance.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Pipeline YAML",
        type: "code",
        filename: "azure-pipelines.yml",
        content: `trigger:
  branches:
    include:
      - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  azureSubscription: 'Fintech-Service-Connection'
  acrName: 'crfintechprod.azurecr.io'
  imageName: 'fintech-api'

stages:
- stage: BuildAndScan
  displayName: 'Build & Security Scan'
  jobs:
  - job: Build
    steps:
    - task: Docker@2
      displayName: 'Build Docker Image'
      inputs:
        command: build
        repository: $(imageName)
        tags: $(Build.BuildId)

- stage: DeployToAKS
  displayName: 'Deploy to Kubernetes'
  dependsOn: BuildAndScan
  condition: succeeded()
  jobs:
  - deployment: Deploy
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: KubernetesManifest@1
            displayName: 'Deploy Manifests to AKS'
            inputs:
              action: 'deploy'
              connectionType: 'azureResourceManager'
              azureSubscriptionConnection: $(azureSubscription)
              manifests: 'k8s/*.yaml'`
      },
      {
        name: "Key Concepts",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="shield-check"></i> Enterprise CI/CD Governance</h4>
            <table class="notes-table">
              <thead><tr><th>Feature</th><th>Implementation Details</th></tr></thead>
              <tbody>
                <tr><td>Service Connections</td><td>Secure, credential-less authentication to Azure via Entra ID Service Principals and Workload Identity.</td></tr>
                <tr><td>Self-Hosted Agents</td><td>Custom build agents deployed in private virtual networks for building internal applications securely.</td></tr>
                <tr><td>Variable Groups</td><td>Centralized configuration management with direct integration to Azure Key Vault secrets.</td></tr>
                <tr><td>Branch Policies</td><td>Enforcing mandatory code reviews, successful build validations, and resolved work items before merge.</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ]
  },

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
        content: `#!/bin/bash\nset -e\n\nBACKUP_DIR="/var/backups/etcd"\nDATE=$(date +%Y-%m-%d-%H-%M)\n\necho "[INFO] Starting etcd snapshot..."\nETCDCTL_API=3 etcdctl snapshot save \${BACKUP_DIR}/snapshot-\${DATE}.db \\\n  --endpoints=https://127.0.0.1:2379 \\\n  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n  --cert=/etc/kubernetes/pki/etcd/server.crt \\\n  --key=/etc/kubernetes/pki/etcd/server.key\n\necho "[INFO] Snapshot successful. Syncing to S3..."\naws s3 cp \${BACKUP_DIR}/snapshot-\${DATE}.db s3://company-k8s-backups/etcd/`
      }
    ]
  },

  // ----------------------------------------------------
  // TECH STACK MARQUEE MODALS (RESTORED)
  // ----------------------------------------------------
  "aws": {
    title: "Amazon Web Services",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <img src="https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg" style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          AWS provides on-demand cloud computing platforms and APIs, enabling highly scalable, resilient, and secure DevOps infrastructure architectures.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "DevOps Services",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="cloud"></i> Core Infrastructure</h4>
            <table class="notes-table">
              <thead><tr><th>Service</th><th>Purpose in DevOps</th></tr></thead>
              <tbody>
                <tr><td>Amazon EKS</td><td>Managed Kubernetes service for orchestrating containerized microservices at scale.</td></tr>
                <tr><td>Amazon ECR</td><td>Secure container image registry for storing and scanning Docker deployment artifacts.</td></tr>
                <tr><td>Amazon S3</td><td>Highly durable object storage, essential for Terraform remote state files and backups.</td></tr>
                <tr><td>AWS IAM</td><td>Identity and Access Management for enforcing strict least-privilege security policies.</td></tr>
                <tr><td>Amazon RDS</td><td>Managed relational databases ensuring automated failover, scaling, and high availability.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Terraform Configurations",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 20px;">
            <h4 class="notes-heading"><i data-lucide="box"></i> EKS Cluster Provisioning</h4>
            <div class="notes-code-block">module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "prod-fintech-cluster"
  cluster_version = "1.29"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  eks_managed_node_groups = {
    default = {
      min_size       = 2
      max_size       = 10
      desired_size   = 3
      instance_types = ["t3.large"]
    }
  }
}</div>
          </div>

          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="shield"></i> IAM Policy for CI/CD S3 Access</h4>
            <div class="notes-code-block">resource "aws_iam_policy" "terraform_state" {
  name        = "TerraformStateAccess"
  description = "Allows CI/CD pipeline to access remote state"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action   = ["s3:GetObject", "s3:PutObject"]
      Effect   = "Allow"
      Resource = "arn:aws:s3:::tf-prod-state-bucket/*"
    }]
  })
}</div>
          </div>
        `
      }
    ]
  },


"azure": {
    title: "Microsoft Azure",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <img src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); object-fit: contain;">
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          Microsoft Azure provides enterprise-grade cloud computing services, specializing in hybrid-cloud deployments, robust IAM networking, and scalable Kubernetes architectures.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "Architectures",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="network"></i> Core Azure Architectures</h4>
            <table class="notes-table">
              <thead><tr><th>Pattern</th><th>Use Case & Implementation</th></tr></thead>
              <tbody>
                <tr><td>Hub-and-Spoke</td><td>Centralizes traffic routing, firewall inspection, and shared services (Hub) while isolating workloads (Spokes) via VNet peering.</td></tr>
                <tr><td>Azure Landing Zones</td><td>Enterprise-scale architecture providing pre-configured governance, networking, and identity foundations.</td></tr>
                <tr><td>Multi-Region HA</td><td>Achieving 99.99% availability using Azure Front Door or Traffic Manager to route users to the closest active region.</td></tr>
                <tr><td>Hybrid Connectivity</td><td>Integrating on-premises datacenters with Azure using ExpressRoute or Site-to-Site VPNs for secure, low-latency access.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "DevOps Services",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="cloud-snow"></i> Key Azure DevOps Services</h4>
            <table class="notes-table">
              <thead><tr><th>Service</th><th>DevOps Purpose</th></tr></thead>
              <tbody>
                <tr><td>Azure Kubernetes Service (AKS)</td><td>Managed K8s service for deploying and scaling containerized applications with built-in Entra ID integration.</td></tr>
                <tr><td>Azure Container Registry (ACR)</td><td>Private registry for securely building, storing, and scanning Docker images and OCI artifacts.</td></tr>
                <tr><td>Azure Key Vault</td><td>Centralized, highly secure storage for API keys, passwords, certificates, and cryptographic keys.</td></tr>
                <tr><td>Microsoft Entra ID</td><td>(Formerly Azure AD) Comprehensive identity and access management for implementing strict RBAC and Zero Trust.</td></tr>
                <tr><td>Azure Monitor & Log Analytics</td><td>Full-stack observability platform for collecting telemetry, setting up alerts, and analyzing application performance.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Terraform Configurations",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 20px;">
            <h4 class="notes-heading"><i data-lucide="box"></i> AKS Cluster Provisioning</h4>
            <div class="notes-code-block">resource "azurerm_kubernetes_cluster" "aks_cluster" {
  name                = "prod-banking-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "prodaks"

  default_node_pool {
    name           = "systempool"
    node_count     = 3
    vm_size        = "Standard_DS2_v2"
    vnet_subnet_id = azurerm_subnet.aks_subnet.id
  }

  identity {
    type = "SystemAssigned"
  }
}</div>
          </div>

          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="shield-check"></i> Azure RBAC Role Assignment (AKS to ACR)</h4>
            <div class="notes-code-block">resource "azurerm_role_assignment" "aks_acr_pull" {
  principal_id                     = azurerm_kubernetes_cluster.aks_cluster.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}</div>
          </div>
        `
      }
    ]
  },
  "gcp": {
    title: "Google Cloud Platform",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); object-fit: contain;">
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          Google Cloud Platform (GCP) provides highly scalable, globally distributed infrastructure, specializing in containerized workloads and SRE-driven operations.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "Architectures",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="network"></i> Core GCP Architectures</h4>
            <table class="notes-table">
              <thead><tr><th>Pattern</th><th>Use Case & Implementation</th></tr></thead>
              <tbody>
                <tr><td>Shared VPC</td><td>Allows an organization to connect resources from multiple isolated projects to a common, centralized Virtual Private Cloud network.</td></tr>
                <tr><td>Hub-and-Spoke</td><td>Centralizes network traffic routing and security inspections by linking remote spoke VPCs through a central transit hub VPC.</td></tr>
                <tr><td>Global Load Balancing</td><td>Distributes global external traffic to the closest backend region via a single anycast IP, ensuring massive scale and low latency.</td></tr>
                <tr><td>Private Google Access</td><td>Allows internal VM instances or GKE nodes without external IP addresses to securely reach Google APIs and services.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "DevOps Services",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="cloud-lightning"></i> Key GCP DevOps Services</h4>
            <table class="notes-table">
              <thead><tr><th>Service</th><th>DevOps Purpose</th></tr></thead>
              <tbody>
                <tr><td>Google Kubernetes Engine (GKE)</td><td>Managed, enterprise-grade Kubernetes service for deploying containerized applications at immense scale.</td></tr>
                <tr><td>Cloud Build</td><td>Serverless CI/CD platform that executes builds across multiple environments and natively triggers via Git workflows.</td></tr>
                <tr><td>Artifact Registry</td><td>Universal package manager for securely storing Docker container images, Helm charts, and language packages.</td></tr>
                <tr><td>Cloud IAM & Service Accounts</td><td>Granular identity and access management for securely controlling workload permissions and human access.</td></tr>
                <tr><td>Cloud Operations (Stackdriver)</td><td>Integrated monitoring, logging, and tracing for defining SLIs/SLOs, alerting, and SRE observability.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Terraform Configurations",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 20px;">
            <h4 class="notes-heading"><i data-lucide="box"></i> GKE Private Cluster Provisioning</h4>
            <div class="notes-code-block">resource "google_container_cluster" "primary" {
  name     = "prod-gke-cluster"
  location = "asia-south1"

  remove_default_node_pool = true
  initial_node_count       = 1

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "172.16.0.0/28"
  }
}</div>
          </div>

          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="user-check"></i> Service Account IAM Role Binding</h4>
            <div class="notes-code-block">resource "google_project_iam_member" "gke_admin" {
  project = "capgemini-fintech-prod"
  role    = "roles/container.admin"
  member  = "serviceAccount:terraform-sa@capgemini-fintech-prod.iam.gserviceaccount.com"
}</div>
          </div>
        `
      },
      {
        name: "SRE Config",
        type: "code",
        filename: "gcp_slo.yaml",
        content: `apiVersion: monitoring.googleapis.com/v3\nkind: ServiceLevelObjective\nmetadata:\n  name: gke-api-latency-slo\nspec:\n  goal: 0.99\n  rollingPeriod: 2592000s\n  serviceLevelIndicator:\n    requestBased:\n      distributionCut:\n        distributionFilter: metric.type="loadbalancing.googleapis.com/https/request_latencies"\n        range:\n          max: 250`
      }
    ]
  },


"docker": {
    title: "Docker",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); object-fit: contain;">
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          Docker is an open platform for developing, shipping, and running applications inside lightweight, isolated containers, ensuring consistency across environments.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "Architecture",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="layers"></i> Docker Client-Server Architecture</h4>
            <table class="notes-table">
              <thead><tr><th>Component</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>Docker Client</td><td>The primary user interface (CLI) that accepts user commands (<code>docker run</code>, <code>build</code>) and communicates with the daemon.</td></tr>
                <tr><td>Docker Daemon (dockerd)</td><td>Listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes.</td></tr>
                <tr><td>Docker Registry</td><td>A storage and distribution system for public and private images (e.g., Docker Hub, AWS ECR, GitHub Packages).</td></tr>
                <tr><td>Images & Containers</td><td>An Image is a read-only template with instructions; a Container is a runnable, isolated instance of an image.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Dockerfile",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="file-code"></i> Optimized Multi-Stage Dockerfile</h4>
            <div class="notes-code-block"># Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run the production application
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

USER node
EXPOSE 8080
CMD ["node", "dist/index.js"]</div>
          </div>
        `
      },
      {
        name: "Commands",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="terminal-square"></i> Essential Docker CLI Cheatsheet</h4>
            <table class="notes-table">
              <thead><tr><th>Command</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>docker build -t app:tag .</td><td>Builds a Docker image from a Dockerfile in the current directory.</td></tr>
                <tr><td>docker run -d -p 8080:80 app:tag</td><td>Runs a container in detached mode, mapping host port 8080 to container port 80.</td></tr>
                <tr><td>docker ps -a</td><td>Lists all containers (running and stopped) on the host.</td></tr>
                <tr><td>docker exec -it &lt;container&gt; sh</td><td>Opens an interactive shell session inside a running container.</td></tr>
                <tr><td>docker logs -f &lt;container&gt;</td><td>Streams live logs from a specified container instance.</td></tr>
                <tr><td>docker system prune -a</td><td>Removes all unused containers, networks, and unreferenced images.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Volumes",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="hard-drive"></i> Docker Storage & Volume Management</h4>
            <table class="notes-table">
              <thead><tr><th>Storage Type</th><th>Characteristics & Use Case</th></tr></thead>
              <tbody>
                <tr><td>Volumes</td><td>Managed entirely by Docker (stored in <code>/var/lib/docker/volumes/</code> on Linux). Ideal for persistent production data.</td></tr>
                <tr><td>Bind Mounts</td><td>Maps a file or directory from the host machine directly into the container. Highly used during local development for live code reloading.</td></tr>
                <tr><td>tmpfs Mounts</td><td>Stored only in the host system's memory and never written to disk. Used for high-security transient data storage.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Networks",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="wifi"></i> Docker Networking Drivers</h4>
            <table class="notes-table">
              <thead><tr><th>Network Driver</th><th>Description & Behavior</th></tr></thead>
              <tbody>
                <tr><td>Bridge (default)</td><td>A private network internal to the host. Containers on the same bridge can communicate; port mapping is required for external access.</td></tr>
                <tr><td>Host</td><td>Removes network isolation between the container and the Docker host, binding directly to host network interfaces.</td></tr>
                <tr><td>None</td><td>Completely disables all networking for the container (total isolation).</td></tr>
                <tr><td>Overlay</td><td>Connects multiple Docker daemons together, enabling swarm services and cross-host multi-container communication.</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ]
  },

  
  "kubernetes": {
    title: "Kubernetes (K8s)",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <img src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          Kubernetes is an open-source container orchestration system for automating application deployment, scaling, and operational management.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "Architecture",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 20px;">
            <h4 class="notes-heading"><i data-lucide="server"></i> Control Plane (Master Node)</h4>
            <table class="notes-table">
              <thead><tr><th>Component</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td>kube-apiserver</td><td>Front-end of the control plane; exposes the Kubernetes API.</td></tr>
                <tr><td>etcd</td><td>Consistent and highly-available key value store for cluster state.</td></tr>
                <tr><td>kube-scheduler</td><td>Assigns newly created Pods to available worker nodes.</td></tr>
                <tr><td>kube-controller-manager</td><td>Runs controller processes (Node, Replication, Endpoints, etc.).</td></tr>
              </tbody>
            </table>
          </div>
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="hard-drive"></i> Worker Node</h4>
            <table class="notes-table">
              <thead><tr><th>Component</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td>kubelet</td><td>Agent that ensures containers are running inside a Pod.</td></tr>
                <tr><td>kube-proxy</td><td>Maintains network rules on nodes, allowing network communication.</td></tr>
                <tr><td>Container Runtime</td><td>Software responsible for running containers (e.g., containerd, CRI-O).</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Manifests",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="file-json"></i> Core Workloads & Resources</h4>
            <table class="notes-table">
              <thead><tr><th>Resource</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>Deployment</td><td>Declarative updates for Pods and ReplicaSets; ideal for stateless apps.</td></tr>
                <tr><td>StatefulSet</td><td>Manages stateful apps, providing stable persistent storage and network IDs.</td></tr>
                <tr><td>DaemonSet</td><td>Ensures a copy of a specific Pod runs across all (or matching) cluster nodes.</td></tr>
                <tr><td>Service</td><td>An abstract way to expose an application running on a set of Pods.</td></tr>
                <tr><td>Ingress</td><td>Manages external access to services in a cluster, typically HTTP/HTTPS.</td></tr>
                <tr><td>ConfigMap / Secret</td><td>Separates configuration data and sensitive credentials from Pod code.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "RCA Guide",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="alert-triangle"></i> Pod Status & Troubleshooting</h4>
            <table class="notes-table">
              <thead><tr><th>Error State</th><th>Root Cause Analysis & Fix</th></tr></thead>
              <tbody>
                <tr><td>CrashLoopBackOff</td><td>Container fails repeatedly. Check logs (<code>kubectl logs</code>) for app crashes, missing env vars, or bad entrypoints.</td></tr>
                <tr><td>ImagePullBackOff</td><td>Kubelet cannot pull the image. Verify the image name/tag, registry auth (imagePullSecrets), or network egress.</td></tr>
                <tr><td>OOMKilled</td><td>Container exceeded its memory limit. Check <code>kubectl describe pod</code> and increase <code>resources.limits.memory</code>.</td></tr>
                <tr><td>Pending</td><td>Pod cannot be scheduled. Usually indicates insufficient node resources (CPU/Mem) or unmatched node selectors/taints.</td></tr>
                <tr><td>Evicted</td><td>Node resource starvation. The node is reclaiming resources by terminating lower-priority Pods.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Commands",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="terminal-square"></i> Kubectl Cheatsheet</h4>
            <table class="notes-table">
              <thead><tr><th>Command</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>kubectl get po,svc,no</td><td>List Pods, Services, and Nodes in the current namespace.</td></tr>
                <tr><td>kubectl describe pod &lt;pod&gt;</td><td>Show detailed resource states, events, and lifecycle history.</td></tr>
                <tr><td>kubectl logs -f &lt;pod&gt;</td><td>Stream live logs for a specific Pod (add <code>-c</code> for specific containers).</td></tr>
                <tr><td>kubectl exec -it &lt;pod&gt; -- sh</td><td>Open an interactive shell session inside a running container.</td></tr>
                <tr><td>kubectl apply -f &lt;file.yaml&gt;</td><td>Create or update resources declaratively from a manifest file.</td></tr>
                <tr><td>kubectl port-forward svc/&lt;svc&gt; 8080:80</td><td>Forward local port 8080 to service port 80 for isolated testing.</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ]
  },
"helm": {
    title: "Helm",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <img src="https://www.vectorlogo.zone/logos/helmsh/helmsh-icon.svg" style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); object-fit: contain;">
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          Helm is the package manager for Kubernetes, used to define, install, and upgrade even the most complex Kubernetes applications using reusable packaging templates called Charts.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "Architecture",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="layers"></i> Helm Core Architecture & Concepts</h4>
            <table class="notes-table">
              <thead><tr><th>Concept</th><th>Description & Role</th></tr></thead>
              <tbody>
                <tr><td>Helm Client</td><td>The command-line interface (CLI) for users to manage charts, create packages, and interact with repositories and clusters.</td></tr>
                <tr><td>Helm v3 Architecture</td><td>Unlike v2 which relied on Tiller, Helm v3 communicates directly with the Kubernetes API server using standard kubeconfig permissions.</td></tr>
                <tr><td>Chart</td><td>A bundle of information (YAML files and templates) describing a related set of Kubernetes resources.</td></tr>
                <tr><td>Release</td><td>An instance of a chart running in a Kubernetes cluster. The same chart can be installed multiple times.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Chart Files",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="folder-tree"></i> Standard Helm Chart Directory Structure</h4>
            <table class="notes-table">
              <thead><tr><th>File / Directory</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>Chart.yaml</td><td>Contains metadata about the chart, including its name, description, version, and application version.</td></tr>
                <tr><td>values.yaml</td><td>Defines default configuration values that can be injected into your templates at runtime.</td></tr>
                <tr><td>templates/</td><td>Directory containing valid Kubernetes YAML templates combined with <code>values.yaml</code>.</td></tr>
                <tr><td>templates/_helpers.tpl</td><td>Defines reusable template snippets, labels, and naming conventions.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Chart.yaml",
        type: "code",
        filename: "Chart.yaml",
        content: `apiVersion: v2
name: fintech-app
description: A Helm chart for enterprise microservice deployment
type: application
version: 0.1.0
appVersion: "1.4.2"`
      },
      {
        name: "values.yaml",
        type: "code",
        filename: "values.yaml",
        content: `replicaCount: 3

image:
  repository: registry.internal/fintech/core-api
  tag: "1.4.2"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80`
      },
      {
        name: "Deployment.yaml",
        type: "code",
        filename: "templates/deployment.yaml",
        content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "fintech-app.fullname" . }}
  labels:
    app.kubernetes.io/name: {{ include "fintech-app.name" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app.kubernetes.io/name: {{ include "fintech-app.name" . }}
  template:
    metadata:
      labels:
        app.kubernetes.io/name: {{ include "fintech-app.name" . }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }:%{ .Values.image.tag }}"
          ports:
            - containerPort: 80`
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
            </div>
          </div>
        `
      }
    ]
  },
"terraform": {
    title: "Terraform",
    // We put the Logo and Definition inside the description so it sits perfectly above the tabs!
    description: `
      <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 16px; margin-top: 0;">
        Terraform is an Infrastructure as Code (IaC) tool by HashiCorp used to provision and manage cloud resources safely and predictably.
      </p>
    `,
    tabs: [
      {
        name: "Key Concepts",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="layers"></i> Key Concepts</h4>
            <table class="notes-table">
              <thead><tr><th>Concept</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td>Provider</td><td>Plugin that communicates with AWS, Azure, GCP, etc.</td></tr>
                <tr><td>Resource</td><td>Infrastructure component such as VM, VNet, S3 bucket.</td></tr>
                <tr><td>Variable</td><td>Input value that makes configuration reusable.</td></tr>
                <tr><td>Output</td><td>Displays useful values after deployment.</td></tr>
                <tr><td>Module</td><td>Reusable Terraform configuration.</td></tr>
                <tr><td>State</td><td>Tracks infrastructure Terraform manages.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Written Files",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="folder-tree"></i> Written Files</h4>
            <table class="notes-table">
              <thead><tr><th>File</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>providers.tf</td><td>Configures the cloud provider plugins and their required versions.</td></tr>
                <tr><td>variables.tf</td><td>Defines input variables to make configuration reusable.</td></tr>
                <tr><td>main.tf</td><td>The primary entrypoint containing core infrastructure resources.</td></tr>
                <tr><td>outputs.tf</td><td>Displays useful values after deployment.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Core Commands",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="terminal-square"></i> Core Commands</h4>
            <table class="notes-table">
              <thead><tr><th>Command</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>terraform init</td><td>Initializes the working directory and downloads necessary plugins.</td></tr>
                <tr><td>terraform plan</td><td>Shows what Terraform will create/change/delete.</td></tr>
                <tr><td>terraform apply</td><td>Actually makes the changes.</td></tr>
                <tr><td>terraform destroy</td><td>Removes managed infrastructure.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Modular Example",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 20px;">
            <h4 class="notes-heading"><i data-lucide="cloud"></i> 1. Remote Backend & Provider (providers.tf)</h4>
            <div class="notes-code-block">terraform {
  backend "gcs" {
    bucket = "tf-state-prod-bucket"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}</div>
          </div>

          <div class="notes-section" style="margin-bottom: 20px;">
            <h4 class="notes-heading"><i data-lucide="box"></i> 2. GCS Resource (main.tf)</h4>
            <div class="notes-code-block">resource "google_storage_bucket" "app_bucket" {
  name          = var.bucket_name
  location      = var.region
  force_destroy = true

  uniform_bucket_level_access = true
}</div>
          </div>

          <div class="notes-section" style="margin-bottom: 20px;">
            <h4 class="notes-heading"><i data-lucide="sliders"></i> 3. Variables & Outputs (variables.tf / outputs.tf)</h4>
            <div class="notes-code-block"># variables.tf
            variable "project_id"  { type = string }
            variable "region"      { type = string, default = "us-central1" }
            variable "bucket_name" { type = string }

# outputs.tf
            output "bucket_url" {
            value = google_storage_bucket.app_bucket.url
            }</div>
          </div>

          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="settings"></i> 4. Execution Values (terraform.tfvars)</h4>
            <div class="notes-code-block">project_id  = "fin-prod"
              region      = "asia-south1"
              bucket_name = "fintech-app-assets-bucket"</div>
          </div>
        `
      }
    ]
  },

  "github": {
    title: "GitHub Actions",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <img src="https://www.vectorlogo.zone/logos/github/github-icon.svg" style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); object-fit: contain;">
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipelines.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "Components",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="cpu"></i> GitHub Actions Architecture</h4>
            <table class="notes-table">
              <thead><tr><th>Component</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>Workflow</td><td>A configurable automated process made up of one or more jobs, defined in a YAML file.</td></tr>
                <tr><td>Event</td><td>A specific activity in a repository that triggers a workflow (e.g., <code>push</code>, <code>pull_request</code>).</td></tr>
                <tr><td>Job</td><td>A set of steps executed on the same runner infrastructure. Jobs run in parallel by default.</td></tr>
                <tr><td>Step</td><td>An individual task that can run shell commands or execute composite actions.</td></tr>
                <tr><td>Action</td><td>A reusable extension or plugin for your workflow (custom code or Marketplace actions).</td></tr>
                <tr><td>Runner</td><td>A dedicated virtual server (Linux, Windows, macOS) that executes your workflow jobs.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Basic Pipeline",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="file-code"></i> Standard CI Pipeline (.github/workflows/ci.yml)</h4>
            <div class="notes-code-block">name: CI Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Set up Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install Dependencies & Run Tests
        run: |
          npm ci
          npm run test
          npm run build</div>
          </div>
        `
      }
    ]
  },
  
  "jenkins": {
    title: "Jenkins",
    description: `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px; margin-top: 0px;">
        <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);">
          <img src="https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg" style="width: 44px; height: 44px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); object-fit: contain;">
        </div>
        <p style="color: var(--text-secondary); max-width: 500px; font-size: 0.95rem; line-height: 1.6; margin: 0;">
          Jenkins is an open-source automation server that enables developers to reliably build, test, and deploy their software using extensible pipeline architectures.
        </p>
      </div>
    `,
    tabs: [
      {
        name: "Core Concepts",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="server"></i> Jenkins Architecture & Components</h4>
            <table class="notes-table">
              <thead><tr><th>Component</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>Controller (Master)</td><td>Orchestrates the build lifecycle, schedules jobs, dispatches builds to agents, and manages plugins.</td></tr>
                <tr><td>Agents (Slaves)</td><td>Dedicated worker nodes that execute the actual build jobs assigned by the controller.</td></tr>
                <tr><td>Plugins</td><td>Over 1,800+ community extensions integrating Git, Docker, Kubernetes, AWS, and security tools.</td></tr>
                <tr><td>Credentials Store</td><td>Securely manages API tokens, SSH keys, and passwords using encrypted token storage.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        name: "Jenkinsfile",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="file-code"></i> Enterprise Declarative Jenkinsfile</h4>
            <div class="notes-code-block">pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'registry.internal/prod'
        APP_IMAGE       = 'core-api'
    }
    stages {
        stage('Checkout & Lint') {
            steps {
                checkout scm
                sh 'mvn clean verify'
            }
        }
        stage('Build & Push Docker') {
            steps {
                script {
                    docker.withRegistry('https://registry.internal', 'dockerhub-creds') {
                        def img = docker.build("\${DOCKER_REGISTRY}/\${APP_IMAGE}:\${env.BUILD_ID}")
                        img.push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl set image deployment/core-api api=\${DOCKER_REGISTRY}/\${APP_IMAGE}:\${env.BUILD_ID} -n production'
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check console logs.'
        }
    }
}</div>
          </div>
        `
      },
      {
        name: "Best Practices",
        type: "html",
        content: `
          <div class="notes-section" style="margin-bottom: 0;">
            <h4 class="notes-heading"><i data-lucide="shield-check"></i> Security & Scaling Standards</h4>
            <table class="notes-table">
              <thead><tr><th>Practice</th><th>Implementation Details</th></tr></thead>
              <tbody>
                <tr><td>As Code</td><td>Always use a version-controlled <code>Jenkinsfile</code> rather than configuring jobs manually via the UI.</td></tr>
                <tr><td>Shared Libraries</td><td>Extract reusable pipeline logic into Groovy-based Shared Libraries to keep repositories DRY.</td></tr>
                <tr><td>Ephemeral Agents</td><td>Provision dynamic Docker or Kubernetes agents instead of permanent physical build servers.</td></tr>
                <tr><td>Role-Based Access</td><td>Enforce strict Role-Based Access Control (RBAC) to limit who can trigger or modify production jobs.</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ]
  },

  "gitlab": {
    title: "GitLab",
    description: "GitLab is a comprehensive DevSecOps platform.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Facilitated secure version control and integrated pipeline automation.</p>
            </div>
          </div>
        `
      }
    ]
  },
  "python": {
    title: "Python & Shell Scripting",
    description: "Python and BASH are versatile scripting languages essential for system administration.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Developed robust operational scripts to eliminate manual toil.</p>
            </div>
          </div>
        `
      }
    ]
  },
  "java": {
    title: "Java Ecosystem",
    description: "Java is an object-oriented programming language for building robust backend services.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Supported developers by standardizing build and deployment processes.</p>
            </div>
          </div>
        `
      }
    ]
  },

// ----------------------------------------------------
  // METRIC CARD MODULES (From Resume)
  // ----------------------------------------------------
  "roles": {
    title: "Roles & Responsibilities",
    description: "Driving cloud-native transformations and establishing robust Platform Engineering practices.",
    tabs: [
      {
        name: "Core Impact",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="server"></i> Infrastructure & Deployments</h4>
              <ul class="rich-list">
                <li>Built and maintained resilient multi-tenant GCP environments with Terraform, enabling reliable operations and effortless scaling.</li>
                <li>Managed commissioning and decommissioning of hybrid cloud infrastructure across GCP and on-premises OpenShift clusters.</li>
                <li>Deployed and managed containerized microservices using Docker and Kubernetes (GKE).</li>
                <li>Engineered Python, Shell and Bash scripts to automate cloud deployments and workflows.</li>
                <li>Built and optimized CI/CD pipelines using GitHub Actions & Jenkins.</li>
              </ul>
            </div>
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="shield-check"></i> Security & SRE</h4>
              <ul class="rich-list">
                <li>Implemented Kubernetes security best practices using GCP IAM, HashiCorp Vault, and Secrets Manager, reducing incidents by 60%.</li>
                <li>Configured and audited Service Accounts, custom roles, and IAM policies for secure access to GCS, Compute, SQL, and Stackdriver.</li>
                <li>Implemented SRE practices by defining SLIs/SLOs and error budgets using Stackdriver and Prometheus for incident response.</li>
                <li>Migrated on-premises applications to the GCP cloud with minimal downtime.</li>
              </ul>
            </div>
          </div>
        `
      }
    ]
  },
  
  "domains": {
    title: "Fintech & Banking Infrastructure",
    description: "Managing highly secure hybrid-cloud environments with zero downtime deployments for financial operations.",
    tabs: [
      {
        name: "Domain Expertise",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="shield-check"></i> Compliance & Security</h4>
              <p class="rich-text">Maintained strict regulatory compliance for enterprise banking clients through rigorous IAM auditing, secure credential management via HashiCorp Vault, and continuous monitoring of cloud resources.</p>
              
              <h4 class="rich-heading"><i data-lucide="activity"></i> High Availability (SRE)</h4>
              <p class="rich-text">Ensured the continuous operation of critical financial services by establishing strict SLIs/SLOs, defining error budgets, and configuring resilient multi-region architectures.</p>
            </div>
          </div>
        `
      }
    ]
  },
  
  "experience": {
    title: "Professional Experience",
    description: "My professional journey building and scaling enterprise cloud platforms.",
    tabs: [
      {
        name: "Current Role",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="building-2"></i> Capgemini Technology Services</h4>
              <div class="metric-value" style="font-size: 1.2rem; color: #fff;">Senior Analyst</div>
              <div class="metric-sub" style="margin-bottom: 16px;">Pune, India | Dec 2022 - Present</div>
              <p class="rich-text">Transitioning from core DevOps to Platform Engineering, architecting multi-cloud environments and enabling developers with self-service infrastructure and automated pipelines.</p>
              <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top: 12px;">
                <span class="tag-badge">GCP</span>
                <span class="tag-badge">AWS</span>
                <span class="tag-badge">Terraform</span>
                <span class="tag-badge">GKE</span>
                <span class="tag-badge">OpenShift</span>
              </div>
            </div>
          </div>
        `
      }
    ]
  },
  
  "education": {
    title: "Education & Academics",
    description: "My academic foundation in Computer Science and Systems Engineering.",
    tabs: [
      {
        name: "Degree",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="graduation-cap"></i> B.Tech in Computer Science & Engineering</h4>
              <div class="metric-value" style="font-size: 1.2rem; color: #fff;">BIST, Bhopal</div>
              <div class="metric-sub" style="margin-bottom: 16px;">Aug 2018 - Jun 2022</div>
              <ul class="rich-list">
                <li><strong>CGPA:</strong> 8.0 / 10</li>
                <li>Developed core competencies in distributed systems, network architecture, and software development lifecycles.</li>
              </ul>
            </div>
          </div>
        `
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

// =========================================================
// DYNAMIC MODAL POP-UP (Tracks Click Position)
// =========================================================
let lastClickX = 0;
let lastClickY = 0;
let activeClickedNode = null;
let activeFloatingNode = null;

// Track clicks and capture the exact node element clicked
document.addEventListener('click', (e) => {
  lastClickX = e.clientX;
  lastClickY = e.clientY;
  
  const node = e.target.closest('.network-node, .jb-skill-card, .tech-item, .clickable-card');
  if (node) {
    activeClickedNode = node;
  }
}, true);

function openModuleModal(moduleId) {
  const data = moduleData[moduleId];
  if (!data) return;

  // Forcefully pause the slideshow while the modal is open
  clearInterval(slideInterval);

  document.getElementById("modal-title").innerText = data.title;

  // Dynamically place logos in header, or default box icon for others
  const iconContainer = document.getElementById("modal-header-icon-container");
  if (moduleId === 'terraform') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'aws') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'kubernetes') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'azure') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'gcp') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'docker') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'helm') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/helmsh/helmsh-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'github') {
    // Pure White Modern GitHub Logo
    iconContainer.innerHTML = `<svg style="width: 22px; height: 22px; fill: #ffffff;" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;
  } else if (moduleId === 'jenkins') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  }  else if (moduleId === 'azure-devops') {
    iconContainer.innerHTML = `
      <svg style="width: 22px; height: 22px;" viewBox="0 0 128 128">
        <path fill="#0078D4" d="M120.89 28.445v69.262l-28.445 23.324-44.09-16.07v15.93L23.395 88.25l72.746 5.688V31.574ZM96.64 31.93 55.82 7.11v16.285L18.348 34.418 7.109 48.852v32.785l16.075 7.11V46.718Zm0 0"/>
      </svg>
    `;
  } else {
    iconContainer.innerHTML = `<i id="modal-icon" data-lucide="box" style="color: var(--accent-purple);"></i>`;
    lucide.createIcons();
  }

  const descEl = document.getElementById("modal-description");
  if (data.description) {
    descEl.innerHTML = data.description;
    descEl.style.display = "block";
  } else {
    descEl.style.display = "none";
  }

  const tabsContainer = document.getElementById("modal-tabs");
  tabsContainer.innerHTML = "";

  if (data.tabs.length > 1) {
    tabsContainer.style.display = "flex";
    data.tabs.forEach((tab, index) => {
      const btn = document.createElement("button");
      btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
      btn.innerText = tab.name;
btn.onclick = () => {
        selectModalTab(data, index, btn);
        
        // Smoothly scroll the modal down to where the tabs start!
        const modalContent = document.querySelector('.modal-content');
        modalContent.scrollTo({
          top: tabsContainer.offsetTop - 24, // 24px padding leaves nice breathing room at the top
          behavior: 'smooth'
        });
      };
      tabsContainer.appendChild(btn);
    });
  } else {
    tabsContainer.style.display = "none";
  }

  selectModalTab(data, 0, tabsContainer.children[0]);

  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("align-left", "align-right", "align-center");

  const windowWidth = window.innerWidth;
  
  // Check if clicked node is specifically a Slide 2 network node
  const isNetworkNode = activeClickedNode && activeClickedNode.classList.contains('network-node');

  if (isNetworkNode) {
    if (lastClickX < windowWidth * 0.45) {
      overlay.classList.add("align-right");
    } else {
      overlay.classList.add("align-left");
    }
  } else {
    overlay.classList.add("align-center"); // Center modal for skills/cards
  }

  const modalContent = document.querySelector('.modal-content');
  const connectorPath = document.getElementById("modal-connector-path");

  // 1. Create unblurred floating node clone ONLY for Slide 2 network nodes
  if (isNetworkNode) {
    const rect = activeClickedNode.getBoundingClientRect();
    
    activeFloatingNode = activeClickedNode.cloneNode(true);
    activeFloatingNode.className = "floating-active-node";
    activeFloatingNode.style.top = `${rect.top}px`;
    activeFloatingNode.style.left = `${rect.left}px`;
    activeFloatingNode.style.width = `${rect.width}px`;
    activeFloatingNode.style.height = `${rect.height}px`;
    
    document.body.appendChild(activeFloatingNode);
    activeClickedNode.style.opacity = '0';
    if (connectorPath) connectorPath.style.display = "block";
  } else {
    if (connectorPath) connectorPath.style.display = "none"; // Hide tether for center cards
  }

  // 2. Initial setup for pop-up animation
  modalContent.style.transition = 'none';
  modalContent.style.opacity = '0';
  modalContent.style.transform = 'translate(0px, 0px) scale(1)';

  overlay.classList.add("active");

  // WE NEED THIS BACK! It calculates where the modal is so the tether can connect!
  const rectModal = modalContent.getBoundingClientRect(); 
  const finalCenterX = rectModal.left + rectModal.width / 2;
  const finalCenterY = rectModal.top + rectModal.height / 2;

  const deltaX = lastClickX - finalCenterX;
  const deltaY = lastClickY - finalCenterY;

  // Start tiny at the exact cursor click position
  modalContent.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
  
  // Force a clean browser repaint to prevent lag
  void modalContent.offsetWidth; 

  // 3. Spring open (The bubble effect!)
  modalContent.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';
  modalContent.style.opacity = '1';
  modalContent.style.transform = 'translate(0px, 0px) scale(1)';

  // 4. Draw Neon Tether ONLY if it's a network node
  if (isNetworkNode && activeFloatingNode) {
    const nodeRect = activeFloatingNode.getBoundingClientRect();
    const isAlignRight = overlay.classList.contains("align-right");
    
    const startX = isAlignRight ? nodeRect.right : nodeRect.left;
    const startY = nodeRect.top + nodeRect.height / 2;
    
    const endX = isAlignRight ? rectModal.left : rectModal.right;
    const endY = rectModal.top + rectModal.height / 2;

    const midX = (startX + endX) / 2;
    const pathData = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
    
    if (connectorPath) connectorPath.setAttribute("d", pathData);
  }

  // 4. Draw Neon Tether ONLY if it's a network node
  if (isNetworkNode && activeFloatingNode) {
    const nodeRect = activeFloatingNode.getBoundingClientRect();
    const isAlignRight = overlay.classList.contains("align-right");
    
    const startX = isAlignRight ? nodeRect.right : nodeRect.left;
    const startY = nodeRect.top + nodeRect.height / 2;
    
    const endX = isAlignRight ? rectModal.left : rectModal.right;
    const endY = rectModal.top + rectModal.height / 2;

    const midX = (startX + endX) / 2;
    const pathData = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
    
    connectorPath.setAttribute("d", pathData);
  }

  lucide.createIcons();
}

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
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("active");

  // Clean up floating unblurred node and restore original
  if (activeFloatingNode) {
    activeFloatingNode.remove();
    activeFloatingNode = null;
  }
  if (activeClickedNode) {
    activeClickedNode.style.opacity = '1';
    activeClickedNode = null;
  }

  // Safely restart the slideshow timer when the modal closes (if not manually paused)
  if (!isPaused) {
    startSlideTimer();
  }
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
      respLine.innerHTML =- response;
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

function updateSliderPosition() {
  // No-op
}

window.addEventListener('load', updateSliderPosition);
window.addEventListener('resize', updateSliderPosition);

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
  const icons = document.querySelectorAll('.color-cycle-icon');
  const buttons = document.querySelectorAll('.color-cycle-btn');
  
  if (isColorCycling) {
    icons.forEach(icon => icon.classList.add('color-spinning'));
    buttons.forEach(btn => btn.classList.add('active-cycling'));
    if (!colorAnimFrame) {
      colorLoop();
    }
  } else {
    icons.forEach(icon => icon.classList.remove('color-spinning'));
    buttons.forEach(btn => btn.classList.remove('active-cycling'));
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
  document.querySelectorAll('.color-cycle-icon').forEach(icon => icon.classList.remove('color-spinning'));
  document.querySelectorAll('.color-cycle-btn').forEach(btn => btn.classList.remove('active-cycling'));
  
  colorIndex = 0;
  nextColorIndex = 1;
  colorProgress = 0;
  
  const primary = jbColors[0];
  document.documentElement.style.setProperty('--theme-rgb', `${primary.r}, ${primary.g}, ${primary.b}`);
}


// =========================================================
// CUSTOM UI SOUND ENGINE (Hover, Select, Close)
// =========================================================

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

const lifecycleData = {
  plan: {
    title: "Stage: PLAN (Agile)",
    metric: "Lead Time: 2.1d",
    desc: "Sprint Architecture, Jira Backlog & Git Branching Strategy",
    tools: ["Jira", "Confluence", "Miro", "Lucidchart"],
    color: "#2563eb"
  },
  code: {
    title: "Stage: CODE (Source)",
    metric: "PR Velocity: 3.4h",
    desc: "Trunk-Based Development, Conventional Commits & Peer Review",
    tools: ["Git", "GitHub", "VS Code", "IntelliJ"],
    color: "#7c3aed"
  },
  build: {
    title: "Stage: BUILD (Artifacts)",
    metric: "Build Avg: 42s",
    desc: "Multi-Arch Container Builds, Dependency Management & Caching",
    tools: ["Docker", "Maven", "Gradle", "GitHub Actions"],
    color: "#ea580c"
  },
  test: {
    title: "Stage: TEST (QA & Sec)",
    metric: "Coverage: 91.4%",
    desc: "Automated Unit/Integration Testing, SonarQube & Trivy Scans",
    tools: ["JUnit", "SonarQube", "Trivy", "Selenium"],
    color: "#16a34a"
  },
  release: {
    title: "Key: RELEASE (Registry)",
    metric: "Zero-CVE Signed",
    desc: "Semantic Versioning, Image Tagging & Immutable Artifact Signing",
    tools: ["Harbor", "Docker Hub", "AWS ECR", "GCP Artifact Registry"],
    color: "#9333ea"
  },
  deploy: {
    title: "Stage: DEPLOY (GitOps)",
    metric: "Sync: Instant",
    desc: "ArgoCD Sync, Blue/Green Rollouts & Helm Chart Orchestration",
    tools: ["Kubernetes", "Helm", "ArgoCD", "Terraform"],
    color: "#0284c7"
  },
  operate: {
    title: "Stage: OPERATE (Cloud)",
    metric: "Upime: 99.99%",
    desc: "AWS EKS, GCP GKE, Azure AKS Multi-Cloud Cluster Management",
    tools: ["AWS", "GCP", "Azure", "OpenShift"],
    color: "#0d9488"
  },
  monitor: {
    title: "Stage: MONITOR (SRE)",
    metric: "MTTR: < 4 min",
    desc: "Prometheus Metrics, Grafana Dashboards & PagerDuty Alerts",
    tools: ["Prometheus", "Grafana", "Datadog", "ELK Stack"],
    color: "#059669"
  }
};

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
  
  if (footer) footer.classList.remove('action-box');
  if (footerText) {
    footerText.innerText = "Hover stage for specs";
    footerText.style.color = "var(--text-muted)";
  }
  if (footerStatus) {
    footerStatus.innerText = "Continuous Loop Active";
  }
}


// =========================================================
// NATIVE SCROLL-SNAP SLIDESHOW ENGINE
// =========================================================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slide-dot');
const slidesContainer = document.getElementById('hero-slides-container');
let slideInterval;
let isPaused = false;

// Function to smoothly scroll to a specific slide
function showSlide(index) {
  if (!slides.length || !slidesContainer) return;
  
  currentSlide = index;
  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  
  // Natively scroll the flex container
  slidesContainer.scrollTo({
    left: currentSlide * slidesContainer.clientWidth,
    behavior: 'smooth'
  });
  
  updateDots();
}

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Clicking a dot manually routes you to that slide
function setSlide(index) {
  showSlide(index);
  resetSlideTimer();
}

// Auto-advance timer
function startSlideTimer() {
  if (!slides.length || !slidesContainer || isPaused) return;
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 6000);
}

function resetSlideTimer() {
  if (isPaused) return;
  clearInterval(slideInterval);
  startSlideTimer();
}

// Pause/Play Button Logic
function toggleSlidePlay() {
  isPaused = !isPaused;
  const pauseIcon = document.getElementById('slide-pause-icon');
  
  if (isPaused) {
    clearInterval(slideInterval);
    if (pauseIcon) pauseIcon.setAttribute('data-lucide', 'play');
  } else {
    startSlideTimer();
    if (pauseIcon) pauseIcon.setAttribute('data-lucide', 'pause');
  }
  lucide.createIcons();
}

// Initialize on load
window.addEventListener('load', () => {
  startSlideTimer();
});

// =========================================================
// SYNC DOTS WHEN USER MANUALLY SWIPES/DRAGS
// =========================================================
if (slidesContainer) {
  slidesContainer.addEventListener('scroll', () => {
    // Calculate which slide is currently most visible
    const scrollPos = slidesContainer.scrollLeft;
    const slideWidth = slidesContainer.clientWidth;
    const newIndex = Math.round(scrollPos / slideWidth);
    
    // If the visible slide changes, update the dots!
    if (newIndex !== currentSlide) {
      currentSlide = newIndex;
      updateDots();
    }
  }, { passive: true });
}

// =========================================================
// PAUSE ON HOVER & TOUCH (Native Edition)
// =========================================================
if (slidesContainer) {
  // Pause the timer while the user is actively reading or dragging
  slidesContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slidesContainer.addEventListener('touchstart', () => clearInterval(slideInterval), { passive: true });

  // Resume the timer when they leave (if not manually paused and no modal is open)
  const resumeSlider = () => {
    const isModalOpen = document.getElementById("modal-overlay").classList.contains("active");
    if (!isPaused && !isModalOpen) {
      startSlideTimer();
    }
  };

  slidesContainer.addEventListener('mouseleave', resumeSlider);
  slidesContainer.addEventListener('touchend', resumeSlider);
}

// =========================================================
// DEVOPS INFINITY LOOP EASTER EGG
// =========================================================
function toggleInfinityLoop() {
  const orbitWrapper = document.querySelector('.ms-orbit-wrapper');
  
  if (orbitWrapper) {
    // Toggles the class and checks if the loop is currently active
    const isInfinityMode = orbitWrapper.classList.toggle('infinity-mode');
    
    // SLIDESHOW PAUSE/PLAY LOGIC
    if (isInfinityMode) {
      // Easter Egg Active: Forcefully clear the slideshow timer
      clearInterval(slideInterval);
    } else {
      // Easter Egg Disabled: Safely restart the timer 
      // (This automatically respects the pause button if the user already clicked it!)
      startSlideTimer();
    }
    
    // Play your UI select sound for that extra tactile feel
    if (typeof playAudio === 'function' && typeof selectSound !== 'undefined') {
      playAudio(selectSound);
    }
  }
}

// =========================================================
// NAV DEPLOY BUTTON LOGIC (Scroll & Easter Egg Toggle)
// =========================================================
function navDeployClick() {
  // 1. Scroll smoothly to the very top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 2. Ensure Slide 1 (the Constellation) is currently active
  if (typeof currentSlide !== 'undefined' && currentSlide !== 0) {
    setSlide(0);
  }

  // 3. Toggle the Easter Egg! (Switches back and forth every click)
  const triggerEasterEgg = () => {
    toggleInfinityLoop();
  };

  // If the user is scrolling up from the bottom, wait 600ms for them to arrive.
  // If they are already at the top, toggle it instantly.
  if (window.scrollY > 300) {
    setTimeout(triggerEasterEgg, 600);
  } else {
    triggerEasterEgg();
  }
}

// =========================================================
// PAUSE SLIDESHOW ON NETWORK NODES HOVER
// =========================================================
document.querySelectorAll('.network-node').forEach(node => {
  node.addEventListener('mouseenter', () => {
    clearInterval(slideInterval); // Pause when hovering over Slide 2 nodes
  });
  node.addEventListener('mouseleave', () => {
    // Resume only if the slideshow wasn't manually paused and no modal is open
    if (!isPaused && !document.getElementById("modal-overlay").classList.contains("active")) {
      startSlideTimer();
    }
  });
});


// =========================================================
// JAI-BOT AI SIMULATION ENGINE
// =========================================================

function toggleAIBot() {
  const chatWindow = document.getElementById("ai-chat-window");
  chatWindow.classList.toggle("active");
  if (chatWindow.classList.contains("active")) {
    document.getElementById("ai-input").focus();
  }
}

function handleAIKeyPress(event) {
  if (event.key === "Enter") {
    sendAIMessage();
  }
}

function sendAIMessage() {
  const inputField = document.getElementById("ai-input");
  const messageText = inputField.value.trim();
  if (!messageText) return;

  // 1. Display User Message
  addChatBubble(messageText, "user-msg");
  inputField.value = "";

  // 2. Show "Typing..." indicator
  const typingId = "typing-" + Date.now();
  addChatBubble("<i>typing...</i>", "bot-msg", typingId);

  // 3. Process the NLP logic & wait 1 second to simulate AI thinking
  setTimeout(() => {
    document.getElementById(typingId).remove();
    const response = generateAIResponse(messageText.toLowerCase());
    addChatBubble(response, "bot-msg");
  }, 1000);
}

function addChatBubble(htmlContent, className, id = null) {
  const messageBox = document.getElementById("ai-chat-messages");
  const msgDiv = document.createElement("div");
  msgDiv.className = `ai-msg ${className}`;
  if (id) msgDiv.id = id;
  msgDiv.innerHTML = htmlContent;
  messageBox.appendChild(msgDiv);
  messageBox.scrollTop = messageBox.scrollHeight;
}

// The "Brain" of the Bot
function generateAIResponse(query) {
  if (query.includes("skill") || query.includes("tech") || query.includes("stack")) {
    return "Jai is highly skilled in Multi-Cloud architectures (<b>AWS, Azure, GCP</b>). His core stack includes <b>Kubernetes, Terraform, Docker, Helm</b>, and automating CI/CD pipelines with <b>GitHub Actions</b> and <b>Jenkins</b>.";
  } 
  else if (query.includes("experience") || query.includes("work") || query.includes("job")) {
    return "Jai has 4 years of experience and is currently a Senior Analyst and Platform Engineer at <b>Capgemini</b>, focusing on high-availability infrastructures for the Fintech and Banking sectors.";
  } 
  else if (query.includes("education") || query.includes("college") || query.includes("degree")) {
    return "He holds a B.Tech in Computer Science and Engineering from <b>BIST, Bhopal</b> (Class of 2022), where he graduated with a solid 8.0 CGPA.";
  } 
  else if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("reach")) {
    return "You can reach out to him directly at <b>jaiprajapatiwork@gmail.com</b>, or connect with him via the LinkedIn link in the Contact section below!";
  } 
  else if (query.includes("cert") || query.includes("badge")) {
    return "Jai holds numerous certifications, including AWS DevOps Professional, GCP DevOps Engineer, Azure DevOps Expert, and HashiCorp Terraform Associate.";
  } 
  else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
    return "Hello! How can I help you learn more about Jai today?";
  } 
  else {
    return "I'm a simple bot, but I know a lot about Jai! Try asking specifically about his <b>skills</b>, <b>experience</b>, <b>certifications</b>, or <b>education</b>.";
  }
}


// =========================================================
// JETBRAINS 4-COLOR AMBIENT BACKGROUND CYCLER
// =========================================================
const ambientColors = [
  { r: 108, g: 24,  b: 255 }, // 1. Deep Violet (JetBrains Default)
  { r: 8,   g: 124, b: 250 }, // 2. IntelliJ Blue
  { r: 225, g: 31,  b: 113 }, // 3. Rider Magenta
  { r: 255, g: 115, b: 0 }    // 4. Fleet Orange
];

let ambColorIdx = 0;
let ambNextColorIdx = 1;
let ambProgress = 0;

function lerpAmbient(start, end, t) {
  return Math.round(start + (end - start) * t);
}

function cycleAmbientColor() {
  const current = ambientColors[ambColorIdx];
  const next = ambientColors[ambNextColorIdx];

  // Calculate the smooth transition between colors
  const r = lerpAmbient(current.r, next.r, ambProgress);
  const g = lerpAmbient(current.g, next.g, ambProgress);
  const b = lerpAmbient(current.b, next.b, ambProgress);

  // Apply the color strictly to the background vignette variable
  document.documentElement.style.setProperty('--hero-glow-color', `${r}, ${g}, ${b}`);

  // Speed of the color shift (lower = slower/smoother)
  ambProgress += 0.0015; 

  if (ambProgress >= 1) {
    ambProgress = 0;
    ambColorIdx = ambNextColorIdx;
    ambNextColorIdx = (ambColorIdx + 1) % ambientColors.length;
  }
  
  requestAnimationFrame(cycleAmbientColor);
}

// Start the background cycler immediately!
cycleAmbientColor();