export default function({ $axios }) {
  console.log('zzzzzzzz', process.client)
  if (process.client) {
    const host = window.location.hostname;
    $axios.setBaseURL("https://" + host );
  }
}
