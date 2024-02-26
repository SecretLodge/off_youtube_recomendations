export const getState = async () => {
    const { isActivate } = await chrome.storage.local.get(['isActivate'])

    return !!isActivate
}