# E-Commerce App for Automation Testing 🛍️🧪

Chào mừng bạn đến với dự án Website Thương mại Điện tử được xây dựng riêng cho việc thực hành và học **Automation Testing** (Kiểm thử tự động).

Dự án này bao gồm đầy đủ **Frontend (ReactJS)**, **Backend (Node.js & Express)** và tích hợp **MongoDB**. Để phục vụ tối ưu cho việc viết kịch bản test (Playwright, Cypress, Selenium, WebdriverIO), toàn bộ các trường nhập liệu, nút bấm và danh sách phần tử trong hệ thống đã được gắn thẻ `data-testid` định danh duy nhất.

---

## 🚀 Hướng dẫn khởi chạy dự án

### 1. Cấu hình Cơ sở dữ liệu (MongoDB)
Đi tới file cấu hình biến môi trường của backend tại:
`backend/.env`

Cập nhật chuỗi kết nối MongoDB của bạn vào biến `MONGODB_URI`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=supersecretkeyfortesting123
```
*(Nếu chưa có sẵn MongoDB chạy local, bạn có thể tạo tài khoản miễn phí trên [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) để lấy Connection String).*

### 2. Cài đặt các gói phụ thuộc (Dependencies)
Mở terminal trong thư mục gốc của dự án (`C:\Users\PC\.gemini\antigravity\scratch\ecommerce-automation-test`) và chạy lệnh cài đặt tự động cho cả root, backend và frontend:
```bash
npm run install:all
```

### 3. Chạy ứng dụng ở chế độ Development
Để chạy đồng thời cả Backend và Frontend, bạn chỉ cần thực hiện một lệnh duy nhất:
```bash
npm run dev
```

- **Frontend**: Khởi chạy tại địa chỉ [http://localhost:5173](http://localhost:5173) (tự động chuyển hướng API requests sang port 5000).
- **Backend API**: Khởi chạy tại địa chỉ [http://localhost:5000](http://localhost:5000). Khi khởi động lần đầu, hệ thống sẽ tự động gieo dữ liệu mẫu (seed 5 sản phẩm) vào database nếu database trống.

---

## 🔍 Danh sách các Selector hỗ trợ Automation (`data-testid`)

Khi viết kịch bản test tự động, bạn có thể định vị các phần tử giao diện bằng cách sử dụng CSS Selector dạng `[data-testid="value"]`. Dưới đây là danh sách chi tiết:

### 1. Thanh điều hướng (Navigation Bar)
- `[data-testid="nav-container"]`: Toàn bộ thanh Navbar.
- `[data-testid="nav-brand"]`: Logo thương hiệu "ShopGlow".
- `[data-testid="nav-home-btn"]`: Nút chuyển sang danh mục sản phẩm (Trang chủ).
- `[data-testid="nav-login-btn"]`: Nút chuyển sang trang Đăng nhập (nếu chưa login).
- `[data-testid="nav-register-btn"]`: Nút chuyển sang trang Đăng ký (nếu chưa login).
- `[data-testid="nav-admin-btn"]`: Nút chuyển sang trang Admin Dashboard (chỉ hiển thị với Admin).
- `[data-testid="nav-cart-btn"]`: Nút chuyển sang trang Giỏ hàng.
- `[data-testid="nav-cart-count"]`: Thẻ hiển thị số lượng vật phẩm trong giỏ hàng (chỉ hiển thị khi giỏ hàng có đồ).
- `[data-testid="nav-user-role"]`: Thẻ hiển thị Vai trò và Tên người dùng đã đăng nhập (Ví dụ: `User: Nguyen Van A`).
- `[data-testid="nav-logout-btn"]`: Nút đăng xuất.

### 2. Trang Đăng nhập (Login Page)
- `[data-testid="login-page"]`: Container của trang đăng nhập.
- `[data-testid="login-form"]`: Thẻ `<form>` đăng nhập.
- `[data-testid="login-email"]`: Ô nhập email.
- `[data-testid="login-password"]`: Ô nhập mật khẩu.
- `[data-testid="login-submit"]`: Nút "Đăng nhập".
- `[data-testid="register-link"]`: Link chuyển sang trang đăng ký.

### 3. Trang Đăng ký (Register Page)
- `[data-testid="register-page"]`: Container của trang đăng ký.
- `[data-testid="register-form"]`: Thẻ `<form>` đăng ký.
- `[data-testid="register-name"]`: Ô nhập họ và tên.
- `[data-testid="register-email"]`: Ô nhập email.
- `[data-testid="register-password"]`: Ô nhập mật khẩu.
- [data-testid="register-role"]: (Đã gỡ bỏ khỏi UI vì lý do bảo mật. Tài khoản đăng ký mặc định là user. Để tạo Admin, xem hướng dẫn bên dưới).
- `[data-testid="register-submit"]`: Nút "Đăng ký".
- `[data-testid="login-link"]`: Link chuyển sang trang đăng nhập.

### 4. Trang danh sách sản phẩm (Home Page)
- `[data-testid="home-page"]`: Container trang chủ.
- `[data-testid="search-input"]`: Ô tìm kiếm sản phẩm bằng text.
- `[data-testid="category-filter"]`: Dropdown lọc sản phẩm theo danh mục.
- `[data-testid="products-grid"]`: Vùng hiển thị lưới sản phẩm.
- `[data-testid="product-card-{id}"]`: Thẻ của một sản phẩm cụ thể (Ví dụ: `[data-testid="product-card-60d21b4667d0d8992e610c85"]`).
- `[data-testid="add-to-cart-{id}"]`: Nút thêm vào giỏ hàng của sản phẩm cụ thể.

### 5. Trang Giỏ hàng (Cart Page)
- `[data-testid="cart-page"]`: Container trang giỏ hàng.
- `[data-testid="empty-cart-view"]`: Giao diện giỏ hàng trống.
- `[data-testid="cart-items-list"]`: Danh sách các item trong giỏ.
- `[data-testid="cart-item-{id}"]`: Hộp hiển thị sản phẩm cụ thể trong giỏ.
- `[data-testid="cart-quantity-val-{id}"]`: Số lượng của sản phẩm này trong giỏ.
- `[data-testid="cart-quantity-inc-{id}"]`: Nút tăng số lượng (+1).
- `[data-testid="cart-quantity-dec-{id}"]`: Nút giảm số lượng (-1).
- `[data-testid="cart-remove-{id}"]`: Nút xóa sản phẩm này khỏi giỏ.
- `[data-testid="cart-clear-btn"]`: Nút xóa toàn bộ giỏ hàng.
- `[data-testid="cart-subtotal"]`: Giá tạm tính trước thuế/vận chuyển.
- `[data-testid="cart-total"]`: Tổng số tiền cần thanh toán.
- `[data-testid="cart-checkout-btn"]`: Nút bấm "Thanh toán ngay".

### 6. Trang Quản trị viên (Admin Dashboard Page)
- `[data-testid="admin-page"]`: Container trang admin.
- `[data-testid="admin-create-btn"]`: Nút để mở form thêm sản phẩm mới.
- `[data-testid="admin-table"]`: Bảng danh sách các sản phẩm đang có.
- `[data-testid="admin-product-row-{id}"]`: Dòng thông tin của sản phẩm cụ thể.
- `[data-testid="admin-edit-btn-{id}"]`: Nút mở form sửa thông tin sản phẩm cụ thể.
- `[data-testid="admin-delete-btn-{id}"]`: Nút xóa sản phẩm cụ thể.

#### Form Modal Thêm/Sửa sản phẩm:
- `[data-testid="product-form-modal-overlay"]`: Backdrop/Overlay của Modal.
- `[data-testid="product-form"]`: Thẻ form quản lý sản phẩm.
- `[data-testid="product-form-name"]`: Ô nhập tên sản phẩm.
- `[data-testid="product-form-price"]`: Ô nhập giá sản phẩm.
- `[data-testid="product-form-category"]`: Dropdown chọn danh mục sản phẩm.
- `[data-testid="product-form-image"]`: Ô nhập đường dẫn ảnh.
- `[data-testid="product-form-description"]`: Ô nhập mô tả sản phẩm.
- `[data-testid="product-form-cancel"]`: Nút hủy bỏ và đóng modal.
- `[data-testid="product-form-submit"]`: Nút lưu sản phẩm (Thêm/Sửa).

### 7. Hệ thống thông báo (Toast Notifications)
- `[data-testid="toast-container"]`: Vùng chứa các thông báo pop-up ở góc màn hình.
- `[data-testid="toast-success"]`: Thông báo thành công (Ví dụ: Đăng nhập thành công, Đã thêm vào giỏ).
- `[data-testid="toast-error"]`: Thông báo lỗi (Ví dụ: Lỗi mật khẩu, Sản phẩm không tồn tại).

---

## 🛠️ Một số kịch bản test mẫu nên viết (Automation Test Scenarios)

Dưới đây là một số gợi ý kịch bản bạn có thể thực hiện lập trình kiểm thử tự động để rèn luyện kỹ năng:

### Kịch bản 1: Đăng ký & Đăng nhập (Authentication)
1. Truy cập `http://localhost:5173`.
2. Click nút đăng ký (`[data-testid="nav-register-btn"]`).
3. Điền thông tin đăng ký (mọi tài khoản tạo mới sẽ mặc định nhận vai trò "user"), nhấn gửi.
4. Xác nhận hệ thống hiển thị thông báo thành công (`[data-testid="toast-success"]`).
5. Đăng xuất (`[data-testid="nav-logout-btn"]`).
6. Đăng nhập lại với email và password vừa tạo.
7. Xác thực trên Navbar hiển thị đúng tên người dùng tại `[data-testid="nav-user-role"]`.

