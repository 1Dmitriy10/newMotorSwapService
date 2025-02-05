import $ from 'jquery';

export class Spoilers {
    constructor(spoiler) {
        let check = document.querySelectorAll(`.${spoiler.item}`)
        if(check != undefined) {
            this.spoiler = spoiler,
            this.class = [...document.querySelectorAll(`.${this.spoiler.item}`)];
        this.choice()
        }else{
            return null
        }
       
    }

    choice() {
        if (!this.class || !this.class.length) {

        } else {
            $(`.${this.spoiler.item}`).siblings('.spoiler-content').slideUp();
            let settings = this.spoiler

            if (settings.firstOpen) {
                this.getOpenFirstSpoiler();
            }

            for (const el of this.class) {
                el.addEventListener("click", () => {
                    if (settings.accordion) {
                        this.getAccordionSpoiler(event);
                    } else {
                        this.getSpoiler(event);
                    }
                })
            }
        }


    }

    getOpenFirstSpoiler() {
        let firstItem = this.class[0];

        firstItem.parentElement.setAttribute("open", '');
        firstItem.classList.add('active');
        // let firstItemContent = firstItem.parentElement.querySelector(".spoiler-content");
        $(`.${this.spoiler.item}`).first().parent().children(".spoiler-content").slideDown(this.spoiler.timeAnimation);
    }

    getAccordionSpoiler(event) {
        if ($(event.target).parent().attr('open')) {
            event.preventDefault();
            let spoiler = $(event.target).parent();
            setTimeout(function () {
                spoiler.removeAttr('open');
            }, this.spoiler.timeAnimation);
            $(event.target).removeClass('active');
            $(`.${this.spoiler.item}`).siblings('.spoiler-content').slideUp(this.spoiler.timeAnimation);

        } else {
            $(`.${this.spoiler.item}`).parent().removeAttr('open');
            $('summary').removeClass('active');
            $(`.${this.spoiler.item}`).siblings('.spoiler-content').slideUp(this.spoiler.timeAnimation);
            $(event.target).siblings('.spoiler-content').slideDown(this.spoiler.timeAnimation);
            $(event.target).addClass('active');
        }
    }

    getSpoiler(event) {

        if ($(event.target).parent().attr('open')) {
            event.preventDefault();
            let spoiler = $(event.target).parent();
            $(event.target).removeClass('active');
            $(event.target).siblings('.spoiler-content').slideUp(this.spoiler.timeAnimation);
            setTimeout(function () {
                spoiler.removeAttr('open');
            }, this.spoiler.timeAnimation);

        } else {
            $(event.target).siblings('.spoiler-content').slideDown(this.spoiler.timeAnimation);
            $(event.target).addClass('active');
        }
    }

}








