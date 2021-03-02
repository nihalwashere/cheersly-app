export const SlackUserDataTypeFragment = `fragment SlackUserDataType on SlackUserDataType {
    id
    team_id
    name
    real_name
    tz 
}`;

export const UserTypeFragment = `fragment UserType on UserType {
  id
  appHomePublished
  slackDeleted
  slackUserData{
    ...SlackUserDataType
  }
}`;
