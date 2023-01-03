export default class Dropdown {
    constructor() {}

    init()
    {
        window.addEventListener('DOMContentLoaded', () => {
            this.dropdonws = document.querySelectorAll('.dropdown__items')
            this.dropdonws?.forEach(dropdown => {
                const dropdownToggle = dropdown.querySelector('.dropdown_toggle')
                const dropdownMenu = dropdown.querySelector('.dropdown_menu')
                

                // Event click on dropdownToggle
                dropdownToggle.addEventListener('click', () => {
                    dropdownMenu.classList.toggle('show')
                })
            })
        })
    }
}

new Dropdown().init()