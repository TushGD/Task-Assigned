# Taskboard — Task Management Dashboard

A sleek, dark-themed Kanban-style task management dashboard built with React + Vite. Drag tasks between columns, filter by priority, and persist everything in localStorage — no backend required.

🔗 **[Live Demo](https://task-manage-one-orpin.vercel.app/)** · 📦 **[Repository](#)**

---

## Features

- **Kanban board** — Three columns: To Do / In Progress / Done
- **Drag & Drop** — Native HTML5 drag-and-drop between columns
- **Full CRUD** — Create, edit, and delete tasks via a modal form
- **LocalStorage persistence** — Tasks survive page refreshes; seeds sample data on first load
- **Priority system** — High / Medium / Low with color-coded cards and badges
- **Due date tracking** — Overdue dates highlighted in red, due-soon in amber
- **Search & filter** — Real-time search by title or description; filter by priority
- **Confirmation dialogs** — No accidental deletions or bulk clears
- **Toast notifications** — Non-blocking feedback on every action
- **Responsive layout** — Single-column on mobile, three-column on desktop

---

## Tech Stack

| Technology       | Purpose                              |
|-----------------|--------------------------------------|
| React 18        | Component-based UI                   |
| Vite            | Fast dev server and bundler          |
| CSS Modules     | Scoped component styles              |
| HTML5 Drag API  | Native drag-and-drop (no extra lib)  |
| localStorage    | Client-side task persistence         |
| uuid            | Unique IDs for tasks                 |

---

## Folder Structure

```
task-management-dashboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root: wires hooks + modals
    ├── styles/
    │   └── global.css        # CSS variables, resets, animations
    ├── data/
    │   ├── constants.js      # COLUMNS, PRIORITIES, STORAGE_KEY
    │   └── seedData.js       # Initial demo tasks
    ├── utils/
    │   ├── storage.js        # loadTasks / saveTasks / clearTasks
    │   ├── dateUtils.js      # isOverdue, isDueSoon, formatDate
    │   └── taskUtils.js      # moveTask, filterTasks, sortByCreated
    ├── hooks/
    │   ├── useTasks.js       # Task state + CRUD operations
    │   ├── useToasts.js      # Toast notification queue
    │   └── useDragDrop.js    # HTML5 DnD state management
    └── components/
        ├── Header.jsx / .module.css
        ├── Dashboard.jsx / .module.css
        ├── Column.jsx / .module.css
        ├── TaskCard.jsx / .module.css
        ├── TaskForm.jsx / .module.css
        ├── ConfirmDialog.jsx / .module.css
        └── Toast.jsx / .module.css
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/task-management-dashboard.git
cd task-management-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

### Vercel
1. Push repository to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Vite** — build command `npm run build`, output `dist`
4. Deploy

---

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Drag state across columns | Lifted DnD state into a custom `useDragDrop` hook; passed callbacks down |
| Stale closure in drag handler | Used `useCallback` with stable dependencies |
| LocalStorage corruption | Wrapped all `JSON.parse` calls in try/catch with seed-data fallback |
| Module CSS + CSS variables | Defined variables on `:root` in `global.css`; referenced in all modules |

---

## Future Enhancements

- User authentication (Supabase / Firebase)
- Task assignments and team collaboration
- Subtasks and checklists
- Drag-to-reorder within the same column
- Dark/light theme toggle
- Push notifications for due dates
- Export to CSV / PDF

---

## Contributing

Contributions are welcome! Please open an issue or pull request.

## License

MIT
