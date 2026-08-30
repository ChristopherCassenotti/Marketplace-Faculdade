import crypto from "node:crypto";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não configurado no .env");
  }
  return secret;
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

export function gerarToken(payload, expiresInSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(body));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(unsignedToken)
    .digest("base64url");

  return `${unsignedToken}.${signature}`;
}

export function verificarToken(token) {
  const parts = token?.split(".");
  if (!parts || parts.length !== 3) {
    throw new Error("Token inválido");
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(unsignedToken)
    .digest("base64url");

  const received = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (
    received.length !== expected.length ||
    !crypto.timingSafeEqual(received, expected)
  ) {
    throw new Error("Assinatura inválida");
  }

  const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString());
  if (header.alg !== "HS256" || header.typ !== "JWT") {
    throw new Error("Token inválido");
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString());
  const now = Math.floor(Date.now() / 1000);

  if (!payload.exp || payload.exp <= now) {
    throw new Error("Token expirado");
  }

  return payload;
}
