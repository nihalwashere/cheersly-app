import React from "react";

type Props = {
  team: {
    _id: string;
    name: string;
  };
  onClick: any;
};

export default function TeamCard(props: Props) {
  const { team, onClick } = props;

  return (
    <div
      className="w-1/4 h-24 p-4 rounded-md bg-white mr-10 cursor-pointer team-card"
      onClick={onClick}
    >
      <div className="font-semibold">{team.name}</div>
    </div>
  );
}
