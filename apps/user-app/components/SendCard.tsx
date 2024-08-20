"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSend = async () => {
    try {
      await p2pTransfer(number, Number(amount) * 100);
      setIsSuccess(true); // Set success state to true
    } catch (error) {
      console.error("Transfer failed", error);
      // Handle error (optional: you can set an error state and show an error message)
    }
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        </Card>
      </Center>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold text-black">Success</h2>
            <p className="text-black">Your transfer was successful!</p>
            <div className="pt-4 flex justify-center">
              <Button onClick={() => setIsSuccess(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
