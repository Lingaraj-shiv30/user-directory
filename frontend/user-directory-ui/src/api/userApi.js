const BASE = import.meta.env.VITE_API_BASE_URL;

export async function getUsers() {
  const res = await fetch(`${BASE}/api/users`);
  if (!res.ok) throw new Error(`Failed to load users (${res.status})`);
  return res.json();
}

export async function createUser(payload) {
  const res = await fetch(`${BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.status === 400) {
    // validation problem details
    const data = await res.json();
    const msg = data?.title || "Validation failed";
    throw new Error(msg);
  }

  if (!res.ok) throw new Error(`Failed to create user (${res.status})`);
  return res.json();
}