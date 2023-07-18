import React from "react";

type Props = {
  brandName: string;
  brandImageUrl: string;
  onClick: any;
};

export default function GiftCard(props: Props) {
  const { brandName, brandImageUrl, onClick } = props;

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <img src={brandImageUrl} alt={brandName} />
      <span className="mt-1">{brandName}</span>
    </div>
  );
}
