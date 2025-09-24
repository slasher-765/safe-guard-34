# SafeGuard Punjab - Emergency Management System

A comprehensive emergency management and safety platform designed for educational institutions in Punjab, providing real-time alerts, training modules, and emergency response coordination.

## 🚨 Features

### Core Functionality
- **Multi-Role Authentication**: Student, Parent, Staff, and Admin access levels
- **Real-time Emergency Alerts**: Instant notifications and alert management
- **Emergency Response Dashboard**: Centralized emergency coordination
- **Training Modules**: Safety training and educational content
- **Virtual Emergency Drills**: Practice and preparedness simulations
- **Reporting System**: Incident reporting and analytics
- **Emergency Contacts**: Quick access to emergency services

### User Roles
- **Students**: Access training, receive alerts, participate in drills
- **Parents**: Monitor alerts, view emergency information, track children's safety
- **Staff**: Coordinate responses, manage alerts, conduct training
- **Admin**: Full system control, user management, analytics, and reporting

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner toast system

## 🚀 Getting Started

### Prerequisites
- Node.js (recommended via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📱 Application Structure

### Main Pages
- `/` - Landing page with system overview
- `/auth` - Unified login with role selection
- `/dashboard` - Role-based dashboard (Student/Admin)
- `/emergency` - Emergency response center
- `/training` - Safety training modules
- `/virtual-drill` - Emergency drill simulations
- `/reporting` - Incident reporting and analytics
- `/admin` - Administrative controls (Admin only)

### Key Components
- **AlertBanner**: Emergency notification display
- **EmergencyContacts**: Quick access to emergency services
- **GameificationStats**: Training progress tracking
- **QuestionModal**: Interactive training assessments
- **Header**: Navigation and user controls

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS with:
- Semantic color tokens for consistent theming
- HSL color space for better accessibility
- Dark/light mode support
- Responsive design principles
- Custom gradients and animations

## 🔐 Authentication & Authorization

- Simple role-based authentication
- Local storage for session management
- Protected routes based on user roles
- Automatic logout functionality

## 🌐 Deployment

### Lovable Platform
1. Visit [Lovable Project](https://lovable.dev/projects/efc15de7-450e-43eb-bdb2-522ef669345d)
2. Click **Share** → **Publish**
3. Your app will be deployed instantly

### Custom Domain
1. Navigate to **Project** → **Settings** → **Domains**
2. Click **Connect Domain**
3. Follow the setup instructions

## 📚 Documentation

- [Lovable Documentation](https://docs.lovable.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤝 Contributing

This project is built on the Lovable platform. To contribute:

1. Use the [Lovable Editor](https://lovable.dev/projects/efc15de7-450e-43eb-bdb2-522ef669345d) for AI-assisted development
2. Or clone locally and push changes to the connected repository
3. All changes sync automatically between Lovable and your repository

## 📄 License

This project is part of the SafeGuard Punjab initiative for educational institution safety management.

## 🆘 Support

For technical support or feature requests:
- Use the Lovable platform for development assistance
- Join the [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Check the [Lovable Documentation](https://docs.lovable.dev/)

---

**Built with ❤️ for safer educational environments in Punjab**