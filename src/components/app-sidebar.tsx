'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { Shield, UserCircle, FileText, Settings } from 'lucide-react';

// This is sample data.
const data = {
  user: {
    name: 'User',
    email: 'user@example.com',
    avatar: '/avatars/user.jpg',
  },
  teams: [
    {
      name: 'Izind',
      logo: <Shield className="size-5" />,
      plan: 'Pro',
    },
  ],
  navMain: [
    {
      title: 'My Data',
      url: '#',
      icon: <UserCircle className="size-5" />,
      isActive: true,
      items: [
        {
          title: 'Profile',
          url: '#',
        },
        {
          title: 'Education',
          url: '#',
        },
        {
          title: 'Work Experience',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Documents',
      url: '#',
      icon: <FileText className="size-5" />,
    },
    {
      name: 'Settings',
      url: '#',
      icon: <Settings className="size-5" />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
