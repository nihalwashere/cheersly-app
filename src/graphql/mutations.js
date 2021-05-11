export const CreateCompanyValues = `mutation CreateCompanyValues($title: String!, $description: String!){
    CreateCompanyValues(title: $title, description: $description){
      success
    }
  }`;

export const UpdateCompanyValues = `mutation UpdateCompanyValues($id: String!, $title: String!, $description: String!){
    UpdateCompanyValues(id: $id, title: $title, description: $description){
      success
    }
  }`;

export const DeleteCompanyValues = `mutation DeleteCompanyValues($id: String!){
    DeleteCompanyValues(id: $id){
      success
    }
  }`;
