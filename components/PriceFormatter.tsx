import { cn } from "@/lib/utils";

interface Props {
  amount: number | string | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  if (amount === undefined) return null;


  const numericAmount = Number(amount);


  const normalizedAmount = Math.floor(numericAmount / 10000) * 10000;

  const formattedPrice = normalizedAmount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  return (
    <span className={cn("text-sm font-semibold text-darkColor", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
