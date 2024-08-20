import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { DashboardBalanceCard } from "../../../components/DashboardBalance";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function () {
  const transactions = await getOnRampTransactions();
  const balance = await getBalance();

  return (
    <div className="bg-blue-3 min-h-screen">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <OnRampTransactions transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
