import axios from 'axios'
// export function request(config,success,failure){
//   const instance=axios.create(,{
//     baseURL:'http://152.136.185.210:7878/api/hy66',
//     timeout:5000
//   })
//   instance(config)
//   .then(res=>{
//     success(res);
//   })
//   .catch(err=>{
//     failure(err)
//   })
// }
export function request(config){
  /* return new Promise((resolve,reject)=>{
    const instance=axios.create({
      baseURL:'http://152.136.185.210:7878/api/hy66',
          timeout:5000
    })
    instance(config)
    .then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  }) */
  const instance=axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:50000
  })

  instance.interceptors.request.use(config=>
  {
    // console.log(config)
    return config
  },err=>{
    console.log(err)
  })
  return instance(config)
}
