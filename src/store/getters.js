const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.currenUser?.fileUrl,
  name: state => state.user.currentUser?.userName,
  userId: state => state.user.currentUser?.id,
  types: state => state.post.types,
  currentPost: state => state.post.currentPost,
  role: state => state.currenUser?.state
}
export default getters
