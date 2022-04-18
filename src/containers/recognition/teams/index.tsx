import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateTeamDialog from "./CreateTeamDialog";
import Button from "../../../components/Button";
import { useMergeState } from "../../../utils/custom-hooks";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";
import TeamCard from "../../../components/TeamCard";
import { setMessage, getAllTeamsSaga, createTeamSaga } from "../state/actions";

export default function Teams() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, message, teams } = useSelector(
    (state: any) => state.recognition
  );

  const [state, setState] = useMergeState({
    shouldShowCreateTeamDialog: false,
  });

  const handleOpenCreateTeamDialog = () => {
    setState({ shouldShowCreateTeamDialog: true });
  };

  const handleCloseCreateTeamDialog = () => {
    setState({ shouldShowCreateTeamDialog: false });
  };

  const handleCreateTeam = (payload: any) => {
    dispatch(createTeamSaga(payload));
    handleCloseCreateTeamDialog();
  };

  const handleTeamSelect = (teamId: string) => {
    navigate(`/recognition/teams/${teamId}`);
  };

  useEffect(() => {
    dispatch(getAllTeamsSaga());
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-semibold">Teams</div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="w-full">
          {message?.type && (
            <Alert
              severity={message.type}
              message={message.value}
              open={Object.keys(message).length ? true : false}
              onClose={() => dispatch(setMessage({}))}
            />
          )}

          <div className="w-full flex justify-end">
            <Button label="Create team" onClick={handleOpenCreateTeamDialog} />
          </div>

          <div className="grid grid-cols-4 gap-4 mt-10">
            {teams.map((team: any) => (
              <TeamCard
                key={team._id}
                team={team}
                onClick={() => handleTeamSelect(team._id)}
              />
            ))}
          </div>

          {state?.shouldShowCreateTeamDialog && (
            <CreateTeamDialog
              open={state?.shouldShowCreateTeamDialog}
              onClose={handleCloseCreateTeamDialog}
              onSave={handleCreateTeam}
            />
          )}
        </div>
      )}
    </div>
  );
}
