/* eslint eqeqeq: 'off', quotes: 'off', camelcase: off */
export default {
  Unformat_tien (s) {
    s = s.toLowerCase().trim()
    let ketqua = ''
    for (let i = 0; i < s.length; i++) {
      if (s[i].toString() != ',' && s[i].toString() != '.' && s[i].toString() != ' ') {
        ketqua = ketqua + s[i]
      }
    }
    return ketqua.trim()
  },

  Unformat_tien_V2 (s) {
    s = s.toLower().trim()
    let ketqua = ''
    for (let i = 0; i < s.length; i++) {
      if (s[i].toString() == '.') { break }
      if (s[i].toString() != ',' && s[i].toString() != ' ') { ketqua = ketqua + s[i] }
    }
    return ketqua.trim()
  },
  GetRandomText (length) {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },
  CopyRow (drSource, drTarget) {
    try {
      for (let i = 0; i < drTarget.length; i++) {
        if (drTarget[i].sFieldName == "MA_TB") continue
        drTarget[i].sValue = drSource[drTarget[i].sFieldName]
      }
    } catch (ex) {
      console.error(ex)
    }
  },
  CopyRowData (src, target) {
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        target[key] = src[key]
      }
    }
  },
  CopyRowAndUppercase (src, target) {
    if (!src) {
      return
    }
    for (const key in src) {
      if (Object.hasOwnProperty.call(src, key)) {
        target[key.toUpperCase()] = src[key]
      }
    }
  },
  transformKeyToLower (data) {
    let output = {}
    Object.keys(data).forEach(el => {
      if (el.indexOf('_')) {
        output[el.replace(el.substring(el.indexOf('_'), el.length), el.substring(el.indexOf('_'), el.length).toLowerCase())] = data[el]
      } else {
        output[el] = data[el]
      }
    })
    return output
  },  
  getErrorMessage (ex) {
    let errMsg = 'Không xác định'
    if (ex.data) {
      errMsg = ex.data.message
    } else if (ex.message) {
      errMsg = ex.message
    } else if (ex.statusText) {
      errMsg = ex.statusText
    }
    return errMsg
  },
}
