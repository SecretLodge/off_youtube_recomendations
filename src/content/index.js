let intervalID = undefined;

const routes = {
    '': [{ attribute: 'id', valuesOfAttribute: ['primary'] }],
    'watch': [{ attribute: 'id', valuesOfAttribute: ['related'] }],
    'feed': [{ attribute: 'id', valuesOfAttribute: ['primary'] }],
    'shorts': [{ attribute: 'class', valuesOfAttribute: ['video-stream html5-main-video'] }, { attribute: 'id', valuesOfAttribute: ['page-manager'] }]
}

const hideVideos = async (isActivate) => {
    try {
        const route = location.pathname.split('/')[1];

        if(!routes[route]) {
            throw new Error(`Current pathname is not defined\nPlease, add new route: ${location.pathname}`)
        }

        for(const paramsOfElement of routes[route]) {
            const { attribute, valuesOfAttribute } = paramsOfElement

            for(const value of valuesOfAttribute) {
                const DOMElements = document.querySelectorAll(`[${attribute}="${value}"]`)
            
                for(let DOMElement of DOMElements) {
                    if(!DOMElement) {
                        continue
                    }

                    DOMElement.style.display = isActivate ? 'none' : ''
                }
            }
        }
    }
    catch(error) {
        console.error(error)
    }
}

const runApp = async () => {
    const { isActivate } = await chrome.storage.local.get(['isActivate'])

    clearInterval(intervalID)
    intervalID = setInterval(hideVideos, 1000, isActivate)
}

chrome.storage.onChanged.addListener((changes) => {
    if(!changes['isActivate']) {
        return
    }
    runApp()
});

runApp()

// TODO:
// - [do] разобраться с runtime context
// - [do] сделать корректный роутинг
// - [do] сделать включатель и выключатель видео рекомендаций
// - дополнить все остальные роуты
// - оформить файл index.html 
// - сделать иконку
// - перевести описание на несколько языков
// - сделать описание
// - по желанию переделать расширение на ООП 