### Kịch bản 2: Quy trình mua hàng & Quản lý giỏ hàng (Shopping Cart Flow)
1. Đăng nhập vào tài khoản khách hàng (`user`).
2. Tại trang chủ, chọn sản phẩm đầu tiên và click "Thêm vào giỏ" (`[data-testid^="add-to-cart-"]`).
3. Xác nhận số lượng badge tăng lên `1` trên Navbar (`[data-testid="nav-cart-count"]`).
4. Đi tới trang Giỏ hàng (`[data-testid="nav-cart-btn"]`).
5. Click nút tăng số lượng (`[data-testid^="cart-quantity-inc-"]`) 2 lần để tăng số lượng lên `3`.
6. Xác thực giá tiền tổng cộng hiển thị đúng (`[data-testid="cart-total"]` = 3 x Đơn giá).
7. Click nút "Thanh toán ngay" (`[data-testid="cart-checkout-btn"]`).
8. Đợi và xác nhận thông báo thanh toán thành công xuất hiện, giỏ hàng tự động reset về trống.

### Kịch bản 3: Phân quyền & CRUD sản phẩm phía Admin (Admin CRUD & Security)
1. Đăng ký một tài khoản bất kỳ qua giao diện. Truy cập vào cơ sở dữ liệu MongoDB (Compass/Atlas) của bạn, tìm bản ghi user đó và cập nhật trường `role: "admin"`. Đăng nhập bằng tài khoản này.
2. Xác nhận nút "Admin" (`[data-testid="nav-admin-btn"]`) có xuất hiện trên Navbar.
3. Click "Admin" để mở Dashboard.
4. Click nút "Thêm sản phẩm" (`[data-testid="admin-create-btn"]`).
5. Điền thông tin sản phẩm mới (tên, giá, mô tả), nhấn Lưu.
6. Xác nhận sản phẩm mới xuất hiện trên bảng danh sách (`[data-testid="admin-table"]`).
7. Đăng xuất, đăng nhập lại bằng tài khoản `user` thường.
8. Xác nhận nút "Admin" biến mất khỏi Navbar.
9. Đăng xuất, thử truy cập trực tiếp bằng script kiểm thử vào tab admin hoặc thực thi API CRUD sản phẩm từ client và xác thực hệ thống chặn với thông báo lỗi (`[data-testid="unauthorized-view"]`).

