let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("form").addEventListener("submit", async e =>{
        e.preventDefault();
        const obj = {
            uniqueId: e.currentTarget.querySelector("#pollingUnitIdInput").value,
            results: []
        };

        document.querySelectorAll("input#partyAInput").forEach(party =>{
            obj.results.push({
                partyName: party.dataset.name,
                score: party.value
            })
        });

        
        submit = e.currentTarget.querySelector("button")
        await fetcher(obj, window.location.href, "POST", "noload", true);
        
    })
    
})