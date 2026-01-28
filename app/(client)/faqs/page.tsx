import Container from "@/components/Container";
import FAQClient from "./FAQClient";

export const metadata = {
  title: "FAQs | SmartVibe",
};

const FAQsPage = () => {
  return (
    <Container className="py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Câu hỏi thường gặp</h1>
      <FAQClient />
    </Container>
  );
};

export default FAQsPage;
