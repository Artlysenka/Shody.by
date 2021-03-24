

    $(document).ready(function () {

        let picture = document.getElementById('carousel-images')
        let modalContainer = document.getElementById('modal-container')
        let width = 0
        if (window.innerWidth < 992) {
            width = 51
        }
        else {
            width = 32.2
        }

        let totalSlidesCount = 0
        let list = carousel.querySelector('ul');
        let listElems = carousel.querySelectorAll('li');
        let position = 0;
        let initialTime = 0
        let finaleTime = 0


        let startPoint = {}
        let currentFingerPosition = {}
        let fingerRelativePosition = 0

        picture.addEventListener('touchstart', function (event) {
            event.stopPropagation()
            picture.classList.remove('transition')
            let clickTime = new Date
            initialTime = clickTime.getTime()
            startPoint.x = event.changedTouches[0].pageX;
        }, false);

        picture.addEventListener('touchmove', function (event) {

            event.stopPropagation()
            nowPoint = event.changedTouches[0];
            currentFingerPosition.x = nowPoint.pageX
            fingerRelativePosition = Math.abs(currentFingerPosition.x - startPoint.x)

            if (event.changedTouches.length === 1) {
                let currentMargin = (window.innerWidth / 100) * 2 * position
                let movingMarginForward = (currentMargin + -fingerRelativePosition)
                let movingMarginBackward = (currentMargin + fingerRelativePosition)
                if (currentFingerPosition.x - startPoint.x < 0) {
                    picture.style.marginLeft = movingMarginForward + 'px'
                }
                else {
                    picture.style.marginLeft = movingMarginBackward + 'px'
                }
            }

        }, false);

        picture.addEventListener('touchend', function (event) {
            event.stopPropagation()
            picture.classList.add('transition')
            let mouseUpTime = new Date
            finaleTime = mouseUpTime.getTime()

            if (currentFingerPosition.x - startPoint.x > 0) {
                if (position !== 0) {
                    if (fingerRelativePosition < 150) {
                        if (finaleTime - initialTime > 200) {
                            picture.style.marginLeft = position + 'rem'
                        }
                        else {
                            picture.style.marginLeft = position + width + 'rem'
                            position += width
                        }
                    }
                    else {
                        picture.style.marginLeft = position + width + 'rem'
                        position += width
                    }
                }
                else {
                    picture.style.marginLeft = position + 'rem'
                }
            }
            else {
                if (parseInt(position) > parseInt((totalSlidesCount - 1) * -width)) {
                    if (fingerRelativePosition < 150) {
                        if (finaleTime - initialTime > 200) {
                            picture.style.marginLeft = position + 'rem'
                        }
                        else {
                            picture.style.marginLeft = position - width + 'rem'
                            position -= width
                        }
                    }
                    else {
                        picture.style.marginLeft = position - width + 'rem'
                        position -= width
                    }
                }
                else {
                    picture.style.marginLeft = position + 'rem'  
                }
            }
        }, false);


        let mouseClickedOnTheElenent = false
        let initialPosition = {}
        let currentPosition = {}
        let mouseRelativePosition = 0


        picture.addEventListener('mousedown', function (event) {
            event.preventDefault();
            event.stopPropagation();
            let clickTime = new Date
            initialTime = clickTime.getTime()
            picture.classList.remove('transition')
            mouseClickedOnTheElenent = true
            initialPosition.x = event.pageX
        }, false);

        picture.addEventListener('mousemove', function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (mouseClickedOnTheElenent) {

                currentPosition.x = event.pageX
                mouseRelativePosition = Math.abs(currentPosition.x - initialPosition.x)

                let currentMargin = (window.innerWidth / 100) * 2 * position
                let movingMarginForward = (currentMargin + -mouseRelativePosition)
                let movingMarginBackward = (currentMargin + mouseRelativePosition)

                if (currentPosition.x - initialPosition.x < 0) {
                    picture.style.marginLeft = movingMarginForward + 'px'
                    if (position >= (totalSlidesCount - 1) * -width) {
                        picture.style.marginLeft = (currentMargin - (mouseRelativePosition / 3)) + 'px'
                    }
                }
                else {
                    picture.style.marginLeft = movingMarginBackward + 'px'
                    if (position >= 0) {
                        picture.style.marginLeft = (currentMargin + (mouseRelativePosition / 3)) + 'px'
                    }

                }
            }

        }, false);

        modalContainer.addEventListener('mouseup', function (event) {

            event.preventDefault();
            event.stopPropagation();
            picture.classList.add('transition')
            let mouseUpTime = new Date
            finaleTime = mouseUpTime.getTime()

            if (currentPosition.x - initialPosition.x > 0) {
                if (position < 0) {
                    if (mouseRelativePosition < 200) {
                        if (finaleTime - initialTime > 200) {
                            picture.style.marginLeft = position + 'rem'
                        }
                        else {
                            picture.style.marginLeft = position + width + 'rem'
                            position += width
                        }
                    }
                    else {
                        picture.style.marginLeft = position + width + 'rem'
                        position += width
                    }
                }
                else {
                    picture.style.marginLeft = 0 + 'rem'
                }
            }
            else {
                if (parseInt(position) > parseInt((totalSlidesCount - 1) * -width)) {
                    if (mouseRelativePosition < 200) {
                        if (finaleTime - initialTime > 200) {
                            picture.style.marginLeft = position + 'rem'
                        }
                        else {
                            picture.style.marginLeft = position - width + 'rem'
                            position -= width
                        }
                    }
                    else {
                        picture.style.marginLeft = position - width + 'rem'
                        position -= width
                    }
                }
                else {
                    picture.style.marginLeft = position + 'rem'
                    /* console.log('position after swipe: ', (totalSlidesCount - 1) * -width)
                    console.log('static position: ', position) */
                }
            }
            mouseClickedOnTheElenent = false
        }, false);

        $('.modal-button').on({
            'click': function (event) {
                $('html').css({
                    height: '100vh',
                    overflow: 'hidden',
                })
                $('.modal-container').css({
                    display: 'block'
                })
                let targetPicture = event.target
                let children = $('#carousel-images').children().children('img')
                for (let i = 0; i < children.length; i++) {
                    let child = children[i]
                    if (targetPicture.dataset.name === child.dataset.name) {
                        position = -width * i
                        list.style.marginLeft = position + 'rem';
                    }
                    totalSlidesCount++
                }
            }
        })

        $('#hide-button').on({
            'click': function () {
                $('.modal-container').css({
                    display: 'none'
                })
                $('html').css({
                    overflow: 'scroll',
                })
                totalSlidesCount = 0
            },
        })


        //Функции для прокручивания слайдов по нажатию на кнопки и по кликам на кнопки

        const slideLeft = () => {
            picture.classList.remove('transition')
            position += width;
            if (position >= 0) {
                position = 0
                $('.left').css('opacity', 0.0)
            }

            list.style.marginLeft = position + 'rem';
        }

        const slideRight = () => {
            picture.classList.remove('transition')
            position -= width;

            if (position <= -width * (listElems.length - 1)) {
                position = -width * (listElems.length - 1)
                $('.right').css('opacity', 0.0)
            }
            list.style.marginLeft = position + 'rem';
        }

        const hightLightButtonLeft = () => {
            if (position !== 0) {
                $('.left').css('opacity', 0.8)
            }
        }
        const hightLightButtonRight = () => {
            if (position !== -width * (listElems.length - 1)) {
                $('.right').css('opacity', 0.8)
            }
        }

        document.addEventListener('keydown', function (event) {
            if (event.code === 'ArrowLeft') slideLeft()
            if (event.code === 'ArrowRight') slideRight()
        })


        $('.prev').on({
            'click': slideLeft,
            'mouseover': hightLightButtonLeft,
            'mouseout': function () {
                $('.left').css('opacity', 0.0)
            }
        })
        $('.next').on({
            'click': slideRight,
            'mouseover': hightLightButtonRight,
            'mouseout': function () {
                $('.right').css('opacity', 0.0)
            }
        })

    })

