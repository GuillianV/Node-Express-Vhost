import * as JSON from "../assets/traduction/trad.json"


function LoadLang() {

    let langVerif = window.location.href.slice(-3)
    let langueActive = ""; //Code de la langue active
    let Json = JSON; //Tableau complet des trads
    let language; //Tableau de traductions

    for (let JsonLanguage of Json.languages) {


        if(langVerif.indexOf(JsonLanguage.code) > -1){
            langueActive = JsonLanguage.code
            document.documentElement.lang = JsonLanguage.code
            language = JsonLanguage
        }

    }


    if(langueActive == ""){
        for (let JsonLanguage of Json.languages) {
            if(Json.langInitial == JsonLanguage.code){
                langueActive = JsonLanguage.code
                document.documentElement.lang = JsonLanguage.code
                language = JsonLanguage
            }
    
        }
    }


    let dataHref = document.querySelectorAll("a")

    for(let dataMain of dataHref){
        
        if(dataMain.dataset.main != null)
        {
            
            let baseUriCopy = dataMain.baseURI
            let checkLang = baseUriCopy.slice(-3)
            if(checkLang.includes(langueActive+"/")){
                let newHrefMain = dataMain.origin + "/" + dataMain.dataset.main + checkLang
                dataMain.href = newHrefMain
            }
            
        } else if(dataMain.innerHTML != "FR" && dataMain.innerHTML != "EN"){
            let newHref = dataMain.href
            newHref = newHref.replace('/'+Json.langInitial, '/'+langueActive)
            dataMain.href = newHref
        }
    }


    let dataTraduction = document.querySelectorAll("[data-traduction]")
    for (let data of dataTraduction) {
        let traduction = findTraduction(data.dataset.traduction, language)
        if (traduction != null) {
            if(data.dataset.upper == "true"){
                data.innerHTML = traduction[1].toUpperCase()
            }else{
                data.innerHTML = traduction[1]
            }
            
        }

    }

    function findTraduction(data_traduction_value = null, Traductions = language) {

        if (data_traduction_value != null) {
            for (let Traduction of Traductions.allTrad) {
                if (Traduction.key == data_traduction_value) {
                    return [Traduction.key, Traduction.traduction]
                }
            }
            return null
        }
        else
            return null
    }

}

export default LoadLang;