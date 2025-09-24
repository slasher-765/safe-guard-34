// Data for the SafeGuard Punjab emergency management platform

export const emergencyContacts = [
  { id: 1, type: "Fire Department", number: "101", icon: "Flame" },
  { id: 2, type: "NDRF", number: "1800-123-456", icon: "Shield" },
  { id: 3, type: "Medical Emergency", number: "102", icon: "Heart" },
  { id: 4, type: "Police", number: "100", icon: "Shield" },
  { id: 5, type: "Disaster Helpline", number: "1078", icon: "Phone" },
];

export const disasterModules = [
  {
    id: 1,
    title: "Earthquake Safety",
    duration: "15 min",
    status: "Incomplete",
    icon: "Mountain",
    description: "Learn essential earthquake preparedness and response techniques",
    progress: 0,
  },
  {
    id: 2,
    title: "Flood Safety",
    duration: "10 min",
    status: "Incomplete",
    icon: "Waves",
    description: "Understand flood risks and evacuation procedures",
    progress: 0,
  },
  {
    id: 3,
    title: "Fire Safety",
    duration: "20 min",
    status: "Incomplete",
    icon: "Flame",
    description: "Master fire prevention and emergency response protocols",
    progress: 0,
  },
  {
    id: 4,
    title: "Cyclone Preparedness",
    duration: "12 min",
    status: "Incomplete",
    icon: "Wind",
    description: "Prepare for cyclone seasons with proper planning",
    progress: 0,
  },
];

export const alertsData = [
  {
    id: 1,
    message: "Earthquake Alert: 5.8 Magnitude detected in Delhi region",
    timestamp: "2025-09-11 12:30:00",
    type: "emergency",
    severity: "high",
  },
  {
    id: 2,
    message: "Heavy rainfall warning for Mumbai - Flood risk moderate",
    timestamp: "2025-09-11 10:15:00",
    type: "warning",
    severity: "medium",
  },
  {
    id: 3,
    message: "System maintenance completed - All IoT sensors operational",
    timestamp: "2025-09-11 09:00:00",
    type: "info",
    severity: "low",
  },
];

export const schoolData = [
  {
    id: 1,
    name: "Delhi Public School",
    location: "Delhi",
    preparednessScore: 85,
    studentsCount: 1200,
    lastDrill: "2025-08-15",
  },
  {
    id: 2,
    name: "St. Mary's Convent",
    location: "Mumbai",
    preparednessScore: 78,
    studentsCount: 950,
    lastDrill: "2025-08-20",
  },
  {
    id: 3,
    name: "Kendriya Vidyalaya",
    location: "Bangalore",
    preparednessScore: 92,
    studentsCount: 1100,
    lastDrill: "2025-09-05",
  },
];

export const sampleQuiz = {
  id: 1,
  title: "Earthquake Safety Quiz",
  questions: [
    {
      id: 1,
      question: "What should you do immediately when you feel an earthquake?",
      options: [
        "Run outside immediately",
        "Drop, Cover, and Hold On",
        "Stand in a doorway",
        "Call emergency services",
      ],
      correct: 1,
    },
    {
      id: 2,
      question: "Which area is safest during an earthquake indoors?",
      options: [
        "Under a sturdy desk or table",
        "Next to a window",
        "In an elevator",
        "Near heavy furniture",
      ],
      correct: 0,
    },
    {
      id: 3,
      question: "How long should you wait before moving after an earthquake stops?",
      options: [
        "Move immediately",
        "Wait 30 seconds",
        "Wait for aftershocks to stop",
        "Wait 1-2 minutes",
      ],
      correct: 3,
    },
    {
      id: 4,
      question: "What should be in your earthquake emergency kit?",
      options: [
        "Only water and food",
        "Water, food, flashlight, first aid, radio",
        "Just a phone charger",
        "Only medical supplies",
      ],
      correct: 1,
    },
  ],
};