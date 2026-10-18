import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function md5Hex(string: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  const bin: number[] = [];
  const mask = (1 << 8) - 1;
  for (let i = 0; i < string.length * 8; i += 8) {
    bin[i >> 5] = (bin[i >> 5] || 0) | ((string.charCodeAt(i / 8) & mask) << (i % 32));
  }
  const strLen = string.length * 8;
  bin[strLen >> 5] = (bin[strLen >> 5] || 0) | (0x80 << (strLen % 32));
  const blocks = (((strLen + 64) >>> 9) << 4) + 16;
  for (let i = 0; i < blocks; i++) {
    if (bin[i] === undefined) bin[i] = 0;
  }
  bin[(((strLen + 64) >>> 9) << 4) + 14] = strLen;

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  for (let i = 0; i < bin.length; i += 16) {
    const olda = a, oldb = b, oldc = c, oldd = d;
    a = md5ff(a, b, c, d, bin[i + 0] || 0, 7, -680876936);
    d = md5ff(d, a, b, c, bin[i + 1] || 0, 12, -389564586);
    c = md5ff(c, d, a, b, bin[i + 2] || 0, 17, 606105819);
    b = md5ff(b, c, d, a, bin[i + 3] || 0, 22, -1044525330);
    a = md5ff(a, b, c, d, bin[i + 4] || 0, 7, -176418897);
    d = md5ff(d, a, b, c, bin[i + 5] || 0, 12, 1200080426);
    c = md5ff(c, d, a, b, bin[i + 6] || 0, 17, -1473231341);
    b = md5ff(b, c, d, a, bin[i + 7] || 0, 22, -45705983);
    a = md5ff(a, b, c, d, bin[i + 8] || 0, 7, 1770035416);
    d = md5ff(d, a, b, c, bin[i + 9] || 0, 12, -1958414417);
    c = md5ff(c, d, a, b, bin[i + 10] || 0, 17, -42063);
    b = md5ff(b, c, d, a, bin[i + 11] || 0, 22, -1990404162);
    a = md5ff(a, b, c, d, bin[i + 12] || 0, 7, 1804603682);
    d = md5ff(d, a, b, c, bin[i + 13] || 0, 12, -40341101);
    c = md5ff(c, d, a, b, bin[i + 14] || 0, 17, -1502002290);
    b = md5ff(b, c, d, a, bin[i + 15] || 0, 22, 1236535329);

    a = md5gg(a, b, c, d, bin[i + 1] || 0, 5, -165796510);
    d = md5gg(d, a, b, c, bin[i + 6] || 0, 9, -1069501632);
    c = md5gg(c, d, a, b, bin[i + 11] || 0, 14, 643717713);
    b = md5gg(b, c, d, a, bin[i + 0] || 0, 20, -373897302);
    a = md5gg(a, b, c, d, bin[i + 5] || 0, 5, -701558691);
    d = md5gg(d, a, b, c, bin[i + 10] || 0, 9, 38016083);
    c = md5gg(c, d, a, b, bin[i + 15] || 0, 14, -660478335);
    b = md5gg(b, c, d, a, bin[i + 4] || 0, 20, -405537848);
    a = md5gg(a, b, c, d, bin[i + 9] || 0, 5, 568446438);
    d = md5gg(d, a, b, c, bin[i + 14] || 0, 9, -1019803690);
    c = md5gg(c, d, a, b, bin[i + 3] || 0, 14, -187363961);
    b = md5gg(b, c, d, a, bin[i + 8] || 0, 20, 1163531501);
    a = md5gg(a, b, c, d, bin[i + 13] || 0, 5, -1444681467);
    d = md5gg(d, a, b, c, bin[i + 2] || 0, 9, -51403784);
    c = md5gg(c, d, a, b, bin[i + 7] || 14, 14, 1735328473);
    b = md5gg(b, c, d, a, bin[i + 12] || 0, 20, -1926607734);

    a = md5hh(a, b, c, d, bin[i + 5] || 0, 4, -378558);
    d = md5hh(d, a, b, c, bin[i + 8] || 0, 11, -2022574463);
    c = md5hh(c, d, a, b, bin[i + 11] || 0, 16, 1839030562);
    b = md5hh(b, c, d, a, bin[i + 14] || 0, 23, -35309556);
    a = md5hh(a, b, c, d, bin[i + 1] || 0, 4, -1530992060);
    d = md5hh(d, a, b, c, bin[i + 4] || 0, 11, 1272893353);
    c = md5hh(c, d, a, b, bin[i + 7] || 0, 16, -155497632);
    b = md5hh(b, c, d, a, bin[i + 10] || 0, 23, -1094730640);
    a = md5hh(a, b, c, d, bin[i + 13] || 0, 4, 681279174);
    d = md5hh(d, a, b, c, bin[i + 0] || 0, 11, -358537222);
    c = md5hh(c, d, a, b, bin[i + 3] || 0, 16, -722521979);
    b = md5hh(b, c, d, a, bin[i + 6] || 0, 23, 76029189);
    a = md5hh(a, b, c, d, bin[i + 9] || 0, 4, -640364487);
    d = md5hh(d, a, b, c, bin[i + 12] || 0, 11, -421815835);
    c = md5hh(c, d, a, b, bin[i + 15] || 0, 16, 530742520);
    b = md5hh(b, c, d, a, bin[i + 2] || 0, 23, -995338651);

    a = md5ii(a, b, c, d, bin[i + 0] || 0, 6, -198630844);
    d = md5ii(d, a, b, c, bin[i + 7] || 0, 10, 1126891415);
    c = md5ii(c, d, a, b, bin[i + 14] || 0, 15, -1416354905);
    b = md5ii(b, c, d, a, bin[i + 5] || 0, 21, -57434055);
    a = md5ii(a, b, c, d, bin[i + 12] || 0, 6, 1700485571);
    d = md5ii(d, a, b, c, bin[i + 3] || 0, 10, -1894986606);
    c = md5ii(c, d, a, b, bin[i + 10] || 0, 15, -1051523);
    b = md5ii(b, c, d, a, bin[i + 1] || 0, 21, -2054922799);
    a = md5ii(a, b, c, d, bin[i + 8] || 0, 6, 1873313359);
    d = md5ii(d, a, b, c, bin[i + 15] || 0, 10, -30611744);
    c = md5ii(c, d, a, b, bin[i + 6] || 0, 15, -1560198380);
    b = md5ii(b, c, d, a, bin[i + 13] || 0, 21, 1309151649);
    a = md5ii(a, b, c, d, bin[i + 4] || 0, 6, -145523070);
    d = md5ii(d, a, b, c, bin[i + 11] || 0, 10, -1120210379);
    c = md5ii(c, d, a, b, bin[i + 2] || 0, 15, 718787259);
    b = md5ii(b, c, d, a, bin[i + 9] || 0, 21, -343485551);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  const hexTab = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < 4; i++) {
    const val = [a, b, c, d][i] || 0;
    for (let j = 0; j < 4; j++) {
      out += hexTab.charAt((val >> (j * 8 + 4)) & 0x0f) + hexTab.charAt((val >> (j * 8)) & 0x0f);
    }
  }
  return out;
}

