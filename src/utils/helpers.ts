import * as crypto from "node:crypto";
import { promisify } from "node:util";
const scrypt = promisify(crypto.scrypt);

export function validateBearerToken(authorization?: string): string | false {
    const [type, token] = authorization?.split(" ") ?? [];
    return (type === "Bearer" && token) || false;
}

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(8).toString("hex");
    const genHash = ((await scrypt(password, salt, 16)) as Buffer).toString("hex");
    return `${genHash}.${salt}`;
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    const [hashPassword, salt] = hash.split(".");
    const checkHash = (await scrypt(password, salt, 16)) as Buffer;
    return crypto.timingSafeEqual(Buffer.from(hashPassword, "hex"), checkHash);
}

export function makeUrl(root: string, endpoint: string): string {
    const url = root.match(/^http(?:s?)/)
        ? new URL(endpoint, root)
        : new URL(endpoint, `https://${root}`);
    return url.toString();
}

export function generateCode(): number {
    return crypto.randomInt(100000, 999999);
}

