import { Card } from "@repo/ui/card";

export const DashboardBalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title={"Current Balance"} className="text-center">
      <div className="text-4xl font-bold">{(locked + amount) / 100} Rs</div>
      <div className="text-sm mt-2">
        <span className="font-medium">Available Balance</span>
      </div>
    </Card>
  );
};
