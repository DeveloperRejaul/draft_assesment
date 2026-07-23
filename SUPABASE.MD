# Supabase Task Manager Database Setup

This document explains how to create the required Supabase tables for a React Native Task Manager application.

## 1. Create Tables

Open:

```
Supabase Dashboard
→ SQL Editor
→ New Query
```

Run the following SQL scripts.

---

## Create Categories Table

```sql
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);
```

### Insert Category

```sql
insert into public.categories (name)
values ('Work');
```

Example:

```sql
insert into public.categories (name)
values
('Work'),
('Personal'),
('Shopping');
```

---

## Create Tasks Table

```sql
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  category_id uuid references public.categories(id)
    on delete set null,
  status text not null default 'open'
    check (status in ('open', 'done')),
  starred boolean default false,
  due_date timestamptz,
  created_at timestamptz default now()
);
```

---

# Task CRUD Operations

## Add Task

```sql
insert into public.tasks (
  title,
  description,
  category_id,
  status,
  starred,
  due_date
)
values (
  'Complete React Native App',
  'Build task manager using Supabase',
  'CATEGORY_UUID',
  'open',
  false,
  '2026-07-25T10:00:00Z'
);
```

---

## Get All Tasks

```sql
select *
from public.tasks
order by created_at desc;
```

---

## Get Tasks By Category

```sql
select *
from public.tasks
where category_id = 'CATEGORY_UUID';
```

---

## Update Task

```sql
update public.tasks
set
  title = 'Updated Task Title',
  status = 'done'
where id = 'TASK_UUID';
```

---

## Toggle Task Status

```sql
update public.tasks
set status =
case
  when status = 'open' then 'done'
  else 'open'
end
where id = 'TASK_UUID';
```

---

## Toggle Starred Status

```sql
update public.tasks
set starred = not starred
where id = 'TASK_UUID';
```

---

## Delete Task

```sql
delete from public.tasks
where id = 'TASK_UUID';
```

---

# Category CRUD Operations

## Get Categories

```sql
select *
from public.categories
order by created_at desc;
```

---

## Update Category

```sql
update public.categories
set name = 'Updated Category'
where id = 'CATEGORY_UUID';
```

---

## Delete Category

```sql
delete from public.categories
where id = 'CATEGORY_UUID';
```

---

# Delete All Data (Development Only)

⚠️ Use only during development/testing.

```sql
delete from public.tasks;

delete from public.categories;
```

---

# Recommended Indexes

For better query performance:

```sql
create index idx_tasks_category_id
on public.tasks(category_id);

create index idx_tasks_status
on public.tasks(status);

create index idx_tasks_created_at
on public.tasks(created_at);
```

---

# React Native Mapping

Task Type:

```ts
type TaskItem = {
  id: string;
  title: string;
  description: string;
  category_id: string;
  status: 'open' | 'done';
  starred: boolean;
  due_date: string;
  created_at: string;
};
```

Category Type:

```ts
type CategoryItem = {
  id: string;
  name: string;
  created_at: string;
};
```

Database flow:

```
React Native App
        |
        |
Supabase Client
        |
        |
PostgreSQL Tables
        |
        |
tasks + categories
```
