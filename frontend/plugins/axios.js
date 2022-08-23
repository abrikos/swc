export default function ({app, $axios, store}) {
  $axios.onRequest(config => {
    console.log(config.method, ':', config.url, config.data)
    return config;
  })

  $axios.onResponse(res=>console.log(res.config.url, res.data))

  $axios.onError(error => {
    if (error.response) {
      console.warn(error.response.data)
      if(error.response.status !== 401) {
        error.response.data.status = error.response.status;
        store.commit('setSnackBar', error.response.data)
      }
      return Promise.reject(error.response.data);
    }else{
      console.error('NO error.response', error)
    }
  })
}
