// localStorage.clear();
const employees = [
  {
    id: 1,
    firstName: "Aarav",
    email: "employee1@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 0
    },
    tasks: [
      {
        title: "Prepare monthly report",
        description: "Compile sales and performance data for September",
        date: "2025-10-03",
        category: "Reporting",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Client follow-up",
        description: "Email pending clients about proposal status",
        date: "2025-10-04",
        category: "Communication",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Team sync",
        description: "Weekly sync-up with design and dev teams",
        date: "2025-10-05",
        category: "Meetings",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      }
    ]
  },
  {
    id: 2,
    firstName: "Ishaan",
    email: "employee2@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        title: "Bug triage",
        description: "Review and assign bugs reported in QA",
        date: "2025-10-02",
        category: "Development",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Code review",
        description: "Review pull requests from junior devs",
        date: "2025-10-03",
        category: "Development",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Sprint planning",
        description: "Plan tasks for next sprint",
        date: "2025-10-06",
        category: "Agile",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Fix login bug",
        description: "Resolve issue with user login redirect",
        date: "2025-10-01",
        category: "Bugfix",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: 3,
    firstName: "Riya",
    email: "employee3@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 0
    },
    tasks: [
      {
        title: "Design homepage banner",
        description: "Create festive banner for Diwali sale",
        date: "2025-10-02",
        category: "Design",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Update brand guidelines",
        description: "Add new typography rules to brand doc",
        date: "2025-10-03",
        category: "Documentation",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "UX audit",
        description: "Review checkout flow for usability issues",
        date: "2025-10-04",
        category: "UX",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      }
    ]
  },
  {
    id: 4,
    firstName: "Kabir",
    email: "employee4@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        title: "Write blog post",
        description: "Draft article on AI in hiring",
        date: "2025-10-02",
        category: "Content",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "SEO audit",
        description: "Analyze site for keyword optimization",
        date: "2025-10-03",
        category: "Marketing",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Newsletter design",
        description: "Design October newsletter layout",
        date: "2025-10-04",
        category: "Design",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Campaign analysis",
        description: "Review performance of last email campaign",
        date: "2025-10-01",
        category: "Analytics",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: 5,
    firstName: "Meera",
    email: "employee5@example.com",
    password: "123",
    taskCount: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        title: "Database backup",
        description: "Run full backup of production DB",
        date: "2025-10-02",
        category: "DevOps",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Server health check",
        description: "Monitor CPU and memory usage",
        date: "2025-10-03",
        category: "Monitoring",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Deploy new build",
        description: "Push latest release to staging",
        date: "2025-10-04",
        category: "Deployment",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Fix cron job",
        description: "Resolve issue with nightly sync",
        date: "2025-10-01",
        category: "Bugfix",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  }
];

const admin = [
  {
    id: 100,
    email: "admin@example.com",
    password: "123"
  }
];


export const setLocalStorage= () =>{
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));
}

export const getLocalStorage= () =>{
  const employees = JSON.parse(localStorage.getItem("employees"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  
  return {employees, admin};
}