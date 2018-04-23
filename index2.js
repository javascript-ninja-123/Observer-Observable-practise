const Rx = require('rxjs/Rx');
const axios = require('axios');


const observerA = {
  next:x => console.log(x),
  error:err => console.log(err),
  complete:() => console.log('complete')
}
const add2 = x => x + 2

const foo = Rx.Observable.of(1,2,3,4,5);
const prefix = Rx.Observable.of('a');

const a = Rx.Observable.interval(1000).take(5)

// foo.startWith('a')
// .subscribe(observerA);


///merge

const w = Rx.Observable.interval(500).take(4);
const u = Rx.Observable.interval(300).take(5);
const merged = Rx.Observable.merge(w,u)
// merged
// .subscribe(observerA);


//combineLatest
console.log('=========')
const combined = Rx.Observable.combineLatest(w,u,(x,y) => x + y)
// combined.subscribe(observerA)


const fetchCall = async url => {
  const {data} = await axios(url)
  return data;
}


const array1 = Rx.Observable.fromPromise(fetchCall('https://jsonplaceholder.typicode.com/posts'))

const array2 = Rx.Observable.fromPromise(fetchCall('https://jsonplaceholder.typicode.com/albums'))


const combinedArray = Rx.Observable.combineLatest(array1,array2, (posts,albums) => {
  return posts.reduce((acc,val,index,arr) => {
    const newAcc = albums.reduce((acc2,val2,index2,arr2) => {
      val2 = {
        ...val2,
        body:val.body
      }
      acc2.push(val2);
      return acc2;
    },[])
    acc = newAcc;
    return acc;
  },[])
})

// combinedArray.subscribe(observerA);


const zippedArray = Rx.Observable.zip(array1,array2, (posts,albums) => {
  return posts.reduce((acc,val,index,arr) => {
    const newAcc = albums.reduce((acc2,val2,index2,arr2) => {
      val2 = {
        ...val2,
        body:val.body
      }
      acc2.push(val2);
      return acc2;
    },[])
    acc = newAcc;
    return acc;
  },[])
})

zippedArray.subscribe(observerA)
