"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex ${selected ? "text-white" : "text-white"} cursor-pointer  p-2 pl-8`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#e0f2fe]" : "text-[#1d4ed8]"}`}
      >
        {title}
      </div>
    </div>
  );
};
