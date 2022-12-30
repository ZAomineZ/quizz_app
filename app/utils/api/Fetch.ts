export async function getAPI(url: string, bearerToken: string | null = null) {
  let headers = new Headers();
  headers.append("Content-type", "application/json");
  if (bearerToken) {
    console.log(bearerToken);
    headers.append("Authorization", `Bearer ${bearerToken}`);
  }

  return await fetch(url, {
    method: "GET",
    headers
  }).then((r) => r.json());
}

export async function postAPI(
  url: string,
  body: object | FormData,
  bearerToken: string | null = null,
  imageFormData: boolean = false
) {
  let headers = new Headers();
  headers.append("Content-type", "application/json");
  headers.append("Accept", "application/json");

  if (imageFormData) {
    headers.delete("Content-type");
  }
  if (bearerToken) {
    headers.append("Authorization", `Bearer ${bearerToken}`);
  }

  return await fetch(url, {
    method: "POST",
    headers,
    body: !imageFormData ? JSON.stringify(body) : (body as BodyInit)
  }).then((r) => r.json());
}

export async function putAPI(
  url: string,
  body: object,
  bearerToken: string | null = null
) {
  let headers = new Headers();
  headers.append("Content-type", "application/json");
  headers.append("Accept", "application/json");

  if (bearerToken) {
    let bearerCSRFToken = document
      ?.querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    headers.append("Authorization", `Bearer ${bearerToken}`);
    if (bearerCSRFToken) headers.append("X-CSRF-TOKEN", bearerCSRFToken);
  }

  return await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body)
  }).then((r) => r.json());
}

export async function deleteAPI(
  url: string,
  bearerToken: string | null = null
) {
  let headers = new Headers();
  headers.append("Content-type", "application/json");

  if (bearerToken) {
    headers.append("Authorization", `Bearer ${bearerToken}`);
  }
  return await fetch(url, {
    method: "DELETE",
    headers
  }).then((r) => r.json());
}
