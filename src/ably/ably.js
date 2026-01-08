import * as Ably from "ably";

export function createAblyClient(authToken, userId, apiKey) {
  return new Ably.Realtime({
    authUrl: "http://127.0.0.1:8000/api/v1/auth/ably-token",
    key:"UK9iPw.EOLviQ:bQpxlyuPY7xtmWOD3AzTQ9T88uxXRM08qICt8reVM6g",
    authMethod: "GET",
    authHeaders: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
      "API-KEY":`${apiKey}`
    },
    clientId:`${userId}`
  });
}
