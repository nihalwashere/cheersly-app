import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Spinner from "../../components/Spinner";
import CreateCompanyValuesDialog from "../../components/CreateCompanyValuesDialog";
import DeleteCompanyValuesDialog from "../../components/DeleteCompanyValuesDialog";
import { PrimaryButton } from "../../components/CustomButton";
import {
  getCompanyValuesListSagaAction,
  createCompanyValuesSagaAction,
  updateCompanyValuesSagaAction,
  deleteCompanyValuesSagaAction,
} from "./state/actions";
import "./styles.css";

const CompanyValuesContainer = () => {
  const dispatch = useDispatch();

  const { companyValues, isLoading } = useSelector(
    (state) => state.companyValues
  );

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedCompanyValue, setSelectedCompanyValue] = useState({});

  const [
    shouldShowCreateCompanyValuesDialog,
    setShouldShowCreateCompanyValuesDialog,
  ] = useState(false);

  const [
    shouldShowDeleteCompanyValuesDialog,
    setShouldShowDeleteCompanyValuesDialog,
  ] = useState(false);

  const handleCompanyValuesCreate = () => {
    setShouldShowCreateCompanyValuesDialog(true);
  };

  const handleCloseCreateCompanyValuesDialog = () => {
    setShouldShowCreateCompanyValuesDialog(false);

    if (isEditMode) {
      setSelectedCompanyValue({});
      setIsEditMode(false);
    }
  };

  const handleCompanyValuesUpdate = (payload) => {
    setIsEditMode(true);
    setSelectedCompanyValue(payload);
    setShouldShowCreateCompanyValuesDialog(true);
  };

  const handleCompanyValuesDelete = (id) => {
    setSelectedCompanyValue({ id });
    setShouldShowDeleteCompanyValuesDialog(true);
  };

  const handleCloseCompanyValuesDelete = () => {
    setSelectedCompanyValue({});
    setShouldShowDeleteCompanyValuesDialog(false);
  };

  const createCompanyValues = ({ title, description }) => {
    dispatch(createCompanyValuesSagaAction({ title, description }));
    setShouldShowCreateCompanyValuesDialog(false);
  };

  const updateCompanyValues = ({ id, title, description }) => {
    dispatch(updateCompanyValuesSagaAction({ id, title, description }));
    setSelectedCompanyValue({});
    setShouldShowCreateCompanyValuesDialog(false);
  };

  const deleteCompanyValues = () => {
    dispatch(deleteCompanyValuesSagaAction({ id: selectedCompanyValue.id }));
    setSelectedCompanyValue({});
    setShouldShowDeleteCompanyValuesDialog(false);
  };

  const handleSaveCompanyValues = (payload) => {
    if (isEditMode) {
      return updateCompanyValues(payload);
    }

    createCompanyValues(payload);
  };

  useEffect(() => {
    dispatch(getCompanyValuesListSagaAction());
  }, []);

  return (
    <div className="company-values-root-container">
      <div className="company-values-container">
        {isLoading ? (
          <div className="company-values-spinner">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="company-values-create-button-container">
              <PrimaryButton onClick={handleCompanyValuesCreate}>
                Create
              </PrimaryButton>
            </div>

            <div className="company-values-card-container">
              {companyValues.map((companyValue) => (
                <div className="company-values-card">
                  <div className="company-values-card-title-actions-container">
                    <div className="company-values-card-title">
                      {companyValue.title}
                    </div>

                    <div className="company-values-card-actions-container">
                      <IconButton
                        onClick={() => handleCompanyValuesUpdate(companyValue)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() =>
                          handleCompanyValuesDelete(companyValue.id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>

                  <div className="company-values-card-description">
                    {companyValue.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {shouldShowCreateCompanyValuesDialog && (
          <CreateCompanyValuesDialog
            open={shouldShowCreateCompanyValuesDialog}
            handleClose={handleCloseCreateCompanyValuesDialog}
            handleSave={handleSaveCompanyValues}
            isEditMode={isEditMode}
            selectedCompanyValue={selectedCompanyValue}
          />
        )}

        {shouldShowDeleteCompanyValuesDialog && (
          <DeleteCompanyValuesDialog
            open={shouldShowDeleteCompanyValuesDialog}
            handleClose={handleCloseCompanyValuesDelete}
            handleSave={deleteCompanyValues}
          />
        )}

        {!companyValues.length && !isLoading && (
          <div className="company-values-no-values-text">
            Create your first company value!
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyValuesContainer;
