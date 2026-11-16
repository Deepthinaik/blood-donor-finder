# LifeLink — Blood Donor Finder (TECH-QUEST 2.0)

A responsive front-end prototype for searching fictional blood donor profiles by blood group, broad location and availability, inspecting match criteria, and submitting a simulated contact request.

## Run locally in VS Code
1. Download and unzip this project.
2. Open the `blood-donor-finder` folder in VS Code (`File → Open Folder`).
3. Open `index.html` in a browser. Recommended: install the **Live Server** extension, right-click `index.html`, choose **Open with Live Server**.
4. Try the demo: select `O+` and `Whitefield`, click Search, open a profile, inspect criteria, then submit a simulated request.
5. Edge case: choose `AB-` and `Electronic City` (no matching sample profile) to see the empty state. Also inspect a profile marked unavailable to see the disabled request flow.

## Features
- Blood group, area and availability filters
- Best-match, name and area sorting
- Match explanation panel
- Fictional donor IDs; no real contact details
- Simulated contact-request workflow with a demo request ID
- Unavailable-profile edge case and no-results edge case
- Verified-profile demo flag and listing expiry display
- Responsive layout and safety notice

## Publish with GitHub Pages
1. Create a GitHub repository, e.g. `blood-donor-finder`.
2. In VS Code, open Terminal → New Terminal and run:

   ```bash
   git init
   git add .
   git commit -m "Build LifeLink blood donor finder prototype"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/blood-donor-finder.git
   git push -u origin main
   ```

3. On GitHub, open the repository → **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main`, folder `/ (root)`, then Save.
6. Wait for the Pages deployment. Your site URL will look like `https://YOUR-USERNAME.github.io/blood-donor-finder/`.

## Important limitations
This is a front-end-only demonstration. Requests exist only in the current browser session and are not sent or persisted. The donor records are fictional. A real service would need a secure backend, user authentication, explicit donor consent, verified data, rate limiting, audit logs, privacy controls and appropriate legal/medical review. Directory matching is not clinical compatibility confirmation. In an emergency, contact a hospital, blood bank or official emergency service.
