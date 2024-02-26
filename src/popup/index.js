import { getState } from '../helpers/getState.js'

const setTextButton = (state) => {
    button.textContent = state 
        ? 'On'
        : 'Off'
} 

const runApp = async () => {
    const button = document.getElementById('button')
    let isActivate = await getState()

    setTextButton(isActivate)

    button.addEventListener('click', () => {
        chrome.storage.local.set({ isActivate: !isActivate })
    })
    
    chrome.storage.onChanged.addListener((changes) => {
        isActivate = changes.isActivate.newValue
        setTextButton(isActivate)
    });
}

runApp()