/**
 * Script tạo hiệu ứng tilt + shine cho các phần tử có class "tilt-card".
 * - Khi di chuột trong card: nghiêng card theo hướng chuột, đồng thời di chuyển vùng sáng.
 * - Khi chuột rời: trả card về trạng thái phẳng ban đầu.
 */

// Đợi toàn bộ DOM tải xong để chắc chắn các phần tử đã có mặt
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các thẻ có class "tilt-card"
  const tiltCards = document.querySelectorAll(".tilt-card");

  // Lặp qua từng card để gắn sự kiện
  tiltCards.forEach(function (card) {
    // Sự kiện di chuyển chuột bên trong card
    card.addEventListener("mousemove", function (e) {
      // Lấy kích thước và vị trí của card so với viewport
      const rect = card.getBoundingClientRect();

      // Tính tỉ lệ vị trí con trỏ chuột trên trục X và Y (từ 0 đến 1)
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Tính góc xoay:
      // rotateY: xoay theo trục Y (nghiêng trái/phải), tối đa ±15 độ
      const rotateY = (x - 0.5) * 30; // Khi x=0 -> -15deg, x=1 -> 15deg
      // rotateX: xoay theo trục X (nghiêng lên/xuống), đảo ngược để cảm giác tự nhiên
      const rotateX = (0.5 - y) * 30; // Khi y=0 -> 15deg (ngẩng lên), y=1 -> -15deg (cúi xuống)

      // Gán thuộc tính transform 3D (dùng template string)
      card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
            `;

      // Cập nhật vị trí tâm của lớp shine (biến CSS custom properties)
      card.style.setProperty("--mouse-x", x * 100 + "%");
      card.style.setProperty("--mouse-y", y * 100 + "%");
    });

    // Sự kiện khi chuột rời khỏi card
    card.addEventListener("mouseleave", function () {
      // Reset transform về 0 (không xoay, không dịch)
      card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateZ(0px)
            `;
      // Không cần reset --mouse-x/y vì shine đã có opacity: 0 khi không hover
    });
  });
});
