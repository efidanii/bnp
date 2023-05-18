document.addEventListener("DOMContentLoaded", function (event) {

    //*Default settings (hidden params)*//
    var bp = $.urlParam('bp');
    var cb = $.urlParam('cb');
    var session = $.urlParam('session');
    var email = $.urlParam('email');
    var first_name = $.urlParam('first_name');
    var last_name = $.urlParam('last_name');
    var affiliate_id = $.urlParam('aff_id');
    var domain = $.urlParam('domain');


    if (affiliate_id) {
        $(".affiliate_id").val(affiliate_id);
    }
    if (email) {
        $(".emailcb").val(decodeURIComponent(email));
        $(".emailcb").each(function () {
            $(this).addClass('valid');
        });
    }
    if (first_name) {
        if (first_name.indexOf('+') == -1) {
            $(".first_nameInclude").val(decodeURIComponent(first_name));
        } else {
            $(".first_nameInclude").val(decodeURIComponent(first_name.replace(/\+/g, '%20')));
        }
        $(".first_nameInclude").each(function () {
            $(this).addClass('valid');
        });
    }
    if (last_name) {
        if (last_name.indexOf('+') == -1) {
            $(".last_nameInclude").val(decodeURIComponent(last_name));
        } else {
            $(".last_nameInclude").val(decodeURIComponent(last_name.replace(/\+/g, '%20')));
        }
        $(".last_nameInclude").each(function () {
            $(this).addClass('valid');
        });

    }
    if (session) {
        $(".session_id").val(session);
    }
    if (bp == 0) {
        $('.hover-modal').hide()
    }
    if (cb == 0) {
        exitpage = false;
    }


    function currency(isoCode) {
        let currency, currencyTable, currencyValue;
        var countryArr = ["AT", "CH", "DE", "LI", "LU", "BE", "CZ", "ES", "FR", "GR", "HU", "IT", "NL", "PL", "PT", "RO", "RS", "HR", "SK", "SL", "DK", "FI", "NO", "SE"]
        if (isoCode === "GB") {
            currency = "£";
            currencyTable = "GBP";
            currencyValue = "Pounds";
        } else if (countryArr.indexOf(isoCode) >= 0) {
            currency = "€";
            currencyTable = "EUR";
            currencyValue = "Euros";
        } else {
            currency = "$";
            currencyTable = "USD";
            currencyValue = "Dollars";
        }
        $(".currency").text(currency);
        $(".currency-value").text(currencyValue);
        $(".currency-table").text(currencyTable);
    }

    //*Phone*//
    var telCode = document.getElementsByClassName("phone");
    var iti = [];
    jQuery.each(telCode, function (indx, value) {
        window.intlTelInput(value, {
            allowDropdown: true,
            autoHideDialCode: true,
            autoPlaceholder: "polite",

            formatOnDisplay: true,
            geoIpLookup: function (callback) {
                $.get("https://amos-mamaya.fun/geo", function () {}, "json").always(function (resp) {
                    var countryCode = (resp && resp.country_code) ? resp.country_code : "";
                    callback(countryCode);
                    currency(resp.country_code);
                });

            },
            initialCountry: "auto",
            localizedCountries: {
                'ua': 'Ukraine'
            },
            nationalMode: true,
            placeholderNumberType: "MOBILE",
            separateDialCode: true,
            utilsScript: "js/utils.js",
        });

        iti[indx] = window.intlTelInputGlobals.getInstance(value);
        value.addEventListener("countrychange", function (elem) {
            if (iti[indx].getDialCode() != "") {
                $('.phonecc').val(iti[indx].getDialCode());
            }

            iti.forEach(function (instance) {
                var currCountry = iti[indx].getSelectedCountryData()
                instance.setCountry(currCountry.iso2);
                $('.phonecc')[indx].value = currCountry.dialCode;
            })
        })
    });

    $('body').on('DOMSubtreeModified', '.selected-dial-code', function () {
        if ($(this)[0].innerText != "") {
            for (var i = 0; i < $('.phonecc').length; i++) {
                $('.phonecc')[i].value = $(this)[0].innerText
            }
        }
    })

    $('form input').on("focus blur select", function () {
        if ($(this).hasClass('error') === true) {
            $('form label.error').hide();
            $(this).parent().find("label.error").show();
        }
    })

    function forceNumeric() {
        var $input = $(this);
        $input.val($input.val().replace(/[^\d -]+/g, ''));
    }

    $('.phone').on('input', forceNumeric);
    const isChromium = Boolean(window.chrome);
    const mailInputs = document.getElementsByName("email");
    mailInputs.forEach(mailInput => {
        if (isChromium) {
            mailInput.addEventListener('focus', function (e) {
                this.setAttribute('type', 'text');
                this.setAttribute('inputmode', 'email');
                this.setAttribute('autocomplete', 'email');
            });
            mailInput.addEventListener('blur', function (e) {
                this.setAttribute('type', 'email')
            });
        }
        mailInput.addEventListener('input', function (e) {
            let val = this.value.replaceAll(/[^/[\w-@.]/g, '');
            this.value = val;
        })
    });

    //*Password*//
    $('.password').click(function () {
        $('.valid-block').fadeIn(300)
    })
    $('.password').blur(function () {
        $('.valid-block').fadeOut(300)
    })
    $('.password').on("input click", function validatePass() {
        var password = $(this).val();
        var checkAZ = $(this).parent().parent().find($(".valid-check-A-Z"))
        var checkaz = $(this).parent().parent().find($(".valid-check-a-z"))
        var checkNum = $(this).parent().parent().find($(".valid-check-1-9"))
        var checkLeng = $(this).parent().parent().find($(".valid-check-length"))
        var checkAlph = $(this).parent().parent().find($(".valid-check-alphanumeric"))
        // $('.password').val(password)

        if (password.match(/[A-Z]/) != null) {
            $(checkAZ).addClass('check')
        }
        if (password.match(/[A-Z]/) === null) {
            $(checkAZ).removeClass('check')
        }
        if (password.match(/[a-z]/) != null) {
            $(checkaz).addClass('check')
        }
        if (password.match(/[a-z]/) === null) {
            $(checkaz).removeClass('check')
        }
        if (password.match(/[1-9]/) != null) {
            $(checkNum).addClass('check')
        }
        if (password.match(/[1-9]/) === null) {
            $(checkNum).removeClass('check')
        }
        if (password.length > 7) {
            $(checkLeng).addClass('check')
        }
        if (password.length < 8 || password.length > 12) {
            $(checkLeng).removeClass('check')
        }
        if (password.match(/^[0-9A-Za-z]+$/) != null) {
            $(checkAlph).addClass('check')
        }
        if (password.match(/^[0-9A-Za-z]+$/) === null) {
            $(checkAlph).removeClass('check')
        }
        if (password.match(/[A-Z]/) != null && password.match(/[a-z]/) != null && password.match(/[1-9]/) != null && password.length > 7 && password.match(/^[0-9A-Za-z]+$/) != null && password.length < 13) {
            $('.valid-block').hide();
        } else {
            $('.valid-block').show();
        }

    })

    // Generate a password string
    function randString(id) {
        var dataSet = $(id).attr('data-character-set').split(',');
        var possible = '';
        if ($.inArray('0-9', dataSet) >= 0) {
            possible += '0123456789';
        }
        if ($.inArray('a-z', dataSet) >= 0) {
            possible += 'abcdefghijklmnopqrstuvwxyz';
        }
        if ($.inArray('A-Z', dataSet) >= 0) {
            possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        var text = '';
        for (var i = 0; i < $(id).attr('data-size'); i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    $('input[rel="gp"]').each(function () {
        var number = Math.floor(Math.random() * (1 - 9) + 9);
        $(this).val(randString($(this)) + number + "Db");
    });
    var number = Math.floor(Math.random() * (1 - 9) + 9);
    $(".getNewPass").click(function () {
        var number = Math.floor(Math.random() * (1 - 9) + 9);
        var field = $(".getNewPass").closest('div').find('input[rel="gp"]');
        field.val(randString(field) + number + "Db");

        field.valid();
        $(this).parent().parent().find('.phone').select();
    });

    //timer
    function initCountdown() {
        let countdownSpan = $('.timer');
        let countdownSpanVal = countdownSpan.text();
        let mmSsArray = countdownSpanVal.split(":");
        let mm = parseInt(mmSsArray[0]);
        let ss = parseInt(mmSsArray[1]);
        if (mm === 0 && ss === 0) {
            redirectToPage2();
            showPopup()
            return;
        }
        if (ss === 0) {
            mm--;
            ss = 59;
        } else
            ss--;
        let isSecondsSingleDigit = Math.floor(ss / 10) === 0 ? true : false;

        if (isSecondsSingleDigit) {
            let newCountdownSpanVal = "0" + mm.toString() + " : " + "0" + ss.toString();
            countdownSpan.text(newCountdownSpanVal);
        } else {
            let newCountdownSpanVal = "0" + mm.toString() + " : " + ss.toString();
            countdownSpan.text(newCountdownSpanVal);
        }

        setTimeout(function () {
            initCountdown();
        }, 1000)
    }
    initCountdown();
    //timer

    $(".scrollLink").on('click', function (e) {
        e.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    })

})


//dates
let months = ["JAN", "FÉVR", "MARS", "AVR", "MAI", "JUIN", "JUIL", "AOÜT", "SEPT", "ОСТ", "NOV", "DÉC"],
    ddHtml = document.querySelector('.dd'),
    mmHtml = document.querySelector('.mm'),
    yyHtml = document.querySelector('.yy'),
    today = new Date (),
    currMonth = String(today.getMonth() + 1).padStart(2, '0')-1


    
    ddHtml.innerHTML = String(today.getDate()).padStart(2, '0');
    mmHtml.innerHTML = months[currMonth];
    yyHtml.innerHTML = today.getFullYear();


//slider



let slidesData = [{
        icon: 'images/lamp.png',
        span: 'Luc Brunel',
        cardTitle: "Je touche 6 700 euros par mois. Pour moi, c'est une très bonne augmentation de ma pension.",
        img: 'images/1o.jpg'
    },
    {
        icon: 'images/lamp.png',
        span: 'Alexandrie Le Dupuy',
        cardTitle: "Grâce au fonds BNP de crypto-monnaies, j'ai gagné 10 000 € dès le premier mois ce qui m’a permis de partir en vacances avec cet argent.",
        img: 'images/2o.png'
    },
    {
        icon: 'images/lamp.png',
        span: 'Alphonse Adam',
        cardTitle: 'Après six mois, je me suis acheté un F2 à Paris. Merci beaucoup !',
        img: 'images/3o.jpg'
    },
    {
        icon: 'images/lamp.png',
        span: 'Stéphanie Dubois',
        cardTitle: 'e gagne un revenu passif de 5 000 euros par mois.Je vis ma vie comme je le veux.',
        img: 'images/4o.jpg'
    },
    {
        icon: 'images/lamp.png',
        span: 'Madeleine Petitjean',
        cardTitle: 'Je m’offre maintenant tout ce dont je ne pouvais que rêver avant',
        img: 'images/5o.jpg'
    }
];
let sliderView = document.querySelector('.slider-view'),
    slider1 = document.querySelector('.slides'),
    arrowRight = document.querySelector('.arrow_right'),
    arrowLeft = document.querySelector('.arrow_left'),
    marginLeft = "0";



slider1.style.marginLeft = marginLeft

sliderViewWith = slidesData.length * 255


slider1.style.width = `${sliderViewWith}px`

function makeSlide(obj) {
    return `<div class="slide" style="background: url(${obj.img});"> <div class="card-container"> <div class="category-title"> <img src="${obj.icon}" alt=""> <span>${obj.span}</span> </div> <div class="card-title"> ${obj.cardTitle} </div> </div> </div>`
}

slidesData.forEach(slide => slider1.insertAdjacentHTML('beforeend', makeSlide(slide)))

arrowRight.addEventListener('click', function () {

    if (marginLeft > -sliderViewWith + sliderView.clientWidth) {
        marginLeft = marginLeft - 250
        slider1.style.marginLeft = marginLeft + "px";
    }
})

arrowLeft.addEventListener('click', function () {
    if (marginLeft < 0) {
        marginLeft = marginLeft + 250
        slider1.style.marginLeft = marginLeft + "px";
    }
})