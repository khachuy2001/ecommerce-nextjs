"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Đảm bảo đường dẫn này đúng với project của bạn
import { Facebook, Github, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

const socialLink = [
  {
    title: "Youtube",
    href: "https://youtube.com",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://github.com",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://linkedin.com",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://facebook.com",
    icon: <Facebook className="w-5 h-5" />,
  },
];

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                href={item?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:bg-black hover:text-white hover:border-shop_light_green transition-all duration-300",
                  iconClassName
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent className={cn("bg-white text-darkColor font-semibold border", tooltipClassName)}>
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;