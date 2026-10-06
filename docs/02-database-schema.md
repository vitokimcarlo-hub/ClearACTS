# ClearACTS Database Schema Design Document
## Student Clearance Management System

---

## 1. Executive Summary

ClearACTS is a web-based student clearance management system designed to streamline the clearance process for educational institutions. This document presents a comprehensive database schema that supports multi-role user management, clearance request workflows, academic reporting, and real-time status tracking.

---

## 2. Entity-Relationship Diagram (Conceptual)

### 2.1 Core Entities and Relationships

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           ClearACTS Entity Relationship                          │
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │   USERS      │ (Base table for all user types)
    │  (Abstract)  │
    └──────┬───────┘
           │
           ├────────────────────┬─────────────────────┬──────────────────────┐
           │                    │                     │                      │
           ▼                    ▼                     ▼                      ▼
    ┌──────────────┐    ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
    │  STUDENTS    │    │   FACULTY    │      │    ADMIN     │      │  ACADEMIC_   │
    │              │    │              │      │              │      │   REPORTS    │
    └──────┬───────┘    └──────┬───────┘      └──────┬───────┘      └──────┬───────┘
           │                   │                     │                     │
           │                   │                     │                     │
           │                   │                     │                     │
           ▼                   │                     │                     │
    ┌──────────────┐           │                     │                     │
    │  CLEARANCE_  │◄──────────┴─────────────────────┤                     │
    │   REQUESTS   │                                 │                     │
    └──────┬───────┘                                 │                     │
           │                                         │                     │
           │                                         │                     │
           ├─────────────────────┐                   │                     │
           │                     │                   │                     │
           ▼                     ▼                   │                     │
    ┌──────────────┐    ┌──────────────┐            │                     │
    │  SIGNATORIES │    │   REMARKS    │            │                     │
    │   (Required  │    │              │◄───────────┴─────────────────────┘
    │  Approvals)  │    └──────────────┘
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │  CLEARANCE_  │
    │   RECORDS    │
    └──────────────┘

    ┌──────────────┐
    │  DEADLINES   │ (Standalone - system configuration)
    │  & EXAMS     │
    └──────────────┘
