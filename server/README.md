# Backend Documentation

## API Endpoints
```
Organizations
--------------------
GET  - /organizations
GET  - /organizations/:id
POST - /organizations

Applicants
--------------------
GET  - /organizations/:id/applicants
POST - /organizations/:id/applicants

Organization Representatives
--------------------
GET  - /organizations/:id/representatives
POST - /organizations/:id/representatives

Appeals
--------------------
GET   - /organizations/:id/appeals
POST  - /organizations/:id/appeals
GET   - /appeals
GET   - /appeals/:id
PATCH - /appeals/:id/end

Contributions
--------------------
GET  - /appeals/:id/goods
POST - /appeals/:id/goods
GET  - /appeals/:id/cash-donations
POST - /appeals/:id/cash-donations
GET  - /appeals/:id/contributions

Disbursements
--------------------
GET  - /appeals/:id/disbursements
POST - /appeals/:id/disbursements
GET  - /applicants/:id/disbursements
```