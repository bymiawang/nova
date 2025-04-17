"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col w-full">
          <DashboardHeader />
          <main className="flex-1 container px-4 md:px-6">
            <div className="h-full w-full">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
