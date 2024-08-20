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
        <h1 className="text-4xl font-bold text-white m-2 p-4">Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg p-6 m-4 ">
          <DashboardBalanceCard
            amount={balance.amount}
            locked={balance.locked}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-10 p-5">
          <OnRampTransactions transactions={transactions} />
          {/* Other dashboard cards or components */}
        </div>
      </main>
    </div>
  );
}
