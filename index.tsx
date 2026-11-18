import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Columns3,
  FolderKanban,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/taskflow/logo";
import { PriorityBadge } from "@/components/taskflow/badges";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TaskFlow AI — Plan smarter, finish faster" },
      {
        name: "description",
        content:
          "TaskFlow AI turns plain language into organized tasks, schedules your day and keeps every project on track.",
      },
      { property: "og:title", content: "TaskFlow AI — Plan smarter, finish faster" },
      {
        property: "og:description",
        content:
          "Tasks, projects, calendar and an AI productivity assistant for students, freelancers and teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: Sparkles, title: "AI assistant", body: "Describe your week in plain words. Get prioritized tasks, schedules and realistic deadlines." },
  { icon: Columns3, title: "List, board & calendar", body: "Three views on the same tasks. Drag cards between columns and watch everything update." },
  { icon: BarChart3, title: "Live dashboard", body: "Completion rate, overdue work, weekly momentum and what's next — always up to date." },
  { icon: FolderKanban, title: "Projects", body: "Group tasks into color-coded projects and see progress at a glance." },
  { icon: CalendarDays, title: "Deadlines that stick", body: "Start dates, due dates and estimates so your plan matches reality." },
  { icon: ShieldCheck, title: "Private by default", body: "Your tasks are yours. Every record is locked to your account." },
];

function Landing() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
      // Arriving from an email confirmation link: go straight to the app.
      if (data.session && window.location.hash.includes("access_token")) {
        navigate({ to: "/dashboard", replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-transparent bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <div className="flex items-center gap-2">
            {signedIn ? (
              <Button asChild>
                <Link to="/dashboard">Open dashboard <ArrowRight /></Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link to="/auth">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth" search={{ mode: "signup" }}>Get started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs animate-rise">
            <Sparkles className="size-3.5 text-electric" /> Your AI-powered productivity workspace
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl animate-rise">
            Plan smarter.{" "}
            <span className="font-display font-normal italic text-gradient-brand">Finish faster.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground animate-rise">
            TaskFlow AI turns what's on your mind into an organized plan — tasks, projects, schedules
            and deadlines, all in one calm place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-rise">
            <Button asChild size="lg" variant="brand" className="h-11 px-6">
              {signedIn ? (
                <Link to="/dashboard">
                  Go to dashboard <ArrowRight />
                </Link>
              ) : (
                <Link to="/auth" search={{ mode: "signup" }}>
                  Start for free <ArrowRight />
                </Link>
              )}
            </Button>
            {!signedIn && (
              <Button asChild size="lg" variant="outline" className="h-11 px-6">
                <Link to="/auth">I have an account</Link>
              </Button>
            )}
          </div>

          <ProductPreview />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Everything you need to get things done</h2>
          <p className="mt-3 text-muted-foreground">
            Built for students, freelancers, professionals and small teams.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="surface p-6 transition-shadow hover:shadow-pop">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <f.icon className="size-4" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border bg-sidebar px-8 py-14 text-center">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl">
              Your clearest week <span className="italic text-gradient-brand">starts now.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">Free to start. No credit card needed.</p>
            <Button asChild size="lg" className="mt-7 h-11 px-6">
              {signedIn ? (
                <Link to="/dashboard">
                  Open TaskFlow <ArrowRight />
                </Link>
              ) : (
                <Link to="/auth" search={{ mode: "signup" }}>
                  Create your account <ArrowRight />
                </Link>
              )}
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} TaskFlow AI. Built for focused people.</p>
        </div>
      </footer>
    </div>
  );
}

function ProductPreview() {
  const cols = [
    { title: "To Do", items: [{ t: "Outline thesis chapter 3", p: "high" }, { t: "Book dentist appointment", p: "low" }] },
    { title: "In Progress", items: [{ t: "Client landing page v2", p: "urgent" }, { t: "Weekly team sync notes", p: "medium" }] },
    { title: "Completed", items: [{ t: "Send invoice #1042", p: "medium" }] },
  ];
  return (
    <div className="relative mx-auto mt-16 max-w-5xl animate-rise">
      <div className="absolute -inset-x-8 -inset-y-6 rounded-[2rem] bg-primary/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border bg-card text-left shadow-pop">
        <div className="flex items-center gap-1.5 border-b bg-muted/60 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-warning/70" />
          <span className="size-2.5 rounded-full bg-success/70" />
          <span className="ml-3 text-xs text-muted-foreground">TaskFlow AI — Board</span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-3">
          {cols.map((c) => (
            <div key={c.title} className="rounded-xl bg-muted/60 p-3">
              <p className="mb-2.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
                {c.title} <span>{c.items.length}</span>
              </p>
              <div className="space-y-2">
                {c.items.map((i) => (
                  <div key={i.t} className="rounded-lg border bg-card p-3 shadow-xs">
                    <p className="flex items-start gap-2 text-sm font-medium">
                      {c.title === "Completed" && <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />}
                      <span className={c.title === "Completed" ? "text-muted-foreground line-through" : ""}>{i.t}</span>
                    </p>
                    <div className="mt-2">
                      <PriorityBadge priority={i.p} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-5 mb-5 flex items-start gap-3 rounded-xl border bg-accent/50 p-4">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-brand">
            <Sparkles className="size-3.5 text-primary-foreground" />
          </div>
          <p className="text-sm text-foreground">
            <span className="font-medium">TaskFlow AI:</span>{" "}
            <span className="text-muted-foreground">
              "The landing page is due tomorrow and marked urgent — block 9–11am for it, then outline chapter 3 after lunch."
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
