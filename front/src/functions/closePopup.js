export const closePopup = (func, popupRef) => {
    popupRef.current.addEventListener('click', e => {
        const popupDimensions = popupRef.current.getBoundingClientRect()
        if (
            e.clientX < popupDimensions.left ||
            e.clientX > popupDimensions.right ||
            e.clientY < popupDimensions.top ||
            e.clientY > popupDimensions.bottom
        ) {
            func()
        }
    })
    popupRef.current.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            func()
        }
    })
}