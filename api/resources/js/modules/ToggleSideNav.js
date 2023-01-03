export default class ToggleSideNav {
    constructor() {}

    init()
    {
        window.addEventListener('DOMContentLoaded', () => {
            this.openToggle = document.querySelector('.open_toggle')
            this.closeToggle = document.querySelector('.close_toggle')
            this.sidebar = document.querySelector('.sidebar')
            let body = document.querySelector('body')

            this.openToggle.addEventListener('click', () => {
                // Hide sidenav
                body.classList.add('sidenav_toggled')
            })

            this.closeToggle.addEventListener('click', () => {
                // Show sidenav
                body.classList.remove('sidenav_toggled')
            })

            // Add mouseover event for sidenav
            this.sidebar.addEventListener('mouseover', () => {
                if (body.classList.contains('sidenav_toggled')) {
                    setTimeout(() => body.classList.add('sidenav_toggled_open'), 150)
                }
            })
            this.sidebar.addEventListener('mouseout', () => {
                if (body.classList.contains('sidenav_toggled')) {
                    setTimeout(() => body.classList.remove('sidenav_toggled_open'), 150)
                }
            })
        })
    }
}

new ToggleSideNav().init()