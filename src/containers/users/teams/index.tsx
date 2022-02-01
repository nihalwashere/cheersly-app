import React from "react";
import CreateTeamDialog from "./CreateTeamDialog";
import CustomButton from "../../../components/CustomButton";
import { useMergeState } from "../../../utils/custom-hooks";

export default function Teams() {
  const [state, setState] = useMergeState({
    shouldShowCreateTeamDialog: false,
  });

  const handleOpenCreateTeamDialog = () => {
    setState({ shouldShowCreateTeamDialog: true });
  };

  const handleCloseCreateTeamDialog = () => {
    setState({ shouldShowCreateTeamDialog: false });
  };

  const handleSave = (payload: any) => {
    console.log("payload : ", payload);
  };

  return (
    <div>
      <div>Teams</div>

      <div>
        <CustomButton
          label="Create team"
          onClick={handleOpenCreateTeamDialog}
        />
      </div>

      {state?.shouldShowCreateTeamDialog && (
        <CreateTeamDialog
          open={state?.shouldShowCreateTeamDialog}
          onClose={handleCloseCreateTeamDialog}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
