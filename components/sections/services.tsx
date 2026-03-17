"use client";

import { SectionWrapper, AnimatedItem } from "@/components/section-wrapper";
import { ShieldCheck, BrainCircuit, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export function Services() {
  const services = [
    {
      title: "Building Securely by Default",
      description:
        "For me, security isn’t an afterthought—it’s where I start. I focus on learning how to protect users and data through secure authentication, hardened APIs, and by staying curious about potential vulnerabilities before they become problems.",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
      title: "Building with AI",
      description:
        "I love turning raw AI capabilities into actual, usable tools. I’m experimenting with everything from prompt engineering to full API integration, finding the best ways to use models like GPT and Claude to make apps smarter and more helpful..",
      icon: <BrainCircuit className="h-6 w-6" />,
    },
    {
      title: "The Full-Stack Puzzle",
      description:
        "I enjoy the challenge of connecting every piece of a project—from the infrastructure to the UI. I’m currently focused on mastering the Next.js and React ecosystem, building scalable apps that are as fast as they are reliable on any device.",
      icon: <Code2 className="h-6 w-6" />,
    },
  ];

  return (
    <SectionWrapper id="services" staggerChildren className="border-t border-border mt-6 py-14 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <AnimatedItem>
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold tracking-tight">Philosophy & Approach</h2>
            <p className="mt-4 text-muted-foreground">
              I&apos;m a big believer in building software that is just as solid and secure under the hood as it is clean on the surface.
            </p>
          </div>
        </AnimatedItem>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <AnimatedItem key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer h-full"
              >
                <motion.div 
                  className="p-3 bg-muted w-fit rounded-lg text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
