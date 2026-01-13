import { serve } from "inngest/next";
import { aj } from "@/lib/arcjet";

import { inngest } from "@/lib/inngest/client";
import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/functions";

// Create the base handlers
const handlers = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransactions,
    generateMonthlyReports,
    checkBudgetAlerts,
  ],
});

// Wrap each handler with Arcjet protection
export async function GET(req) {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return Response.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 }
    );
  }

  return handlers.GET(req);
}

export async function POST(req) {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return Response.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 }
    );
  }

  return handlers.POST(req);
}

export async function PUT(req) {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return Response.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 }
    );
  }

  return handlers.PUT(req);
}
