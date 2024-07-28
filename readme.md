# Please visit the below link for API Documentation and Deployment Documentation

https://mangrove-houseboat-fed.notion.site/Tickter-API-Documentation-af7e76b4fae24b89a57dfa8a6a248b2e

# How to start project locally

### First clone the repository either use https://github.com/kunal021/tickter.git or download zip file.

# Front-End

To start Front-End or client navigate to client folder and insatll necessary dependencies using npm install.

Add necessary enviroment variables into .env file at top level of folder.

VITE_SUPABASE_URL=SUPABASE_URL_HERE

VITE_SUPABASE_ANON_KEY=SUPABASE_ANON_KEY_HERE

Run command npm run dev to start client.

Navigate to http://localhost:5173/ in your browser.

# Back-End

To start Back-End or server navigate to server folder and insatll necessary dependencies using npm install.

Add necessary enviroment variables into .env file at top level of folder.

DB=MONGODB_CONNECTION_STRING_HERE

EXPRESS_APP_SUPABASE_URL=SUPABASE_URL_HERE

EXPRESS_APP_SUPABASE_ANON_KEY=SUPABASE_ANON_KEY_HERE

WEATHER_API_KEY=OPENWEATHER_APIKEY_HERE

Run command npm run dev to start server.
