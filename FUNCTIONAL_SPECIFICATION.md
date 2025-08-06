# Functional Specification Document
## Asset Management System (GAMATECHNO)

### Document Information
- **Version**: 1.0
- **Date**: 2025-01-03
- **Document Type**: Functional Specification
- **System**: Asset Management System
- **Organization**: GAMATECHNO

---

## 1. Executive Summary

The Asset Management System (AMS) is a comprehensive web-based application designed to manage organizational assets throughout their entire lifecycle. The system provides centralized control over asset tracking, maintenance scheduling, depreciation calculation, user management, and reporting capabilities.

### 1.1 System Purpose
- Track and manage organizational assets from acquisition to disposal
- Automate asset lifecycle processes including maintenance, depreciation, and transfers
- Provide role-based access control for different user types
- Generate comprehensive reports and analytics
- Ensure compliance with asset management standards

### 1.2 Key Benefits
- Centralized asset database with real-time tracking
- Automated maintenance scheduling and alerts
- Financial tracking with depreciation calculations
- Role-based security and audit trails
- Data import/export capabilities for system migration

---

## 2. System Architecture

### 2.1 Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Backend-as-a-Service)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth
- **Charts**: Recharts library
- **Build Tool**: Vite
- **Routing**: React Router DOM

### 2.2 Core Components
- Authentication & Authorization System
- Asset Management Module
- User & Role Management
- Maintenance Management
- Financial Management (Depreciation)
- Reporting & Analytics
- Settings & Configuration

---

## 3. User Roles and Permissions

### 3.1 Admin Role
**Capabilities:**
- Full system access and configuration
- User management (create, update, delete users)
- Role assignment and permission management
- Asset CRUD operations
- Data migration and bulk operations
- System settings configuration
- All reporting capabilities

**Restrictions:**
- None (highest privilege level)

### 3.2 Staff Role
**Capabilities:**
- Asset viewing and management (create, read, update)
- Basic reporting access
- Profile management
- Maintenance scheduling and tracking
- Asset transfer operations

**Restrictions:**
- Cannot delete assets
- Cannot manage users or roles
- Cannot access advanced system settings
- Limited to assigned work areas (future enhancement)

### 3.3 Auditor Role
**Capabilities:**
- Read-only access to all asset data
- Full reporting and analytics access
- Export capabilities
- Asset audit trail viewing

**Restrictions:**
- Cannot modify any data
- Cannot create, update, or delete assets
- Cannot manage users or perform administrative tasks

---

## 4. Core Functional Modules

### 4.1 Authentication System

#### 4.1.1 Login Functionality
- **Purpose**: Secure user authentication
- **Features**:
  - Email/password authentication
  - Session management
  - Password reset functionality
  - Account lockout protection
  - Redirect to dashboard upon success

#### 4.1.2 User Registration
- **Purpose**: Create new user accounts (Admin only)
- **Features**:
  - Email invitation system
  - Password setup via email link
  - Profile information collection
  - Automatic role assignment
  - Email verification requirement

#### 4.1.3 Password Recovery
- **Purpose**: Reset forgotten passwords
- **Features**:
  - Email-based password reset
  - Secure token generation
  - Link expiration handling
  - Password strength requirements

### 4.2 Dashboard Module

#### 4.2.1 Key Performance Indicators (KPIs)
- **Total Assets**: Count of all assets in system
- **Total Asset Value**: Sum of all asset purchase prices
- **Pending Maintenance**: Count of overdue maintenance tasks
- **Critical Issues**: Count of urgent asset problems

#### 4.2.2 Data Visualizations
- **Asset Distribution Chart**: Pie chart showing assets by category
- **Maintenance Trend**: Bar chart showing preventive vs corrective maintenance over time
- **Asset Value Trend**: Line chart showing asset value changes over time

#### 4.2.3 Activity Feeds
- **Recent Activities**: Latest system activities and changes
- **Upcoming Maintenance**: Scheduled maintenance tasks with priority levels
- **Real-time Updates**: Live feed of system events

### 4.3 Asset Management Module

