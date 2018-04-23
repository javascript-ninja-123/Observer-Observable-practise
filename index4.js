const Rx = require('rxjs/Rx');
const axios = require('axios');

const fetchCall = async url => {
  const {data} = await axios(url)
  return data;
}







const observerA = {
  next:x => console.log(x),
  error:err => console.log(err),
  complete:() => console.log('complete')
}



// Rx.Observable
// .fromPromise(fetchCall('https://jsonplaceholder.typicode.com/users'))
// .map(x => {
//   x.map(obj => obj.name)
// })
// .subscribe(observerA)



const fetchCallObservable = Rx.Observable.create(async observer => {
  try{
    const a = await fetchCall('https://jsonplaceholder.typicode.com/users')
    observer.next('success 1')
    const b = await fetchCall('https://jsonplaceholder.typicode.com/posts')
    observer.next('success 2')
    observer.complete();
  }
  catch(err){
    console.log('error is called')
    observer.error(err);
  }
})
