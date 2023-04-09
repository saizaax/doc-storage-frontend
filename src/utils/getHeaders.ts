export const getHeaders = () => {
  const access = localStorage.getItem("accessToken")
  return access ? { Authorization: `Bearer ${access}` } : {}
}
