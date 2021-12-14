const api_key = "de9360b5d82d505f200ce22e3ffb458b";

$(document).ready(() => {
    loginUser();
  });

const loginUser = async() => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${api_key}`)
        const data = await res.json()
        const request = data.request_token
        console.log(data.request_token) 

        const userAuth = await fetch(`
        https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${api_key}`, {
            method: 'POST',
            body: {
                "username": "David_Anacona",
                "password": "David@melo22",
                "request_token": request
              }
        })
        const data2 = await userAuth.json()

        console.log(data2)

        
    } catch (error) {
        
    }
}