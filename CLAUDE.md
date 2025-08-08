# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this module.

## Module Overview

The `e_commerce-database` module manages database schema and data for the e-commerce domain of the ERP system. This module contains comprehensive e-commerce functionality including web content management, user sessions, subscriptions, and visitor tracking, using Liquibase for schema migrations and Docker for containerization.

## Technology Stack

- **Database**: PostgreSQL
- **Migration Tool**: Liquibase
- **Container**: Docker
- **Package Manager**: npm
- **Testing**: Cucumber.js with BDD approach
- **Test Database**: pg-promise for database connections

## Project Structure

```
e_commerce-database/
├── Dockerfile                    # Database container configuration
├── database_change_log.yml       # Liquibase main changelog
├── databasechangelog.csv        # Liquibase execution history
├── package.json                 # Node.js dependencies and scripts
├── package-lock.json            # Exact dependency versions
├── sql/                         # Database initialization scripts
│   ├── 01-install-extensions.sql
│   └── 02-create-database.sql
└── features/                    # BDD test specifications
    ├── step_definitions/
    │   ├── hooks.js
    │   ├── function_type_steps.js
    │   ├── user_steps.js
    │   ├── web_content_*.js     # Web content related steps
    │   └── web_preferences_steps.js
    └── support/
        ├── chai.js
        ├── config.js
        ├── database.js
        └── world.js
```

## Build and Development Commands

### Database Operations
```bash
# Install dependencies
npm install

# Build database schema (offline)
npm run build:database

# Build Docker container
npm run build:docker

# Apply database changes to running database
npm run update_database

# Start database container
npm run start

# Push container to registry
npm run push

# Clean up build artifacts and containers
npm run clean
```

### Testing
```bash
# Run BDD tests for e-commerce database
npm test
```

## E-commerce Domain Features

### Web Content Management
- **Web Content Types**: Various content type classifications
- **Web Content Status**: Content lifecycle management (draft, published, archived)
- **Web Content Roles**: User roles for content management
- **Content Associations**: Relationships between different content pieces

### User and Session Management
- **User Login Tracking**: Login history and session management
- **User Agent Detection**: Browser and device identification
- **Visit Tracking**: User visit patterns and analytics
- **Server Hit Logging**: Request tracking and performance metrics

### E-commerce Functionality
- **Subscription Management**: User subscription handling
- **Subscription Types**: Different subscription models
- **Fulfillment Tracking**: Order and subscription fulfillment
- **Web Preferences**: User preference management

### Platform and Technical Features
- **Browser Type Detection**: Cross-browser compatibility tracking
- **Platform Type Management**: Device and OS platform handling
- **Protocol Type Support**: HTTP/HTTPS and other protocol management
- **Electronic Object Management**: Digital asset handling

## Development Workflow

### E-commerce Schema Changes
1. **Domain Analysis**: Understand e-commerce business requirements
2. **Create Changesets**: Add new Liquibase changesets for schema updates
3. **Test Offline**: Generate SQL and verify schema changes
4. **Apply Changes**: Deploy to development database
5. **BDD Testing**: Create comprehensive test scenarios
6. **Validation**: Ensure data integrity and business rules

### Key Database Components

#### Core E-commerce Tables
- **web_content**: Central content management
- **web_content_type**: Content categorization
- **web_content_status_type**: Content lifecycle states
- **web_content_role_type**: Content management roles
- **subscription**: User subscription data
- **user_login**: Authentication and session tracking

#### Analytics and Tracking Tables
- **visit**: User visit tracking
- **server_hit**: Request analytics
- **user_agent**: Browser and device detection
- **web_preferences**: User customization settings

## BDD Testing Coverage

### Web Content Testing
- **Content Type Management**: Test content type CRUD operations
- **Status Transitions**: Test content lifecycle transitions
- **Role Assignments**: Test user role assignments for content
- **Content Associations**: Test relationships between content pieces

### User Experience Testing
- **User Registration**: Test user account creation
- **Login Flows**: Test authentication and session management
- **Preferences**: Test user preference storage and retrieval
- **Subscription Management**: Test subscription lifecycle

### Analytics Testing
- **Visit Tracking**: Test visitor analytics capture
- **Server Performance**: Test server hit logging
- **User Agent Detection**: Test browser/device identification
- **Reporting Data**: Test analytics data aggregation

## Testing Standards

### E-commerce BDD Scenarios
- **User Journeys**: Complete customer experience flows
- **Content Management**: Editorial and administrative workflows
- **Analytics Tracking**: Data collection and reporting scenarios
- **Security**: User authentication and authorization testing
- **Performance**: Database performance under load scenarios

### Test Data Management
- **Sample Content**: Realistic e-commerce content for testing
- **User Profiles**: Test user accounts with various characteristics
- **Analytics Data**: Test visitor and interaction data
- **Subscription Data**: Various subscription types and states

## Docker Integration

The module produces a Docker container named `erpmicroservices/e_commerce-database` that:
- Extends PostgreSQL base image
- Initializes e-commerce database schema
- Includes sample data for development and testing
- Supports e-commerce analytics and reporting requirements
- Integrates with e-commerce endpoint services

## Dependencies and Requirements

### Runtime Dependencies
- PostgreSQL database server (12+ recommended)
- Docker (for containerized deployment)
- Liquibase (managed through npm scripts)

### Development Dependencies
- Node.js and npm
- Cucumber.js testing framework
- Chai assertion library
- pg-promise for database connectivity

## Performance Considerations

### E-commerce Optimizations
- **User Session Performance**: Efficient session storage and retrieval
- **Content Delivery**: Optimized content querying for web delivery
- **Analytics Performance**: Efficient logging without impacting user experience
- **Search Optimization**: Full-text search capabilities for content discovery

### Indexing Strategy
- **User Lookup**: Optimized user authentication queries
- **Content Search**: Full-text and categorical content search
- **Analytics Queries**: Efficient reporting and analytics queries
- **Session Management**: Fast session validation and cleanup

## Integration Points

### E-commerce Endpoints
- **GraphQL Integration**: Supports e-commerce GraphQL endpoint
- **Content API**: RESTful content management APIs
- **User API**: Authentication and user management APIs
- **Analytics API**: Reporting and analytics endpoints

### Third-party Integration
- **Payment Systems**: Database support for payment processing
- **Shipping Systems**: Integration with fulfillment providers
- **Marketing Tools**: Analytics data for marketing automation
- **Search Engines**: Content indexing for search optimization

## Important Notes

- **E-commerce Focus**: Specialized for online commerce functionality
- **Analytics Heavy**: Comprehensive tracking and reporting capabilities
- **User Privacy**: Consider GDPR and privacy regulations in data design
- **Performance Critical**: E-commerce requires high-performance data access
- **Scalability**: Design supports high-volume e-commerce operations
- **Security Important**: Handles user data and potentially payment information