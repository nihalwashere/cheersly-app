import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import CompanyValuesDialog from "./CompanyValuesDialog";
import { useMergeState } from "../../../utils/custom-hooks";
import {
  setMessage,
  getCompanyValuesSaga,
  createCompanyValuesSaga,
  updateCompanyValuesSaga,
  deleteCompanyValuesSaga,
} from "../state/actions";

export default function RecognitionCompanyValues() {
  const dispatch = useDispatch();

  const { isLoading, message, companyValues } = useSelector(
    (state: any) => state.recognition
  );

  const [state, setState] = useMergeState({
    shouldShowCompanyValuesDialog: false,
    shouldShowDeleteConfirmationDialog: false,
    shouldUpdateCompanyValue: false,
    selectedCompanyValue: {},
    confirm: {
      title: "Delete Company Value",
      message: "Are you sure you want to delete this company value?",
    },
  });

  const handleOpenCompanyValuesDialog = () => {
    setState({ shouldShowCompanyValuesDialog: true });
  };

  const handleCloseCompanyValuesDialog = () => {
    setState({
      shouldShowCompanyValuesDialog: false,
      shouldUpdateCompanyValue: false,
      selectedCompanyValue: {},
    });
  };

  const onSaveCompanyValue = (payload: any) => {
    if (state.shouldUpdateCompanyValue) {
      dispatch(
        updateCompanyValuesSaga(state.selectedCompanyValue._id, payload)
      );
    } else {
      dispatch(createCompanyValuesSaga(payload));
    }

    handleCloseCompanyValuesDialog();
  };

  const handleEditCompanyValue = (companyValue: any) => {
    setState({
      shouldShowCompanyValuesDialog: true,
      shouldUpdateCompanyValue: true,
      selectedCompanyValue: companyValue,
    });
  };

  const handleOpenDeleteConfirmationDialog = (companyValue: any) => {
    setState({
      shouldShowDeleteConfirmationDialog: true,
      selectedCompanyValue: companyValue,
    });
  };

  const handleCloseDeleteConfirmationDialog = () => {
    setState({
      shouldShowDeleteConfirmationDialog: false,
      selectedCompanyValue: {},
    });
  };

  const handleConfirmDeleteCompanyValue = () => {
    dispatch(deleteCompanyValuesSaga(state.selectedCompanyValue._id));

    handleCloseDeleteConfirmationDialog();
  };

  useEffect(() => {
    dispatch(getCompanyValuesSaga());
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-semibold">Company Values</div>

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
            <Button label="Create" onClick={handleOpenCompanyValuesDialog} />
          </div>

          <div className="mt-10">
            {companyValues.map((companyValue: any) => (
              <div
                key={companyValue._id}
                className="w-full h-24 p-4 mb-4 flex justify-between rounded-md bg-white mr-10 cursor-pointer team-card"
              >
                <div>
                  <div className="font-semibold">{companyValue.title}</div>
                  <div className="mt-2 text-sm">{companyValue.description}</div>
                </div>

                <div className="flex">
                  <div>
                    <IconButton
                      onClick={() => handleEditCompanyValue(companyValue)}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>

                  <div>
                    <IconButton
                      onClick={() =>
                        handleOpenDeleteConfirmationDialog(companyValue)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {state?.shouldShowCompanyValuesDialog && (
        <CompanyValuesDialog
          open={state?.shouldShowCompanyValuesDialog}
          onClose={handleCloseCompanyValuesDialog}
          onSave={onSaveCompanyValue}
          shouldUpdate={state?.shouldUpdateCompanyValue}
          companyValue={state?.selectedCompanyValue}
        />
      )}

      {state?.shouldShowDeleteConfirmationDialog && (
        <ConfirmationDialog
          title={state?.confirm?.title}
          message={state?.confirm?.message}
          open={state?.shouldShowDeleteConfirmationDialog}
          onClose={handleCloseDeleteConfirmationDialog}
          onConfirm={handleConfirmDeleteCompanyValue}
        />
      )}
    </div>
  );
}
