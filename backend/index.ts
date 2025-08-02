interface Env {
    GOOGLE_SHEET_ID: string;
    SERVICE_ACCOUNT_JSON: string;
}

function encodeBase64(buffer: Uint8Array): string {
    return btoa(String.fromCharCode(...buffer));
}

function decodeBase64(str: string): Uint8Array {
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

export default {
    async fetch(req: Request, env: Env): Promise<Response> {
        if (req.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*", // or your domain
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        if (req.method !== "POST") {
            return new Response("This endpoint only supports POST", { status: 405 });
        }

        let body: any;
        try {
            body = await req.json();
        } catch {
            return new Response("Invalid JSON body", { status: 400 });
        }

        if (!env.SERVICE_ACCOUNT_JSON) {
            return new Response("Missing SERVICE_ACCOUNT_JSON secret", { status: 500 });
        }

        try {
            const accessToken = await getGoogleAccessToken(env.SERVICE_ACCOUNT_JSON);
            const sheetId = env.GOOGLE_SHEET_ID;

            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:append?valueInputOption=RAW`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        values: [[body.name, body.email, body.attending, body.message]],
                    }),
                }
            );

            return new Response(await response.text(), {
                status: response.status,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        } catch (err: any) {
            return new Response("Error: " + (err.message || err.toString()), { status: 500 });
        }
    },
};

async function getGoogleAccessToken(serviceAccountJson: string): Promise<string> {
    const sa = JSON.parse(serviceAccountJson);
    const now = Math.floor(Date.now() / 1000);

    const header = {
        alg: "RS256",
        typ: "JWT",
    };

    const payload = {
        iss: sa.client_email,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
    };

    const encHeader = encodeBase64(new TextEncoder().encode(JSON.stringify(header))).replace(/=+$/, "");
    const encPayload = encodeBase64(new TextEncoder().encode(JSON.stringify(payload))).replace(/=+$/, "");
    const toSign = `${encHeader}.${encPayload}`;

    const signature = await crypto.subtle.sign(
        { name: "RSASSA-PKCS1-v1_5" },
        await importPrivateKey(sa.private_key),
        new TextEncoder().encode(toSign)
    );

    const encSignature = encodeBase64(new Uint8Array(signature)).replace(/=+$/, "");
    const jwt = `${toSign}.${encSignature}`;

    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: jwt,
        }),
    });

    const data = await res.json();
    if (!data.access_token) throw new Error("Failed to fetch access token");
    return data.access_token;
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pem
        .replace(pemHeader, "")
        .replace(pemFooter, "")
        .replace(/\s+/g, "");

    const binaryDer = decodeBase64(pemContents);
    return crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: "SHA-256",
        },
        false,
        ["sign"]
    );
}
