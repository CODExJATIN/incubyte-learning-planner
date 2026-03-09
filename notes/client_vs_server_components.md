# Server Components vs Client Components (Next.js)

## 1. Server Components

Server Components run **only on the server** and are the **default in Next.js App Router**.

### Key Characteristics
- Executed on the **server**
- **No JavaScript** sent to browser
- Can access **database, backend APIs, environment variables**
- Supports **async/await**
- Faster initial load
- Better for **SEO and performance**

### Cannot Use
- `useState`
- `useEffect`
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`window`, `document`, `localStorage`)

### Example

```jsx
// app/page.js

export default async function Page() {
  const data = await fetch("https://api.example.com/posts")
  const posts = await data.json()

  return (
    <div>
      {posts.map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  )
}
````

---

# 2. Client Components

Client Components run **in the browser** and allow **user interaction**.

To create a Client Component, add:

```js
"use client"
```

at the **top of the file**.

### Key Characteristics

* Runs in the **browser**
* JavaScript bundle sent to browser
* Supports **React hooks**
* Supports **event handlers**

### Used For

* Buttons
* Forms
* Interactive UI
* Animations
* State management

### Example

```jsx
"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

---

# 3. Using Server and Client Components Together

Server Components usually **fetch data** and pass it to **Client Components for interaction**.

### Example

```jsx
// Server Component
import Counter from "./Counter"

export default async function Page() {
  const data = await fetch("https://api.example.com/user")
  const user = await data.json()

  return (
    <div>
      <h1>{user.name}</h1>
      <Counter />
    </div>
  )
}
```

Client Component:

```jsx
"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Click {count}
    </button>
  )
}
```

---

# 4. Key Differences

| Feature                      | Server Component   | Client Component |
| ---------------------------- | ------------------ | ---------------- |
| Runs on                      | Server             | Browser          |
| Default in Next.js           | Yes                | No               |
| JavaScript sent to browser   | No                 | Yes              |
| Can use React hooks          | No                 | Yes              |
| Can access database directly | Yes                | No               |
| Best for                     | Data fetching, SEO | Interactivity    |

---

# 5. Best Practice

* **Use Server Components by default**
* **Use Client Components only when needed**

This keeps the app **fast and reduces JavaScript bundle size**.


