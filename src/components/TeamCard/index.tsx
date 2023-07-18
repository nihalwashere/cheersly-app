import React from "react";

type Props = {
  team: {
    _id: string;
    name: string;
    members: string;
    channel: {
      name: string;
    };
  };
  onClick: any;
};

export default function TeamCard(props: Props) {
  const { team, onClick } = props;

  return (
    <div
      className="p-4 rounded-md bg-white mr-10 cursor-pointer card"
      onClick={onClick}
    >
      <div className="font-semibold">{team.name}</div>

      <div className="text-xs font-semibold mt-1">
        {team?.channel?.name ? `#${team?.channel?.name}` : "Channel not setup"}
      </div>

      <div className="text-xs mt-1">{team?.members?.length} members</div>
    </div>
  );
}
