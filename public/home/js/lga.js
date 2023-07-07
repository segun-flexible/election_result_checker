let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector("#totalResultContainer");

    document.querySelector("form").addEventListener("submit", async e =>{
        e.preventDefault();

        const obj = {
            id: e.currentTarget.querySelector("select").value
        }

        container.innerHTML = "";

        submit = e.currentTarget.parentElement.querySelector("button")
        const results = await fetcher(obj, window.location.href, "POST", "nothing", true);

        if (!results.results.length) return container.innerHTML = `<h2>Empty Result</p>`
        
        //Now Populate Container With Data
        container.innerHTML = `<h2>Result for LGA - ${getSelectedOption()}</h2>`
        results.results.map(rs =>{
            container.insertAdjacentHTML("beforeend", `<p>Total result for ${rs.polling_unit_name}: ${rs.total} ${rs.total > 1 ? ' Votes' : ' Vote'}</p>`)
        })

    })

    function getSelectedOption() {
        var selectElement = document.querySelector("select");
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        var selectedText = selectedOption.text;
        return selectedText
    }

})