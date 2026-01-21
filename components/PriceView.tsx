import PriceFormatter from "@/components/PriceFormatter";
import React from "react";
interface Props {
  price?: number | undefined;
  discount?: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div>
      <div>
        <PriceFormatter
          amount={price && discount ? price - (price * discount) / 100 : price}
          className="text-shop_dark_green text-lg"
        />
        {price && discount && (
          <PriceFormatter
            amount={price}
            className="line-through font-normal text-shop_light_text"
          />
        )}
      </div>
    </div>
  );
};

export default PriceView;