#### 4.3.1 Asset Registration
- **Purpose**: Add new assets to the system
- **Required Fields**:
  - Asset Name
  - Category (from predefined list)
  - Purchase Date
  - Purchase Price
  - Vendor Information
- **Optional Fields**:
  - Serial Number
  - Location/Work Area
  - Assigned User
  - Description
  - Status

#### 4.3.2 Asset Code Generation
- **Format**: AST001, AST002, AST003, etc.
- **Generation**: Automatic upon asset creation
- **Sequence**: Sequential numbering with zero-padding
- **Uniqueness**: Enforced at database level

#### 4.3.3 Asset Tracking Features
- **Status Management**: Active, Inactive, Under Maintenance, Disposed
- **Location Tracking**: Assignment to work areas and buildings
- **User Assignment**: Track which employee is responsible for the asset
- **Transfer History**: Log of asset movements and reassignments

#### 4.3.4 Asset Search and Filtering
- **Search Criteria**:
  - Asset code
  - Asset name
  - Category
  - Location
  - Assigned user
  - Status
- **Filter Options**:
  - Date range filters
  - Value range filters
  - Multiple category selection
  - Combined filter criteria

#### 4.3.5 Asset Detail View
- **Basic Information**: All asset properties and metadata
- **Financial Information**: Purchase price, current value, depreciation
- **Maintenance History**: Complete maintenance log
- **Transfer History**: Record of location and assignment changes
- **Document Attachments**: Related files and documentation

### 4.4 User Management Module

#### 4.4.1 User Administration (Admin Only)
- **User Creation**: Add new users with profile information
- **User Modification**: Update user details and assignments
- **User Deactivation**: Disable user accounts
- **Role Assignment**: Assign and modify user roles

#### 4.4.2 Profile Management
- **Personal Information**:
  - Full Name
  - Username
  - Email (read-only)
  - Position/Title
  - Organizational Unit
  - Work Area Assignment
- **Avatar Management**: Profile picture upload and management
- **Password Management**: Change password functionality

#### 4.4.3 Role Management (Admin Only)
- **Role Assignment**: Assign roles to users
- **Permission Viewing**: Display role-based permissions
- **Role Modification**: Change user roles as needed

### 4.5 Maintenance Management Module

#### 4.5.1 Preventive Maintenance
- **Purpose**: Schedule regular maintenance activities
- **Features**:
  - Recurring maintenance schedules
  - Maintenance type classification
  - Priority level assignment
  - Automated notifications
  - Resource planning

#### 4.5.2 Corrective Maintenance
- **Purpose**: Handle repair and breakdown maintenance
- **Features**:
  - Issue reporting and tracking
  - Urgency classification
  - Work order management
  - Cost tracking
  - Resolution documentation

#### 4.5.3 Maintenance Scheduling
- **Calendar Integration**: Visual maintenance calendar
- **Automated Alerts**: Email and in-system notifications
- **Resource Management**: Technician and tool allocation
- **Maintenance History**: Complete maintenance records

### 4.6 Financial Management Module

#### 4.6.1 Asset Depreciation
- **Purpose**: Calculate and track asset value depreciation
- **Depreciation Methods**:
  - Straight-line depreciation
  - Declining balance method
  - Custom depreciation schedules
- **Automated Calculations**: Monthly depreciation processing
- **Depreciation Reports**: Financial impact analysis

#### 4.6.2 Asset Valuation
- **Current Value Tracking**: Real-time asset value calculation
- **Historical Value Data**: Value changes over time
- **Total Portfolio Value**: Organizational asset portfolio worth
- **Value by Category**: Asset value breakdown by type

#### 4.6.3 Financial Reporting
- **Asset Value Reports**: Current and historical valuations
- **Depreciation Schedules**: Future depreciation projections
- **Cost Center Reports**: Asset costs by department/unit
- **ROI Analysis**: Return on investment calculations

### 4.7 Transfer and Disposal Module

#### 4.7.1 Asset Transfer
- **Purpose**: Move assets between locations or users
- **Transfer Types**:
  - Location transfer
  - User assignment transfer
  - Department transfer
- **Approval Workflow**: Multi-level approval process
- **Transfer Documentation**: Record keeping and audit trail

