# N&A School Supplies - POS System
A comprehensive, professional-grade Point of Sale system for managing inventory, sales, and business operations with real-time analytics and a native desktop experience.

## Features
- **Complete POS Management**: Full-featured point of sale with cart management, receipt printing, and barcode scanning
- **Inventory Tracking**: Real-time inventory management with low-stock alerts and restock notifications
- **Product Management**: Comprehensive product catalog with categories, pricing, barcodes, and stock levels
- **Sales & Reporting**: Detailed sales tracking, transaction history, and business analytics with charts
- **User Management**: Role-based access control with admin and staff user types and authentication
- **Dashboard Analytics**: Real-time dashboard with weekly sales charts, top products, and recent transactions
- **Barcode Generation**: Automatic barcode creation and printing for products
- **Desktop Application**: Built with Electron for a native Windows desktop experience
- **Responsive Design**: Fully responsive layout that adapts to different screen sizes
- **TypeScript**: Type-safe codebase for better development experience and fewer runtime errors

## Tech Stack
- **Frontend Framework**: React 19.2.5
- **Build Tool**: Vite 8.0.10
- **Language**: TypeScript 6.0.2
- **Styling**: Tailwind CSS 4.2.4
- **Charting**: Recharts 3.8.1
- **Barcode Generation**: BWIP-JS 4.10.1
- **Routing**: React Router DOM 7.15.0
- **Icons**: Lucide React 1.14.0
- **Notifications**: React Hot Toast 2.6.0
- **Desktop Framework**: Electron 42.0.1
- **Backend Runtime**: Node.js with Express 5.2.1
- **ORM**: Prisma 7.8.0
- **Database**: MariaDB 3.5.2
- **Authentication**: JWT with bcryptjs
- **Linting**: ESLint 10.2.1

## Installation

Clone the repository:
```bash
git clone <repository-url>
cd nandasystem
```

Install dependencies:
```bash
cd client && npm install
cd ../server && npm install
```

## Configuration

Create a `.env` file inside the `server/` folder:
```
DATABASE_URL="mysql://root:password@localhost:3306/na_pos"
JWT_SECRET=your_secret_key_here
PORT=5000
```

Then initialize the database:
```bash
cd server
npm run dev
# In a separate terminal:
node seed.js
```

## Development

**Terminal 1 — Start the backend server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 — Start the frontend:**
```bash
cd client
npm run dev
```
Web app will run on `http://localhost:5173`

**For the desktop application:**
```bash
cd client
npm run electron:dev
```

## Build

To build for production (web):
```bash
cd client
npm run build
```

To build the Windows desktop installer:
```bash
cd client
npm run electron:build
```
Installer will be created in `client/release/`

## Preview

To preview the production build locally:
```bash
cd client
npm run preview
```

## Linting

To run ESLint:
```bash
npm run lint
```

## Quick Start Scripts

For a faster startup and shutdown on Windows, use the provided batch files:
```bash
# Start the entire system
double-click "start.bat"

# Stop the system
double-click "stop.bat"
```

## Default Login Credentials

**Username:** admin
**Password:** admin123

> ⚠️ **Important**: Change the default password immediately after first login for security.

## Project Structure

```
nandasystem/
├── client/                    # React + Electron Frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── dashboard/
│   │   │   ├── pos/
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── inventory/
│   │   │   ├── users/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── electron/
│   └── vite.config.ts
│
├── server/                    # Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── lib/
│   ├── prisma/
│   ├── index.js
│   └── seed.js
│
├── start.bat
├── stop.bat
└── README.md
```

## System Requirements

- **OS**: Windows 10 or later
- **Node.js**: LTS version 16.x or higher (18.x or 20.x recommended)
- **MariaDB**: 10.5 or higher (or MySQL 8.0+)
- **RAM**: Minimum 4GB
- **Disk Space**: Minimum 500MB

## Author

Kenneth Jhun N. Balino

Full Stack Developer

Built with React, Electron, Vite, and Tailwind CSS