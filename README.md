# 💸 Retirement App: Roth IRA Calculator

This app helps you estimate the growth of a **Roth IRA account** and visualize your **tax savings** over time. It’s a lightweight, interactive tool built with **React** and deployed using **Terraform** via **AWS S3**, **CloudFront**, and **Route 53**.

---

## 🔧 Features

- 📈 Simulate Roth IRA compound growth over years
- 💰 Estimate tax savings based on contributions and income brackets
- 🌐 Fully deployed to a custom domain using:
  - AWS S3 (for static hosting)
  - CloudFront (for CDN delivery)
  - Route 53 (for DNS and hosted zone)
- 🛠️ Infrastructure-as-Code powered by Terraform and automated via Taskfile

---

## 🌍 Domain Prerequisites

This project assumes:

- A hosted zone already exists in Route 53.
- A Terraform **remote state** named `domain` is available and contains the DNS zone.

---

## ⚙️ Setup Instructions

### 1. Clone the repo and set up environment variables

```bash
cp .env.template .env
```

Then edit your .env to set the following

TF_VAR_domain_name Subdomain (e.g., retirement)
TF_VAR_tld Top-level domain (e.g., example.com)
TF_VAR_react_app_path The absolute path to your react app
TF_VAR_bucket_name Unique S3 bucket name (e.g., my-roth-app-bucket)

### 2. Build the React App

```
npm install
npm run build
```

### 3. Deploy with Terraform + Task

```
task tf_init
task tf_apply
```

This will:

- Upload your app to an S3 bucket
- Create a CloudFront distribution
- Configure DNS with Route 53 to your main host that was set up via the Portfolio app (https://github.com/jmath1/portfolio)
- Use a remote state backend key retirement.tfstate
