# 1️⃣ CREATE – RResource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant FE as Frontend (resources.js)
    participant BE as Backend (resources.routes.js)
    participant DB as PostgreSQL

    FE->>BE: POST /api/resources\n{resourceName, resourceDescription, resourceAvailable, resourcePrice, resourcePriceUnit}
    alt Validation fails
        BE-->>FE: 400 Bad Request\n{ok:false, errors:[...]}
    else Validation passes
        BE->>DB: INSERT INTO resources (...) VALUES (...)
        DB-->>BE: inserted row
        BE->>DB: INSERT INTO booking_log (..., message="Resource created (ID ...)")
        DB-->>BE: log inserted
        BE-->>FE: 201 Created\n{ok:true, data: insertedRow}
    end
```

# 2️⃣ READ — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant FE as Frontend (resources.js)
    participant BE as Backend (resources.routes.js)
    participant DB as PostgreSQL

    FE->>BE: GET /api/resources
    alt Resources exist
        BE->>DB: SELECT * FROM resources ORDER BY created_at DESC
        DB-->>BE: resource rows[]
        BE-->>FE: 200 OK\n{ok:true, data: resource rows[]}
    else No resources
        BE-->>FE: 200 OK\n{ok:true, data: []}
    end
```

# 3️⃣ UPDATE — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant FE as Frontend (resources.js)
    participant BE as Backend (resources.routes.js)
    participant DB as PostgreSQL

    FE->>BE: PUT /api/resources/:id\n{resourceName, resourceDescription, resourceAvailable, resourcePrice, resourcePriceUnit}
    alt Validation fails
        BE-->>FE: 400 Bad Request\n{ok:false, errors:[...]}
    else Validation passes
        BE->>DB: UPDATE resources SET ... WHERE id = ...
        alt Resource not found
            DB-->>BE: 0 rows
            BE-->>FE: 404 Not Found\n{ok:false, error:"Resource not found"}
        else Resource updated
            DB-->>BE: updated resource row
            BE->>DB: INSERT INTO booking_log (..., message="Resource updated (ID ...)")
            DB-->>BE: log inserted
            BE-->>FE: 200 OK\n{ok:true, data: updated resource row}
        end
    end
```

# 4️⃣ DELETE — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant FE as Frontend (resources.js)
    participant BE as Backend (resources.routes.js)
    participant DB as PostgreSQL

    FE->>BE: DELETE /api/resources/:id
    BE->>DB: DELETE FROM resources WHERE id = ...
    alt Resource not found
        DB-->>BE: 0 rows
        BE-->>FE: 404 Not Found\n{ok:false, error:"Resource not found"}
    else Resource deleted
        DB-->>BE: rowCount > 0
        BE->>DB: INSERT INTO booking_log (..., message="Resource deleted (ID ...)")
        DB-->>BE: log inserted
        BE-->>FE: 204 No Content
    end
```
