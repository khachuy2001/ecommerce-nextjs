import Container from "@/components/Container";

export const metadata = {
  title: "Terms & Conditions | SmartVibe",
};

const TermsPage = () => {
  return (
    <Container className="py-10 space-y-6">
      <h1 className="text-3xl font-bold">Điều khoản & Điều kiện</h1>

      <p className="text-gray-600">
        Chào mừng bạn đến với <strong>SmartVibe</strong>. Khi truy cập và sử dụng
        website này, bạn đồng ý với các điều khoản dưới đây.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1. Phạm vi áp dụng</h2>
        <p className="text-gray-600">
          Điều khoản này áp dụng cho tất cả người dùng truy cập, mua sắm và sử
          dụng các dịch vụ trên website SmartVibe.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2. Tài khoản người dùng</h2>
        <p className="text-gray-600">
          Người dùng có trách nhiệm bảo mật thông tin tài khoản và mật khẩu của
          mình. SmartVibe không chịu trách nhiệm cho các rủi ro phát sinh do
          người dùng để lộ thông tin.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">3. Đặt hàng & Thanh toán</h2>
        <p className="text-gray-600">
          Đơn hàng chỉ được xác nhận khi hệ thống ghi nhận thanh toán thành công
          hoặc được SmartVibe xác nhận thủ công.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">4. Giao hàng & Đổi trả</h2>
        <p className="text-gray-600">
          SmartVibe hỗ trợ đổi trả trong vòng <strong>30 ngày</strong> kể từ ngày
          nhận hàng, với điều kiện sản phẩm còn nguyên vẹn và đầy đủ phụ kiện.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">5. Quyền sở hữu trí tuệ</h2>
        <p className="text-gray-600">
          Toàn bộ nội dung, hình ảnh và thiết kế trên website thuộc quyền sở hữu
          của SmartVibe và không được sao chép khi chưa có sự cho phép.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">6. Thay đổi điều khoản</h2>
        <p className="text-gray-600">
          SmartVibe có quyền thay đổi nội dung điều khoản bất cứ lúc nào. Những
          thay đổi sẽ được cập nhật trực tiếp trên website.
        </p>
      </section>

      <p className="text-sm text-gray-500 pt-4">
        Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
      </p>
    </Container>
  );
};

export default TermsPage;
