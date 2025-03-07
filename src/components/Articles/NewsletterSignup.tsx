"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement newsletter signup API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Failed to subscribe to newsletter", error);
      toast.error("Failed to subscribe to newsletter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-muted rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Get the latest news and updates delivered directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
} 