export const LeaderBoardList = `query LeaderBoardList($pageIndex: Int!, $pageSize:Int!, $type:String!, $duration:String!){
  LeaderBoardList(pageIndex:$pageIndex, pageSize:$pageSize, type:$type, duration:$duration){
    data{      
      slackUser{
          id
          appHomePublished
          slackDeleted
          slackUserData{
              id
              team_id
              name
              real_name
              tz
              profile{
                image_192
              }
          }
      }        
      cheersGiven
      cheersReceived
    }
    totalCount
    totalPages   
  }
}`;

export const CheersStat = `query CheersStat{
  CheersStat{
    cheersGiven
    cheersReceived
    cheersRedeemable
  }
}`;

export const CompanyValuesList = `query {
  CompanyValuesList {
    data {
      id
      title
      description
    }
  }
}`;

export const AdminSettingsList = `query AdminSettingsList($pageIndex: Int!, $pageSize:Int!){
  AdminSettingsList(pageIndex:$pageIndex, pageSize:$pageSize){
    data{            
      id
      appHomePublished
      slackDeleted
      role
      slackUserData{
          id
          team_id
          name
          real_name
          tz
          profile{
            image_192
          }
      }      
    }
    totalCount
    totalPages   
  }
}
`;

export const RewardList = `query {
  RewardList {
    data {
      id
      title
      description
      price
    }
  }
}`;

export const RedemptionRequestsList = `query RedemptionRequestList($pageIndex: Int!, $pageSize: Int!){
  RedemptionRequestList(pageIndex: $pageIndex, pageSize: $pageSize){
    data{
      id
      teamId
      status
      createdAt
      updatedAt
      user{
          id
          appHomePublished
          slackDeleted
          role
          slackUserData{
              id
              team_id
              name
              real_name
              tz
              profile{
                image_192
              }
          } 
        }
      reward{
        id
        title
        description
        price
      }
    }    
  }
}`;

export const RewardsHistoryList = `query RewardsHistoryList($pageIndex: Int!, $pageSize: Int!){
  RewardsHistoryList(pageIndex: $pageIndex, pageSize: $pageSize){
    data{
      id
      teamId
      status
      createdAt
      updatedAt
      user{
          id
          appHomePublished
          slackDeleted
          role
          slackUserData{
              id
              team_id
              name
              real_name
              tz
              profile{
                image_192
              }
          } 
        }
      reward{
        id
        title
        description
        price
      }
    }    
  }
}`;
