"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext(null);

function Tabs({ value, onValueChange, className, ...props }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("grid gap-6", className)} {...props} />
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }) {
  return (
    <div
      role="tablist"
      className={cn("flex flex-wrap gap-2.5", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, value, children, ...props }) {
  const ctx = React.useContext(TabsContext);
  const selected = ctx?.value === value;
  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={() => ctx?.onValueChange(value)}
      className={cn(
        "rounded-full px-5 py-2.5 text-[0.9rem] font-bold transition-all cursor-pointer",
        selected
          ? "bg-foreground text-background shadow-[0_6px_18px_rgba(15,23,42,0.25)] scale-[1.03]"
          : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ className, value, children, ...props }) {
  const ctx = React.useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return (
    <div role="tabpanel" className={cn("animate-in", className)} {...props}>
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
