# Paytm Project

This project is a clone of Paytm with functionalities such as P2P transfer and money management.

## Getting Started

To get started with this project:

### Clone the Repo

```bash
git clone https://github.com/yashs33244/paytm_project.git
cd paytm_project
```

## Install Dependencies
```bash
npm install
```

## Setup PostgreSQL
### Run PostgreSQL either locally or on the cloud (e.g., neon.tech):
``` bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
## Setup Environment Variables
### Copy over all .env.example files to .env:

```bash
cp apps/user-app/.env.example .env
cp packages/db/.env.example .env
```
### Update .env files with the correct database URL.

## Run Migrations and Seed Database
### Go to packages/db and run:

```bash
npx prisma migrate dev
npx prisma db seed
```
## Run the app in root folder
``` bash
npm run dev
```

# Project Demo

## System Design
![System Design](https://drive.google.com/file/d/1CypBC9q4T5RAgDwZjiGxTiZOKy-3-j8K/view?usp=sharing)

## Add Money
[![Add Money Demo](https://raw.githubusercontent.com/yourusername/yourrepository/main/assets/add_money_thumbnail.png)](https://drive.google.com/file/d/1CXRYFWiBv0hOsAmVkUjMwcu2aitc_-PG/view?usp=sharing)

## p2p Transfer
[![p2p Transfer Demo](https://raw.githubusercontent.com/yourusername/yourrepository/main/assets/p2p_transfer_thumbnail.png)](https://drive.google.com/file/d/1A2LSZy5n8fY-4z9o3zgSdiu6ZMO0Av42/view?usp=sharing)
