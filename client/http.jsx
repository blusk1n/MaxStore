const http = {}
http.get = function(route, query, callback){
    if(typeof query == 'function'){
        callback = query
        query = ""
    }

    fetch(route + query).then(res=>{
        res.json().then(data => callback(data))
    })
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