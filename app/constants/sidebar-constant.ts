import { AppWindowIcon, BriefcaseBusinessIcon, LayoutDashboard, Settings } from "lucide-react";

export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboard,
        },
        {
            title: "Projects",
            url: "/admin/projects",
            icon: AppWindowIcon,
        },
        {
            title: "Experiences",
            url: "/admin/experiences",
            icon: BriefcaseBusinessIcon,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ],
}