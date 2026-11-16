import { API_BASE_URL } from "@/constants";
import * as Ably from "ably";

export function createAblyClient(authToken, userId) {
  return new Ably.Realtime({
    authUrl: `${API_BASE_URL.PROD}auth/ably-token`,
    key: "UK9iPw.EOLviQ:bQpxlyuPY7xtmWOD3AzTQ9T88uxXRM08qICt8reVM6g",
    authMethod: "GET",
    authHeaders: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    },
    clientId: `${userId}`,
  });
}