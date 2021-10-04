const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.currenUser?.fileUrl,
  name: state => state.user.currentUser?.userName
}
export default getters