#### 4.7.2 Asset Write-off
- **Purpose**: Remove assets from active inventory
- **Write-off Reasons**:
  - End of useful life
  - Damage beyond repair
  - Loss or theft
  - Obsolescence
- **Approval Requirements**: Management approval process
- **Financial Impact**: Automatic value adjustments

#### 4.7.3 Asset Auction
- **Purpose**: Manage asset disposal through auction
- **Auction Management**:
  - Auction listing creation
  - Bid tracking and management
  - Sale documentation
  - Revenue recording

### 4.8 Vendor Management Module

#### 4.8.1 Vendor Registration
- **Vendor Information**:
  - Company name and details
  - Contact information
  - Industry classification
  - Performance ratings
- **Vendor Assessment**: Rating and evaluation system
- **Contract Management**: Vendor agreement tracking

#### 4.8.2 Vendor Performance
- **Rating System**: 1-5 star vendor performance ratings
- **Performance Metrics**: Delivery, quality, cost effectiveness
- **Vendor Reports**: Performance analysis and comparison

### 4.9 Building and Location Module

#### 4.9.1 Building Management
- **Building Information**:
  - Building name and address
  - Floor count and area measurements
  - Person in charge (PIC)
  - Building status
- **Location Hierarchy**: Building → Floor → Area structure
- **Asset Assignment**: Link assets to specific locations

#### 4.9.2 Work Area Management
- **Work Area Definition**: Departmental and functional areas
- **Area Assignment**: Asset and user assignment to work areas
- **Location Tracking**: Real-time asset location monitoring

### 4.10 Reporting and Analytics Module

#### 4.10.1 Standard Reports
- **Asset Inventory Report**: Complete asset listing with details
- **Asset Status Report**: Assets by status category
- **Maintenance Report**: Maintenance activities and schedules
- **Financial Report**: Asset values and depreciation
- **User Activity Report**: System usage and activity logs

#### 4.10.2 Custom Reports
- **Report Builder**: User-defined report criteria
- **Data Export**: CSV, Excel, and PDF export options
- **Scheduled Reports**: Automated report generation and delivery
- **Report Templates**: Predefined report formats

#### 4.10.3 Analytics Dashboard
- **Interactive Charts**: Drill-down capability on visualizations
- **Trend Analysis**: Historical data trend identification
- **Comparative Analysis**: Period-over-period comparisons
- **Predictive Analytics**: Maintenance and replacement forecasting

### 4.11 Settings and Configuration Module

#### 4.11.1 System Settings (Admin Only)
- **Asset Categories**: Define and manage asset categories
- **Units/Departments**: Organizational structure management
- **Work Areas**: Location and area definitions
- **System Parameters**: Global system configuration

#### 4.11.2 Data Migration Tools
- **Bulk Import**: CSV-based data import functionality
- **Import Templates**: Predefined templates for:
  - Assets
  - Vendors
  - Buildings
  - Users
- **Data Validation**: Import data verification and error handling
- **Migration Reports**: Import success and error reporting

#### 4.11.3 System Maintenance
- **Database Backup**: Automated backup scheduling
- **Data Cleanup**: Archive and cleanup procedures
- **System Monitoring**: Performance and health monitoring
- **Audit Logs**: Complete system activity logging

---

## 5. Data Model and Database Schema

### 5.1 Core Tables

#### 5.1.1 assets
- **Purpose**: Primary asset information storage
- **Key Fields**:
  - id (UUID, Primary Key)
  - asset_code (Auto-generated, Unique)
  - name (Asset name)
  - category_id (Foreign Key to asset_categories)
  - serial_number
  - purchase_date
  - purchase_price
  - vendor
  - location_id (Foreign Key to work_areas)
  - assigned_to (User assignment)
  - status
  - description
  - created_at, updated_at

#### 5.1.2 asset_categories
- **Purpose**: Asset categorization system
- **Key Fields**:
  - id (UUID, Primary Key)
  - name (Category name)
  - description
  - created_at, updated_at

#### 5.1.3 profiles
- **Purpose**: Extended user information
- **Key Fields**:
  - id (UUID, Primary Key, References auth.users)
  - username
  - full_name
  - avatar_url
  - unit_id (Foreign Key to units)
  - work_area_id (Foreign Key to work_areas)
  - created_at, updated_at

