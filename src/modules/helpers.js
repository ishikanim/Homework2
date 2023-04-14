const apiBaseURL = process.env.NEXT_TASK_API_ENDPOINT;

export async function fetchTask(token, id, userId) {
  const url = `${apiBaseURL}/todos/?${new URLSearchParams({ _id: id, user_id: userId })}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json();
}

export async function setTaskCompletion(token, id, completed) {
  const msg = { done: completed };
  const response = await fetch(`${apiBaseURL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });

  return await response;
}

export async function updateTaskDescription(token, id, newDescription) {
  const msg = { description: newDescription };
  const response = await fetch(`${apiBaseURL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });

  return await response;
}

export async function fetchAllInProgress(token, userId) {
  const url = `${apiBaseURL}/todos/?${new URLSearchParams({ done: false, user_id: userId })}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json();
}

export async function fetchAllCompleted(token, userId) {
  const url = `${apiBaseURL}/todos/?${new URLSearchParams({ done: true, user_id: userId })}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json();
}

export async function createTask(token, userId, description) {
  const url = `${apiBaseURL}/todos/`;
  const msg = {
    description: description,
    user_id: userId,
    done: false,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });

  return await response.json();
}
