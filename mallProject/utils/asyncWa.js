/*
  promise形式的getSetting
*/
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
// promise形式的chooseAddress
export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
   wx.showToast({
      title: title,
      icon:'none',
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
   })
  })
}