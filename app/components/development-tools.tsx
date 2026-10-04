"use client";
import dynamic from "next/dynamic";
const Panel = process.env.NODE_ENV === "development" ? dynamic(() => import("./dev-gamification-panel"), { ssr: false }) : null;
export function DevelopmentTools() { return Panel ? <Panel/> : null; }
