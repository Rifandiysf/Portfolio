import { ProjectItem } from "./types";


export const projectItems: ProjectItem[] = [
    {
        slug: "sibening",
        title: "Sibening",
        description: "Electronic guidance & counseling system for high school BK teachers.",
        image: "/images/sibening.png",
        images: [
            "/images/sibening1.png",
            "/images/sibening2.png",
            "/images/sibening3.png",
        ],
        status: ["Web Development", "School App"],
        year: 2025,
        liveUrl: "",
        githubUrl: "",
        techStack: [
            "React.js",
            "JavaScript",
            "Tailwind CSS",
            "Real-time WebSocket",
        ],
        features: [
            "Student attendance tracking",
            "Late student monitoring",
            "Problem student records",
            "Real-time counseling chat",
            "Teacher & student dashboards",
        ],
        objective: `Student guidance and counseling (BK) in schools has long relied on manual, paper-based processes — making it difficult for teachers to monitor attendance patterns, track behavioral issues, and communicate with students in a timely manner.\n\nThe challenge was clear: BK teachers needed a centralized digital platform that could replace scattered spreadsheets and in-person visits with a unified system, accessible from any device, without adding complexity to their daily workflow.`,
        solution: `Sibening (Sistem Bimbingan Elektronik dan Konseling) was built as a full-featured web application tailored specifically for school BK departments. The system brings together four core modules — attendance management, late arrival tracking, problem student records, and real-time consultation chat — all under one roof.\n\nThe real-time chat feature connects students directly with their BK teacher, enabling immediate counseling without scheduling constraints. Attendance data is visualized with status filters (Present, Sick, Excused, Absent), giving teachers instant visibility into class health at a glance. The result is a leaner, faster, and more humane counseling experience for both teachers and students.`,
    },

    {
        slug: "company-leave",
        title: "Company Leave",
        description: "Leave management system built during a 5-month internship at PT. Walden Global Services.",
        image: "/images/leave-app.png",
        images: [
            "/images/leave-app1.png",
            "/images/leave-app2.png",
            "/images/leave-app3.png",
        ],
        status: ["Internship", "Web Development"],
        year: 2025,
        liveUrl: "",
        githubUrl: "",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "REST API Integration",
            "Chart.js / Recharts",
        ],
        features: [
            "Leave request submission",
            "Leave history per employee",
            "Remaining leave quota tracker",
            "Admin leave overview dashboard",
            "Multi-year leave balance support",
            "HR approval workflow",
        ],
        objective: `Managing employee leave manually is a common pain point for HR teams — tracking quotas, handling requests, and maintaining historical records across dozens or hundreds of employees is error-prone and time-consuming.\n\nDuring my 5-month frontend internship at PT. Walden Global Services, the team needed a dedicated leave management application that could streamline the entire leave lifecycle: from employee submissions to HR approvals, with full visibility into remaining balances and historical data.`,
        solution: `As the frontend developer on this project, I built a dual-interface application — one for employees and one for HR admins. Employees can submit leave requests, track their remaining quota across multiple years, and view their full leave history in a clean dashboard.\n\nThe admin side features a comprehensive overview of all employee leave activity, with diagram-based analytics to help HR teams spot patterns and manage workforce availability more effectively. Special attention was given to edge cases like expired leave balances from previous years, shown clearly in the UI to avoid confusion. The project sharpened my ability to work within a real engineering team, deliver production-ready code, and collaborate closely with backend developers on API integration.`,
    },

    {
        slug: "waroeng-pos",
        title: "Waroeng POS",
        description: "A real-time restaurant point of sale system for cashiers and kitchen staff with live order tracking.",
        image: "/images/waroeng.png",
        images: [
            "/images/waroeng1.png",
            "/images/waroeng2.png",
            "/images/waroeng3.png",
        ],
        status: ["Web Development", "Restaurant App"],
        year: 2026,
        liveUrl: "",
        githubUrl: "",
        techStack: [
            "Next.js",
            "TypeScript",
            "Supabase",
            "Zustand",
            "TanStack Query",
            "Shadcn/UI",
            "Tailwind CSS",
        ],
        features: [
            "Real-time order management dashboard",
            "Menu browsing with category filters",
            "Cart & order creation for cashiers",
            "Kitchen display with live order updates",
            "Order status tracking (Pending, Process, Ready, Served)",
            "Table occupancy monitoring",
            "Revenue & sales analytics",
        ],
        objective: `Managing orders in a busy restaurant environment often leads to miscommunication between the front-of-house and the kitchen — missed orders, wrong tables, and delayed service are common pain points when relying on paper tickets or verbal handoffs.\n\nThe goal was to build a unified digital system where cashiers and kitchen staff could work in sync, with every order instantly visible to both parties without needing to refresh or manually update anything.`,
        solution: `Waroeng POS was built as a full-stack restaurant point of sale system with two distinct roles in mind: the cashier and the kitchen. Cashiers can browse the menu by category, add items to a cart, assign a table, and create orders in seconds. The moment an order is placed, it appears live on the kitchen side — no delays, no missed tickets.\n\nThe kitchen staff can then update each order item's status (Pending → Process → Ready → Served) in real time, which is immediately reflected back to the cashier's view. Built on Supabase's real-time subscriptions, the entire system stays in sync across devices without any manual refresh. The admin dashboard rounds it out with revenue summaries, settled order counts, top-selling menus, and live table occupancy — giving restaurant owners a clear picture of daily operations at a glance.`,
    },
]

export const services = [
    {
        num: "01",
        name: "Frontend Development",
        desc: "Building clean, responsive interfaces with Next.js, React, and Tailwind CSS — turning designs into working, well-structured code.",
    },
    {
        num: "02",
        name: "UI/UX Design",
        desc: "Designing simple, user-friendly interfaces in Figma — focused on clarity, usability, and a consistent visual language.",
    },
    {
        num: "03",
        name: "Web App Development",
        desc: "Building functional web applications from scratch — school tools, dashboards, and internal systems that solve real problems.",
    },
    {
        num: "04",
        name: "Open to Collaborate",
        desc: "Looking for opportunities to grow — internships, freelance projects, or junior roles where I can contribute and keep learning.",
    },
]

export const experiences = [
    {
        year: "2025",
        role: "Junior Frontend Developer (Internship)",
        company: "PT. Walden Global Service",
        desc: "5-month school internship as a frontend developer. Built a production Leave Management System using Next.js, TypeScript, and Tailwind CSS — collaborating directly with backend developers and delivering responsive, user-friendly interfaces used by real employees.",
    },
    {
        year: "2025",
        role: "Frontend Developer & UI/UX Designer (School Project)",
        company: "Sibening — School BK System",
        desc: "Designed and built a full guidance & counseling web app for my school's BK department. Included student attendance tracking, late & problem student records, and real-time chat between students and teachers.",
    },
    {
        year: "2023 – 2026",
        role: "Software Development Student",
        company: "SMK — Vocational High School",
        desc: "Completed a 3-year vocational program in Software Development. Gained hands-on experience in web development, UI design, databases, and software engineering fundamentals alongside real project work.",
    },
]

export const experienceItem = [
    {
        role: "Junior Frontend Developer (Internship)",
        companyName: "PT. Walden Global Service",
        date: "July 2025 — November 2025",
        description: "Frontend Developer intern for 5 months through a school internship program, developing a Leave Management System with Next.js, TypeScript, and Tailwind CSS. Focused on building responsive UIs, optimizing component structures, and enhancing usability, application performance, and the efficiency of leave request workflows across devices.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn"],
    },
]