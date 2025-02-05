export class Menu {
    constructor(options) {
            this.mediaHidden = options.mediaHidden?options.mediaHidden:'';
            this.classMenu = document.querySelector(`.${options.class}`);
            this.blockMenu = document.querySelector(".nav-list");
            this.items = document.querySelectorAll(".nav>.nav-list>.nav-item");
            this.menuItems = [...this.items];
            this.screenWidth = window.innerWidth;
            this.opacityMenuBlock = '';
            this.opacityMenuWrap = '';
            this.opacityMenuItems = [];
            this.checkOpacityItem = options.opacityItem ? this.firstRenderOpacityItem() : options.opacityItem;
            this.firstRender();
            this.checkSubMenuWrap = options.solutionForSubmenu ? this.getSolutionForSubmenu() : "";
            this.arrowSubmenu = options.arrowSubmenu ? options.arrowSubmenu : "";
            this.addArrowSubmenu();
            this.hiddenMenu();
  
    }

    firstRenderOpacityItem() {
        this.classMenu.insertAdjacentHTML("beforeend", `
                    <li class="nav__item-wrap" style="display: none;">
                        <div class="nav__item-opacity-wrap">
                            <!-- icon666.com - MILLIONS vector ICONS FREE --><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <g id="ellipsis">
                                    <path d="m6 20a4 4 0 1 1 4-4 4 4 0 0 1 -4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0 -2-2z"></path>
                                    <path d="m16 20a4 4 0 1 1 4-4 4 4 0 0 1 -4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0 -2-2z"></path>
                                    <path d="m26 20a4 4 0 1 1 4-4 4 4 0 0 1 -4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0 -2-2z"></path>
                                </g>
                            </svg>
                        </div>
                        <!-- список скрытых элементов меню -->
                        <ul class="nav__item-opacity"></ul>
                    </li>
            `);

        this.opacityMenuBlock = document.querySelector(".nav__item-wrap");
        this.opacityMenuWrap = document.querySelector(".nav__item-opacity");
    }

    firstRender() {

        //начальные координаты элемента меню
        const positionStart = this.menuItems[0].getBoundingClientRect().top;
        for (let ix = 0; ix < this.menuItems.length; ix++) {
            //координаты элемента меню
            let item = this.menuItems[ix].getBoundingClientRect().top;
            //если элемент на другой строчке
            if (item != positionStart) {
                this.opacityMenuItems.push(this.menuItems.pop());

            }
        }
        this.renderOpacityBlock();
        this.watchWidth()


    }

    renderOpacityBlock() {
        if (this.opacityMenuItems.length != 0) {
            this.opacityMenuBlock.style.cssText = `display: flex`;
            //проверяем на одной ли строке все элементы
            for (let index = this.menuItems.length - 1; index >= 0; index--) {
                const positionStart = this.menuItems[0].getBoundingClientRect().top;
                let item = this.opacityMenuBlock.getBoundingClientRect().top;
                //если нет, убираем еще один элемент
                if (item != positionStart) {
                    //записываю в скрытый массив
                    this.opacityMenuItems.push(this.menuItems.pop());
                    this.renderMenu()
                }
            }
        } else {
            this.opacityMenuBlock.style.cssText = `display: none;`
        }
    }

    renderMenu() {
        // отрисовка основного меню
        this.blockMenu.innerHTML = "";
        this.menuItems.forEach(el => {
            if (el.children[1]) {
                if (el.children[1].className == 'nav__item-opacity-wrap') {
                    el.children[1].remove();
                }
            }
            if (el.children[2]) {
                if (el.children[2].className == 'nav__item-opacity-wrap') {
                    el.children[2].remove();
                }
            }
            this.blockMenu.insertAdjacentElement("beforeend", el)
        });
        this.blockMenu.insertAdjacentElement("beforeend", this.opacityMenuBlock)
        //отрисовка скрытого меню
        this.opacityMenuWrap.innerHTML = "";
        this.opacityMenuItems.forEach(el => {
            this.opacityMenuWrap.insertAdjacentElement("beforeend", el)
        });
    }

    hiddenMenu(){
        if(this.mediaHidden){
            let mediaOf = window.matchMedia(`(max-width: ${this.mediaHidden})`);
            if(mediaOf.matches){
                this.classMenu.classList.add("hidden")
            }else{
                this.classMenu.classList.remove("hidden")
            }
            window.addEventListener('resize', () => {
                let mediaOf = window.matchMedia(`(max-width: ${this.mediaHidden})`);
                if(mediaOf.matches){
                    this.classMenu.classList.add("hidden")
                }else{
                    this.classMenu.classList.remove("hidden")
                }
            })  
        }
    }

    watchWidth() {
        window.addEventListener('resize', () => {
            const positionStart = this.menuItems[0].getBoundingClientRect().top;
            let newWidth = window.innerWidth;
            for (let index = 0; index < this.menuItems.length; index++) {
                let item = this.menuItems[index].getBoundingClientRect().top;
                //если элемент перескочил на следующую строчку
                if (item != positionStart) {
                    //записываю в скрытый массив
                    this.opacityMenuItems.push(this.menuItems.pop());
                    //удаляю этот элемент из массива
                    this.renderMenu()
                }
            }
            //если ширина экрана увеличивается
            if (newWidth > this.screenWidth) {
                for (let index = this.opacityMenuItems.length - 1; index >= 0; index--) {
                    //добавляю элемент в массив
                    this.menuItems.push(this.opacityMenuItems.pop());
                    //отрисовываю
                    this.renderMenu();

                    const positionStart = this.menuItems[0].getBoundingClientRect().top;
                    let item = this.menuItems[this.menuItems.length - 1].getBoundingClientRect().top;
                    //проверяю помещается ли он на 1 строке
                    if (item != positionStart) {
                        //скрыл элемент
                        this.opacityMenuItems.push(this.menuItems.pop());
                        this.renderMenu()
                    }
                }
            }
            // новая ширина экрана
            this.screenWidth = window.innerWidth;
            this.renderOpacityBlock();
        })
    }

    getSolutionForSubmenu() {
        let subMenuWrap = document.querySelector(".sub-menu-wrap")
        this.opacityMenuItems.forEach(el => {
            el.addEventListener("mouseenter", function () {
                let item = el.querySelector(".sub-menu");
                subMenuWrap.innerHTML = "";
                if (item) {
                    item.addEventListener("mouseenter", function () {
                        subMenuWrap.innerHTML = "";
                    });
                    subMenuWrap.addEventListener("mouseleave", function () {
                        subMenuWrap.innerHTML = ""
                    })
                    subMenuWrap.insertAdjacentElement("beforeend", item.cloneNode(true));
                }


            })
        })
    }

    addArrowSubmenu() {
        let items = this.blockMenu.querySelectorAll('li');
        for (const el of items) {
            let check = el.querySelector('.sub-menu');
            if (check && !el.classList.contains("nav__item-wrap")) {
                el.insertAdjacentHTML("beforeend", `
                    <btn class='drop-menu'>
                    ${this.arrowSubmenu}
                    </btn>
                    `)
            }

        }
    }
}