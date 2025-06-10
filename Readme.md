🚀 Development Journey
This project was built using a combination of AI-assisted development and manual coding, allowing me to accelerate development while ensuring proper customization and debugging. Below is a breakdown of how different tools contributed to the project.

🛠️ AI & Tools Used

Tool                      Purpose                             How It Helped
ChatGPT           Schema Design, UI Components     Initial Mongoose schema generation, React Hook Form setup
Galileo AI        UI/UX Design                      Suggested design layouts for forms & tables
Windsurf (AI)     Rapid Coding                      Suggested boilerplate for controller.js & Service.ts
DeepSeek AI       Debugging                        Helped resolve JWT cookie issues & security configs
Manual            Critical Features                Custom logic like Skills Edit in Profile
Implementation

🔧 Development Process


1️⃣ AI-Assisted Schema Design (ChatGPT)

Initially generated Mongoose schemas using ChatGPT.

Manual Fixes Applied:

Adjusted data types (e.g., String → ObjectId for references).
Added custom validations (e.g., required: true where needed).
Optimized indexing for performance.

2️⃣ UI Design (Galileo AI)

Used Galileo AI for:

Dashboard layout suggestions.
Form styling (Project Create/Edit).
Teams Table structure.

Manual Tweaks:

Made responsive using CSS Grid/Flexbox.
Enhanced UX with loading states & error handling.

3️⃣ Backend Logic (Windsurf AI + Manual)

Windsurf AI helped with:

CRUD operations in controller.js.
API service layer (Service.ts).
Self-Implemented:
Skills Edit Feature (Profile Page).
Complex role-based access controls.

4️⃣ Debugging (DeepSeek AI)

Resolved JWT cookie issues:
Correct httpOnly, secure, and sameSite settings.
Token refresh flow fixes.
Fixed production bugs related to CORS & auth middleware.

💡 Key Takeaways
✅ AI speeds up development but requires validation (schemas needed corrections).
✅ Hybrid approach (AI + manual) works best – AI for boilerplate, manual for business logic.
✅ Debugging with AI saves time – DeepSeek helped resolve security issues quickly.

📌 Future Improvements
🔹 Add Unit Tests (Jest/Mocha) for critical functions.
🔹 Optimize DB Queries (Mongoose aggregation).
🔹 Implement Redis for caching frequent requests.

🙏 Credits & Learning
AI Tools for accelerating development.

Self-Learning for mastering tricky parts (e.g., JWT cookies).



🌟 Thanks for the opportunity! 🚀
