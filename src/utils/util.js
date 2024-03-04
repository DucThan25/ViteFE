/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj);
    if (hit) {
        return hit.copy;
    }

    const copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    });

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key));
}

export function isObject(obj) {
    return obj !== null && typeof obj === "object";
}

export function isPromise(val) {
    return val && typeof val.then === "function";
}

export function assert(condition, msg) {
    if (!condition) throw new Error(`[vuex] ${msg}`);
}

export function partial(fn, arg) {
    return function() {
        return fn(arg);
    };
}

export function searchArray(arrData, obj) {
    let result = [];
    if (obj.hasOwnProperty("key")) {
        result = arrData.filter(item => {
            const itemStr = item[obj.key] || "";
            return itemStr.toLowerCase().indexOf(obj.value.toLowerCase()) > -1;
        });
    } else {
        result = arrData;
    }
    return result;
}
export function getKyCuoc(chuKy) {
    //ussualy
    // return `${moment(new Date())
    //   .subtract(1, "months")
    //   .endOf("month")
    //   .format("YYYYMM")}${chuKy}`;
    //test for march
    return "20210301";
}

export function previewPrint(data) {
    var blobURL = window.URL.createObjectURL(
        new Blob([data], { type: "application/pdf" })
    );
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    iframe.style.display = "none";
    iframe.src = blobURL;
    iframe.onload = function() {
        setTimeout(function() {
            iframe.focus();
            iframe.contentWindow.print();
        }, 1);
    };
}
export function downloadText(text, filename) {
    var blob = new Blob([text], { type: "text/plain" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    document.body.removeChild(a);
}

export function cloneArray(source) {
    const objsArrStr = JSON.stringify(source)
    return JSON.parse(objsArrStr)
}   
export function getDataFromStorage(key){
    try{
        return localStorage.getItem(key)
    }catch(error)
    {
        return null
    }

}
export function setDataToStorage(key, value){
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        return false;
    }
}

export function showError (error) {
  try {
    if (error.data !== undefined && error.data.message !== undefined) {
      this.$toast.error(error.data.message + error.data.message_detail !== null ? ':' + error.data.message_detail : '')
    } else console.log(error)
  } catch (error) {} finally {}
}
