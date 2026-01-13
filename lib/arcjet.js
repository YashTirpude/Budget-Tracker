import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next";

// Main Arcjet instance with shield and bot detection
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "GO_HTTP", // For Inngest
      ],
    }),
  ],
});

// Separate instance for rate limiting (collections, etc.)
export const ajRateLimit = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], // Track based on Clerk userId
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // 10 collections
      interval: 3600, // per hour
      capacity: 10, // maximum burst capacity
    }),
  ],
});
