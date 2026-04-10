import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  DollarSign,
  CheckCircle,
  Clock,
  Download,
  CreditCard,
} from "lucide-react";

const feeStructure = [
  { category: "Tuition Fee", amount: 5000, paid: 5000, status: "paid" },
  { category: "Lab Fee", amount: 1000, paid: 1000, status: "paid" },
  { category: "Library Fee", amount: 500, paid: 500, status: "paid" },
  { category: "Sports Fee", amount: 300, paid: 0, status: "pending" },
  { category: "Development Fee", amount: 400, paid: 0, status: "pending" },
];

const paymentHistory = [
  {
    id: 1,
    date: "Jan 15, 2026",
    amount: 6500,
    method: "Online",
    receipt: "REC001",
    status: "Success",
  },
  {
    id: 2,
    date: "Aug 20, 2025",
    amount: 6500,
    method: "Card",
    receipt: "REC002",
    status: "Success",
  },
  {
    id: 3,
    date: "Jan 18, 2025",
    amount: 6000,
    method: "Online",
    receipt: "REC003",
    status: "Success",
  },
];

export function Fees() {
  const totalFee = feeStructure.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = feeStructure.reduce((sum, item) => sum + item.paid, 0);
  const totalDue = totalFee - totalPaid;
  const paidPercentage = ((totalPaid / totalFee) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fee Management</h1>
        <p className="text-muted-foreground mt-1">View and pay your fees</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">${totalFee}</p>
                <p className="text-sm text-muted-foreground">Total Fee</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">${totalPaid}</p>
                <p className="text-sm text-muted-foreground">
                  Paid ({paidPercentage}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-3xl font-bold text-destructive">
                  ${totalDue}
                </p>
                <p className="text-sm text-muted-foreground">Due</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Fee Structure - Semester 2, 2026</CardTitle>
            {totalDue > 0 && (
              <Button variant="primary">
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeStructure.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      item.status === "paid"
                        ? "bg-accent/10"
                        : "bg-orange-100 dark:bg-orange-900/20"
                    }`}
                  >
                    {item.status === "paid" ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : (
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.status === "paid"
                        ? `Paid: $${item.paid}`
                        : `Due: $${item.amount}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${item.amount}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "paid"
                        ? "bg-accent/10 text-accent"
                        : "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                    }`}
                  >
                    {item.status === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t-2 border-border">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${totalFee}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Method</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Receipt No.
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">{payment.date}</td>
                    <td className="py-3 px-4 font-semibold">
                      ${payment.amount}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {payment.method}
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      {payment.receipt}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex flex-col items-center gap-3 p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
              <CreditCard className="w-8 h-8 text-primary" />
              <span className="font-medium">Credit/Debit Card</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 border-2 border-border rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all">
              <DollarSign className="w-8 h-8 text-secondary" />
              <span className="font-medium">Net Banking</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all">
              <DollarSign className="w-8 h-8 text-accent" />
              <span className="font-medium">UPI Payment</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
