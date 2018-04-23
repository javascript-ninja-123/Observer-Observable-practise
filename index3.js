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

const a = Rx.Observable.interval(500)

// a
// .take(5)
// .switchMap(a => fetchCall('https://jsonplaceholder.typicode.com/users/1'))
// .subscribe(observerA)



//mergeMap
// a
// .take(5)
// .mergeMap(a =>
//   fetchCall('https://jsonplaceholder.typicode.com/users/1'),
//   (outer,res) => res.name
// )
// .subscribe(observerA)


a
.take(5)
.concatMap(
  async () => {
    const one = await fetchCall('https://jsonplaceholder.typicode.com/users/1');
    const two = await fetchCall('https://jsonplaceholder.typicode.com/users/2');
    return {
      one,
      two
    }
  },
  (outer,res) => {
    const newRes = {
      name1:res.one.name,
      name2:res.two.name
    }
    return newRes;
  }
)



const sourceObservable = Rx.Observable.interval(500).take(5);
const resultObservable =
sourceObservable
.mergeMap(x => {
  if(x % 2 === 0){
    return Rx.Observable.of(x * 10)
  }
  else{
    return Rx.Observable.empty();
  }
});


// resultObservable
// .subscribe(observerA)


const sourceObservable2 = Rx.Observable.interval(500).take(5);


// sourceObservable2
// .groupBy(x => x % 2)
// .map(innerObs =>innerObs.count())
// .mergeAll()
// .subscribe(observerA)



const busObservable = Rx.Observable.of(
  {code: 'en-us', value: '-TEST-'},
  {code: 'en-us', value: 'hello'},
  {code: 'es', value: '-TEST-'},
  {code: 'en-us', value: 'amazing'},
  {code: 'pt-br', value: '-TEST-'},
  {code: 'pt-br', value: 'olá'},
  {code: 'es', value: 'hola'},
  {code: 'es', value: 'mundo'},
  {code: 'en-us', value: 'world'},
  {code: 'pt-br', value: 'mundo'},
  {code: 'es', value: 'asombroso'},
  {code: 'pt-br', value: 'maravilhoso'}
)
.concatMap(x => Rx.Observable.of(x).delay(500))

const enUS = busObservable
.filter(obj => obj.code === 'en-us')
.skip(1)
.map(obj => obj.value)

const es = busObservable
.filter(obj => obj.code === 'es')
.skip(1)
.map(obj => obj.value)


const all =
busObservable
.groupBy(obj => obj.code)
.mergeMap(innerObs => innerObs.skip(1).map(obj => obj.value))

all.subscribe(observerA)
