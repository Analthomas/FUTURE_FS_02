# Mini CRM Dashboard

A full-stack Customer Relationship Management (CRM) application built using Node.js, Express.js, MongoDB Atlas, HTML, CSS, and JavaScript.

## Features

- Add New Leads
- View All Leads
- Update Lead Status
  - New
  - Contacted
  - Converted
- Delete Leads
- Search Leads
- Dashboard Statistics
- MongoDB Atlas Database Integration

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

## Project Structure

```
FUTURE_FS_02
│
├── Index.html
├── style.css
├── script.js
├── server.js
├── package.json
└── package-lock.json
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Add your MongoDB Atlas connection string in server.js

```js
mongoose.connect("YOUR_MONGODB_CONNECTION_STRING")
```

4. Start the server

```bash
node server.js
```

5. Open Index.html using Live Server

## API Endpoints

### Get All Leads

```
GET /api/leads
```

### Add Lead

```
POST /api/leads
```

### Update Lead Status

```
PUT /api/leads/:id
```

### Delete Lead

```
DELETE /api/leads/:id
```

## Screenshots

- CRM Dashboard
- MongoDB Atlas Collection
- Backend Server Running

## Author

Anal Thomas
