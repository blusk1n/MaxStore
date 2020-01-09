const http = {}
http.get = function(route, query, callback){
    if(typeof query == 'function'){
        callback = query
        query = ""
    }

    var headers = {"authorization" : localStorage.getItem("token")}
    fetch(route + query, {headers}).then(res=>{
        res.json().then(data => callback(null,data)).catch(err => callback(err,null))
    }).catch(err => callback(err , null))
}

http.post = function(route, json, callback){
    fetch(route, {
        method : "POST",
        body : JSON.stringify(json),
        headers: {'Content-Type': 'application/json'}
    }).then(res=>{
        res.json().then(data => callback(data))
    })
}

http.patch = function(route, json, callback){
    fetch(route, {
        method : "PATCH",
        body : JSON.stringify(json),
        headers: {'Content-Type': 'application/json'}
    }).then(res=>{
        res.json().then(data => callback(data))
    })
}

export default http
// 