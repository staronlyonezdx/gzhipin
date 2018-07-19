//判断是大神页面还是老板页面
 export function getRedirect(type, header) {
  let path = "";
  if (type === "dashen") {
    path = "/dashen";
  } else if (type === "laoban") {
    path = '/laoban';
  }
  if (!header) {
    path += "info"
  }
  return path;
}