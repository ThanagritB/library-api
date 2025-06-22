# 📘 DEV_GUIDE.md  
> คู่มือโปรเจกต์ `library-api` สำหรับ Backend Developer (NestJS)

---

## 🧱 PROJECT STRUCTURE
src/
├── auth/                     # JWT Auth + Guards
├── books/                    # หนังสือ
│   ├── books.controller.ts
│   ├── books.service.ts
│   ├── entities/book.entity.ts
│   ├── repositories/books.repository.ts
├── common/                   # DTO, BaseRepository, Utils
│   ├── dto/
│   │   └── pagination-query.dto.ts
│   │   └── pagination-response.dto.ts
│   ├── repositories/base.repository.ts
├── upload/                   # Upload ปกหนังสือ
│   └── upload.controller.ts
main.ts                       # App entrypoint

---

## 🔐 AUTHENTICATION

- ใช้ JWT
- ใช้ `@UseGuards(JwtAuthGuard)` ครอบ endpoint
- บันทึกผู้ใช้งาน (created_by, updated_by) ผ่าน `AsyncLocalStorage`

---

## 📚 BOOK MODULE

### ✅ Pagination + Filtering + Sorting

- ใช้ DTO: `PaginationQueryDto`
```ts
page, limit, search, sort, order, category