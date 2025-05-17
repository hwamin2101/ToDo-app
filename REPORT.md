
# 📘 Body, Params, Query trong API

## 1. Giới thiệu
API (Application Programming Interface) là giao diện cho phép các ứng dụng giao tiếp với nhau. Trong quá trình gửi và nhận dữ liệu qua API, ba thành phần chính thường được sử dụng là **body**, **params**, và **query**. Mỗi thành phần có vai trò riêng và được sử dụng trong các trường hợp khác nhau.

---

## 2. Body trong API

### 2.1. Định nghĩa
**Body** (thân yêu cầu) là phần dữ liệu được gửi kèm trong yêu cầu HTTP, thường dùng với các phương thức như `POST`, `PUT`, hoặc `PATCH`. Dữ liệu trong body thường ở định dạng JSON, XML, hoặc các định dạng khác.

### 2.2. Đặc điểm
- **Vị trí:** Nằm trong phần thân của yêu cầu HTTP.
- **Phương thức sử dụng:** `POST`, `PUT`, `PATCH`.
- **Kích thước:** Có thể chứa dữ liệu lớn.
- **Bảo mật:** Không hiển thị trên URL → an toàn hơn so với query.

### 2.3. Ví dụ

```http
POST /api/users
Content-Type: application/json

{
  "name": "Nguyen Van A",
  "email": "nva@example.com",
  "age": 25
}
````

> Body chứa thông tin người dùng cần tạo mới.

---

## 3. Params trong API

### 3.1. Định nghĩa

**Params** (hoặc path parameters) là các tham số được nhúng trực tiếp vào đường dẫn URL của API, thường dùng để xác định một tài nguyên cụ thể.

### 3.2. Đặc điểm

* **Vị trí:** Trong đường dẫn URL.
* **Phương thức sử dụng:** `GET`, `DELETE`, `PUT`.
* **Cú pháp:** Dùng `:` để định nghĩa (khi thiết kế API).
* **Mục đích:** Xác định tài nguyên cụ thể (thường là ID).

### 3.3. Ví dụ

```http
GET /api/users/123
```

> `123` là path parameter đại diện cho ID người dùng.

---

## 4. Query trong API

### 4.1. Định nghĩa

**Query parameters** là các tham số được thêm vào cuối URL sau dấu `?`, thường dùng để **lọc**, **sắp xếp**, hoặc **tìm kiếm** dữ liệu.

### 4.2. Đặc điểm

* **Vị trí:** Cuối URL, sau `?`, dạng `key=value`.
* **Phương thức sử dụng:** `GET`.
* **Mục đích:** Tùy chỉnh truy vấn.
* **Bảo mật:** Thấp (hiển thị rõ trên URL).

### 4.3. Ví dụ

```http
GET /api/users?age=25&city=Hanoi
```

> `age=25` và `city=Hanoi` là query parameters dùng để lọc.

---

## 5. So sánh Body, Params, Query

| Tiêu chí        | Body                 | Params                     | Query                         |
| --------------- | -------------------- | -------------------------- | ----------------------------- |
| **Vị trí**      | Trong thân HTTP      | Trong đường dẫn URL        | Sau dấu `?` trong URL         |
| **Phương thức** | POST, PUT, PATCH     | GET, DELETE, PUT           | GET                           |
| **Mục đích**    | Gửi dữ liệu phức tạp | Xác định tài nguyên cụ thể | Lọc, tìm kiếm, sắp xếp        |
| **Bảo mật**     | Cao                  | Trung bình                 | Thấp                          |
| **Kích thước**  | Lớn                  | Nhỏ                        | Nhỏ (giới hạn bởi độ dài URL) |

---

## 6. Ứng dụng thực tế

* **Body:** Gửi dữ liệu phức tạp như thông tin đăng ký người dùng, bài viết, sản phẩm,...
* **Params:** Truy xuất chi tiết tài nguyên cụ thể (ví dụ: `/product/123`).
* **Query:** Lọc dữ liệu theo điều kiện (ví dụ: `/products?category=tech&price<1000`).