import crypto from "crypto";

/**
 * Deterministically transforms any string (or legacy test/question ID)
 * into a valid RFC 4122 v4 UUID using MD5 hashing.
 * Pure JavaScript implementation with Node crypto acceleration.
 */
export function stringToUuid(str: string): string {
  if (!str) return "00000000-0000-4000-8000-000000000000";
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(str)) {
    return str.toLowerCase();
  }
  let hash = "";
  try {
    if (crypto && typeof crypto.createHash === "function") {
      hash = crypto.createHash("md5").update(str).digest("hex");
    }
  } catch {}
  if (!hash) {
    hash = md5Hex(str);
  }
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    "4" + hash.substring(13, 16),
    ((parseInt(hash.substring(16, 18), 16) & 0x3f) | 0x80).toString(16) +
      hash.substring(18, 20),
    hash.substring(20, 32),
  ].join("-");
}

const PROTECTED_OPTION_PREFIXES = [
  "o-", "p-", "m-", "cis-", "trans-", "tert-", "sec-", "n-", "t-", "s-", "d-", "l-", "dl-",
  "pH", "pKa", "pKb", "pOH", "mRNA", "tRNA", "rRNA", "cDNA", "siRNA", "miRNA",
  "sp ", "sp2", "sp3", "d2sp3", "sp3d2",
];

/**
 * Safely capitalizes sentence beginnings of textual answer options,
 * protecting stereochemical prefixes, units, and mathematical expressions.
 */
export function safeCapitalizeOptionText(text: string): string {
  if (!text || typeof text !== "string") return text;
  // Strip trailing NTA section/options header noise if present
  const cleaned = text.replace(/(\r?\n|\s{2,})(?:Options\s+\d+.*|Section\s*:.*)$/is, "").trim();
  if (!cleaned) return text;

  const match = cleaned.match(/^(\s*)([a-zA-Z])(.*)$/s);
  if (!match || !match[2]) return cleaned;

  const leadingSpace = match[1] ?? "";
  const firstChar = match[2];
  const rest = match[3] ?? "";

  if (firstChar === firstChar.toUpperCase()) return cleaned;

  const checkStr = firstChar + rest;
  for (const prefix of PROTECTED_OPTION_PREFIXES) {
    if (checkStr.startsWith(prefix)) return cleaned;
  }
  if (/^[a-z]\s*=/.test(checkStr)) return cleaned;

  return leadingSpace + firstChar.toUpperCase() + rest;
}