#### 5.1.4 user_roles
- **Purpose**: Role-based access control
- **Key Fields**:
  - id (UUID, Primary Key)
  - user_id (Foreign Key to auth.users)
  - role (Enum: admin, staff, auditor)
  - created_at

#### 5.1.5 work_areas
- **Purpose**: Location and area management
- **Key Fields**:
  - id (UUID, Primary Key)
  - name (Area name)
  - description
  - created_at, updated_at

#### 5.1.6 units
- **Purpose**: Organizational structure
- **Key Fields**:
  - id (UUID, Primary Key)
  - name (Unit/Department name)
  - description
  - created_at, updated_at

#### 5.1.7 vendor
- **Purpose**: Vendor and supplier information
- **Key Fields**:
  - vendor_id (UUID, Primary Key)
  - vendor_name
  - vendor_industry
  - vendor_email
  - vendor_address
  - vendor_phone
  - vendor_pic (Person in charge)
  - vendor_rating
  - created_at

#### 5.1.8 buildings
- **Purpose**: Building and facility management
- **Key Fields**:
  - id (UUID, Primary Key)
  - building_name
  - building_address
  - floors
  - area
  - pic (Person in charge)
  - status
  - created_at

### 5.2 Database Functions

#### 5.2.1 generate_asset_code()
- **Purpose**: Generate sequential asset codes
- **Format**: AST001, AST002, AST003, etc.
- **Implementation**: PostgreSQL function with sequence management

#### 5.2.2 has_role(user_id, role)
- **Purpose**: Check user role permissions
- **Usage**: Row Level Security (RLS) policies
- **Security**: Prevents recursive permission checks

#### 5.2.3 handle_new_user()
- **Purpose**: Automatic profile creation on user registration
- **Trigger**: Executes on auth.users insert
- **Functionality**: Creates profile and assigns default role

### 5.3 Security Implementation

#### 5.3.1 Row Level Security (RLS)
- **Asset Access**: Users see assets based on their role
- **Profile Access**: Users can only access their own profile
- **Admin Access**: Admins have full access to all data
- **Role-based Filtering**: Automatic data filtering by user role

#### 5.3.2 Authentication
- **Supabase Auth**: Built-in authentication system
- **Session Management**: Secure session handling
- **Password Security**: Encrypted password storage
- **Token Management**: JWT token-based authentication

---

## 6. User Interface Specifications

### 6.1 Design System
- **CSS Framework**: Tailwind CSS with custom design tokens
- **Component Library**: shadcn/ui components
- **Color Scheme**: HSL-based semantic color system
- **Typography**: Responsive typography scale
- **Icons**: Lucide React icon library

### 6.2 Responsive Design
- **Mobile First**: Mobile-optimized interface design
- **Breakpoints**: Standard responsive breakpoints
- **Touch Interface**: Touch-friendly controls and navigation
- **Progressive Enhancement**: Enhanced features for larger screens

### 6.3 Navigation Structure
- **Main Navigation**: Sidebar with role-based menu items
- **Breadcrumbs**: Hierarchical navigation indicators
- **Quick Actions**: Frequently used actions prominently displayed
- **Search Interface**: Global search functionality

### 6.4 Data Tables
- **Sortable Columns**: Click-to-sort functionality
- **Pagination**: Efficient large dataset handling
- **Search Filters**: Multiple filter criteria support
- **Export Options**: Data export in multiple formats

### 6.5 Forms and Input Validation
- **Real-time Validation**: Immediate feedback on form inputs
- **Error Handling**: Clear error messages and correction guidance
- **Auto-save**: Automatic form data preservation
- **Required Field Indicators**: Clear marking of mandatory fields

---

## 7. Integration Specifications

### 7.1 Supabase Integration
- **Database**: PostgreSQL database with automatic API generation
- **Authentication**: Built-in user authentication and authorization
- **Real-time**: Live data updates and notifications
- **Storage**: File upload and management capabilities

