const Rx = require('rxjs/Rx');
const axios = require('axios');

const bar = Rx.Observable.create(observer => {
  console.log('hello')
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(() => {
    observer.next(300)
  },1000)
})


console.log('before')
// bar.subscribe((x) => {
//   console.log(x)
// })
console.log('after')

//generator
function* baz(){
  console.log('hollo');
  yield 42;
  yield 100;
  yield 200;
}

// var iterator = baz();
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// console.log(iterator.next().value);

const fetchCall = async (url) => {
  const {data} = await axios(url);
  return data;
}



const fetchCallObservable = Rx.Observable.create(async observer => {
    try{
      const first = await fetchCall('https://jsonplaceholder.typicode.com/posts');
      const second = await fetchCall('https://jsonplaceholder.typicode.com/todos');

      observer.next(first);
      observer.next({type:'first_call_sucess', payload:true});
      observer.next(second);
      observer.next({type:'second_call_sucess', payload:true});
    }
    catch(err){
      observer.error(err);
    }
})

const observerA = {
  next: x => console.log('A next ' + JSON.stringify(x)),
  error:err => console.log(`error is ${err}`),
  complete:() => console.log('It is done')
}
//
// fetchCallObservable.subscribe(observerA)


const empty = Rx.Observable.create(observer => observer.complete())


const q = Rx.Observable.throw('this is an error');


q.subscribe(observerA)


const awst = Rx.Observable.create(observer => {
  var i=0;
  setInterval(() => {
    observer.next(i);
    i++;
  },1000)
})

const interalStream = Rx.Observable.interval(1000);

const subscribe = observer => {
  observer.next(42);
  observer.next(100);
  observer.next(200);
  observer.complete();
}

const fox = Rx.Observable.create(subscribe);
console.log('it is an observer')
fox.subscribe(observerA)


const yman = Rx.Observable.create(observer => {
  const id = setInterval(()=> {
    console.log('boiru')
  },1000)

  return function unsubscribe(){
    clearInterval(id);
  }

})



const subscription = yman.subscribe(observerA);

setTimeout(() => {
  subscription.unsubscribe();
},3000)


// interalStream.subscribe(observerA)


// const foo = Rx.Observable.of(42,100,200);
//
// foo.subscribe(x => console.log(x))
//
// const a = Rx.Observable.from([1,2,3,4,5,6])
// a.subscribe(x => console.log(x))
//
//
// const x = Rx.Observable.fromPromise(fetchCall('https://jsonplaceholder.typicode.com/posts'))
//
//
// x.subscribe(x => console.log(x))
//
//
// function* generator(){
//   yield 10;
//   yield 20;
//   yield 30;
// }
//
// const itrator = generator();
// const y = Rx.Observable.from(itrator);
//
// y.subscribe(observerA)












// const observerA = {
//   next: x => console.log('A next ' + x),
//   error:err => console.log(`error is ${err}`),
//   complete:() => console.log('It is done')
// }
//
//
//
//
// const observerB = {
//   next: x => console.log('B next ' + x),
//   error:err => console.log(`error is ${err}`),
//   complete:() => console.log('It is done')
// }
//
//
//
// const intervalSteram$ = Rx.Observable.interval(1000).take(5);
//
//
//
//
// const bridgeObserver = {
//   next: function(x){
//     this.observers.forEach(o => o.next(x))
//   },
//   error:function(error){
//     this.observers.forEach(o => o.error(error))
//   },
//   complete:function(){
//     this.observers.forEach(o => o.complete())
//   },
//   observers:[],
//   addObserver:function(observer){
//     this.observers.push(observer)
//   }
// }
//
//
// intervalSteram$.subscribe(bridgeObserver);
// bridgeObserver.addObserver(observerA)
//
// setTimeout(() => {
//   bridgeObserver.addObserver(observerB)
// },2000)
