import $ from 'jquery';

export class BurgerMenu {
    constructor(menu) {
        this.mediaShow = menu.mediaShow?menu.mediaShow:'';
        this.menu = document.querySelector(`.${menu.openBtn}`);
        this.openBtn = menu.openBtn;
        this.closeBtn = menu.closeBtn ? menu.closeBtn : menu.openBtn;
        this.menuAnimationTime = menu.menuAnimationTime ? menu.menuAnimationTime : 0.5;
        this.spoilersAnimationTime = menu.spoilersAnimationTime ? menu.spoilersAnimationTime : 0.3;
        this.spoilersAccordion = menu.spoilersAccordion ? menu.spoilersAccordion : false;
        this.openingSide = menu.openingSide ? menu.openingSide : "horizontal";
        this.arrowIcon = menu.arrowIcon;
        this.menu = document.querySelector(".mob-nav");
        this.setEvents();
        this.getIconForSpoilers();
        this.setTimeAnimations();
        this.getSpoilersMenu();
        this.showMenu();

    }

    setEvents() {
        let openBtn = document.querySelector(`.${this.openBtn}`);
        let closeBtn = document.querySelector(`.${this.closeBtn}`);

        if (closeBtn.className == openBtn.className) {
            openBtn.addEventListener("click", () => {
                this.togleMenu(openBtn);
            })

        } else {
            openBtn.addEventListener("click", () => {
                this.openMenu(openBtn);
            })

            closeBtn.addEventListener("click", () => {
                this.closeMenu();
            })
        }
    }

    openMenu(openBtn) {
        this.menu.classList.add("active");
        openBtn.style.cssText = 'z-index:0';
    }

    closeMenu() {
        this.menu.classList.remove("active")
    }

    togleMenu(openBtn) {
        openBtn.style.cssText=`z-index:101`;
        openBtn.classList.toggle("active")
        this.menu.classList.toggle("active")
    }

    getIconForSpoilers() {
        let menuItems = document.querySelectorAll(".mob-nav-item");
        for (const el of menuItems) {
            let subMenu = el.querySelector(".spoiler-content-menu");

            if (subMenu) {
                el.insertAdjacentHTML("beforeend", this.renderArrow())
            }

        }
    }

    renderArrow() {
        return `
        <btn class='_spoiler-js-menu'>
                    ${this.arrowIcon}
                     </btn>
        `
    }

    setTimeAnimations() {
        this.menu.style.cssText = `
        transition: ${this.menuAnimationTime}s
        `
        this.setOpeningSide();
    }

    setOpeningSide() {
        if (this.openingSide == "horizontal") {
            this.menu.classList.add("horizontal")
        } else {
            this.menu.classList.add("vertical")
        }

    }

    getSpoilersMenu() {
        let timeAnimation = (this.spoilersAnimationTime * 1000);
        let accordion = this.spoilersAccordion;
        //Первый спойлер активный
        // let firstOpen = false;

        $('.spoiler-content-menu').slideUp();
        //Первый спойлер активный
        // if (firstOpen) {
        //     $('details').first().attr("open", "");
        //     $('.spoiler-content-menu').first().slideDown(timeAnimation);

        // }

        $('._spoiler-js-menu').click(function (e) {
            //режим аккордеона
            if (accordion) {
                if ($(this).attr('class') == '_spoiler-js-menu active') {
                    $('.spoiler-content-menu').slideUp(timeAnimation);
                    $(this).removeClass('active');
                } else {
                    $('.spoiler-content-menu').slideUp(timeAnimation).css("display", "none");
                    $('._spoiler-js-menu').removeClass('active');
                    $(this).siblings('.spoiler-content-menu').slideDown(timeAnimation);
                    $(this).addClass('active');
                }


                //основной режим    
            } else {

                if ($(this).attr('class') == '_spoiler-js-menu active') {
                    let spoiler = $(this).parent();
                    $(this).removeClass('active');
                    $(this).siblings('.spoiler-content-menu').slideUp(timeAnimation);


                } else {
                    $(this).siblings('.spoiler-content-menu').slideDown(timeAnimation);
                    $(this).addClass('active');
                }
            }
        });
    }

    showMenu() {
        if(this.mediaShow){
            let mediaShow = window.matchMedia(`(max-width: ${this.mediaShow})`);
                let btn = document.querySelector(`.${this.openBtn}`)
                if(mediaShow.matches){
                    btn.classList.add("show")
                }else{
                    btn.classList.remove("show")
                }
            window.addEventListener('resize', () => {
                let mediaShow = window.matchMedia(`(max-width: ${this.mediaShow})`);
                let btn = document.querySelector(`.${this.openBtn}`)
                if(mediaShow.matches){
                    btn.classList.add("show")
                }else{
                    btn.classList.remove("show")
                }
            })  
        } 
    }
}

