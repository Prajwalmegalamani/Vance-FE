# Vance Frontend Engineer Machine Coding Round
This project implements a user authentication system with role-based access control using a mock JSON API via JSON Server. 
Users can:
- Login to receive user details & role. 
- Utilize protected routes for admin-only pages. 
- Access different UI components based on their role.

---
## **API Endpoints**

### **1. Sign In API**
- Endpoint:
```javascript
  `http://localhost:3030/user_auth?email=${email}&password=${password}`
```
- API Sample Response: 
```json
{
  "id": 1,
  "name": "Vance Admin",
  "email": "admin@example.com",
  "password": "pass123",
  "role": ["ADMIN", "CAMPAIGN_MANAGER"]
}
```
- Valid Credentials :
  - With `ADMIN` and `CAMPAIGN_MANAGER` Role :
    ```json
    {
      "email": "admin@example.com",
      "password": "pass123"
    }
    ```
  - With `CAMPAIGN_MANAGER` Role :
    ```json
    {
      "email": "campaign.manager@example.com",
      "password": "pass123"
    }
    ```
  - With Normal Role :
    ```json
    {
      "email": "user@example.com",
      "password": "pass123"
    }
    ```
### **2. Fetch Users List**
- Endpoint(Paginated API Endpoint):
```javascript
  `http://localhost:3030/users?_page=${page}&_per_page=${LIMIT}`
```
- API Sample Response:
```json
{
  "first": 1,
  "prev": null,
  "next": 2,
  "last": 4,
  "pages": 4,
  "items": 36,
  "data": [
    {
      "id": 1,
      "name": "Mia",
      "age": 33,
      "gender": "Male",
      "occupation": "Architect",
      "salary": 87808
    },
    {
      "id": 2,
      "name": "Amber",
      "age": 26,
      "gender": "Non-Binary",
      "occupation": "Frontend Developer",
      "salary": 96223
    },
    {
      "id": 3,
      "name": "Amber",
      "age": 23,
      "gender": "Non-Binary",
      "occupation": "Marketing Manager",
      "salary": 136123
    },
    {
      "id": 4,
      "name": "Rachel",
      "age": 49,
      "gender": "Non-Binary",
      "occupation": "Architect",
      "salary": 56959
    }
  ]
}
```
### **3. Fetch Campaigns List**
- Endpoint(Paginated API Endpoint):
```javascript
  `http://localhost:3030/campaigns?_page=${page}&_per_page=${LIMIT}`
```
- API Sample Response:
```json
{
  "first": 1,
  "prev": null,
  "next": 2,
  "last": 2,
  "pages": 2,
  "items": 13,
  "data": [
    {
      "id": 1,
      "name": "Summer Sale",
      "type": "Referral Program",
      "budget": 47234,
      "start_date": "2025-07-01",
      "end_date": "2025-12-11",
      "status": "Inactive"
    },
    {
      "id": 2,
      "name": "Winter Clearance",
      "type": "Referral Program",
      "budget": 31439,
      "start_date": "2025-03-27",
      "end_date": "2025-10-23",
      "status": "Upcoming"
    },
    {
      "id": 3,
      "name": "Black Friday",
      "type": "Flash Sale",
      "budget": 9702,
      "start_date": "2025-11-26",
      "end_date": "2025-07-05",
      "status": "Active"
    },
    {
      "id": 4,
      "name": "Cyber Monday",
      "type": "Loyalty Rewards",
      "budget": 39010,
      "start_date": "2025-06-13",
      "end_date": "2025-03-17",
      "status": "Upcoming"
    },
    {
      "id": 5,
      "name": "Holiday Giveaway",
      "type": "BOGO",
      "budget": 34262,
      "start_date": "2025-08-07",
      "end_date": "2025-03-18",
      "status": "Upcoming"
    }
  ]
}
```
### **4. Fetch Authenticated Profiles**
- Endpoint(Paginated API Endpoint):
```javascript
  `http://localhost:3030/user_auth?_page=${page}&_per_page=${LIMIT}`
```
- API Sample Response:
```json
{
  "first": 1,
  "prev": null,
  "next": null,
  "last": 1,
  "pages": 1,
  "items": 3,
  "data": [
    {
      "id": 1,
      "name": "Vance Admin",
      "email": "admin@example.com",
      "password": "pass123",
      "role": [
        "ADMIN",
        "CAMPAIGN_MANAGER"
      ]
    },
    {
      "id": 2,
      "name": "Vance Campaign Manager",
      "email": "campaign.manager@example.com",
      "password": "pass123",
      "role": [
        "CAMPAIGN_MANAGER"
      ]
    },
    {
      "id": 3,
      "name": "Vance",
      "email": "user@example.com",
      "password": "pass123",
      "role": []
    }
  ]
}
```
---

## **Features**

### **1. Mock Authentication**
- **JSON Server Authentication**:
    - Allows users to sign in securely using email and password.

### **2. Landing Page / Home Page**
- **Tab-Based Navigation**:
  - Three tabs (`Users`, `Campaigns`, `Authenticated Profiles`), each with specific functionality.
  - Users can switch between screens by clicking on the tabs or scrolling vertically.
- **Scroll-Based Navigation**:
  - Smooth transitions between screens as the user scrolls.
  - Animated background layers and gradient effects for added depth.

## **Technologies Used**
1. **React**:
   - Functional components with hooks for state and effect management.
2. **Tailwind CSS**:
   - Utility-first CSS framework for responsive and scalable styling.
3. **React Toastify**:
   - Delivers toast notifications for feedback.
4. **React Router**:
   - Handles navigation between the landing page, sign-in, and dashboard.
5. **JSON Server**:
   - Facilitates with mock server.

## **Installation & Usage**
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/saurabh-vance/frontend-machine-coding-round.git
    cd frontend-machine-coding-round
    ```
2. **Install Dependency**:
    ```bash
    npm install
    ```
3. **Start JSON Server (Mock API)**:
   ```bash
   npm run server
   ```
4. **Start React App**:
   ```bash
   npm run start
   ```

# Vance-FE
