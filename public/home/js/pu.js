let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector("#resultContainer");

    document.querySelector("#pollingUnitForm").addEventListener("submit", async e =>{
        e.preventDefault();

        const obj = {
            id: e.currentTarget.querySelector("input").value
        }

        container.innerHTML = "";

        submit = e.currentTarget.parentElement.querySelector("button")
        const results = await fetcher(obj, window.location.href, "POST", "nothing", true);

        if (!results.results.length) return container.innerHTML = `<h2>Empty Result</p>`
        
        //Now Populate Container With Data
        container.innerHTML = `<h2>Result for Polling Unit - PU${results.puNo}</h2>`
        results.results.map(rs =>{
            container.insertAdjacentHTML("beforeend", `<p>Votes for ${rs.party_abbreviation}: ${rs.party_score}</p>`)
        })

    })

})