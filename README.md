## Installation Guide

### 1. Clone Project
```sh
git clone https://github.com/Namdh157/BE_Internal_Liftek.git
cd BE_Internal_Liftek
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Create .env File
```sh
cp .env.example .env
```

### 4. Run Docker (Redis)
```sh
docker run --name redis-server -d -p 6379:6379 redis
```

### 5. Run Project
#### With Docker
```sh
npm run dev
```

#### Without Docker
```sh
npm start
```