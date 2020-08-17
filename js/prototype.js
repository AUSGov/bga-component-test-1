/*jshint browser: true, devel: true, jquery: true*/

// Active pathway tiles
function changePage(page){
    window.location.pathname = page;
}
function changePageExternal(url) {
    window.location = url;
}

$(document).ready(function () {
    
    // Main navigation functionality
    /*$('.navbar-nav .nav-item.dropdown').on('click', function(){
        $(this).find('.navigation-first-level-menu').toggleClass('show');
    });*/

    
    // Prevent click empty 'a' tag from causing scrolling
    $('a').on('click', function(e){
        if (! $(this).attr('href') ) {
            e.preventDefault();
        }
    });
    
    // Hide empty breadcrumb links and arrows
    $('a.breadcrumb-link').each(function(){
        if( $(this).is(':empty') ) {
            var wrapper = $(this).parent('.breadcrumb-home-wrapper');
            $(wrapper).css('display', 'none');
        }
    });
    

    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    // Function for menu stickiness on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {

        for (var i = 0; i < positions.length; i++) {
            var top_position = positions[i];
            if ($(window).scrollTop() >= top_position) {
                $('.anchor-menu a').removeClass('active-sticky');
                $('.anchor-menu a[data-value=' + positions[i] + ']').addClass('active-sticky');
            }
        }
    }
    
    // Remove whitespace from anchor-section names or they break the sidemenu links
    $('.anchor-section').each(function(){
        var section_name = $(this).attr('name');
        section_name = $(this).attr('name').replace(/\s/g,' ');
        $(this).attr('name', section_name);
    });
    
    // Function to make the side menu sticky
    var stickyPosition = $('.anchor-menu').offset(); //This var is outside the function because it needs to be determined BEFORE window resizing,.
    
    function menuStickiness() {
        
        var win = $(window),
            stickyWidth = $('.twoCol39-left').width();
        
        // Set side-menu initial horizontal position 
        if(win.width() < 575) {
            $('.anchor-menu').css('position', 'relative').css('top', 'auto');
        } else if (win.width() >= 575) {
            if (win.scrollTop() >= stickyPosition.top) {
                $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
            } else {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            }
        } 
        
        // Reset side-menu position on scroll
        $(window).scroll(function () {

            stickyWidth = $('.twoCol39-left').width();

            if (win.width() < 575) {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            } else if (win.width() >= 575) {
                if (win.scrollTop() >= stickyPosition.top) {
                    $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
                } else if (win.scrollTop() < stickyPosition.top) {
                    $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                }
            }
        });
    }

    if ($( ".anchor-menu .sticky-container" ).length) {

        // Apply menu stickiness
        menuStickiness();

        
        // Side menu scroll to section of the page
        // and add top position of element to anchor link as a data-value
        $('.anchor-menu a').each(function(){
            
            var a_text = $(this).text(),
                element_name = $(this).text().replace(/\s/g,' ');
                var name_str = '.anchor-section[name="' +  element_name  + '"]';
                var element_position = $(name_str).offset();
            
            
            if ($(name_str).length){
                $(this).attr('data-value', Math.round(element_position.top));
        
                $(this).on('click', function(){
                    $([document.documentElement, document.body]).animate(
                        { scrollTop: $(name_str).offset().top }, 400);
                    $('.anchor-menu a').removeClass('active-sticky');
                    $(this).addClass('active-sticky');
                });
            }
            
            
        });   
        
    
        // Change menu active state on scroll to different sections of the page
        var positions = [];
        $('.anchor-menu a').each(function(){
            var element_position = $(this).attr('data-value');
            positions.push(Math.round(element_position));
        }); 
    
        $(window).scroll(function(){
            add_position(positions); 
        });
    
    } // END if .anchor-menu .sticky-container EXISTS
    
    
    // Menu stickiness on .resize()
    $(window).on('resize', function(){
        if ($( ".anchor-menu .sticky-container" ).length) {
            menuStickiness();
        }
    });
    
    
   
    // Modal functionality
    // Empty href modal
    $('a[href=""]').on("click", function(){
        if (!$(this).parents('.sticky-container').length && !$(this).hasClass("guide_navlink")){
            $(".modal-wrapper").addClass("active");
            $(".modal-background").addClass("active");
        }
    });
    
    $('.inactive-path').on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    $(".modal-close").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });

    $(".modal-background").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });
    
    // Search not working modal
     $(".btn-search").on("click", function(e){
        var location = window.location;
        e.preventDefault();
        window.location = location;
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    // Deactivate Breadcrumbs
    $('.breadcrumb-link').on('click', function(e){
        e.preventDefault();
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    }); 
    
    // Main nav - top level links
    $('#navigation-bar .nav-item').on('click', function(e){
        e.preventDefault();
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });  
    $('.navbar-toggler').on('click', function(e){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    // EXPORT TOOL TABS & NAV TILES FUNCTIONALITY
    $('.nav-link').on('click', function(e){
        e.preventDefault();
        $('.tab-section').hide(); 
        
        var active_section = '#' + $(this).attr('href');
        $(active_section).show();
    });
    
    $('.export-nav-tile').on('click', function(){
        $('.tab-section').hide(); 
        var active_section = $(this).attr('data-attribute');
        $('#' + active_section).show();
        
        $('.nav-link.active').removeClass('active');
        $('.nav-link[href='+ active_section + ']').addClass('active');
        
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
    
    
    /*------------------- Update URLS for measuring unmod task success -------------------*/
    
    // Task 1 - measure click on inline-pathway
    /*$("#task1 .anchor-card").on('click', function(){
           
    });*/
    
    // Task 2 - measure clicks on side-menu
    var task2_counter = 1;
    $("#task2 .sticky-item li").on('click', function(){
        window.location.hash = "+sidemenu" + task2_counter;
        task2_counter++;
    });

    
    //Task 3 - measure clicks on tabs, readmore and accordion links   
    var create_fragment = function(tab_number, readmore_number, accordion_number){
        var fragment = "";
        if (tab_number > 0)  {
            fragment = fragment + "+tab" + tab_number;
        }
        if (readmore_number > 0) {
            fragment = fragment + "+readmore" + readmore_number;
        }
        if (accordion_number > 0)  {
            fragment = fragment + "+accordionlink" + accordion_number;
        }
        
        window.location.hash = fragment;
    };
    
    var tabs_counter = 0,
        readmore_counter = 0,
        accordionlink_counter = 0;
        
    $('#task3 .nav-tabs .nav-item').on('click', function(){
        tabs_counter++;
        create_fragment(tabs_counter, readmore_counter, accordionlink_counter);
    });
    $('#task3 .accordion-link').on('click', function(){
        accordionlink_counter++;
        create_fragment(tabs_counter, readmore_counter, accordionlink_counter);
    });
    $('#task3 .anchor-card.export-nav-tile').on('click', function(){
        readmore_counter++;
        create_fragment(tabs_counter, readmore_counter, accordionlink_counter);
    });
    
    //Task 4 - measure open of accordion items
    var task4_counter = 0,
        correct_answer_counter = 0;
    $("#task4 .accordion-item").on('click', function(){
        task4_counter++;
        if ($(this).hasClass('correct_answer')) {
            correct_answer_counter++;
        }
        if (correct_answer_counter > 0) {
            window.location.hash = "+accordion" + task4_counter + 'correct' + correct_answer_counter;
        } else {
             window.location.hash = "+accordion" + task4_counter;
        } 
    });

    
    
}); // END doc ready

