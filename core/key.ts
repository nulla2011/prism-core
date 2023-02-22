import atbash from '../lib/atbash';
const K = 'JrwODEwND0IQCSAcEFo5w193AE9sxnEuzTobzD5mC2s0wSYaLr8ez25eB2gfy3IoOnMeOnkd';
let KEY = global.atob(atbash(K));
export default KEY;
