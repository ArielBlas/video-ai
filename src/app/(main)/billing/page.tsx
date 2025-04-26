"use client";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import { CircleDollarSign } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export const creditsPlans = [
  {
    credits: 10,
    cost: 1,
  },
  {
    credits: 50,
    cost: 5,
  },
  {
    credits: 100,
    cost: 9,
  },
  {
    credits: 200,
    cost: 15,
  },
  {
    credits: 500,
    cost: 30,
  },
];

function Billing() {
  const { user, setUser } = useAuthContext();
  const updateUserCredits = useMutation(api.users.UpdateUserCredits);

  const onPaymentSuccess = async (cost, credits) => {
    const result = await updateUserCredits({
      uid: user?.id,
      credits: Number(user.credits) + Number(credits),
    });
    setUser((prev) => ({
      ...prev,
      credits: Number(user.credits) + Number(credits),
    }));
    toast.success("Credits Added!");
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Credits</h2>

      <div className="p-4 border rounded-xl flex justify-between mt-7 max-w-2xl">
        <div>
          <h2 className="font-bold text-xl">Total Credits Left</h2>
          <h2 className="text-sm">1 Credits = 1 Video</h2>
        </div>
        <h2 className="font-bold text-3xl">{user?.credits} Credits</h2>
      </div>
      <p className="tex-sm p-5 text-gray-500 max-w-2xl">When your credit </p>
      <div className="mt-5">
        <h2 className="font-bold text-2xl">Buy more credits balance</h2>

        <div>
          {creditsPlans.map((plan, index) => (
            <div
              key={index}
              className="p-5 mt-3 border rounded-xl max-w-2xl flex justify-between items-center"
            >
              <h2 className="text-xl flex gap-2 items-center">
                <CircleDollarSign /> <strong>{plan?.credits}</strong>
              </h2>

              <div className="flex gap-2 items-center">
                <h2 className="font-medium text-xl">{plan.cost} $</h2>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  onApprove={() => onPaymentSuccess(plan.cost, plan.credits)}
                  onCancel={() => toast("Payment Cancelled!")}
                  createOrder={(data, actions) => {
                    return actions?.order?.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            value: String(plan.cost),
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Billing;
