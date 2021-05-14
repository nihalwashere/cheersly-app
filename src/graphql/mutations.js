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

export const AdminSwitch = `mutation AdminSwitch($userId: String!, $isAdmin: Boolean!){
    AdminSwitch(userId: $userId, isAdmin: $isAdmin){
      success
    }
  }`;

export const CreateReward = `mutation CreateReward($title: String!, $description: String!, $price: String!){
  CreateReward(title: $title, description: $description, price: $price){
    success
  }
}`;

export const UpdateReward = `mutation UpdateReward($id: String!, $title: String!, $description: String!, $price: String!){
  UpdateReward(id: $id, title: $title, description: $description, price: $price){
    success
  }
}`;

export const DeleteReward = `mutation DeleteReward($id: String!){
  DeleteReward(id: $id){
    success
  }
}`;

export const CreateRedemptionRequest = `mutation CreateRedemptionRequest($userId: String!, $rewardId: String!){
  CreateRedemptionRequest(userId: $userId, rewardId: $rewardId){
     success
     message
  }
}`;

export const SettleRedemptionRequest = `mutation SettleRedemptionRequest($id: String!){
  SettleRedemptionRequest(id: $id){
     success
     message
  }
}`;

export const DeclineRedemptionRequest = `mutation DeclineRedemptionRequest($id: String!){
  DeclineRedemptionRequest(id: $id){
     success
     message
  }
}`;
