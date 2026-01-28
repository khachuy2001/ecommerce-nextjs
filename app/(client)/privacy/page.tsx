import Container from "@/components/Container";

export const metadata = {
  title: "Privacy Policy | SmartVibe",
};

const PrivacyPage = () => {
  return (
    <Container className="py-10 space-y-6">
      <h1 className="text-3xl font-bold">Chính sách bảo mật</h1>

      <p className="text-gray-600">
        SmartVibe cam kết bảo vệ thông tin cá nhân của khách hàng và tuân thủ
        các quy định pháp luật liên quan đến bảo mật dữ liệu.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          1. Thông tin chúng tôi thu thập
        </h2>
        <p className="text-gray-600">
          Khi bạn sử dụng website, chúng tôi có thể thu thập các thông tin sau:
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Họ tên, email, số điện thoại</li>
          <li>Địa chỉ giao hàng</li>
          <li>Lịch sử mua hàng và thanh toán</li>
          <li>Thông tin đăng nhập (thông qua Clerk)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          2. Mục đích sử dụng thông tin
        </h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Xử lý đơn hàng và giao hàng</li>
          <li>Hỗ trợ khách hàng</li>
          <li>Cải thiện trải nghiệm người dùng</li>
          <li>Gửi thông báo liên quan đến đơn hàng</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          3. Bảo mật thông tin
        </h2>
        <p className="text-gray-600">
          SmartVibe áp dụng các biện pháp kỹ thuật và quản lý phù hợp để bảo vệ
          dữ liệu cá nhân khỏi truy cập trái phép, mất mát hoặc rò rỉ.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          4. Chia sẻ thông tin
        </h2>
        <p className="text-gray-600">
          Chúng tôi <strong>không bán</strong> hoặc trao đổi thông tin cá nhân
          của khách hàng cho bên thứ ba, trừ các trường hợp:
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Đơn vị vận chuyển</li>
          <li>Cổng thanh toán (Stripe)</li>
          <li>Yêu cầu từ cơ quan pháp luật</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          5. Quyền của người dùng
        </h2>
        <p className="text-gray-600">
          Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xoá thông tin cá nhân của
          mình bằng cách liên hệ với SmartVibe.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          6. Thay đổi chính sách
        </h2>
        <p className="text-gray-600">
          Chính sách bảo mật có thể được cập nhật theo thời gian. Mọi thay đổi
          sẽ được công bố trên website.
        </p>
      </section>

      <p className="text-sm text-gray-500 pt-4">
        Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
      </p>
    </Container>
  );
};

export default PrivacyPage;
