export async function getAPI(url, bearerToken = null) {
  let headers = new Headers();
  headers.append("Content-type", "application/json");
  if (bearerToken) {
    headers.append("Authorization", `Bearer ${bearerToken}`);
  }
  headers.append(
    "X-CSRF-TOKEN",
    document.querySelector('meta[name="csrf-token"]').getAttribute("content")
  );

  return await fetch(url, {
    method: "GET",
    headers
  }).then((r) => r.json());
}
