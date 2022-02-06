
//import fetchJsonp from "fetch-jsonp";

async function request(url, method = 'GET', data = null){
    try{
        console.log('before send request')
        const headers = {}
        let body
        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
            
        }
        console.log('send request')
        const response = await fetch (url,{
            mode: 'no-cors',
            method,
            headers,
            body
        })
        /*const response = await fetchJsonp(url,{
            method,
            headers,
            body
        });*/
        return await response.json();
    }   
    catch(e){
        console.warn('Error:', e.message)
    }
}

export default request;