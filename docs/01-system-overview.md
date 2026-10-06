# ClearACTS: Student Clearance Management System
## Complete System Documentation

---

# TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [User Roles and Responsibilities](#user-roles-and-responsibilities)
4. [Complete System Workflow](#complete-system-workflow)
5. [Text-Based System Flowchart](#text-based-system-flowchart)
6. [Detailed Workflow Explanation](#detailed-workflow-explanation)
7. [Clearance Status Definitions](#clearance-status-definitions)
8. [Role Permissions Matrix](#role-permissions-matrix)
9. [Use Cases](#use-cases)

---

# EXECUTIVE SUMMARY

ClearACTS (Clearance and Clearance Tracking System) is a web-based student clearance management system designed to digitize and streamline the clearance process in educational institutions. The system eliminates manual paper-based workflows, enabling students to request clearance online while administrators track and manage approvals in real-time.

## Key Objectives
- Digitize the student clearance workflow
- Provide real-time tracking of clearance status
- Enable efficient communication between students and administrators
- Reduce processing time and administrative overhead
- Maintain comprehensive audit trails and documentation

## Core Features
- Online clearance submission
- Approval/rejection workflow with remarks
- Real-time status tracking
- Signatory monitoring and management
- Deadline enforcement and exam date integration
- Comprehensive reporting and analytics

---

# SYSTEM OVERVIEW

## System Purpose

ClearACTS serves as a centralized platform for managing student clearances before graduation, transfer, or end of academic term. The system ensures students have fulfilled all institutional obligations before receiving clearance approval.

## Clearance Types Supported

1. **Graduation Clearance** - Required for graduating students
2. **Transfer Clearance** - For students transferring to other institutions
3. **End-of-Term Clearance** - Semester/academic year completion
4. **Withdrawal Clearance** - For students leaving the institution

## System Architecture Paradigm

The system follows a three-tier architecture:
- **Presentation Layer**: React-based single-page application (SPA)
- **Application Layer**: RESTful API services
- **Data Layer**: Relational database management system

---

# USER ROLES AND RESPONSIBILITIES

## 1. STUDENT ROLE

### Primary Function
Initiate and track clearance requests throughout the approval process.

### Detailed Responsibilities

| Responsibility | Description |
|---------------|-------------|
| **Account Management** | Register and maintain student profile information |
| **Clearance Initiation** | Submit clearance requests with required documentation |
| **Document Upload** | Upload supporting documents (receipts, certifications, etc.) |
| **Status Monitoring** | Track clearance progress in real-time |
| **Remark Review** | View and respond to administrator remarks and feedback |
| **Issue Resolution** | Address rejected items and resubmit corrected documentation |
| **Deadline Awareness** | View and adhere to clearance deadlines |

### Available Actions
- Create new clearance request
- View clearance status dashboard
- Download clearance requirements checklist
- Upload supporting documents
- View administrator remarks
- Receive notifications on status changes
- Print/download approved clearance certificate

---

## 2. ADMINISTRATOR ROLE

### Primary Function
Review, approve, or reject clearance requests within their designated area of responsibility.

### Administrator Types (Unified Role with Different Department Assignments)

| Administrator Type | Department/Area of Responsibility |
|-------------------|-----------------------------------|
| **Librarian** | Library - Book returns, fine payments, library clearance |
| **Computer Lab Personnel** | Computer Laboratory - Equipment returns, lab fee settlement |
| **Finance Officer** | Accounting - Tuition, fees, and financial obligations |
| **Registrar Staff** | Registrar - Academic records, transcript clearance |
| **Dean's Office Staff** | Academic Department - Departmental requirements |
| **Guidance Counselor** | Student Affairs - Counseling clearance, exit interviews |
| **Property Custodian** | Property management - Equipment, materials return |
| **Other TC Personnel** | Various departments as designated |

### CRITICAL NOTE
All administrator types share the same role permissions but are assigned to specific departments. They do NOT represent separate roles in the system.

**Administrators include: Librarian, Computer Lab Personnel, other authorized personnel/TC**

### Detailed Responsibilities

| Responsibility | Description |
|---------------|-------------|
| **Request Review** | Evaluate clearance requests within assigned department |
| **Document Verification** | Verify authenticity and completeness of submitted documents |
| **Status Update** | Update clearance status (Approve/Reject) with remarks |
| **Remark Entry** | Provide detailed remarks explaining approval/rejection decisions |
| **Deadline Management** | Monitor and enforce clearance deadlines |
| **Report Generation** | Generate departmental clearance reports |
| **Issue Escalation** | Escalate complex cases to appropriate authorities |

### Available Actions
- View pending clearance requests (filtered by department)
- Approve or reject clearance items
- Add mandatory remarks for rejections
- View student submission history
- Generate departmental clearance reports
- Set department-specific requirements
- Manage department clearance deadlines
- View statistics and analytics dashboard

### IMPORTANT: Digital Signature NOT Included
**Digital Signature has been completely removed from the ClearACTS project.** Administrators approve or reject clearances through the system interface without requiring digital signatures.

---

## 3. FACULTY/TEACHER ROLE

### Primary Function
Report academic issues that may affect student clearance eligibility.

### CRITICAL DISTINCTION
**Faculty/Teachers DO NOT approve or reject clearances.** They serve as information providers who flag academic concerns that administrators will review and act upon.

### Detailed Responsibilities

| Responsibility | Description |
|---------------|-------------|
| **Academic Issue Reporting** | Report outstanding academic obligations (unsubmitted projects, incomplete requirements, missing examinations) |
| **Grade-Related Concerns** | Flag students with incomplete grades or grade disputes |
| **Attendance Reporting** | Report attendance-related issues that may affect clearance |
| **Material Return Monitoring** | Report unreturned borrowed materials or equipment |
| **Academic Standing Declaration** | Declare student's academic standing status |

### Available Actions
- View list of students under supervision
- Report academic issues/concerns
- Update previously reported issues
- View reported issue history
- Mark issues as resolved (when student addresses the concern)
- View own reporting statistics

### What Faculty CANNOT Do
- Approve clearance requests
- Reject clearance requests
- Modify clearance status
- Add clearance remarks
- Set deadlines
- Generate clearance reports

---

# COMPLETE SYSTEM WORKFLOW

## Phase 1: System Initialization (Administrator Setup)

### Step 1.1: Academic Period Configuration
1. Administrator configures new clearance period
2. Sets clearance start and end dates
3. Defines exam schedules and deadlines
4. Activates clearance system for the period

### Step 1.2: Signatory Assignment
1. System administrator assigns administrators to departments
2. Each administrator receives department-specific access
3. Clearance routes are configured based on institutional requirements

### Step 1.3: Requirement Definition
1. Each department defines required clearances
2. Document requirements are uploaded to the system
3. Checklist templates are created for each clearance type

---

## Phase 2: Student Clearance Request

### Step 2.1: Student Registration/Login
1. Student accesses ClearACTS portal
2. Logs in using institutional credentials
3. System authenticates and retrieves student profile
4. Dashboard displays clearance eligibility and requirements

### Step 2.2: Clearance Request Initiation
1. Student selects clearance type (graduation, transfer, etc.)
2. System displays required departments for clearance
3. Student reviews requirements checklist
4. Student initiates clearance request

### Step 2.3: Document Submission
1. Student uploads required documents for each department
2. System validates file formats and sizes
3. Documents are stored with timestamp and metadata
4. Confirmation receipt generated

### Step 2.4: Request Submission
1. Student reviews all submissions
2. Final submission triggers notification to all signatories
3. Clearance status changes to "Pending"
4. Student receives confirmation with tracking number

---

## Phase 3: Faculty Issue Reporting (Parallel Process)

### Step 3.1: Faculty Review Period
1. Faculty receive notification of clearance period
2. Faculty access student list under their supervision
3. Faculty review academic records

### Step 3.2: Issue Reporting
1. Faculty identify students with outstanding obligations
2. Faculty submit issue reports with detailed descriptions
3. Reports are linked to student clearance records
4. Issues flag student for administrator attention

### Step 3.3: Issue Resolution Tracking
1. Student addresses reported issues
2. Faculty update issue status when resolved
3. Resolution noted in clearance record
4. Clearance process continues

---

## Phase 4: Administrator Review and Processing

### Step 4.1: Request Queue Management
1. Administrators view department-specific request queue
2. Queue sorted by submission date (FIFO) and priority
3. Administrators select requests for review
4. System locks request during review (prevents concurrent access)

### Step 4.2: Document Verification
1. Administrator views submitted documents
2. Cross-references with institutional records
3. Verifies authenticity and completeness
4. Checks for faculty-reported issues

### Step 4.3: Decision Making

#### Scenario A: Approval
1. Administrator verifies all requirements met
2. Confirms no outstanding issues
3. Selects "Approve" action
4. Optionally adds congratulatory remarks
5. Status updates to "Approved" for that department
6. System logs approval with timestamp and administrator ID

#### Scenario B: Rejection
1. Administrator identifies deficiency or issue
2. Selects "Reject" action
3. **MANDATORY**: Enters detailed rejection remarks
4. Specifies required corrective actions
5. Status updates to "Rejected" for that department
6. Student receives notification with remarks
7. System logs rejection with full details

### Step 4.4: Resubmission Processing (If Rejected)
1. Student addresses issues noted in rejection
2. Student uploads corrected/additional documents
3. Request re-enters department queue
4. Administrator re-evaluates submission
5. Decision cycle repeats

---

## Phase 5: Signatory Monitoring and Tracking

### Step 5.1: Progress Monitoring
1. System tracks approvals from all required departments
2. Real-time progress bar displayed to student
3. Notifications sent as each department approves

### Step 5.2: Bottleneck Identification
1. System identifies pending approvals beyond threshold time
2. Automated reminders sent to administrators
3. Escalation triggers if delays persist
4. Reports generated for administrative oversight

### Step 5.3: Parallel Processing
1. Multiple administrators process requests simultaneously
2. Departmental approvals are independent
3. Progress tracked collectively
4. Final completion requires all approvals

---

## Phase 6: Completion and Certificate Generation

### Step 6.1: Final Verification
1. System verifies all departments have approved
2. Confirms no outstanding faculty-reported issues
3. Validates deadline compliance
4. Final status check completed

### Step 6.2: Certificate Generation
1. Status updates to "Completed"
2. Clearance certificate generated (PDF format)
3. Certificate includes: Student details, clearance date, approving departments
4. Digital record archived in system

### Step 6.3: Record Archival
1. Complete clearance record archived
2. All documents and communications preserved
3. Audit trail finalized
4. Data available for future reference

---

# CLEARANCE STATUS DEFINITIONS

| Status | Description | Visible To |
|--------|-------------|------------|
| **Pending** | Request submitted, awaiting administrator action | Student, Administrator, Faculty (view only) |
| **Approved** | Individual department has cleared the student | All users |
| **Rejected** | Department has denied clearance with remarks | Student, Administrator |
| **Completed** | All departments approved, clearance finalized | All users |

---

# TEXT-BASED SYSTEM FLOWCHART

```
================================================================================
                        ClearACTS SYSTEM WORKFLOW FLOWCHART
================================================================================

┌─────────────────────────────────────────────────────────────────────────────┐
│                           PHASE 1: SYSTEM SETUP                              │
│                         (Administrator Actions)                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │   Administrator Configures      │
                    │   - Clearance Period            │
                    │   - Deadlines & Exam Dates      │
                    │   - Department Requirements     │
                    │   - Signatory Assignments       │
                    └─────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 2: STUDENT INITIATION                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │        Student Login            │
                    │   (Institutional Credentials)   │
                    └─────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │   Student Selects Clearance     │
                    │   Type (Graduation/Transfer/    │
                    │   End-of-Term/Withdrawal)       │
                    └─────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │   System Displays Required      │
                    │   Departments & Checklists      │
                    │   ┌───────────────────────┐     │
                    │   │ □ Library            │     │
                    │   │ □ Computer Lab       │     │
                    │   │ □ Finance            │     │
                    │   │ □ Registrar          │     │
                    │   │ □ Dean's Office      │     │
                    │   │ □ Guidance Office    │     │
                    │   └───────────────────────┘     │
                    └─────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │   Student Uploads Documents     │
                    │   for Each Department           │
                    └─────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │   Student Submits Clearance     │
                    │   Request                       │
                    │                                 │
                    │   STATUS: PENDING               │
                    └─────────────────────────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│    PHASE 3A: FACULTY PROCESS      │ │    PHASE 3B: ADMINISTRATOR       │
│    (Parallel Execution)           │ │    PROCESS                        │
└───────────────────────────────────┘ └───────────────────────────────────┘
                    │                                   │
                    ▼                                   ▼
    ┌───────────────────────────┐       ┌─────────────────────────────────┐
    │  Faculty Reviews Student  │       │  Administrator Views Pending    │
    │  Academic Records         │       │  Requests in Department Queue   │
    └───────────────────────────┘       └─────────────────────────────────┘
                    │                                   │
                    ▼                                   ▼
    ┌───────────────────────────┐       ┌─────────────────────────────────┐
    │  Any Academic Issues?     │       │  Administrator Verifies         │
    │                           │       │  Documents & Records            │
    └───────────────────────────┘       └─────────────────────────────────┘
            │               │                           │
            ▼               ▼                           ▼
    ┌──────────────┐ ┌──────────────┐     ┌─────────────────────────────────┐
    │     YES      │ │      NO      │     │  Decision Point                 │
    │   Report     │ │   No Action  │     │                                 │
    │   Issue      │ │   Required   │     │  ┌───────────┐ ┌─────────────┐  │
    └──────────────┘ └──────────────┘     │  │ APPROVE   │ │   REJECT    │  │
            │                              │  │    or     │ │     or      │  │
            ▼                              │  │ APPROVE   │ │   REJECT    │  │
    ┌───────────────────────────┐         │  └───────────┘ └─────────────┘  │
    │  Issue Flagged in         │         └─────────────────────────────────┘
    │  Student Record           │                       │
    │  (Admin will review)      │           ┌───────────┴───────────┐
    └───────────────────────────┘           │                       │
                                            ▼                       ▼
                              ┌──────────────────────┐ ┌──────────────────────┐
                              │   APPROVED           │ │   REJECTED           │
                              │                      │ │                      │
                              │ • Update Status      │ │ • Mandatory Remarks  │
                              │ • Log Timestamp      │ │ • Specify Issues     │
                              │ • Notify Student     │ │ • Notify Student     │
                              │ • Move to Next Dept  │ │ • Request Resubmit   │
                              └──────────────────────┘ └──────────────────────┘
                                            │                       │
                                            │                       ▼
                                            │         ┌──────────────────────────┐
                                            │         │   Student Addresses       │
                                            │         │   Issues & Resubmits      │
                                            │         └──────────────────────────┘
                                            │                       │
                                            │                       ▼
                                            │         ┌──────────────────────────┐
                                            │         │   Return to              │
                                            │         │   Administrator Review   │
                                            │         └──────────────────────────┘
                                            │                       │
                                            └───────────────────────┘
                                                      │
                                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 4: SIGNATORY MONITORING                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                                      │
                                                      ▼
                    ┌─────────────────────────────────────────────┐
                    │         Real-Time Progress Tracking          │
                    │                                               │
                    │  Student Dashboard View:                     │
                    │  ┌───────────────────────────────────────┐   │
                    │  │ Library        [████████] APPROVED    │   │
                    │  │ Computer Lab   [████    ] PENDING     │   │
                    │  │ Finance        [████████] APPROVED    │   │
                    │  │ Registrar      [████████] APPROVED    │   │
                    │  │ Dean's Office  [        ] PENDING     │   │
                    │  │ Guidance       [████████] APPROVED    │   │
                    │  └───────────────────────────────┘   │
                    │                                               │
                    │  Overall Progress: 4/6 Departments (67%)     │
                    └─────────────────────────────────────────────┘
                                                      │
                                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 5: COMPLETION                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                                      │
                                                      ▼
                    ┌─────────────────────────────────────────────┐
                    │        All Departments Approved?            │
                    │        No Outstanding Faculty Issues?       │
                    │        Deadline Met?                        │
                    └─────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
            ┌───────────────┐                 ┌───────────────┐
            │      YES      │                 │      NO       │
            └───────────────┘                 └───────────────┘
                    │                                   │
                    ▼                                   ▼
    ┌───────────────────────────────┐   ┌───────────────────────────────┐
    │   STATUS: COMPLETED           │   │   Return to Process           │
    │                               │   │   (Address remaining items)   │
    │   • Generate Certificate      │   └───────────────────────────────┘
    │   • Archive Records           │
    │   • Notify Student            │
    │   • Update Institutional DB   │
    └───────────────────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │   CLEARANCE CERTIFICATE GENERATED                                      │
    │                                                                        │
    │  Student: [Name]                                                       │
    │  Student ID: [ID]                                                      │
    │  Clearance Type: [Type]                                                │
    │  Date Completed: [Date]                                                │
    │                                                                        │
    │  Approved By:                                                          │
    │  □ Library - [Name, Date]                                              │
    │  □ Computer Lab - [Name, Date]                                         │
    │  □ Finance - [Name, Date]                                              │
    │  □ Registrar - [Name, Date]                                            │
    │  □ Dean's Office - [Name, Date]                                        │
    │  □ Guidance Office - [Name, Date]                                      │
    │                                                                        │
    └───────────────────────────────────────────────────────────────────────┘
                    │
                    ▼
                    ┌─────────────────────────────────┐
                    │         PROCESS COMPLETE        │
                    │                                  │
                    │   Student may now proceed with:  │
                    │   • Graduation                   │
                    │   • Transfer                     │
                    │   • Enrollment (next term)       │
                    │   • Official Document Requests   │
                    └─────────────────────────────────┘


================================================================================
                    CLEARANCE STATUS STATE DIAGRAM
================================================================================

                            ┌─────────────┐
                            │   INITIAL   │
                            │   (Draft)   │
                            └─────────────┘
                                   │
                                   │ Student Submits
                                   ▼
                            ┌─────────────┐
                            │   PENDING   │◄────────────────────┐
                            └─────────────┘                     │
                                   │                            │
                    ┌──────────────┴──────────────┐            │
                    │                             │            │
                    ▼                             ▼            │
            ┌─────────────┐               ┌─────────────┐      │
            │  APPROVED   │               │  REJECTED   │      │
            │  (Dept)     │               │  (Dept)     │      │
            └─────────────┘               └─────────────┘      │
                    │                             │            │
                    │                             │            │
                    │                    Student Resubmits ────┘
                    │
                    │ (All Depts Approved)
                    ▼
            ┌─────────────┐
            │  COMPLETED  │
            │  (Final)    │
            └─────────────┘


================================================================================
                    ROLE INTERACTION MATRIX
================================================================================

┌────────────────┬───────────────────────────────────────────────────────────┐
│                │                    ACTIONS                                │
│ ROLE           ├──────────────┬──────────────┬──────────────┬─────────────┤
│                │  Submit      │  Approve/    │  Report      │  Track      │
│                │  Clearance   │  Reject      │  Issues      │  Progress   │
├────────────────┼──────────────┼──────────────┼──────────────┼─────────────┤
│ STUDENT        │     ✓        │      ✗       │      ✗       │      ✓      │
├────────────────┼──────────────┼──────────────┼──────────────┼─────────────┤
│ ADMINISTRATOR  │     ✗        │      ✓       │      ✗       │      ✓      │
│ (Librarian,    │              │              │              │             │
│ Lab Personnel, │              │              │              │             │
│ etc.)          │              │              │              │             │
├────────────────┼──────────────┼──────────────┼──────────────┼─────────────┤
│ FACULTY/       │     ✗        │      ✗       │      ✓       │      ✓      │
│ TEACHER        │              │              │(Academic     │(View Only)  │
│                │              │              │ Issues Only) │             │
└────────────────┴──────────────┴──────────────┴──────────────┴─────────────┘

Legend: ✓ = Permitted, ✗ = Not Permitted
```

---

# ROLE PERMISSIONS MATRIX

## Detailed Permission Matrix by Module

| Module/Feature | Student | Administrator | Faculty/Teacher |
|---------------|---------|---------------|-----------------|
| **Authentication** |  |  |  |
| Login | ✓ | ✓ | ✓ |
| Logout | ✓ | ✓ | ✓ |
| View Own Profile | ✓ | ✓ | ✓ |
| Edit Own Profile | ✓ | ✓ | ✓ |
| **Clearance Management** |  |  |  |
| Submit Clearance Request | ✓ | ✗ | ✗ |
| View Own Clearance Status | ✓ | ✗ | ✗ |
| View All Clearance Requests | ✗ | ✓ (Dept) | ✗ |
| Approve Clearance | ✗ | ✓ | ✗ |
| Reject Clearance | ✗ | ✓ | ✗ |
| Add Remarks | ✗ | ✓ | ✗ |
| View Remarks | ✓ | ✓ | ✗ |
| **Signatory Management** |  |  |  |
| View Required Signatories | ✓ | ✓ | ✗ |
| View Approval Progress | ✓ | ✓ | ✗ |
| Process Pending Approvals | ✗ | ✓ | ✗ |
| **Academic Reporting** |  |  |  |
| Report Academic Issues | ✗ | ✗ | ✓ |
| View Reported Issues | ✗ | ✓ | ✓ (Own) |
| Update Issue Status | ✗ | ✗ | ✓ |
| **Documents** |  |  |  |
| Upload Documents | ✓ | ✗ | ✗ |
| View Own Documents | ✓ | ✗ | ✗ |
| View Student Documents | ✗ | ✓ | ✗ |
| **Deadlines & Dates** |  |  |  |
| View Clearance Deadline | ✓ | ✓ | ✓ |
| View Exam Dates | ✓ | ✓ | ✓ |
| Set Deadlines | ✗ | ✓ (Super) | ✗ |
| **Reports & Analytics** |  |  |  |
| Generate Department Reports | ✗ | ✓ | ✗ |
| View Statistics | ✗ | ✓ | ✗ |
| **Certificate** |  |  |  |
| Download Completed Certificate | ✓ | ✓ | ✗ |
| Generate Certificate | ✗ | ✓ (Super) | ✗ |

---

# USE CASES

## Use Case 1: Student Submits Clearance Request

**Actor:** Student

**Preconditions:**
- Student is logged into the system
- Student has not submitted a clearance request for the current period
- Clearance period is active

**Main Flow:**
1. Student navigates to "New Clearance Request"
2. System displays available clearance types
3. Student selects clearance type (e.g., Graduation)
4. System displays list of required departments/signatories
5. Student reviews requirements for each department
6. Student uploads required documents for each department
7. System validates uploaded documents
8. Student reviews all submissions
9. Student submits clearance request
10. System generates tracking number
11. System updates status to "Pending"
12. System sends confirmation notification to student
13. System notifies all assigned signatories

**Alternative Flows:**
- **4a. Student has outstanding issues:** System displays warnings about unresolved issues
- **7a. Invalid document format:** System rejects upload and requests correct format
- **7b. File size exceeds limit:** System rejects upload and requests smaller file

**Postconditions:**
- Clearance request is created in the system
- Tracking number is generated
- All signatories are notified
- Student can track progress

---

## Use Case 2: Administrator Reviews and Approves Clearance

**Actor:** Administrator (e.g., Librarian, Computer Lab Personnel)

**Preconditions:**
- Administrator is logged into the system
- Clearance requests exist in the administrator's queue
- Administrator has department-specific access

**Main Flow:**
1. Administrator views clearance request queue
2. Administrator filters/sorts requests (optional)
3. Administrator selects a clearance request to review
4. System displays student information and submitted documents
5. System displays any faculty-reported issues
6. Administrator verifies documents and records
7. Administrator confirms no outstanding obligations
8. Administrator clicks "Approve"
9. System prompts for optional remarks
10. Administrator enters remarks (optional)
11. Administrator confirms approval
12. System updates clearance status to "Approved" for that department
13. System logs approval with timestamp
14. System notifies student of approval
15. System updates overall clearance progress

**Alternative Flows:**
- **6a. Documents incomplete:** Go to Use Case 3 (Rejection)
- **6b. Faculty issues reported:** Administrator reviews issues before deciding
- **8a. Administrator wants to reject:** Go to Use Case 3 (Rejection)

**Postconditions:**
- Department clearance status is updated to "Approved"
- Audit trail records the approval
- Student is notified
- Overall clearance progress is recalculated

---

## Use Case 3: Administrator Rejects Clearance with Remarks

**Actor:** Administrator

**Preconditions:**
- Administrator is reviewing a clearance request
- Administrator has identified deficiencies or issues

**Main Flow:**
1. Administrator identifies issue with clearance request
2. Administrator clicks "Reject"
3. System displays mandatory remarks field
4. Administrator enters detailed rejection reason
5. Administrator specifies required corrective actions
6. Administrator confirms rejection
7. System updates clearance status to "Rejected" for that department
8. System logs rejection with full details
9. System notifies student with rejection remarks
10. System sets request for resubmission

**Alternative Flows:**
- **4a. Remarks not provided:** System prevents rejection and prompts for remarks

**Postconditions:**
- Department clearance status is "Rejected"
- Student is notified with detailed remarks
- Student can resubmit after addressing issues
- Audit trail records the rejection

---

## Use Case 4: Faculty Reports Academic Issue

**Actor:** Faculty/Teacher

**Preconditions:**
- Faculty member is logged into the system
- Clearance period is active
- Student has outstanding academic obligations

**Main Flow:**
1. Faculty navigates to "Report Academic Issue"
2. System displays list of students under faculty's supervision
3. Faculty selects student
4. Faculty enters issue details:
   - Issue type (e.g., Missing Activity, Incomplete Requirement)
   - Subject code (if applicable)
   - Detailed description
   - Required action for resolution
5. Faculty submits report
6. System creates academic issue record
7. System links issue to student's clearance record
8. System notifies relevant administrators
9. System flags student record for attention

**Alternative Flows:**
- **3a. Student not found:** Faculty can search by student number or name

**Postconditions:**
- Academic issue is recorded in the system
- Student's clearance record is flagged
- Administrators are notified
- Issue status is set to "Reported"

---

## Use Case 5: Student Monitors Clearance Progress

**Actor:** Student

**Preconditions:**
- Student is logged into the system
- Student has submitted at least one clearance request

**Main Flow:**
1. Student navigates to "My Clearance" dashboard
2. System displays clearance status overview
3. Student views list of required signatories
4. For each signatory, student sees:
   - Department name
   - Administrator name
   - Status (Pending/Approved/Rejected)
   - Remarks (if any)
   - Date processed
5. Student views overall progress percentage
6. Student views deadline and exam date information
7. Student checks for any action items (if rejected)

**Alternative Flows:**
- **4a. Signatory rejected:** Student sees rejection remarks and required actions
- **7a. No action needed:** Dashboard displays "All clear" message

**Postconditions:**
- Student is informed of current clearance status
- Student knows which departments are pending
- Student can take action on rejections

---

## Use Case 6: Student Resubmits After Rejection

**Actor:** Student

**Preconditions:**
- Student has a rejected clearance request
- Student has addressed the issues noted in rejection

**Main Flow:**
1. Student views rejection details and remarks
2. Student addresses the issues
3. Student navigates to the rejected clearance request
4. Student uploads corrected/additional documents
5. System validates new uploads
6. Student reviews updated submission
7. Student submits for re-review
8. System updates request status back to "Pending"
9. System notifies administrator of resubmission
10. System resets the department clearance to "Pending"

**Alternative Flows:**
- **4a. Same issue not resolved:** Administrator may reject again

**Postconditions:**
- Clearance request is back in administrator's queue
- Previous rejection is logged in history
- Student is notified of resubmission receipt

---

## Use Case 7: Administrator Performs Final Verification

**Actor:** Administrator (Supervisor/Super Admin)

**Preconditions:**
- All departments have approved the clearance
- No outstanding faculty issues
- Clearance deadline has been met

**Main Flow:**
1. System identifies clearance requests ready for final verification
2. Administrator reviews complete clearance record
3. Administrator verifies all signatory approvals
4. Administrator confirms no outstanding issues
5. Administrator clicks "Complete Clearance"
6. System updates overall status to "Completed"
7. System generates clearance certificate
8. System archives all records
9. System notifies student of completion
10. System records completion in audit trail

**Alternative Flows:**
- **3a. Missing approvals:** System alerts administrator to pending approvals
- **4a. Outstanding issues:** Administrator returns request to pending state

**Postconditions:**
- Clearance status is "Completed"
- Certificate is generated and available
- All records are archived
- Student can download certificate

---

# APPENDIX: GLOSSARY OF TERMS

| Term | Definition |
|------|------------|
| **Clearance** | Official verification that a student has fulfilled all institutional requirements |
| **Signatory** | Administrator authorized to approve/reject clearance in a specific department |
| **Tracking Number** | Unique identifier assigned to each clearance request |
| **Faculty Issue** | Academic concern reported by faculty that may affect clearance eligibility |
| **Department Clearance** | Individual department's portion of the overall clearance process |
| **Remarks** | Comments provided by administrators explaining approval/rejection decisions |
| **Administrator** | Authorized personnel including Librarian, Computer Lab Personnel, TC, etc. |
| **Academic Period** | Semester or term during which clearance is processed |

---

**Document Version:** 1.0
**Last Updated:** September 23, 2026
**Status:** Ready for Implementation
