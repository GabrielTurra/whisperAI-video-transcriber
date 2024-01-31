export const startLoading = () => {
    document.documentElement.classList.add("loading");
}

export const stopLoading = () => {
    document.documentElement.classList.remove("loading");
}

export const setLoadMessage = (message) => {
    document.documentElement.dataset.message = message;
}