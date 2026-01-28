import Container from "@/components/Container";

const HelpPage = () => {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-4">Trung tâm trợ giúp</h1>

      <p className="text-gray-600 mb-6">
        Chúng tôi luôn sẵn sàng hỗ trợ bạn.
      </p>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg">📦 Đơn hàng</h2>
          <p className="text-sm text-gray-500">
            Kiểm tra trạng thái đơn hàng, thanh toán, hoàn tiền.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg">🚚 Giao hàng</h2>
          <p className="text-sm text-gray-500">
            Thời gian giao hàng, phí vận chuyển.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg">📞 Liên hệ</h2>
          <p className="text-sm text-gray-500">
            Email: support@smartvibe.vn <br />
            Hotline: 1900 1234
          </p>
        </div>
      </div>
    </Container>
  );
};

export default HelpPage;