### 7.2 Email Integration
- **Notifications**: Automated email notifications
- **Password Reset**: Email-based password recovery
- **User Invitations**: Email-based user registration
- **Maintenance Alerts**: Email alerts for scheduled maintenance

### 7.3 Export/Import Capabilities
- **Data Export**: CSV, Excel, and PDF export formats
- **Bulk Import**: CSV-based data import functionality
- **Migration Tools**: Data migration from legacy systems
- **Backup/Restore**: Database backup and restoration

---

## 8. Performance and Scalability

### 8.1 Performance Requirements
- **Page Load Time**: < 3 seconds for standard pages
- **Search Response**: < 1 second for asset searches
- **Report Generation**: < 10 seconds for standard reports
- **Database Queries**: Optimized queries with proper indexing

### 8.2 Scalability Considerations
- **User Capacity**: Support for 1000+ concurrent users
- **Asset Volume**: Handle 100,000+ assets efficiently
- **Data Growth**: Accommodate 5+ years of historical data
- **Storage Scalability**: Cloud-based storage scaling

### 8.3 Optimization Strategies
- **Database Indexing**: Strategic index placement for performance
- **Query Optimization**: Efficient database query patterns
- **Caching**: Client-side and server-side caching
- **Load Balancing**: Distributed load handling

---

## 9. Security Requirements

### 9.1 Data Security
- **Encryption**: Data encryption at rest and in transit
- **Access Control**: Role-based access restrictions
- **Audit Trails**: Complete activity logging
- **Data Privacy**: Personal data protection compliance

### 9.2 Authentication Security
- **Password Policies**: Strong password requirements
- **Session Security**: Secure session management
- **Account Lockout**: Brute force protection
- **Two-Factor Authentication**: Optional 2FA support

### 9.3 Infrastructure Security
- **HTTPS**: Secure communication protocols
- **Database Security**: Row-level security implementation
- **API Security**: Secure API endpoints and validation
- **Regular Updates**: Security patch management

---

## 10. Testing and Quality Assurance

### 10.1 Testing Strategy
- **Unit Testing**: Component and function testing
- **Integration Testing**: Module interaction testing
- **User Acceptance Testing**: End-user validation
- **Performance Testing**: Load and stress testing

### 10.2 Quality Metrics
- **Code Coverage**: Minimum 80% test coverage
- **Bug Tracking**: Comprehensive issue tracking
- **Performance Monitoring**: Continuous performance assessment
- **User Feedback**: Regular user satisfaction surveys

---

## 11. Deployment and Maintenance

### 11.1 Deployment Strategy
- **Environment Setup**: Development, staging, and production environments
- **CI/CD Pipeline**: Automated deployment pipeline
- **Database Migration**: Structured database updates
- **Rollback Procedures**: Emergency rollback capabilities

### 11.2 Maintenance Procedures
- **Regular Backups**: Automated backup scheduling
- **System Updates**: Regular security and feature updates
- **Performance Monitoring**: Continuous system monitoring
- **User Support**: Help desk and support procedures

---

## 12. Future Enhancements

### 12.1 Planned Features
- **Mobile Application**: Native mobile app development
- **Advanced Analytics**: Machine learning-based insights
- **IoT Integration**: Internet of Things device connectivity
- **API Extensions**: Third-party system integrations

### 12.2 Scalability Improvements
- **Microservices Architecture**: Service-based architecture migration
- **Advanced Caching**: Redis-based caching implementation
- **Real-time Notifications**: WebSocket-based notifications
- **Offline Capabilities**: Progressive Web App features

---

## 13. Conclusion

The Asset Management System provides a comprehensive solution for organizational asset lifecycle management. With its modern technology stack, robust security implementation, and user-friendly interface, the system meets current organizational needs while providing a foundation for future growth and enhancement.

The modular architecture ensures maintainability and extensibility, while the role-based access control system provides appropriate security and data access controls. The integration with Supabase provides a scalable and reliable backend infrastructure that can grow with organizational needs.

Regular updates and enhancements will ensure the system continues to meet evolving business requirements and technology standards.

---

**Document Version Control**
- Version 1.0: Initial functional specification document
- Next Review Date: [To be scheduled]
- Document Owner: Development Team
- Approval: [To be signed]