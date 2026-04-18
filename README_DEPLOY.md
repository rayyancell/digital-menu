# Deploying to Render.com

Follow these steps to host your Truffles Menu application for free with persistent storage:

## 1. MongoDB Atlas Setup (Database)
1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (Free tier).
3. Under **Database Access**, create a user with a password.
4. Under **Network Access**, add `0.0.0.0/0` (Allow access from anywhere) so Render can connect.
5. Click **Connect** -> **Connect your application** and copy the Connection String.
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority`

## 2. Render Setup (Hosting)
1. Push your code to a GitHub repository.
2. Create a new **Web Service** on [Render.com](https://render.com).
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Go to the **Environment** tab and add these variables:
   - `MONGODB_URI`: (Paste your MongoDB connection string here)
   - `ADMIN_PASSWORD`: (Set your desired admin password)
   - `NODE_ENV`: `production`

## 3. Benefits
- **Lifetime Free**: Both Render and MongoDB Atlas have generous free tiers.
- **Persistence**: Your dishes and orders are now stored in the cloud, so they won't be deleted even if the server restarts.
- **Auto-Scale**: Render handles the port and serving automatically.

---
*Note: The frontend is served directly from the backend server using `path.join(__dirname)`, ensuring all CSS and JS files load correctly on the hosted URL.*
