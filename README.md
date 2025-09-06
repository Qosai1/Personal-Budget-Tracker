💰 Personal Budget Tracker
🚀 Project Setup

Clone the repository and open the project folder.

git clone <repo-url>
cd personal-budget-tracker


Open login.html in your browser to start.

Login with one of the mock usernames/passwords defined in main.js.

You’ll be redirected to Dashboard.html after login.

⚡ No build step required – this is a vanilla HTML/CSS/JavaScript project.

✨ Features Implemented

User Authentication (Mocked)
Simple login system validates username/password, persists last user in localStorage
.

Dashboard Overview
Displays Total Income, Expenses, and Net Balance dynamically
.

Add Transactions
Form to add income or expense with type, category, date, amount, and notes
.

Persistent Storage
All transactions, income, and expenses are saved in localStorage for reload safety
.

Filter & Search
Filter transactions by category/date range or search notes/keywords
.

Dynamic Table
Transactions are rendered into a table with columns: Type, Amount, Category, Date, Notes
.

Visualization
Pie chart (Chart.js) shows spending trends by category
.

Dark/Light Mode
Toggle button with theme persistence in localStorage
.

Responsive Design
Uses CSS Flexbox/Grid for layout – mobile and desktop friendly
.

🛠️ Decisions Made

Styling Choice
Used vanilla CSS with Flexbox and Grid for responsiveness. Components like .container, .transactions, .search ensure consistent card-like UI
.

Component Structure (Files)

login.html: Login form.

Dashboard.html: Main dashboard UI.

main.js: All business logic (auth, transactions, search, chart, dark mode).

style.css: Global styles, responsive rules, and dark mode.

Persistence
Chose localStorage over a backend for simplicity in this trainee project.

Libraries
Used Chart.js (via CDN) only for visualization; everything else built with vanilla JS.
