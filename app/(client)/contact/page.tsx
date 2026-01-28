import Container from "@/components/Container";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact | SmartVibe",
};

const ContactPage = () => {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-4">Liên hệ với chúng tôi</h1>

      <p className="text-gray-600 mb-8">
        Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ SmartVibe nhé!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thông tin liên hệ */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Phone className="text-shop_orange" />
            <p className="text-sm">
              <span className="font-semibold">Hotline:</span> 1900 1234
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-shop_orange" />
            <p className="text-sm">
              <span className="font-semibold">Email:</span>{" "}
              support@smartvibe.vn
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-shop_orange" />
            <p className="text-sm">
              <span className="font-semibold">Địa chỉ:</span> 123 Nguyễn Văn A,
              Quận 1, TP.HCM
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex gap-3 pt-4">
            <a
              href="https://zalo.me/0909123456"
              target="_blank"
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:opacity-90"
            >
              Chat Zalo
            </a>

            <a
              href="https://wa.me/84909123456"
              target="_blank"
              className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:opacity-90"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Form liên hệ */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full border rounded-md px-4 py-2 outline-none focus:border-shop_orange"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-4 py-2 outline-none focus:border-shop_orange"
          />

          <textarea
            placeholder="Nội dung"
            rows={5}
            className="w-full border rounded-md px-4 py-2 outline-none focus:border-shop_orange"
          />

          <button
            type="submit"
            className="px-6 py-2 bg-shop_orange text-white rounded-md hover:opacity-90"
          >
            Gửi liên hệ
          </button>
        </form>
      </div>
    </Container>
  );
};

export default ContactPage;
