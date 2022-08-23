export default function ({app, $axios, store}, inject) {
  const defaultPath = '/user/cabinet';
  inject('saveRedirect', (path) => {
    localStorage.setItem('savedPath', path);
  })
  inject('saveDefaultRedirect', () => {
    localStorage.setItem('savedPath', defaultPath);
  })
  inject('loadRedirect', () => {
    return localStorage.getItem('savedPath') || defaultPath;
  })
}
