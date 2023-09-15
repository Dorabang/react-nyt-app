function getItem(key: string) {
  const value = localStorage.getItem(key);

  return value === null ? null : JSON.parse(value);
}

function setItem(key: string, value: any) {
  if (value === null || value === undefined) return;

  const toJson = JSON.stringify(value);

  localStorage.setItem(key, toJson);
}

export { getItem, setItem };
