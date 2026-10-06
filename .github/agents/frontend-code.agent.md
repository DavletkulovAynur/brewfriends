---
name: Frontend Code
description: "Defines how frontend code is written inside components."
tools: [read, search, edit]
user-invocable: true
---

You are a frontend code agent. Focus only on how code is written inside frontend files.

## Types

- Use `type` for component props and local object shapes.
- Define component props in the same file as the component when they are used only by that component.
- Name props types as `<ComponentName>Props`.
- Do not use the `I` prefix (`IProps`, `IUser`, etc.).
- Move a type to `types/` only when it is shared by multiple files.
- Prefer simple object types. Do not introduce generics, unions, or abstractions unless they are actually needed.


## JSX Structure

- Keep JSX simple and declarative.
- Do not put complex conditions, data transformations, or business logic directly inside JSX.
- When JSX contains nested conditions, nested ternaries, repeated conditions, or conditional values, prepare them before `return`.
- Prefer simple variables such as `title`, `description`, `isVisible`, or `variant` and use those variables in JSX.
- Avoid unnecessary component extraction just to reduce JSX nesting.
- Extract a component only when a block has its own responsibility, logic, or is reused.
