const set_cookie = (userEmail) => {
  const d = new Date();
  d.setTime(d.getTime() + (10*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = "userEmail=" + userEmail + ";" + expires + ";path=/";

}

export default set_cookie