function fetcher(body, url, method,goto,jsonMode) {
        
    return new Promise((resolve, reject) => {
        const options = {
            method,
            credentials: "include",
            mode: "cors",
            headers: {
                [jsonMode && "content-type"]: "application/json",
            }
        };

        if (jsonMode) {
            
            if (method.toLowerCase() !== "get") options.body = JSON.stringify(body);
            
        } else {
           options.body = body; 
        }
        

        loadingState(submit,true)
        fetch(url, options)
                    .then(res => res.json())
                    .then(res => {
                        let redirectUrl = res.goto;

                        loadingState(submit,false)
                        if (res.status) {

                            //First Check 
                            if (goto === "nothing") return resolve(res);
                            
                            if (goto === "noload") {
                                alert(res.message)
                                return resolve(res)
                            } else if (goto === "reload") {
                                window.location.reload()
                            } else {
                                window.location.href = redirectUrl
                            }

                        } else {
                            alert(res.message)
                            resolve(res)
                        }
                    }).catch(err => {
                        alert(err.message || err)
                        loadingState(submit,false)
                        reject(err)
                    })
        
    })
}

function loadingState(element, state) {
        if (state) {
            cbText = element.innerHTML;
            element.innerHTML = `<div class="spinner"><div class="spinner-border" role="status"><span class="visually-hidden"></span></div></div>`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
}
  