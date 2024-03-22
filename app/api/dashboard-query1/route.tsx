import { NextRequest, NextResponse } from "next/server";
import { db } from "../db";

export async function GET(req: NextRequest) {
  const providers = await db.insurance.groupBy({
    by: ['provider'],
    _count: {
      provider: true
    }
  });

  const providerCounts = providers.map(provider => ({
    provider: provider.provider,
    count: provider._count.provider
  }));

  return NextResponse.json(providerCounts);
}
