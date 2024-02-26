import { getState } from '../helpers/getState.js'

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if(reason === 'install') {
        chrome.storage.local.set({ isActivate: false })
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.name === 'isActivate') {
        getState().then((state) => {
            sendResponse(state)
        })
        return true
    }
})