---

## 💻 Code ví dụ: Viết Test Script bằng Playwright
Nếu bạn sử dụng **Playwright** (Khuyên dùng vì rất nhanh, hiện đại và hỗ trợ tốt JS/TS), đây là code mẫu để test luồng Đăng nhập và thêm sản phẩm vào giỏ hàng:

```javascript
import { test, expect } from '@playwright/test';

test.describe('E-Commerce Automation Flow', () => {
  test('should login and add a product to the cart', async ({ page }) => {
    // 1. Đi thẳng tới trang Đăng nhập bằng URL
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();

    // 3. Điền form đăng nhập (điền tài khoản admin/user bạn đã đăng ký trước đó)
    await page.fill('[data-testid="login-email"]', 'testuser@example.com');
    await page.fill('[data-testid="login-password"]', 'password123');
    await page.click('[data-testid="login-submit"]');

    // 4. Kiểm tra xem đã đăng nhập thành công chưa
    await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-user-role"]')).toContainText('testuser@example.com');

    // 5. Thêm sản phẩm đầu tiên vào giỏ
    // Lấy ID sản phẩm đầu tiên hoặc click vào nút thêm đầu tiên
    const addToCartButton = page.locator('[data-testid^="add-to-cart-"]').first();
    await addToCartButton.click();

    // 6. Xác nhận thông báo thành công
    await expect(page.locator('[data-testid="toast-success"]')).toContainText('vào giỏ hàng');

    // 7. Vào giỏ hàng kiểm tra
    await page.click('[data-testid="nav-cart-btn"]');
    await expect(page.locator('[data-testid="cart-page"]')).toBeVisible();
    
    // Kiểm tra số lượng là 1
    const qtyText = await page.locator('[data-testid^="cart-quantity-val-"]').first().innerText();
    expect(qtyText).toBe('1');
  });
});
```

Chúc bạn học tập và thực hành Automation Test hiệu quả! Nếu có bất kỳ câu hỏi nào về thiết lập hoặc viết code test, hãy liên hệ trong chat box nhé! 🚀
