# SRM Full Stack Engineering Challenge Solution

Full-stack implementation of the `POST /bfhl` assignment using:

- Backend: Node.js + Express.js
- Frontend: React.js + Vite
- Language: JavaScript (ES6+)
- Database: not required for the assignment logic, so MongoDB is left optional

## What This Project Does

- Accepts a `data` array of node relationships like `A->B`
- Validates each entry strictly
- Removes duplicate edges after the first occurrence
- Ignores later multi-parent edges for the same child
- Builds independent hierarchies
- Detects cycles per connected component
- Computes longest depth for non-cyclic trees
- Returns summary metrics in the exact expected response format
- Provides a React UI to submit input and inspect results

## Project Structure

```text
backend/
  controllers/
    bfhlController.js
  models/
    logModel.js
  routes/
    bfhlRoutes.js
  services/
    bfhlService.js
  tests/
    runTests.js
  utils/
    graphUtils.js
    identityUtils.js
    validationUtils.js
  app.js
  server.js
  .env.example

frontend/
  components/
    HierarchyCard.jsx
    SummaryCards.jsx
    TreeNode.jsx
  pages/
    HomePage.jsx
  services/
    bfhlApi.js
  App.js
  main.jsx
  styles.css
```

## Setup

Open two terminals.

### Backend

```bash
cd backend
npm install
copy .env.example .env
```

Set your real identity details in `backend/.env`:

```env
PORT=5000
FULL_NAME=yourfullname
DOB_DDMMYYYY=17091999
EMAIL_ID=yourname@srmist.edu.in
COLLEGE_ROLL_NUMBER=RA2211003010000
```

Run the API:

```bash
npm run dev
```

Run backend tests:

```bash
npm test
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Default frontend API target:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## API

### Endpoint

`POST /bfhl`

### Request Body

```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

### Response Format

```json
{
  "user_id": "yourname_ddmmyyyy",
  "email_id": "your_email",
  "college_roll_number": "your_roll",
  "hierarchies": [],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 0,
    "total_cycles": 0,
    "largest_tree_root": ""
  }
}
```

## Rules Implemented

- Valid format: `X->Y` where both values are single uppercase letters
- Invalid cases include `hello`, `1->2`, `AB->C`, `A-B`, `A->`, `A->A`, and empty strings
- Entries are trimmed before validation
- Duplicate edges are reported once in `duplicate_edges`
- If a child gets multiple parents, only the first valid parent edge is kept
- Root is a node that never appears as a child
- If a component has no valid root, the lexicographically smallest node is used as cycle root
- Cycles return `tree: {}` and `has_cycle: true`
- Non-cyclic trees return `depth`
- `largest_tree_root` uses maximum depth, then lexicographically smaller root as tie-breaker

## Example Test Cases

### Sample mixed input

```json
{
  "data": [
    "A->B",
    "A->C",
    "B->D",
    "C->E",
    "E->F",
    "X->Y",
    "Y->Z",
    "Z->X",
    "P->Q",
    "Q->R",
    "G->H",
    "G->H",
    "G->I",
    "hello",
    "1 ->2",
    "A->"
  ]
}
```

Expected highlights:

- `total_trees = 3`
- `total_cycles = 1`
- `largest_tree_root = "A"`
- invalid entries contain `hello`, `1 ->2`, `A->`
- duplicate edges contain `G->H`

### Duplicate-only case

```json
{
  "data": ["A->B", "A->B", "A->B"]
}
```

Expected:

- one tree
- `duplicate_edges = ["A->B"]`

### Multi-parent case

```json
{
  "data": ["A->D", "B->D", "D->E"]
}
```

Expected:

- only the `A->D` edge is kept for child `D`
- hierarchy is rooted at `A`
- `B->D` is silently ignored

### Pure cycle case

```json
{
  "data": ["Z->X", "X->Y", "Y->Z"]
}
```

Expected:

- one cyclic group
- chosen root is `"X"`
- `tree = {}`
- `has_cycle = true`

## Optional MongoDB

MongoDB is optional and not required for the evaluator. A placeholder model shape is included in
`backend/models/logModel.js` for request/response logging if you want to extend the project later.

Suggested collection shape:

```json
{
  "request": [],
  "response": {},
  "timestamp": "Date"
}
```

## Verification Completed

The project has been checked with:

- backend automated test cases via `npm test`
- frontend production build via `npm run build`
- live API request against `POST /bfhl`

## Before Submission

Replace the placeholder values in `backend/.env` with your real:

- full name
- date of birth in `ddmmyyyy`
- email address
- college roll number
