
//import fetchJsonp from "fetch-jsonp";

async function request(url, method = 'GET', data = null){
    try{
        console.log('before send request')
        // const headers = {}
        let body
        if (data) {
            body = JSON.stringify(data)
            
        }
        // headers['Content-Type'] = 'aplication/json'
        console.log('send request')
        const response = await fetch (url,{
            mode: 'cors',
            method,
            headers: { "Content-Type": "application/json" },
            body
        })
        console.log('after request')
        /*const response = await fetchJsonp(url,{
            method,
            headers,
            body
        });*/
        console.log(response)
        return await response.json();
    }   
    catch(e){
        console.warn('Error:', e.message)
    }
}

export default request;