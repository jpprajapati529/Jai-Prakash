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

  "azure-devops": {
    title: "Microsoft Azure DevOps",
    description: "Enterprise application lifecycle management, CI/CD pipelines, Git repositories, and automated deployments.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Engineered automated build and release pipelines to streamline software delivery across enterprise environments.</p>
              <ul class="rich-list">
                <li>Created and maintained YAML-based Azure Pipelines for continuous integration and automated deployments.</li>
                <li>Managed Azure Repos, branch policies, pull request triggers, and artifact feeds.</li>
                <li>Integrated security scanning, automated testing, and quality gates into CI/CD workflows.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        name: "Pipeline YAML",
        type: "code",
        filename: "azure-pipelines.yml",
        content: `trigger:\n  - main\n\npool:\n  vmImage: 'ubuntu-latest'\n\nstages:\n- stage: Build\n  jobs:\n  - job: BuildApp\n    steps:\n    - task: NodeTool@0\n      inputs:\n        versionSpec: '18.x'\n    - script: |\n        npm install\n        npm run build\n      displayName: 'npm install and build'`
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
        content: `resource "azurerm_role_assignment" "aks_monitoring" {\n  scope                = azurerm_kubernetes_cluster.aks_prod.id\n  role_definition_name = "Monitoring Metrics Publisher"\n  principal_id         = azuread_service_principal.monitor_sp.object_id\n}`
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
        content: `apiVersion: monitoring.googleapis.com/v3\nkind: ServiceLevelObjective\nmetadata:\n  name: gke-api-latency-slo\nspec:\n  goal: 0.99\n  rollingPeriod: 2592000s\n  serviceLevelIndicator:\n    requestBased:\n      distributionCut:\n        distributionFilter: metric.type="loadbalancing.googleapis.com/https/request_latencies"\n        range:\n          max: 250`
      }
    ]
  },
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
        content: `FROM python:3.9-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nUSER 1001 \nCMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:main"]`
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
        content: `replicaCount: 3\nimage:\n  repository: my-enterprise-repo/core-api\n  tag: "v2.4.1"`
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
    description: "GitHub Actions is a CI/CD platform that automates software workflows.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Engineered automated, event-driven workflows to standardize the software delivery process.</p>
            </div>
          </div>
        `
      }
    ]
  },
  "jenkins": {
    title: "Jenkins",
    description: "Jenkins is a widely used open-source automation server.",
    tabs: [
      {
        name: "My Responsibilities",
        type: "html",
        content: `
          <div class="rich-layout">
            <div class="rich-section">
              <h4 class="rich-heading"><i data-lucide="target"></i> Role & Impact</h4>
              <p class="rich-text">Designed and maintained enterprise-grade automation pipelines.</p>
            </div>
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
        content: `role: "Senior Analyst / Platform Engineer"\ncompany: "Capgemini"\nexperience_years: 4\ndomain_focus:\n  - "Fintech"\n  - "Banking Operations"\ncloud_providers: ["AWS", "Azure", "GCP"]\norchestration: ["Kubernetes", "OpenShift", "Docker", "Helm"]\neducation:\n  institute: "BIST, Bhopal"\n  graduation_year: 2022`
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
            </div>
          </div>
        `
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
              <p class="rich-text">Maintaining strict regulatory compliance for banking clients.</p>
            </div>
          </div>
        `
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

  // Dynamically place official colored logos in the header via if-else statements
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
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/github/github-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'jenkins') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else if (moduleId === 'azure-devops') {
    iconContainer.innerHTML = `<img src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" style="width: 22px; height: 22px; object-fit: contain;">`;
  } else {
    iconContainer.innerHTML = `<i id="modal-icon" data-lucide="box" style="color: var(--accent-purple); width: 22px; height: 22px;"></i>`;
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
      btn.onclick = () => selectModalTab(data, index, btn);
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

  const rectModal = modalContent.getBoundingClientRect();
  const finalCenterX = rectModal.left + rectModal.width / 2;
  const finalCenterY = rectModal.top + rectModal.height / 2;

  const deltaX = lastClickX - finalCenterX;
  const deltaY = lastClickY - finalCenterY;

  modalContent.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
  modalContent.offsetHeight;

  // 3. Spring open
  modalContent.style.transition = '';
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
// HERO SLIDESHOW ENGINE (With Pause/Play Control)
// =========================================================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slide-dot');
let slideInterval;
let isPaused = false;

function showSlide(index) {
  if (!slides.length) return;
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  currentSlide = index;
  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  
  lucide.createIcons();
}

function setSlide(index) {
  showSlide(index);
  resetSlideTimer();
}

function startSlideTimer() {
  if (!slides.length || isPaused) return;
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

function toggleSlidePlay() {
  isPaused = !isPaused;
  const pauseIcon = document.getElementById('slide-pause-icon');
  
  if (isPaused) {
    clearInterval(slideInterval);
    if (pauseIcon) {
      pauseIcon.setAttribute('data-lucide', 'play');
    }
  } else {
    startSlideTimer();
    if (pauseIcon) {
      pauseIcon.setAttribute('data-lucide', 'pause');
    }
  }
  lucide.createIcons();
}

window.addEventListener('load', () => {
  startSlideTimer();
});


// =========================================================
// SWIPE GESTURE CONTROLS (Mobile Touch & Trackpad Support)
// =========================================================
const sliderWrapper = document.querySelector('.hero-slider-wrapper');
let touchStartX = 0;
let touchEndX = 0;
let isTrackpadSwiping = false;

if (sliderWrapper) {
  // 1. MOBILE TOUCH GESTURES
  sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  // 2. LAPTOP TRACKPAD GESTURES (Two-finger swipe)
  sliderWrapper.addEventListener('wheel', (e) => {
    // Check if the scroll is mostly horizontal and strong enough
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      e.preventDefault(); // Prevents the browser from navigating back/forward in history

      // If we aren't already in the middle of a swipe cooldown
      if (!isTrackpadSwiping) {
        isTrackpadSwiping = true;

        if (e.deltaX > 0) {
          showSlide(currentSlide + 1); // Swiped Left -> Next Slide
        } else {
          showSlide(currentSlide - 1); // Swiped Right -> Previous Slide
        }
        
        resetSlideTimer();

        // Lock the trackpad swipe for 800ms so it doesn't trigger 50 times in one gesture
        setTimeout(() => {
          isTrackpadSwiping = false;
        }, 800);
      }
    }
  }, { passive: false });
}

function handleSwipe() {
  const swipeThreshold = 50; 
  const swipeDistance = touchStartX - touchEndX;

  if (swipeDistance > swipeThreshold) {
    showSlide(currentSlide + 1);
    resetSlideTimer();
  } else if (swipeDistance < -swipeThreshold) {
    showSlide(currentSlide - 1);
    resetSlideTimer();
  }
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