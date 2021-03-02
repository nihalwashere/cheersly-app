export const getLeaderBoardListQuery = `query LeaderBoardList($pageIndex: Int!, $pageSize:Int!, $type:String!, $duration:String!){
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

export const getCheersStatQuery = `query CheersStat{
  CheersStat{
    cheersGiven
    cheersReceived
  }
}`;
