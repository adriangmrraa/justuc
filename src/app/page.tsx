import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Calendar, FileText, Lock, Star, ArrowRight, Scale, Rocket } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect directly to dashboard for demo mode
  redirect("/dashboard");

  return null;
}