# Asset Management System Documentation

## Overview

A comprehensive web-based Asset Management System built with React, TypeScript, and Supabase. This application provides organizations with tools to track, manage, and maintain their physical assets efficiently.

## Features

### Core Functionality
- **Asset Management**: Track assets with detailed information including purchase data, location, assignment, and status
- **User Management**: Role-based access control with Admin, Staff, and Auditor roles
- **Data Migration**: Bulk upload capabilities for Assets, Vendors, and Buildings
- **Settings Management**: Configure asset categories, organizational units, and work areas
- **Authentication**: Secure user authentication with profile management

### Key Modules
1. **Dashboard**: Overview of system metrics and quick actions
2. **Assets**: Complete asset lifecycle management
3. **Buildings**: Facility and location management
4. **Vendors**: Supplier and vendor information tracking
5. **Users & Roles**: User management and permission control
6. **Reports**: Data analysis and reporting tools
7. **Settings**: System configuration and data migration tools

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Database-level security
- **Real-time subscriptions** - Live data updates

### Additional Libraries
- **Lucide React** - Icon library
- **date-fns** - Date manipulation
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

## Database Schema

### Core Tables

#### assets
- Primary asset tracking table
- Auto-generated asset codes (AST001, AST002, etc.)
- Links to categories and work areas
- Tracks purchase information and assignment

#### asset_categories
- Categorization system for assets
- Admin-managed lookup table

#### work_areas
- Location/department tracking
- Used for asset placement and user assignment

#### units
- Organizational unit structure
- Department/division management

#### profiles
- Extended user information
- Links to auth.users table
- Contains user-specific data

#### user_roles
- Role-based access control
- Supports admin, staff, and auditor roles

#### vendor
- Supplier and vendor management
- Rating and contact information

#### buildings
- Facility management
- Floor plans and area tracking

## User Roles & Permissions

### Admin
- Full system access
- User management
- Settings configuration
- Data migration
- All CRUD operations

### Staff
- Asset management (create, read, update)
- Basic reporting
- Profile management

### Auditor
- Read-only access
- Reporting capabilities
- Asset viewing

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables
4. Start development server:
   ```bash
   npm run dev
   ```

### Supabase Configuration
1. Create a new Supabase project
2. Run the database migrations in order:
   - Initial schema setup
   - Add triggers and functions
   - Configure RLS policies
3. Update authentication settings
4. Configure site URL and redirect URLs

## Usage Guide

### Getting Started
1. **Login**: Use your credentials to access the system
2. **Profile Setup**: Complete your profile information
3. **Role Assignment**: Admin assigns appropriate roles

### Asset Management
1. **Add Asset**: Navigate to Assets → Add New Asset
2. **Asset Code**: Automatically generated (AST001, AST002, etc.)
3. **Categories**: Select from predefined categories
4. **Assignment**: Assign to users or locations
5. **Tracking**: Monitor status and location changes

### Data Migration
1. **Access**: Settings → Migration Tool (Admin only)
2. **Templates**: Download CSV templates for Assets, Vendors, Buildings
3. **Upload**: Use file upload to import bulk data
4. **Validation**: System validates data before import

### Settings Management
1. **Categories**: Manage asset categorization
2. **Units**: Configure organizational structure
3. **Work Areas**: Set up location hierarchy
4. **Migration**: Bulk data operations

## Security Features

### Row Level Security (RLS)
- Database-level permissions
- User-specific data access
- Role-based filtering

### Authentication
- Supabase Auth integration
- Secure session management
- Profile-linked permissions

### Data Validation
- Frontend form validation
- Database constraints
- Type safety with TypeScript

## API Endpoints

The application uses Supabase's auto-generated REST API:

### Assets
- `GET /rest/v1/assets` - List assets
- `POST /rest/v1/assets` - Create asset
- `PATCH /rest/v1/assets?id=eq.{id}` - Update asset
- `DELETE /rest/v1/assets?id=eq.{id}` - Delete asset

### Categories
- `GET /rest/v1/asset_categories` - List categories
- `POST /rest/v1/asset_categories` - Create category

### Users & Roles
- `GET /rest/v1/profiles` - User profiles
- `GET /rest/v1/user_roles` - Role assignments

## Database Functions

### generate_asset_code()
- Automatically generates sequential asset codes
- Format: AST001, AST002, etc.
- Called by database trigger on asset creation

### has_role(user_id, role)
- Security function for role checking
- Used in RLS policies
- Prevents recursive permission issues

## Migration & Data Import

### Supported Formats
- CSV files with UTF-8 encoding
- Template-based structure
- Automatic data type conversion

### Import Process
1. Download appropriate template
2. Fill in data following column headers
3. Upload via Migration Tool
4. System validates and imports data
5. Error reporting for failed records

## Troubleshooting

### Common Issues
- **Permission Denied**: Check user role assignments
- **Data Not Visible**: Verify RLS policies
- **Upload Failures**: Validate CSV format and data types
- **Login Issues**: Check Supabase URL configuration

### Error Handling
- Toast notifications for user feedback
- Validation errors displayed inline
- Database errors logged and reported

## Development Guidelines

### Code Structure
- Modular component architecture
- Custom hooks for reusable logic
- Type-safe database operations
- Consistent error handling

### Best Practices
- Use semantic design tokens
- Implement proper loading states
- Validate user input
- Handle edge cases gracefully

## Support & Maintenance

### Regular Tasks
- Database backup verification
- User access review
- System performance monitoring
- Security updates

### Monitoring
- Real-time error tracking
- Performance metrics
- User activity logs
- Database health checks

## Contributing

### Development Workflow
1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit pull request
5. Code review and deployment

### Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

---

*This documentation is maintained alongside the application codebase. For technical support or feature requests, please contact the development team.*