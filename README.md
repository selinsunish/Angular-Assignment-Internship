# Dynamic Pricing UI (Angular)

## Overview

This project is a Dynamic Pricing Management UI built using Angular (latest version).
It converts structured JSON data into an editable, dynamic pricing table.

---

## Features

* Dynamic pricing table (columns = tiers, rows = items)
* Editable pricing values
* Add / remove columns dynamically
* Signal-based state management (no RxJS)
* JSON-driven UI (no hardcoded data)

---

## Supported Pricing Types

* Flat pricing (arrays)
* Size-based pricing (nested structures)
* Additional charges:

  * Fixed (+ value)
  * Percentage (% increase)

---

## Tech Stack

* Angular (Standalone Components)
* Angular Signals
* TypeScript
* HTML + CSS

---

## Project Structure

```
src/app/
 ├── components/        # UI components
 ├── models/            # Data models
 ├── services/          # JSON handling
 ├── store/             # Signal-based state
```

---

## How It Works

1. JSON is loaded from `assets/Pricing.json`
2. Data is transformed into:

   * columns (tiers)
   * rows (items with values)
3. State is managed using Angular signals
4. UI updates instantly when data changes

---

## Run Locally

```bash
npm install
ng serve
```

Open:

```
http://localhost:4200
```

---

## Key Concepts Used

* Signal-based state management
* Dynamic UI rendering
* Data transformation from nested JSON
* Clean component architecture

---

## Notes

* No external UI libraries used
* Focused on scalability and maintainability
* Built as part of Angular Internship Assignment