```

### 2.2 Relationship Descriptions

| Relationship | Type | Description |
|-------------|------|-------------|
| Student → Clearance Request | One-to-Many | A student can submit multiple clearance requests over time |
| Clearance Request → Signatory | One-to-Many | Each clearance requires multiple signatory approvals |
| Admin → Signatory | One-to-Many | An administrator (by role) can approve multiple signatories |
| Faculty → Academic Report | One-to-Many | Faculty members submit academic reports for students |
| Clearance Request → Remark | One-to-Many | Multiple remarks can be added to a clearance request |
| Admin → Remark | One-to-Many | Administrators can add remarks to clearances |
| Student → Academic Report | One-to-Many | A student can have multiple academic reports |

---

## 3. Database Tables Specification

### 3.1 Users Table (Base Authentication Table)

**Purpose:** Central authentication and basic user information storage.

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('student', 'faculty', 'admin')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    contact_number VARCHAR(20),
    profile_image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_is_active ON users(is_active);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| user_id | UUID | PK, Auto-generated | Unique identifier for all users |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Primary login credential |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| user_type | VARCHAR(20) | NOT NULL, CHECK | Discriminator column for role-based queries |
| first_name | VARCHAR(100) | NOT NULL | User's first name |
| last_name | VARCHAR(100) | NOT NULL | User's last name |
| middle_name | VARCHAR(100) | NULLABLE | User's middle name |
| contact_number | VARCHAR(20) | NULLABLE | Phone/mobile number |
| profile_image | VARCHAR(255) | NULLABLE | URL/path to profile image |
| is_active | BOOLEAN | DEFAULT TRUE | Account status flag |
| is_verified | BOOLEAN | DEFAULT FALSE | Email verification status |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |
| last_login_at | TIMESTAMP | NULLABLE | Last successful login |

---

### 3.2 Students Table

**Purpose:** Store student-specific information and academic details.

```sql
CREATE TABLE students (
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    student_number VARCHAR(20) UNIQUE NOT NULL,
    course VARCHAR(100) NOT NULL,
    year_level INTEGER NOT NULL CHECK (year_level BETWEEN 1 AND 6),
    section VARCHAR(10),
    department VARCHAR(100) NOT NULL,
    admission_date DATE NOT NULL,
    expected_graduation_date DATE,
    guardian_name VARCHAR(200),
    guardian_contact VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_student_number ON students(student_number);
CREATE INDEX idx_students_course ON students(course);
CREATE INDEX idx_students_year_level ON students(year_level);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| student_id | UUID | PK | Unique student identifier |
| user_id | UUID | FK, NOT NULL | Reference to users table |
| student_number | VARCHAR(20) | UNIQUE, NOT NULL | Official student ID number |
| course | VARCHAR(100) | NOT NULL | Academic program/major |
| year_level | INTEGER | NOT NULL, CHECK | Current year level (1-6) |
| section | VARCHAR(10) | NULLABLE | Section/block assignment |
| department | VARCHAR(100) | NOT NULL | Academic department |
| admission_date | DATE | NOT NULL | Date of admission |
| expected_graduation_date | DATE | NULLABLE | Expected graduation date |
| guardian_name | VARCHAR(200) | NULLABLE | Parent/guardian name |
| guardian_contact | VARCHAR(20) | NULLABLE | Guardian contact number |

---

### 3.3 Faculty Table

**Purpose:** Store faculty/teacher information and employment details.

```sql
CREATE TABLE faculty (
    faculty_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    specialization VARCHAR(200),
    employment_status VARCHAR(20) NOT NULL CHECK (employment_status IN ('permanent', 'part-time', 'contractual', 'adjunct')),
    hire_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_faculty_user_id ON faculty(user_id);
CREATE INDEX idx_faculty_employee_id ON faculty(employee_id);
CREATE INDEX idx_faculty_department ON faculty(department);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| faculty_id | UUID | PK | Unique faculty identifier |
| user_id | UUID | FK, NOT NULL | Reference to users table |
| employee_id | VARCHAR(20) | UNIQUE, NOT NULL | Employee ID number |
| department | VARCHAR(100) | NOT NULL | Department assignment |
| position | VARCHAR(100) | NOT NULL | Job position/title |
| specialization | VARCHAR(200) | NULLABLE | Area of expertise |
| employment_status | VARCHAR(20) | NOT NULL, CHECK | Employment type |
| hire_date | DATE | NOT NULL | Date of hiring |

---

### 3.4 Administrators Table

**Purpose:** Store administrator information with role differentiation (Librarian, Computer Lab Personnel, TC, etc.).

```sql
CREATE TABLE administrators (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    admin_type VARCHAR(50) NOT NULL CHECK (admin_type IN (
        'librarian', 
        'computer_lab_personnel', 
        'treasury', 
        'registrar', 
        'dean',
        'department_head',
        'guidance',
        'clinic',
        'property_custodian',
        'research_center',
        'other'
    )),
    department VARCHAR(100),
    office_location VARCHAR(200),
    designation VARCHAR(100),
    hire_date DATE NOT NULL,
    is_signatory BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_administrators_user_id ON administrators(user_id);
CREATE INDEX idx_administrators_employee_id ON administrators(employee_id);
CREATE INDEX idx_administrators_admin_type ON administrators(admin_type);
CREATE INDEX idx_administrators_is_signatory ON administrators(is_signatory);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| admin_id | UUID | PK | Unique administrator identifier |
| user_id | UUID | FK, NOT NULL | Reference to users table |
| employee_id | VARCHAR(20) | UNIQUE, NOT NULL | Employee ID number |
| admin_type | VARCHAR(50) | NOT NULL, CHECK | Type of administrator role |
| department | VARCHAR(100) | NULLABLE | Department/office assignment |
| office_location | VARCHAR(200) | NULLABLE | Physical office location |
| designation | VARCHAR(100) | NULLABLE | Official designation |
| hire_date | DATE | NOT NULL | Date of hiring |
| is_signatory | BOOLEAN | DEFAULT TRUE | Whether this admin approves clearances |

**IMPORTANT:** Administrator types (Librarian, Computer Lab Personnel, etc.) are stored as values in `admin_type` field, NOT as separate tables. This maintains the requirement that they are all under the Administrator role.

---

### 3.5 Academic Reports Table

**Purpose:** Store academic reports submitted by faculty for students.

```sql
CREATE TABLE academic_reports (
    report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    faculty_id UUID NOT NULL REFERENCES faculty(faculty_id) ON DELETE RESTRICT,
    academic_period_id UUID REFERENCES academic_periods(academic_period_id),
    report_type VARCHAR(50) NOT NULL CHECK (report_type IN ('grade_report', 'attendance', 'conduct', 'project_completion', 'comprehensive')),
    subject_code VARCHAR(20),
    subject_name VARCHAR(200),
    grade VARCHAR(5),
    remarks TEXT,
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    semester VARCHAR(20) NOT NULL CHECK (semester IN ('1st', '2nd', 'summer')),
    school_year VARCHAR(9) NOT NULL, -- Format: '2024-2025'
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'reviewed', 'approved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_academic_reports_student_id ON academic_reports(student_id);
CREATE INDEX idx_academic_reports_faculty_id ON academic_reports(faculty_id);
CREATE INDEX idx_academic_reports_period ON academic_reports(academic_period_id);
CREATE INDEX idx_academic_reports_semester_year ON academic_reports(semester, school_year);
CREATE INDEX idx_academic_reports_status ON academic_reports(status);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| report_id | UUID | PK | Unique report identifier |
| student_id | UUID | FK, NOT NULL | Student being reported on |
| faculty_id | UUID | FK, NOT NULL | Faculty who submitted the report |
| academic_period_id | UUID | FK, NULLABLE | Reference to academic period |
| report_type | VARCHAR(50) | NOT NULL, CHECK | Type of academic report |
| subject_code | VARCHAR(20) | NULLABLE | Subject code if applicable |
| subject_name | VARCHAR(200) | NULLABLE | Subject name |
| grade | VARCHAR(5) | NULLABLE | Grade earned |
| remarks | TEXT | NULLABLE | Additional comments |
| report_date | DATE | NOT NULL | Date of the report |
| semester | VARCHAR(20) | NOT NULL, CHECK | Semester (1st, 2nd, Summer) |
| school_year | VARCHAR(9) | NOT NULL | Format: '2024-2025' |
| submitted_at | TIMESTAMP | DEFAULT NOW() | Submission timestamp |
| status | VARCHAR(20) | CHECK | Report status |

---

### 3.6 Academic Periods Table

**Purpose:** Define academic periods (semesters, trimesters) for proper scheduling.

```sql
CREATE TABLE academic_periods (
    academic_period_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period_name VARCHAR(100) NOT NULL,
    school_year VARCHAR(9) NOT NULL,
    semester VARCHAR(20) NOT NULL CHECK (semester IN ('1st', '2nd', 'summer')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_period UNIQUE (school_year, semester)
);

-- Indexes
CREATE INDEX idx_academic_periods_current ON academic_periods(is_current);
CREATE INDEX idx_academic_periods_dates ON academic_periods(start_date, end_date);
```

---

### 3.7 Clearance Requests Table

**Purpose:** Main clearance request tracking and status management.

```sql
CREATE TABLE clearance_requests (
    clearance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    academic_period_id UUID NOT NULL REFERENCES academic_periods(academic_period_id),
    request_type VARCHAR(50) NOT NULL CHECK (request_type IN (
        'graduation', 
        'transfer', 
        'withdrawal', 
        'semester_end', 
        'employment',
        'scholarship',
        'other'
    )),
    purpose TEXT,
    overall_status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (overall_status IN (
        'draft',
        'pending',
        'in_review',
        'approved',
        'rejected',
        'on_hold',
        'completed'
    )),
    priority_level VARCHAR(20) DEFAULT 'normal' CHECK (priority_level IN ('low', 'normal', 'high', 'urgent')),
    submitted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_clearance_per_period UNIQUE (student_id, academic_period_id, request_type)
);

-- Indexes
CREATE INDEX idx_clearance_requests_student_id ON clearance_requests(student_id);
CREATE INDEX idx_clearance_requests_period ON clearance_requests(academic_period_id);
CREATE INDEX idx_clearance_requests_status ON clearance_requests(overall_status);
CREATE INDEX idx_clearance_requests_submitted_at ON clearance_requests(submitted_at);
CREATE INDEX idx_clearance_requests_type ON clearance_requests(request_type);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| clearance_id | UUID | PK | Unique clearance request identifier |
| student_id | UUID | FK, NOT NULL | Student making the request |
| academic_period_id | UUID | FK, NOT NULL | Academic period for this clearance |
| request_type | VARCHAR(50) | NOT NULL, CHECK | Type of clearance being requested |
| purpose | TEXT | NULLABLE | Reason/purpose for clearance |
| overall_status | VARCHAR(30) | NOT NULL, CHECK | Overall clearance status |
| priority_level | VARCHAR(20) | CHECK | Priority level for processing |
| submitted_at | TIMESTAMP | NULLABLE | When the request was submitted |
| completed_at | TIMESTAMP | NULLABLE | When clearance was completed |

---

### 3.8 Signatories Table (Required Approvals)

**Purpose:** Track individual signatory approvals for each clearance request.

```sql
CREATE TABLE signatories (
    signatory_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clearance_id UUID NOT NULL REFERENCES clearance_requests(clearance_id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES administrators(admin_id),
    signatory_order INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',
        'approved',
        'rejected',
        'on_hold',
        'not_applicable'
    )),
    remarks TEXT,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_signatory_per_clearance UNIQUE (clearance_id, admin_id)
);

-- Indexes
CREATE INDEX idx_signatories_clearance_id ON signatories(clearance_id);
CREATE INDEX idx_signatories_admin_id ON signatories(admin_id);
CREATE INDEX idx_signatories_status ON signatories(status);
CREATE INDEX idx_signatories_order ON signatories(signatory_order);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| signatory_id | UUID | PK | Unique signatory record identifier |
| clearance_id | UUID | FK, NOT NULL | Clearance request this belongs to |
| admin_id | UUID | FK, NOT NULL | Administrator who must approve |
| signatory_order | INTEGER | NOT NULL | Order of approval in workflow |
| status | VARCHAR(30) | NOT NULL, CHECK | Current approval status |
| remarks | TEXT | NULLABLE | Comments from the signatory |
| processed_at | TIMESTAMP | NULLABLE | When approval/rejection was made |

---

### 3.9 Remarks Table

**Purpose:** Track all remarks and comments on clearance requests.

```sql
CREATE TABLE remarks (
    remark_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clearance_id UUID NOT NULL REFERENCES clearance_requests(clearance_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id),
    remark_type VARCHAR(30) NOT NULL CHECK (remark_type IN (
        'general',
        'deficiency',
        'requirement',
        'approval',
        'rejection',
        'query',
        'response'
    )),
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE, -- Internal remarks not visible to students
    parent_remark_id UUID REFERENCES remarks(remark_id), -- For threaded remarks
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_remarks_clearance_id ON remarks(clearance_id);
CREATE INDEX idx_remarks_user_id ON remarks(user_id);
CREATE INDEX idx_remarks_type ON remarks(remark_type);
CREATE INDEX idx_remarks_parent ON remarks(parent_remark_id);
CREATE INDEX idx_remarks_created ON remarks(created_at);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| remark_id | UUID | PK | Unique remark identifier |
| clearance_id | UUID | FK, NOT NULL | Clearance request being remarked on |
| user_id | UUID | FK, NOT NULL | User who created the remark |
| remark_type | VARCHAR(30) | NOT NULL, CHECK | Type of remark |
| content | TEXT | NOT NULL | Remark content |
| is_internal | BOOLEAN | DEFAULT FALSE | Whether visible to students |
| parent_remark_id | UUID | FK, NULLABLE | For threaded conversations |

---

### 3.10 Clearance Records Table

**Purpose:** Maintain historical records of completed clearances.

```sql
CREATE TABLE clearance_records (
    record_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clearance_id UUID NOT NULL REFERENCES clearance_requests(clearance_id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES students(student_id),
    academic_period_id UUID NOT NULL REFERENCES academic_periods(academic_period_id),
    request_type VARCHAR(50) NOT NULL,
    final_status VARCHAR(30) NOT NULL CHECK (final_status IN ('approved', 'rejected')),
    total_signatories INTEGER NOT NULL DEFAULT 0,
    approved_count INTEGER NOT NULL DEFAULT 0,
    rejected_count INTEGER NOT NULL DEFAULT 0,
    processing_days INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_record UNIQUE (clearance_id)
);

-- Indexes
CREATE INDEX idx_clearance_records_clearance_id ON clearance_records(clearance_id);
CREATE INDEX idx_clearance_records_student_id ON clearance_records(student_id);
CREATE INDEX idx_clearance_records_period ON clearance_records(academic_period_id);
CREATE INDEX idx_clearance_records_status ON clearance_records(final_status);
CREATE INDEX idx_clearance_records_completed ON clearance_records(completed_at);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| record_id | UUID | PK | Unique record identifier |
| clearance_id | UUID | FK, NOT NULL | Original clearance request |
| student_id | UUID | FK, NOT NULL | Student who requested clearance |
| academic_period_id | UUID | FK, NOT NULL | Academic period |
| request_type | VARCHAR(50) | NOT NULL | Type of clearance |
| final_status | VARCHAR(30) | NOT NULL, CHECK | Final clearance status |
| total_signatories | INTEGER | NOT NULL | Total required approvals |
| approved_count | INTEGER | NOT NULL | Number approved |
| rejected_count | INTEGER | NOT NULL | Number rejected |
| processing_days | INTEGER | NULLABLE | Days to complete |
| completed_at | TIMESTAMP | NOT NULL | Completion timestamp |

---

### 3.11 Deadlines Table

**Purpose:** System configuration for clearance deadlines and important dates.

```sql
CREATE TABLE deadlines (
    deadline_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_period_id UUID NOT NULL REFERENCES academic_periods(academic_period_id),
    deadline_type VARCHAR(50) NOT NULL CHECK (deadline_type IN (
        'clearance_start',
        'clearance_end',
        'grade_submission',
        'report_submission',
        'signatory_approval',
        'final_clearance',
        'application_deadline'
    )),
    deadline_name VARCHAR(200) NOT NULL,
    description TEXT,
    deadline_date TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    notify_before_days INTEGER DEFAULT 7, -- Send notification X days before
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_deadline UNIQUE (academic_period_id, deadline_type)
);

-- Indexes
CREATE INDEX idx_deadlines_period ON deadlines(academic_period_id);
CREATE INDEX idx_deadlines_type ON deadlines(deadline_type);
CREATE INDEX idx_deadlines_date ON deadlines(deadline_date);
CREATE INDEX idx_deadlines_active ON deadlines(is_active);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| deadline_id | UUID | PK | Unique deadline identifier |
| academic_period_id | UUID | FK, NOT NULL | Related academic period |
| deadline_type | VARCHAR(50) | NOT NULL, CHECK | Type of deadline |
| deadline_name | VARCHAR(200) | NOT NULL | Display name |
| description | TEXT | NULLABLE | Detailed description |
| deadline_date | TIMESTAMP | NOT NULL | Actual deadline datetime |
| is_active | BOOLEAN | DEFAULT TRUE | Whether deadline is active |
| notify_before_days | INTEGER | DEFAULT 7 | Days before deadline to notify |

---

### 3.12 Examination Dates Table

**Purpose:** Schedule and track examination dates.

```sql
CREATE TABLE examination_dates (
    exam_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_period_id UUID NOT NULL REFERENCES academic_periods(academic_period_id),
    exam_type VARCHAR(50) NOT NULL CHECK (exam_type IN (
        'preliminary',
        'midterm',
        'prefinal',
        'final',
        'comprehensive',
        'entrance',
        'placement'
    )),
    exam_name VARCHAR(200) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    target_year_levels INTEGER[], -- Array of year levels (PostgreSQL specific)
    target_courses VARCHAR(100)[], -- Array of courses
    is_mandatory BOOLEAN DEFAULT TRUE,
    venue VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- Indexes
CREATE INDEX idx_examination_dates_period ON examination_dates(academic_period_id);
CREATE INDEX idx_examination_dates_type ON examination_dates(exam_type);
CREATE INDEX idx_examination_dates_dates ON examination_dates(start_date, end_date);
```

**Fields Description:**
| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| exam_id | UUID | PK | Unique exam identifier |
| academic_period_id | UUID | FK, NOT NULL | Related academic period |
| exam_type | VARCHAR(50) | NOT NULL, CHECK | Type of examination |
| exam_name | VARCHAR(200) | NOT NULL | Display name |
| description | TEXT | NULLABLE | Detailed description |
| start_date | TIMESTAMP | NOT NULL | Exam start datetime |
| end_date | TIMESTAMP | NOT NULL | Exam end datetime |
| target_year_levels | INTEGER[] | NULLABLE | Target year levels |
| target_courses | VARCHAR(100)[] | NULLABLE | Target courses |
| is_mandatory | BOOLEAN | DEFAULT TRUE | Whether attendance is required |
| venue | VARCHAR(200) | NULLABLE | Examination venue |

---

## 4. Workflow Relationships

### 4.1 Clearance Request Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CLEARANCE WORKFLOW                                │
└─────────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │   Student    │
    │   Creates    │
    │   Request    │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐      ┌──────────────┐
    │    DRAFT     │─────►│   SUBMITTED  │
    │              │      │   (Pending)  │
    └──────────────┘      └──────┬───────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │  IN_REVIEW   │
                          │              │
                          └──────┬───────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
       ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
       │   APPROVED   │   │   REJECTED   │   │   ON_HOLD    │
       │              │   │              │   │              │
       └──────┬───────┘   └──────────────┘   └──────┬───────┘
              │                                      │
              ▼                                      │
       ┌──────────────┐                              │
       │  COMPLETED   │◄─────────────────────────────┘
       │              │        (After resolving hold)
       └──────────────┘
```

### 4.2 Signatory Approval Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SIGNATORY APPROVAL SEQUENCE                           │
└─────────────────────────────────────────────────────────────────────────┘

    Clearance Request Created
           │
           ▼
    ┌──────────────────────────────────────────────────────┐
    │  SIGNATORY 1: Library                                 │
    │  Status: PENDING → APPROVED/REJECTED                  │
    │  Admin Type: librarian                                │
    └───────────────────┬──────────────────────────────────┘
                        │ (If Approved)
                        ▼
    ┌──────────────────────────────────────────────────────┐
    │  SIGNATORY 2: Computer Lab                            │
    │  Status: PENDING → APPROVED/REJECTED                  │
    │  Admin Type: computer_lab_personnel                   │
    └───────────────────┬──────────────────────────────────┘
                        │ (If Approved)
                        ▼
    ┌──────────────────────────────────────────────────────┐
    │  SIGNATORY 3: Treasury (TC)                           │
    │  Status: PENDING → APPROVED/REJECTED                  │
    │  Admin Type: treasury                                 │
    └───────────────────┬──────────────────────────────────┘
                        │ (If Approved)
                        ▼
    ┌──────────────────────────────────────────────────────┐
    │  SIGNATORY 4: Department Head/Dean                    │
    │  Status: PENDING → APPROVED/REJECTED                  │
    │  Admin Type: dean, department_head                    │
    └───────────────────┬──────────────────────────────────┘
                        │
                        ▼
            ALL SIGNATORIES APPROVED
                        │
                        ▼
                CLEARANCE COMPLETED
```

---

## 5. Status Tracking Mechanism

### 5.1 Overall Clearance Status Calculation

```sql
-- Function to calculate overall clearance status
CREATE OR REPLACE FUNCTION calculate_clearance_status(
    p_clearance_id UUID
) RETURNS VARCHAR AS $$
DECLARE
    v_total_signatories INTEGER;
    v_approved_count INTEGER;
    v_rejected_count INTEGER;
    v_pending_count INTEGER;
    v_on_hold_count INTEGER;
BEGIN
    -- Count signatories by status
    SELECT 
        COUNT(*),
        COUNT(*) FILTER (WHERE status = 'approved'),
        COUNT(*) FILTER (WHERE status = 'rejected'),
        COUNT(*) FILTER (WHERE status = 'pending'),
        COUNT(*) FILTER (WHERE status = 'on_hold')
    INTO 
        v_total_signatories,
        v_approved_count,
        v_rejected_count,
        v_pending_count,
        v_on_hold_count
    FROM signatories
    WHERE clearance_id = p_clearance_id;
    
    -- Determine overall status
    IF v_rejected_count > 0 THEN
        RETURN 'rejected';
    ELSIF v_on_hold_count > 0 THEN
        RETURN 'on_hold';
    ELSIF v_approved_count = v_total_signatories THEN
        RETURN 'approved';
    ELSIF v_pending_count = v_total_signatories THEN
        RETURN 'pending';
    ELSE
        RETURN 'in_review';
    END IF;
END;
$$ LANGUAGE plpgsql;
```

### 5.2 Status Update Trigger

```sql
-- Trigger to update clearance status when signatory status changes
CREATE OR REPLACE FUNCTION update_clearance_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the clearance request's updated_at timestamp
    UPDATE clearance_requests
    SET 
        overall_status = calculate_clearance_status(NEW.clearance_id),
        updated_at = CURRENT_TIMESTAMP
    WHERE clearance_id = NEW.clearance_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_signatory_status_change
AFTER INSERT OR UPDATE OF status ON signatories
FOR EACH ROW
EXECUTE FUNCTION update_clearance_status();
```

---

## 6. Implementation Notes

### 6.1 Technology Stack Recommendations

- **Database:** PostgreSQL 14+ (for JSONB, UUID, and array support)
- **ORM:** Prisma (for Node.js/TypeScript) or Sequelize
- **Migrations:** Version-controlled migration files
- **Backup:** Daily automated backups with point-in-time recovery

### 6.2 Migration Strategy

1. Create base tables (users, academic_periods)
2. Create role tables (students, faculty, administrators)
3. Create transaction tables (clearance_requests, signatories, remarks)
4. Create historical tables (clearance_records)
5. Create configuration tables (deadlines, examination_dates)
6. Add indexes and constraints
7. Create views and functions
8. Seed default data (roles, admin types)

---

**Document Version:** 1.0
**Last Updated:** September 23, 2026
**Status:** Ready for Implementation
