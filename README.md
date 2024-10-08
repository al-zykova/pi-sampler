# Xsolla Client-Side Integration Example

This repository provides an example of how to integrate Xsolla PayStation and handle payment processing

## Setup Instructions


### 1. Create and set up project in Publisher Account
See documentation https://developers.xsolla.com/solutions/payments/client-side-token-generation/create-and-set-up-pa-project/

### 2. Copy `.env.example` to `.env`
First, create a `.env` file from the provided `.env.example` template:

```bash
cp .env.example .env
```
Next, fill in the necessary values in the .env file

PROJECT_ID and LOGIN_PROJECT_ID can be found in your Xsolla Publisher Account.
![img_2.png](img_2.png)

![img_1.png](img_1.png)


### 3. Install dependents 

```bash
yarn install
```

### 4. Run a project

```bash
yarn run dev
```

Open `http://localhost:5173/`
