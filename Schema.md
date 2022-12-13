# Payza DB Schema

## Users

| Key | Description | Type                  |
|-----|-------------|-----------------------|
| PK  | id          | UUID                  |
|     | username    | String                |
|     | email       | String                |
|     | password    | String                |
|     | avatar_url  | String                |
|     | is_active   | Boolean               |
|     | is_verified | Boolean               |
|     | role        | ENUM('USER', 'ADMIN') |
|     | date_joined | Datetime              |
|     | last_login  | Datetime              |
|     | created_at  | Datetime              |
|     | updated_at  | Datetime              |
|     | deleted_at  | Datetime              |

## Category Types

| Key | Description | Type          |
|-----|-------------|---------------|
| PK  | id          | UUID          |
|     | name        | String        |
|     | description | String        |
|     | created_at  | Datetime      |
|     | updated_at  | Datetime      |
|     | deleted_at  | Datetime      |

## Categories

| Key | Description       | Type          |
|-----|-------------------|---------------|
| PK  | id                | UUID          |
|     | name              | String        |
|     | description       | String        |
|     | color             | String        |
|     | created_at        | Datetime      |
|     | updated_at        | Datetime      |
|     | deleted_at        | Datetime      |
| FK  | category_type_id  | UUID          |

## Transactions

| Key | Description | Type                      |
|-----|-------------|---------------------------|
| PK  | id          | UUID                      |
|     | name        | String                    |
|     | description | String                    |
|     | amount      | Decimal                   |
|     | type        | ENUM('EXPENSE', 'INCOME') |
|     | created_at  | Datetime                  |
|     | updated_at  | Datetime                  |
|     | deleted_at  | Datetime                  |
| FK  | user_id     | UUID                      |
| FK  | category_id | UUID                      |